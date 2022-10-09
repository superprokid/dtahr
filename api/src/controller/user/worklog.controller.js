const { exeQuery, getConnection, beginTransaction, rollback, releaseConnection, queryTransaction, commitTransaction } = require('../../common/dbaccess');
const logger = require('../../common/logger');
const { isValidDate, getDateString, validateRequest } = require('../../common/utils');
const { ROLE, WORKLOG_STATUS, WORKHISTORY_STATUS } = require('../../config/constants');
const LOG_CATEGORY = "WorkLogController"

const GET_WORK_HISTORY = "SELECT * FROM workhistory WHERE employee_id = ? and work_date between ? and ? ORDER BY work_date ASC";
const GET_WORK_LOG_OF_USER_BY_MANAGER = "SELECT * FROM worklog WHERE employee_id = ? and work_date between ? and ?";

const GET_CURRENT_WORKLOG_BY_MANAGER = "SELECT worklog_id FROM worklog WHERE employee_id = ? and CAST(work_date as date) = ? LIMIT 1";
const INSERT_WORKLOG = "INSERT INTO worklog (employee_id, work_status, work_date, work_total) VALUES (?, ?, ?, ?)";
const UPDATE_HOLIDAY_TIME_ADD = "UPDATE employee SET holiday_time = holiday_time + ? WHERE employee_id = ?";
const INSERT_NEW_WORKHISTORY = "INSERT INTO workhistory (employee_id, workhistory_status, workhistory_description, work_date) VALUES (?, ?, ?, ?)";

const ADD_WORKLOG_DES = 'Increase by manager: ';

async function getWorkHistory(req, res) {
    try {
        const empId = req.employee_id;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send("Get work history failed");
            return;
        }

        // startDate and endDate must be formated yyyy-mm-dd
        let { startDate, endDate } = req.query;

        if (startDate) {
            if (!endDate) {
                logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] startDate exist but endDate not exist, set endDate = current date`);
                endDate = new Date();
            } else {
                endDate = new Date(endDate);
            }
            startDate = new Date(startDate);
        } else {
            if (!endDate) {
                logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] startDate and endDate not exist - get workhistory in current month`);
                endDate = new Date();
            } else {
                logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] startDate bot exist but endDate exist - get workhistory in endDate's month`)
                endDate = new Date(endDate);
            }
            startDate = new Date(endDate);
            startDate.setDate(1);
        }
        endDate.setHours(23, 59, 59); // end time of endDate
        startDate.setHours(0, 0, 0); // start time of startDate

        const listWorkHistories = await exeQuery(GET_WORK_HISTORY, [empId, startDate, endDate]);
        res.status(200).send(listWorkHistories);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
    }
}

async function getWorkLogByUser(req, res) {
    try {
        const empId = req.employee_id;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id is not exist`);
            res.status(403).send("Get Failed");
            return;
        }

        const today = moment().format('YYYY-MM-DD');
        const curWorkLogList = await exeQuery(GET_WORKLOG_OF_USER, [empId, today]);
        let response = {};
        if (curWorkLogList.length) {
            logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] exist worklog in database`);
            response = curWorkLogList[0];
        }

        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response success`);
        res.status(200).send(response);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
    }
}

async function getWorkLogOfUserByManager(req, res) {
    try {
        const empId = req.employee_id;
        const role = req.role;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send("Get failed");
            return;
        }

        if (role != ROLE.employer) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not a manager`);
            res.status(403).send("Get failed");
            return;
        }

        let { startDate, endDate, employeeId } = req.query;
        if (!employeeId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employeeId is required`);
            res.status(403).send("Get failed");
            return;
        }

        if (startDate) {
            if (!endDate) {
                logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] startDate exist but endDate not exist, set endDate = current date`);
                endDate = new Date();
            } else {
                endDate = new Date(endDate);
            }
            startDate = new Date(startDate);
        } else {
            if (!endDate) {
                logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] startDate and endDate not exist - get workhistory in current month`);
                endDate = new Date();
            } else {
                logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] startDate bot exist but endDate exist - get workhistory in endDate's month`)
                endDate = new Date(endDate);
            }
            startDate = new Date(endDate);
            startDate.setDate(1);
        }

        if (startDate > endDate) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] startDate can't greater endDate`);
            res.status(403).send("Get failed");
            return;
        }
        const response = await exeQuery(GET_WORK_LOG_OF_USER_BY_MANAGER, [employeeId, getDateString(startDate), getDateString(endDate)])
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response success`);
        res.status(200).send(response);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
    }
}

async function addNewWorklogByManager(req, res) {
    const connection = await getConnection();
    await beginTransaction(connection);
    try {
        const empId = req.employee_id;
        const role = req.role;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send("Add failed");
            await rollback(connection);
            releaseConnection(connection);
            return;
        }

        if (role != ROLE.employer) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not a manager`);
            res.status(403).send("Add failed");
            await rollback(connection);
            releaseConnection(connection);
            return;
        }

        const validateSchema = {
            employeeId: {
                type: 'string',
                required: true
            },
            workDate: {
                type: 'datetime',
                required: true
            },
            description: {
                type: 'string',
                required: true
            },
            workTotal: { // mins
                type: 'number',
                required: true,
            }
        }

        const validResult = validateRequest(req.body, validateSchema);
        if (validResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            await rollback(connection);
            releaseConnection(connection);
            res.status(403).send(validResult);
            return;
        }

        const { employeeId, workDate, description, workTotal } = req.body;

        const currWorklog = await queryTransaction(connection, GET_CURRENT_WORKLOG_BY_MANAGER, [employeeId, workDate]);
        if (currWorklog.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] worklog is exist, can't add new worklog`);
            await rollback(connection);
            releaseConnection(connection);
            res.status(403).send(validResult);
            return;
        }

        const workDescription = `${ADD_WORKLOG_DES} ${description}, duration: ${workTotal} mins `;
        await queryTransaction(connection, INSERT_WORKLOG, [employeeId, WORKLOG_STATUS.checkout, workDate, workTotal]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] add new worklog success`);

        await queryTransaction(connection, INSERT_NEW_WORKHISTORY, [employeeId, WORKHISTORY_STATUS.byAdmin, workDescription, workDate]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] add new workhistory success`);

        await queryTransaction(connection, UPDATE_HOLIDAY_TIME_ADD, [workTotal / (8 * 60),employeeId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] update holiday time success - add ${workTotal / (8 * 60)}`);

        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response success`);
        res.status(200).send("Add success");
        await commitTransaction(connection);
        releaseConnection(connection);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
        await rollback(connection);
        releaseConnection(connection);
    }
}

module.exports = {
    getWorkHistory,
    getWorkLogByUser,
    getWorkLogOfUserByManager,
    addNewWorklogByManager,
}