const dbaccess = require('../common/dbaccess');
const logger = require('../common/logger');
const moment = require('moment');
const { getDateStartOfMonth, getDateEndOfMonth } = require('../common/utils');

const LOG_CATEGORY = "MonthlyReport"
const SET_ISOLATION_SQL = "SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED";
const GET_VALID_EMPLOYEE = "SELECT employee_id FROM employee WHERE is_deleted <> 1";
const GET_WORK_TOTAL_BY_ID = "SELECT count(*) as totalDays, sum(work_total) as totalMins FROM worklog WHERE employee_id = ? and work_date BETWEEN ? and ?";
const GET_ANNUAL_HOLIDAY_AND_SALARY = "SELECT holiday_time, salary FROM employee WHERE employee_id = ?";
const GET_OT_PAYMENT = "SELECT SUM(payment) as payment FROM overtime WHERE employee_id = ? and status = 1 and CAST(start_date as DATE) BETWEEN ? and ?";
const INSERT_MONTHLY_REPORT = "INSERT INTO monthlyreport (employee_id, month, year, work_total_hours, work_total_days, annual_holiday, overtime_payment_total, salary_basic, salary_total, salary_hour, transport_support, house_support, internet_support, phone_support, lunch_support, insurance, tax)"
    + "                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?) "
    + "                         ON DUPLICATE KEY UPDATE `work_total_hours`=VALUES(`work_total_hours`), `work_total_days`=VALUES(`work_total_days`), `annual_holiday`=VALUES(`annual_holiday`), `salary_hour`=VALUES(`salary_hour`),"
    + "                         						`overtime_payment_total`=VALUES(`overtime_payment_total`), `salary_basic`=VALUES(`salary_basic`), `salary_total`=VALUES(`salary_total`), "
    + "                                                 `transport_support`=VALUES(`transport_support`), `house_support`=VALUES(`house_support`), `internet_support`=VALUES(`internet_support`), "
    + "                                                 `phone_support`=VALUES(`phone_support`), `lunch_support`=VALUES(`lunch_support`), `insurance`=VALUES(`insurance`), `tax`=VALUES(`tax`)";
const GET_ALLOWANCE_POLICY = "SELECT * FROM allowance";

module.exports = {
    run
}

async function run(callback) {
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] MONTHLY REPORT start `);
    const connection = await dbaccess.getConnection();
    await dbaccess.queryTransaction(connection, SET_ISOLATION_SQL);
    await dbaccess.beginTransaction(connection);
    try {
        const validUser = await getValidUser(connection);
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        const startDate = getDateStartOfMonth(lastMonth);
        const endDate = getDateEndOfMonth(lastMonth);

        const allowance = await getAllowanceSupport(connection);
        for (let i = 0; i < validUser.length; i++) {
            const data = {
                employeeId: validUser[i].employee_id,
                startDate: startDate,
                endDate: endDate,
                month: lastMonth.getMonth() + 1,
                year: lastMonth.getFullYear(),
                allowance,
            }
            await processEmployee(connection, data);
        }
        dbaccess.commitTransaction(connection);
    } catch (error) {
        dbaccess.rollback(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] ` + error.stack);
    }

    dbaccess.releaseConnection(connection);
    callback();
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] MONTHLY REPORT end `);
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
 * Get Allowance Support salary
 * @param {*} connection 
 */
async function getAllowanceSupport(connection) {
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] Get allowance `);
    const result = await dbaccess.queryTransaction(connection, GET_ALLOWANCE_POLICY);
    if (result.length) {
        return result[0];
    }
    return {};
}

/**
 * Process data each employee
 * @param {*} connection 
 * @param {*} data 
 */
async function processEmployee(connection, data) {
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] start process for employee = ${data.employeeId}, month = ${data.month}, year = ${data.year}`);
    const [
        worklog,
        annualHolidayAndSalary,
        otPayment
    ] = await Promise.all([
        getWorkTotal(connection, data),
        getAnnualHolidayAndSalary(connection, data.employeeId),
        getOTPayment(connection, data),
    ]);

    const { salary, holidayTime } = annualHolidayAndSalary;
    const { workTotalHours, workTotalDays } = worklog;
    const { lunch, house, transport, phone, internet, insurance, tax } = data.allowance;

    const salaryBasic = holidayTime >= 0 ? salary * 8 * workTotalDays : salary * workTotalHours;
    const insurancePayment = salaryBasic * insurance;
    const taxPayment = salaryBasic * tax;
    const salaryTotal = salaryBasic + otPayment + lunch + house + transport + phone + internet - insurancePayment - taxPayment;

    const params = [data.employeeId, data.month, data.year, workTotalHours, workTotalDays, holidayTime, otPayment, salaryBasic, salaryTotal, salary, transport, house, internet, phone, lunch, insurancePayment, taxPayment];
    await insertMontlyReport(connection, params);
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] end process for employee ${data.employeeId}`);
}

/**
 * Insert new monthlyreport into database
 * @param {*} connection 
 * @param {*} params 
 * @returns 
 */
async function insertMontlyReport(connection, params) {
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] insert monthyreport`);
    await dbaccess.queryTransaction(connection, INSERT_MONTHLY_REPORT, params);
    return;
}

/**
 * get Worklog by user
 * @param {*} connection 
 */
async function getWorkTotal(connection, data) {
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] get worktotal`);
    const result = await dbaccess.queryTransaction(connection, GET_WORK_TOTAL_BY_ID, [data.employeeId, data.startDate, data.endDate]);
    return result.length ? { workTotalHours: result[0].totalMins / 60, workTotalDays: result[0].totalDays } : { workTotalHours: null, workTotalDays: null };
}

/**
 * Get current annual holiday
 * @param {*} connection 
 * @param {*} employee_id 
 * @returns 
 */
async function getAnnualHolidayAndSalary(connection, employee_id) {
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] get annual holiday and salary`);
    const result = await dbaccess.queryTransaction(connection, GET_ANNUAL_HOLIDAY_AND_SALARY, [employee_id]);
    return result.length ? { salary: result[0].salary || 0, holidayTime: result[0].holiday_time } : null;
}

/**
 * Get OT payment
 * @param {*} connection 
 * @param {*} data 
 * @returns 
 */
async function getOTPayment(connection, data) {
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] get OT payment`);
    const result = await dbaccess.queryTransaction(connection, GET_OT_PAYMENT, [data.employeeId, data.startDate, data.endDate]);
    return result.length ? result[0].payment || 0 : 0;
}