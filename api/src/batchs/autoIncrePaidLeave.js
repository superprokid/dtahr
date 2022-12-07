const dbaccess = require('../common/dbaccess');
const logger = require('../common/logger');
const moment = require('moment');
const { WORKHISTORY_STATUS } = require('../config/constants');

const LOG_CATEGORY = "MonthlyReport"
const SET_ISOLATION_SQL = "SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED";
const GET_VALID_EMPLOYEE = "SELECT employee_id FROM employee WHERE is_deleted <> 1";
const GET_HOLIDAY_BY_EMPLOYEE = "SELECT holiday_time FROM employee WHERE employee_id = ?";
const GET_NUMBER_INCREASE = "SELECT * FROM keyvalue WHERE `key` = 'increase_paid_leave_month'";
const INSERT_NEW_WORKHISTORY = "INSERT INTO workhistory (employee_id, workhistory_status, workhistory_description, work_date) VALUES (?, ?, ?, now())";
const UPDATE_HOLIDAY_TIME = "UPDATE employee SET holiday_time = ? WHERE employee_id = ?";
const DESCRIPTION_AUTO_INCREASE = "Increase paid leave monthly --> Auto increased by system - from";

module.exports = {
    run
}

async function run(callback) {
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] AUTO INCREASE PAID LEAVE MONTHLY start `);
    const connection = await dbaccess.getConnection();
    await dbaccess.queryTransaction(connection, SET_ISOLATION_SQL);
    await dbaccess.beginTransaction(connection);
    try {
        const validUser = await getValidUser(connection);
        for (let i = 0; i < validUser.length; i++) {
            const { employee_id } = validUser[i];
            await processEmployee(connection, employee_id);
        }
        dbaccess.commitTransaction(connection);
    } catch (error) {
        dbaccess.rollback(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] ` + error.stack);
    }

    dbaccess.releaseConnection(connection);
    callback();
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] AUTO INCREASE PAID LEAVE MONTHLY end `);
}

/**
 * Get valid employees
 * @param {*} connection 
 * @returns 
 */
async function getValidUser(connection) {
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] Get valid employees `);
    return await dbaccess.queryTransaction(connection, GET_VALID_EMPLOYEE);
}

/**
 * Process data each employee
 * @param {*} connection 
 * @param {*} employeeId 
 */
async function processEmployee(connection, employeeId) {
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] start process for employee = ${employeeId}`);
    // get current holiday time
    const holiday = await dbaccess.queryTransaction(connection, GET_HOLIDAY_BY_EMPLOYEE, [employeeId]);
    if (!holiday.length) {
        logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] holiday time of employee = ${employeeId} is not exist, so end process`);
        return;
    }
    // get number increase
    const number = await dbaccess.queryTransaction(connection, GET_NUMBER_INCREASE);
    const numberIncrease = number.length ? Number(number[0].value) : 1;
    const { holiday_time } = holiday[0];
    const newHoliday = holiday_time < 0 ? numberIncrease : holiday_time + numberIncrease;
    // insert work history
    await dbaccess.queryTransaction(connection, INSERT_NEW_WORKHISTORY, [employeeId, WORKHISTORY_STATUS.byAdmin, `${DESCRIPTION_AUTO_INCREASE} ${Number(holiday_time).toFixed(2)} to ${Number(newHoliday).toFixed(2)}`]);
    // update holiday time
    await dbaccess.queryTransaction(connection, UPDATE_HOLIDAY_TIME, [newHoliday, employeeId]);
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] end process for employee ${employeeId}`);
}