const logger = require('../../common/logger');
const dbaccess = require('../../common/dbaccess');
const moment = require('moment');
const { validateRequest } = require('../../common/utils');
const { WORKTIME_DEFAULT } = require('../../config/constants');

const LOG_CATEGORY = "ADMIN WORKTIME CONTROLLER"
const INSERT_NEW_WORK_TIME = "INSERT worktime (min_start, hour_start, min_end, hour_end, lunch_min_start, lunch_hour_start, lunch_min_end, lunch_hour_end, approve_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
const DELETE_WORK_TIME = "DELETE FROM worktime WHERE worktime_id = ?";
const UPDATE_WORK_TIME = "UPDATE worktime SET min_start = ?, hour_start = ?, min_end = ?, hour_end = ?, lunch_min_start = ?, lunch_hour_start = ?, lunch_min_end = ?, lunch_hour_end = ?, approve_date = ? WHERE worktime_id = ?"
const GET_WORK_TIME_BY_ID = "SELECT * FROM worktime WHERE worktime_id = ?";
const GET_ALL_WORK_TIME = "SELECT * FROM worktime ORDER BY approve_date DESC";
const GET_CURRENT_WORKTIME = "SELECT * FROM worktime WHERE approve_date <= now() ORDER BY approve_date DESC LIMIT 1";
const GET_UPCOMING_HOLIDAY = "SELECT * FROM holiday WHERE date >= now() ORDER BY date ASC LIMIT 3";

async function addNewWorktime(req, res) {
    const connection = await dbaccess.getConnection();
    dbaccess.beginTransaction(connection);
    try {
        const validateSchema = {
            minStart: {
                type: 'number',
                required: true
            },
            hourStart: {
                type: 'number',
                required: true
            },
            minEnd: {
                type: 'number',
                required: true
            },
            hourEnd: {
                type: 'number',
                required: true
            },
            lunchMinStart: {
                type: 'number',
                required: true
            },
            lunchHourStart: {
                type: 'number',
                required: true
            },            
            lunchMinEnd: {
                type: 'number',
                required: true
            },
            lunchHourEnd: {
                type: 'number',
                required: true
            },
            approveDate: {
                type: 'datetime',
                required: true
            }
        }

        const validResult = validateRequest(req.body, validateSchema);
        if (validResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(403).send(validResult);
            return;
        }
        const { minStart, hourStart, minEnd, hourEnd, lunchMinStart, lunchHourStart, lunchMinEnd, lunchHourEnd, approveDate } = req.body;

        if (moment().isSameOrAfter(moment(approveDate), 'date')) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] approveDate must be future date`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(403).send('Create failed');
            return;
        }

        await dbaccess.queryTransaction(connection, INSERT_NEW_WORK_TIME, [minStart, hourStart, minEnd, hourEnd, lunchMinStart, lunchHourStart, lunchMinEnd, lunchHourEnd, approveDate]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] create success`);
        res.status(200).send('Create success');
    } catch (error) {
        await dbaccess.rollback(connection);
        dbaccess.releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"});
    }
    
    await dbaccess.commitTransaction(connection);
    dbaccess.releaseConnection(connection);
}

async function updateWorkTime(req, res) {
    const connection = await dbaccess.getConnection();
    dbaccess.beginTransaction(connection);
    try {
        const validateSchema = {
            workTimeId: {
                type: 'number',
                required: true,
            },
            minStart: {
                type: 'number',
                required: true
            },
            hourStart: {
                type: 'number',
                required: true
            },
            minEnd: {
                type: 'number',
                required: true
            },
            hourEnd: {
                type: 'number',
                required: true
            },
            lunchMinStart: {
                type: 'number',
                required: true
            },
            lunchHourStart: {
                type: 'number',
                required: true
            },            
            lunchMinEnd: {
                type: 'number',
                required: true
            },
            lunchHourEnd: {
                type: 'number',
                required: true
            },
            approveDate: {
                type: 'datetime',
                required: true
            }
        }

        const validResult = validateRequest(req.body, validateSchema);
        if (validResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(403).send(validResult);
            return;
        }
        const { workTimeId, minStart, hourStart, minEnd, hourEnd, lunchMinStart, lunchHourStart, lunchMinEnd, lunchHourEnd, approveDate } = req.body;

        const targetWorkTime = await dbaccess.queryTransaction(connection, GET_WORK_TIME_BY_ID, [workTimeId]);
        if (!targetWorkTime.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] workTimeId not exist in database`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(403).send(validResult);
            return;
        }

        const targetApproveDate = targetWorkTime[0].approve_date;
        if (moment().isSameOrAfter(moment(targetApproveDate), 'date')) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] can't update work time before current date`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(403).send('Update failed');
            return;
        }

        if (moment().isSameOrAfter(moment(approveDate), 'date')) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] approveDate must be future date`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(403).send(validResult);
            return;
        }

        await dbaccess.queryTransaction(connection, UPDATE_WORK_TIME, [minStart, hourStart, minEnd, hourEnd, lunchMinStart, lunchHourStart, lunchMinEnd, lunchHourEnd, approveDate, workTimeId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] update success`);
        res.status(200).send('Update success');
    } catch (error) {
        await dbaccess.rollback(connection);
        dbaccess.releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"});
    }
    await dbaccess.commitTransaction(connection);
    dbaccess.releaseConnection(connection);
}

async function deleteWorkTime(req, res) {
    const connection = await dbaccess.getConnection();
    dbaccess.beginTransaction(connection);
    try {
        const validateSchema = {
            workTimeId: {
                type: 'number',
                required: true,
            }
        }

        const validResult = validateRequest(req.body, validateSchema);
        if (validResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(403).send(validResult);
            return;
        }
        const { workTimeId} = req.body;

        const targetWorkTime = await dbaccess.queryTransaction(connection, GET_WORK_TIME_BY_ID, [workTimeId]);
        if (!targetWorkTime.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] workTimeId not exist in database`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(403).send(validResult);
            return;
        }

        const targetApproveDate = targetWorkTime[0].approve_date;
        if (moment().isSameOrAfter(moment(targetApproveDate), 'date')) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] can't delete work time before current date`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(403).send('Delete failed');
            return;
        }

        await dbaccess.queryTransaction(connection, DELETE_WORK_TIME, [workTimeId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] delete success`);
        res.status(200).send('Delete success');
    } catch (error) {
        await dbaccess.rollback(connection);
        dbaccess.releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"});
    }
    await dbaccess.commitTransaction(connection);
    dbaccess.releaseConnection(connection);
}

async function getAllWorkTime(req, res) {
    try {
        const result = await dbaccess.exeQuery(GET_ALL_WORK_TIME);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] get success`);
        res.status(200).send(result)
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"});
    }
}

async function getCurrentWorkingTimeAndHoliday(req, res) {
    try {
        const result = {
            workingTime: WORKTIME_DEFAULT,
            holiday: [],
        }
        const workingTimeResult = await dbaccess.exeQuery(GET_CURRENT_WORKTIME);
        if (workingTimeResult.length) {
            result.workingTime = workingTimeResult[0];
        }
        const upcomingHoliday = await dbaccess.exeQuery(GET_UPCOMING_HOLIDAY);
        if (upcomingHoliday.length) {
            result.holiday = upcomingHoliday;
        }
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] - response`);
        res.status(200).send(result);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" })
    }
}

module.exports = {
    addNewWorktime,
    updateWorkTime,
    deleteWorkTime,
    getAllWorkTime,
    getCurrentWorkingTimeAndHoliday
}