const logger = require('../../common/logger');
const moment = require('moment');
const { validateRequest, getStartOfDate, minDiff, isValidDate, getDateString } = require('../../common/utils');
const { exeQuery, queryTransaction, getConnection, beginTransaction, commitTransaction, releaseConnection, rollback } = require('../../common/dbaccess');
const { OT_PAYMENT_DEFAULT, OT_TICKET_STATUS, VALID_HOUR, ROLE, WFH_TICKET_STATUS } = require('../../config/constants');

const LOG_CATEGORY = "WorkFromHomeController";
const GET_WFH_TICKET_BY_ID = "SELECT * FROM `workfromhome` WHERE employee_id = ? and wfh_date = ?";
const GET_LIST_WFH_TICKET_OF_USER = "SELECT wfh_title, wfh_description, CONCAT(CAST(wfh_date as DATE)) as wfh_date, CONCAT(CAST(wfh_date as DATE), ' ', wfh_start_time) as start_date, CONCAT(CAST(wfh_date as DATE), ' ', wfh_end_time) as end_date, status FROM workfromhome WHERE employee_id = ? ORDER BY wfh_date DESC";
const GET_LIST_WFH_TICKET_OF_GROUP = "  SELECT wfh.*, CONCAT(e.first_name, ' ', e.last_name) as name"
    + "                                     FROM workfromhome wfh "
    + "                                         INNER JOIN employee e on e.employee_id = wfh.employee_id"
    + "                                     WHERE group_id = ? and e.is_deleted <> 1 ORDER BY create_at DESC, wfh_date DESC";
const UPDATE_WFH_STATUS = " UPDATE workfromhome SET status = ? where status = 0 and employee_id = ? and wfh_date = ? ";
const DELETE_WFH_TICKET = "DELETE FROM `workfromhome` WHERE employee_id = ? and wfh_date = ? "


const INSERT_NEW_WFH_TICKET = "INSERT INTO workfromhome (employee_id, wfh_date, wfh_title, wfh_description, wfh_start_time, wfh_end_time, status) VALUES (?, ?, ?, ?, ?, ?, ?) "
+ "                                 ON DUPLICATE KEY UPDATE `wfh_title`=VALUES(`wfh_title`), `wfh_description`=VALUES(`wfh_description`), `wfh_start_time`=VALUES(`wfh_start_time`), `wfh_end_time`=VALUES(`wfh_end_time`), `status`=VALUES(`status`)"

async function registerWFHTicket(req, res) {
    const connection = await getConnection();
    await beginTransaction(connection);
    try {
        const empId = req.employee_id;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send("Register overtime ticket failed");
            await commitTransaction(connection);
            releaseConnection(connection);
            return;
        }

        const validateSchema = {
            title: {
                type: 'string',
                required: true
            },
            description: {
                type: 'string',
                required: false
            },
            date: {
                type: 'array',
                required: true
            },
            startTime: {
                type: 'time',
                required: true
            },
            endTime: {
                type: 'time',
                required: true
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

        let { title, description, date, startTime, endTime } = req.body;

        // check startDate and endDate
        if (moment('2000-10-10 '+ startTime).isSameOrAfter(moment('2000-10-10 ' + endTime), 'minute')) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] startTime can not greater than or equal endDate`);
            await rollback(connection);
            releaseConnection(connection);
            res.status(403).send("startTime can not greater than or equal endDate");
            return;
        }

        for (let i = 0; i < date.length; i++) {
            const insertDate = moment(date[i]).format('YYYY-MM-DD');
            if (!isValidDate(insertDate)) {
                logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] date not an array of dates`);
                await rollback(connection);
                releaseConnection(connection);
                res.status(403).send("date must be an array of days");
                return;
            }

            if (moment(getDateString()).isSameOrAfter(insertDate)) {
                logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] date can not before current date`);
                await rollback(connection);
                releaseConnection(connection);
                res.status(403).send("date can not before current date");
                return;
            }

            await queryTransaction(connection, INSERT_NEW_WFH_TICKET, [empId, insertDate, title, description, startTime, endTime, WFH_TICKET_STATUS.pending]);
            logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] insert new wfh ticket`);
        }

        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`);
        res.status(200).send("Create success");
        await commitTransaction(connection);
        releaseConnection(connection);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"});
        await rollback(connection);
        releaseConnection(connection);
    }
}

async function getListWFHTicketOfUser(req, res) {
    try {
        const empId = req.employee_id;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send("Get your WFH ticket failed");
            return;
        }

        const listOT = await exeQuery(GET_LIST_WFH_TICKET_OF_USER, [empId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response - length: ${listOT.length}`);
        res.status(200).send(listOT);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"});
    }
}

async function getListWFHByManager(req, res) {
    try {
        const empId = req.employee_id;
        const role = req.role;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id is not exist`);
            res.status(403).send("Get WFH ticket failed");
            return;
        }

        if (role != ROLE.employer) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not a manager`);
            res.status(403).send("GET work from home ticket failed");
            return;
        }

        const validateSchema = {
            employeeId: {
                type: 'string',
                required: true
            }
        }
        const validResult = validateRequest(req.query, validateSchema);
        if (validResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            res.status(403).send(validResult);
            return;
        }
        const { employeeId } = req.query;
        const listWFH = await exeQuery(GET_LIST_WFH_TICKET_OF_USER, [employeeId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response - length: ${listWFH.length}`);
        res.status(200).send(listWFH);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"});
    }
}

async function updateStatusWFHTicket(req, res) {
    const connection = await getConnection();
    await beginTransaction(connection);
    try {
        const empId = req.employee_id;
        const role = req.role;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send("Update work from home ticket failed");
            await rollback(connection);
            releaseConnection(connection)
            return;
        }

        if (role != ROLE.employer) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not a manager`);
            res.status(403).send("Update work from home ticket failed");
            await rollback(connection);
            releaseConnection(connection)
            return;
        }

        const validateSchema = {
            listWFHTickets: {
                type: 'array',
                required: true
            },
            status: {
                type: 'number',
                required: true
            },
        }
        const validResult = validateRequest(req.body, validateSchema);
        if (validResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            await rollback(connection);
            releaseConnection(connection);
            res.status(403).send(validResult);
            return;
        }
        const { listWFHTickets, status } = req.body;

        for (let i = 0; i< listWFHTickets.length; i++) {
            const wfhTicket = listWFHTickets[i];
            const { employee_id, wfh_date } = wfhTicket;
            await queryTransaction(connection, UPDATE_WFH_STATUS, [status, employee_id, wfh_date]);
        }
        
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] update work from home ticket status success`);
        await commitTransaction(connection);
        releaseConnection(connection);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`);
        return res.status(200).send('Update work from home ticket success');
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"});
        await rollback(connection);
        releaseConnection(connection);
    }
}

async function getListWFHOfGroup(req, res) {
    try {
        const empId = req.employee_id;
        const role = req.role;
        const groupId = req.group_id;
        if (!empId || !groupId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id or group_id is not exist`);
            res.status(403).send("Get group's WFH ticket failed");
            return;
        }

        if (role != ROLE.employer) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not a manager`);
            res.status(403).send("GET work from home ticket failed");
            return;
        }

        const listWFH = await exeQuery(GET_LIST_WFH_TICKET_OF_GROUP, [groupId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response - length: ${listWFH.length}`);
        res.status(200).send(listWFH);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"});
    }
}

async function deleteWFHTicket(req, res) {
    const connection = await getConnection();
    await beginTransaction(connection);
    try {
        const empId = req.employee_id;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send("Delete wfh ticket failed");
            await rollback(connection);
            releaseConnection(connection)
            return;
        }

        const validateSchema = {
            date: {
                type: 'datetime',
                require: true
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
        const { date } = req.body;
        const wfhTicket = await queryTransaction(connection, GET_WFH_TICKET_BY_ID, [empId, getDateString(date)]);
        if (!wfhTicket.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] work from home ticket not exist`);
            await rollback(connection);
            releaseConnection(connection);
            res.status(403).send("Delete work from home ticket failed");
            return;
        }

        if (wfhTicket[0].status !== WFH_TICKET_STATUS.pending) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] work from home ticket is approved or reject, can't delete`);
            await rollback(connection);
            releaseConnection(connection);
            res.status(403).send("Delete work from home ticket failed");
            return;
        }

        await queryTransaction(connection, DELETE_WFH_TICKET, [empId, date]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] delete work from home ticket success`);
        await commitTransaction(connection);
        releaseConnection(connection);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`);
        return res.status(200).send('Delete work from home ticket success');
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"});
        await rollback(connection);
        releaseConnection(connection);
    }
}

module.exports = {
    registerWFHTicket,
    deleteWFHTicket,
    updateStatusWFHTicket,
    getListWFHTicketOfUser,
    getListWFHByManager,
    getListWFHOfGroup,
}