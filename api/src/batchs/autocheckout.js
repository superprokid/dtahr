const dbaccess = require('../common/dbaccess');
const logger = require('../common/logger');
const moment = require('moment');
const { WORKLOG_STATUS, WORKHISTORY_STATUS, WORKTIME_DEFAULT } = require('../config/constants');
const { minDiff, calWorkingTime, compareTwoTimeGreaterOrEqual } = require('../common/utils');

const LOG_CATEGORY = "Auto Checkout Batch"
const WORK_TIME_MIN = 60 * 8
const SET_ISOLATION_SQL = "SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED";
const GET_VALID_WORKLOG_TODAY = "SELECT * FROM worklog WHERE work_date = CAST(now() as DATE) and employee_id = ?";
const GET_VALID_EMPLOYEES = "SELECT employee_id, holiday_time FROM employee WHERE is_deleted <> 1";
const GET_WORKTIME = "SELECT * FROM worktime WHERE approve_date <= now() ORDER BY approve_date DESC LIMIT 1";

const INSERT_WORKLOG = "INSERT INTO worklog (employee_id, work_status, work_date, work_total) VALUES (?, ?, ?, ?)";
const INSERT_NEW_WORKHISTORY = "INSERT INTO workhistory (employee_id, workhistory_status, workhistory_description, work_date) VALUES (?, ?, ?, now())";
const UPDATE_WORKLOG = "UPDATE worklog SET work_status = ?, work_total = ? WHERE worklog_id = ?";
const UPDATE_HOLIDAY_TIME = "UPDATE employee SET holiday_time = holiday_time - ? WHERE employee_id = ?";

const DESCRIPTION_AUTO_CHECKOUT = "CHECK OUT - Auto check out by bot"
const DESCIPRTION_AUTO_DESC_HOLIDAY = "AUTO DETECTED - You didn't come to work, your annual holiday is from ";
const DESCIPRTION_WORK_NOT_ENOUGH = "AUTO DETECTED - Worked not enough 8 hours - duration: ";

module.exports = {
    run
}

async function run(callback) {
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] AUTO CHECKOUT BATCH start `);
    const connection = await dbaccess.getConnection();
    await dbaccess.queryTransaction(connection, SET_ISOLATION_SQL);
    await dbaccess.beginTransaction(connection);
    try {
        const listEmployees = await getValidEmployees(connection);
        for (let i in listEmployees) {
            const employee = listEmployees[i];
            await autoCheckout(connection, employee);
        }
        await dbaccess.commitTransaction(connection);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] AUTO CHECKOUT BATCH end `);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        await dbaccess.rollback(connection);
    }
    dbaccess.releaseConnection(connection);
    callback();
}

async function getValidEmployees(connection) {
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] start get all employees `);
    const result = await dbaccess.queryTransaction(connection, GET_VALID_EMPLOYEES);
    return result;
}

/**
 * Get worklog valid in current date
 * @param {*} connection 
 * @returns 
 */
async function getValidWorklog(connection, employeeId) {
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] start get worklog for employee_id: ${employeeId}`);
    const result = await dbaccess.queryTransaction(connection, GET_VALID_WORKLOG_TODAY, [employeeId]);
    return result;
}

async function autoCheckout(connection, employee) {
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] start calculate auto checkout for employee: ${employee.employee_id}`);
    const worklog = await getValidWorklog(connection, employee.employee_id)
    if (!worklog.length) {
        await processForNotWorking(connection, employee);
    } else {
        await processForWorking(connection, employee, worklog[0]);
    }
}

async function processForNotWorking(connection, employee) {
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee: ${employee.employee_id} din't come to work - start process`);
    const today = moment().format('YYYY-MM-DD');
    await dbaccess.queryTransaction(connection, INSERT_WORKLOG, [employee.employee_id, WORKLOG_STATUS.checkout, today, 0]);
    await dbaccess.queryTransaction(connection, UPDATE_HOLIDAY_TIME, [1, employee.employee_id])
    await dbaccess.queryTransaction(connection, INSERT_NEW_WORKHISTORY, [employee.employee_id, WORKHISTORY_STATUS.autoDetectedSystem, DESCIPRTION_AUTO_DESC_HOLIDAY + `${employee.holiday_time} to ${employee.holiday_time - 1}`]);
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee: ${employee.employee_id} process for not working done`);
}

async function processForWorking(connection, employee, worklog) {
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee: ${employee.employee_id} working today - start process`);
    // if employee already check out
    if (worklog.work_status === WORKLOG_STATUS.checkout) {
        if (worklog.work_total < WORK_TIME_MIN) {
            const notWorkingTime = Math.round(WORK_TIME_MIN - worklog.work_total);
            await dbaccess.queryTransaction(connection, INSERT_NEW_WORKHISTORY, [employee.employee_id, WORKHISTORY_STATUS.autoDetectedSystem, DESCIPRTION_WORK_NOT_ENOUGH + `${notWorkingTime} mins`]);
            await dbaccess.queryTransaction(connection, UPDATE_HOLIDAY_TIME, [notWorkingTime / (8 * 60), employee.employee_id]);
        }
    } else {
        const workTimeList = await dbaccess.queryTransaction(connection, GET_WORKTIME);
        let workTime = WORKTIME_DEFAULT
        if (workTimeList.length) {
            workTime = workTimeList[0];
        }

        let workLogUpdateDate = new Date(worklog.update_at);
        // Check if checkin earlier work start time
        if (compareTwoTimeGreaterOrEqual(workTime.hour_start, workTime.min_start, workLogUpdateDate.getHours(), workLogUpdateDate.getMinutes())) {
            workLogUpdateDate.setHours(workTime.hour_start);
            workLogUpdateDate.setMinutes(workTime.min_start);
        }
        // Set time for calculate working time
        const startTime = workLogUpdateDate;
        const endTime = new Date();
        endTime.setHours(workTime.hour_end, workTime.min_end, 0);
        const lunchStart = new Date();
        lunchStart.setHours(workTime.lunch_hour_start, workTime.lunch_min_start, 0);
        const lunchEnd = new Date();
        lunchEnd.setHours(workTime.lunch_hour_end, workTime.lunch_min_end, 0);
        let workTotal =  worklog.work_total + calWorkingTime(startTime, endTime, lunchStart, lunchEnd);
        if (workTotal < 0) {
            workTotal = 0;
        }
        await dbaccess.queryTransaction(connection, UPDATE_WORKLOG, [WORKLOG_STATUS.checkout, workTotal, worklog.worklog_id]);
        await dbaccess.queryTransaction(connection, INSERT_NEW_WORKHISTORY, [employee.employee_id, WORKHISTORY_STATUS.autoCheckout, DESCRIPTION_AUTO_CHECKOUT]);
        if (workTotal < WORK_TIME_MIN) {
            logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee: ${employee.employee_id} not working for ${WORK_TIME_MIN - workTotal} mins`);
            const notWorkingTime = Math.round(WORK_TIME_MIN - workTotal);
            await dbaccess.queryTransaction(connection, INSERT_NEW_WORKHISTORY, [employee.employee_id, WORKHISTORY_STATUS.autoDetectedSystem, DESCIPRTION_WORK_NOT_ENOUGH + `${notWorkingTime} mins`]);
            await dbaccess.queryTransaction(connection, UPDATE_HOLIDAY_TIME, [notWorkingTime / (8 * 60), employee.employee_id]);
        }
    }
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee: ${employee.employee_id} working today - end`);
}