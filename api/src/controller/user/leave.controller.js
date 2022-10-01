const dbaccess = require('../../common/dbaccess');
const logger = require('../../common/logger');
const { validateRequest } = require('../../common/utils');
const { LEAVE_TICKET_STATUS, ROLE } = require('../../config/constants');

const LOG_CATEGORY = "LeaveController";
const INSERT_LEAVE = "INSERT INTO `leave` (employee_id, type, start_date, end_date, reason, status) VALUES (?, ?, ?, ?, ?, ?)";
const GET_LEAVE_BY_USER = "SELECT * FROM `leave` WHERE employee_id = ?";
const GET_ALL_LEAVE_OF_GROUP = "SELECT l.* "
    + "                         FROM `leave` l INNER JOIN employee e ON l.employee_id = e.employee_id "
    + "                         WHERE e.group_id = ?";
const UPDATE_LEAVE_STATUS = "UPDATE `leave` SET status = ? WHERE leave_id = ?";

async function registerLeaveTicket(req, res) {
    const connection = await dbaccess.getConnection();
    await dbaccess.beginTransaction(connection);
    try {
        const empId = req.employee_id;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send("Get work history failed");
            await dbaccess.commitTransaction(connection);
            dbaccess.releaseConnection(connection);
            return;
        }

        const validateSchema = {
            type: {
                type: 'number',
                required: true
            },
            startDate: {
                type: 'datetime',
                required: true
            },
            endDate: {
                type: 'datetime',
                required: true
            },
            reason: {
                type: 'string',
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

        let { type, startDate, endDate, reason } = req.body;
        startDate = new Date(startDate);
        endDate = new Date(endDate);

        // check startDate and endDate
        if (startDate >= endDate) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] startDate can not greater than or equal endDate`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(403).send(validResult);
            return;
        }

        await dbaccess.queryTransaction(connection, INSERT_LEAVE, [empId, type, startDate, endDate, reason, LEAVE_TICKET_STATUS.pending]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] insert into leave`);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`);
        res.status(200).send("Create success");
        await dbaccess.commitTransaction(connection);
        dbaccess.releaseConnection(connection);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
        await dbaccess.rollback(connection);
        dbaccess.releaseConnection(connection);
    }
}

async function getLeaveTicketByUser(req, res) {
    try {
        const empId = req.employee_id;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send("Get get leave ticket failed");
            return;
        }
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`)
        res.status(200).send(await dbaccess.exeQuery(GET_LEAVE_BY_USER, [empId]));
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
    }
}

async function getAllLeaveTicket(req, res) {
    try {
        const empId = req.employee_id;
        const groupId = req.group_id;
        if (!empId || !groupId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id or group_id is not exist`);
            res.status(403).send("Get group's leave ticket failed");
            return;
        }
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`)
        res.status(200).send(await dbaccess.exeQuery(GET_ALL_LEAVE_OF_GROUP, [groupId]));
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
    }
}

async function updateStatusLeaveTicket(req, res) {
    const connection = await dbaccess.getConnection();
    await dbaccess.beginTransaction(connection);
    try {
        const empId = req.employee_id;
        const role = req.role;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send("Update leave ticket failed");
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection)
            return;
        }

        if (role != ROLE.employer) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not a manager`);
            res.status(403).send("Update leave ticket failed");
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection)
            return;
        }

        const validateSchema = {
            leaveId: {
                type: 'number',
                required: true
            },
        }
        const validResult = validateRequest(req.body, validateSchema);
        if (validResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(403).send(validResult);
            return;
        }
        const { leaveId } = req.body;
        await dbaccess.queryTransaction(connection, UPDATE_LEAVE_STATUS, [LEAVE_TICKET_STATUS.approve, leaveId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] update leave ticket status success`);
        await dbaccess.commitTransaction(connection);
        dbaccess.releaseConnection(connection);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`);
        return res.status(200).send('Update leave ticket success');
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
        await dbaccess.rollback(connection);
        dbaccess.releaseConnection(connection);
    }
}

module.exports = {
    registerLeaveTicket,
    getLeaveTicketByUser,
    getAllLeaveTicket,
    updateStatusLeaveTicket,
}