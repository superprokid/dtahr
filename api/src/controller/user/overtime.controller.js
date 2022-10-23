const logger = require('../../common/logger');
const moment = require('moment');
const { validateRequest, getStartOfDate, minDiff } = require('../../common/utils');
const { exeQuery, queryTransaction, getConnection, beginTransaction, commitTransaction, releaseConnection, rollback } = require('../../common/dbaccess');
const { OT_PAYMENT_DEFAULT, OT_TICKET_STATUS, VALID_HOUR, ROLE } = require('../../config/constants');

const LOG_CATEGORY = "OverTimeController"
const GET_OT_PAYMENT = "SELECT * FROM overtimepayment ORDER BY update_at DESC";
const GET_HOLYDAY = "SELECT * FROM holiday WHERE date between ? and ?";
const GET_CURRENT_SALARY = "SELECT salary FROM employee WHERE employee_id = ?"
const GET_CURRENT_PROJECT = "SELECT project_id FROM project WHERE project_id = ? LIMIT 1";
const INSERT_OVERTIME = "INSERT INTO overtime (employee_id, project_id, start_date, end_date, reason, `status`, payment) VALUES (?, ?, ?, ?, ?, ?, ?)"
const GET_OT_BY_ID_AND_USER = "SELECT * FROM `overtime` WHERE overtime_id = ? and employee_id = ?";
const GET_LIST_OVERTIME_TICKET_OF_USER = "  SELECT ot.*, p.project_name "
    + "                                     FROM overtime ot INNER JOIN project p on ot.project_id = p.project_id"
    + "                                     where employee_id = ?";
const GET_LIST_OVERTIME_TICKET_OF_GROUP = "  SELECT ot.*, CONCAT(e.first_name, ' ', e.last_name) as name, p.project_name "
    + "                                     FROM overtime ot INNER JOIN project p on ot.project_id = p.project_id"
    + "                                         INNER JOIN employee e on e.employee_id = ot.employee_id"
    + "                                     WHERE group_id = ? and e.is_deleted <> 1";
const UPDATE_OVERTIME_STATUS = " UPDATE overtime SET status = ? where overtime_id = ?";
const DELETE_OT_TICKET = "DELETE FROM overtime WHERE overtime_id = ? "

const OT_PAYMENT_DAILY_DATE_KEY = 'ot_payment_daily_day';
const OT_PAYMENT_DAILY_NIGHT_KEY = 'ot_payment_daily_night';
const OT_PAYMENT_WEEKEND_KEY = 'ot_payment_weekend';
const OT_PAYMENT_HOLYDAY_KEY = 'ot_payment_holiday';

async function registerOverTime(req, res) {
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
            projectId: {
                type: 'string',
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
            await rollback(connection);
            releaseConnection(connection);
            res.status(403).send(validResult);
            return;
        }

        let { projectId, startDate, endDate, reason } = req.body;
        startDate = new Date(startDate);
        endDate = new Date(endDate);

        const currentProject = await queryTransaction(connection, GET_CURRENT_PROJECT, [projectId]);
        if (!currentProject.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] project not exist`);
            await rollback(connection);
            releaseConnection(connection);
            res.status(403).send(validResult);
            return;
        }

        // check startDate and endDate
        if (startDate >= endDate) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] startDate can not greater than or equal endDate`);
            await rollback(connection);
            releaseConnection(connection);
            res.status(403).send(validResult);
            return;
        }

        let payment = 1;
        const listSalary = await queryTransaction(connection, GET_CURRENT_SALARY, [empId]);
        if (listSalary.length) {
            payment = listSalary[0].salary;
        }
        // count payment
        const paymentNum = await getPaymentCoefficient(connection, startDate, endDate);
        payment = payment * paymentNum;
        const minCount = minDiff(startDate.getTime(), endDate.getTime());
        payment = payment * (minCount / 60) // payment for this time (hour)

        await queryTransaction(connection, INSERT_OVERTIME, [empId, projectId, startDate, endDate, reason, OT_TICKET_STATUS.pending, payment]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] insert into overtime`);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`);
        res.status(200).send("Create success");
        await commitTransaction(connection);
        releaseConnection(connection);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
        await rollback(connection);
        releaseConnection(connection);
    }
}

async function getPaymentCoefficient(connection, startDate, endDate) {
    const listHoliday = await queryTransaction(connection, GET_HOLYDAY, [getStartOfDate(startDate), getStartOfDate(endDate)]);
    const listPayment = await queryTransaction(connection, GET_OT_PAYMENT, [OT_PAYMENT_DAILY_DATE_KEY, OT_PAYMENT_DAILY_NIGHT_KEY, OT_PAYMENT_HOLYDAY_KEY, OT_PAYMENT_WEEKEND_KEY]);

    let paymentType = OT_PAYMENT_DAILY_DATE_KEY;
    if (listHoliday.length) { // in holiday OT
        paymentType = OT_PAYMENT_HOLYDAY_KEY;
    } else if (startDate.getHours() >= 0 && startDate.getHours() < VALID_HOUR) { // in night OT
        paymentType = OT_PAYMENT_DAILY_NIGHT_KEY;
    } else if (startDate.getDay() === 0 || startDate.getDay() === 6) {// in saturday or sunday
        paymentType = OT_PAYMENT_WEEKEND_KEY;
    }

    let paymentNum = OT_PAYMENT_DEFAULT[paymentType];
    if (listPayment.length) {
        paymentNum = listPayment[0][paymentType];
    }
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] calculate paymentType: ${paymentType}, paymentNum: ${paymentNum}`);
    return paymentNum;
}

async function getListOverTimeTicketOfUser(req, res) {
    try {
        const empId = req.employee_id;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send("Get your overtime ticket failed");
            return;
        }

        const listOT = await exeQuery(GET_LIST_OVERTIME_TICKET_OF_USER, [empId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response - length: ${listOT.length}`);
        res.status(200).send(listOT);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
    }
}

async function getListOverTimeTicketOfGroup(req, res) {
    try {
        const empId = req.employee_id;
        const groupId = req.group_id;
        if (!empId || !groupId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id or group_id is not exist`);
            res.status(403).send("Get group's overtime ticket failed");
            return;
        }
        const listOT = await exeQuery(GET_LIST_OVERTIME_TICKET_OF_GROUP, [groupId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response - length: ${listOT.length}`);
        res.status(200).send(listOT);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
    }
}

async function updateStatusOvertimeTicket(req, res) {
    const connection = await getConnection();
    await beginTransaction(connection);
    try {
        const empId = req.employee_id;
        const role = req.role;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send("Update overtime ticket failed");
            await rollback(connection);
            releaseConnection(connection)
            return;
        }

        if (role != ROLE.employer) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not a manager`);
            res.status(403).send("Update overtime ticket failed");
            await rollback(connection);
            releaseConnection(connection)
            return;
        }

        const validateSchema = {
            overtimeId: {
                type: 'number',
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
        const { overtimeId, status } = req.body;
        await queryTransaction(connection, UPDATE_OVERTIME_STATUS, [status, overtimeId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] update overtime ticket status success`);
        await commitTransaction(connection);
        releaseConnection(connection);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`);
        return res.status(200).send('Update overtime ticket success');
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
        await rollback(connection);
        releaseConnection(connection);
    }
}

async function deleteOvertimeTicket(req, res) {
    const connection = await getConnection();
    await beginTransaction(connection);
    try {
        const empId = req.employee_id;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send("Delete overtime ticket failed");
            await rollback(connection);
            releaseConnection(connection)
            return;
        }

        const validateSchema = {
            overtimeId: {
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
        const { overtimeId } = req.body;
        const overtimeTicket = await queryTransaction(connection, GET_OT_BY_ID_AND_USER, [overtimeId, empId]);
        if (!overtimeTicket.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] overtime ticket not exist`);
            await rollback(connection);
            releaseConnection(connection);
            res.status(403).send("Delete overtime ticket failed");
            return;
        }

        if (overtimeTicket[0].status !== OT_TICKET_STATUS.pending) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] overtime ticket is approved or reject, can't delete`);
            await rollback(connection);
            releaseConnection(connection);
            res.status(403).send("Delete overtime ticket failed");
            return;
        }

        await queryTransaction(connection, DELETE_OT_TICKET, [overtimeId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] delete overtime ticket success`);
        await commitTransaction(connection);
        releaseConnection(connection);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`);
        return res.status(200).send('Delete overtime ticket success');
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
        await rollback(connection);
        releaseConnection(connection);
    }
}

module.exports = {
    registerOverTime,
    getListOverTimeTicketOfUser,
    getListOverTimeTicketOfGroup,
    updateStatusOvertimeTicket,
    deleteOvertimeTicket,
}