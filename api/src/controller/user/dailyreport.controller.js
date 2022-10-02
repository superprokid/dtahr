const dbaccess = require('../../common/dbaccess');
const logger = require('../../common/logger');
const { validateRequest } = require('../../common/utils');

const LOG_CATEGORY = "DailyReportController";
const GET_DAILYREPORT_BY_USER = "SELECT * FROM dailyreport WHERE employee_id = ?"
const GET_DAILYREPORT_SEND_TO_USER = "  SELECT DISTINCT dr.*, CONCAT(e.first_name, ' ', e.last_name) as sender, p.project_name "
    + "                                 FROM dailyreport dr INNER JOIN reportreceiver rr ON dr.dailyreport_id = rr.dailyreport_id "
    + "                                                     INNER JOIN employee e ON dr.employee_id = e.employee_id "
    + "                                                     INNER JOIN project p ON p.project_id = dr.project_id "
    + "                                 WHERE rr.employee_id = ? "
const INSERT_NEW_DAILYREPORT = "INSERT INTO dailyreport (employee_id, project_id, tasks, problems, next_day_plan, process_status, dailyreport_date) VALUES (?, ?, ?, ?, ?, ?, ?)";
const INSERT_REPORT_RECEIVER = "INSERT INTO reportreceiver (dailyreport_id, employee_id) VALUES ";

async function createDailyReport(req, res) {
    const connection = await dbaccess.getConnection();
    await dbaccess.beginTransaction(connection);
    try {
        const empId = req.employee_id;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send("Create daily report failed");
            await dbaccess.commitTransaction(connection);
            dbaccess.releaseConnection(connection);
            return;
        }

        const validateSchema = {
            projectId: {
                type: 'string',
                required: true
            },
            tasks: {
                type: 'string',
                required: true
            },
            problems: {
                type: 'string',
                required: true
            },
            nextDayPlan: {
                type: 'string',
                required: true
            },
            processStatus: {
                type: 'string',
                required: true,
            },
            dailyReportDate: {
                type: 'datetime',
                required: true,
            },
            receivers: {
                type: 'array',
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

        const { projectId, tasks, problems, nextDayPlan, processStatus, dailyReportDate, receivers } = req.body;
        const insertResult = await dbaccess.queryTransaction(connection, INSERT_NEW_DAILYREPORT, [empId, projectId, tasks, problems, nextDayPlan, processStatus, dailyReportDate]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] insert into dailyreport success`);

        const reportId = insertResult.insertId;
        const insertParams = receivers.map(item => `(${reportId}, '${item}')`);
        const insertQuery = INSERT_REPORT_RECEIVER + insertParams.join(", ");
        await dbaccess.queryTransaction(connection, insertQuery);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] insert into reportreceiver success`);

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

async function getDailyrepotByUser(req, res) {
    try {
        const empId = req.employee_id;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send("Get daily report failed");
            return;
        }
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`)
        res.status(200).send(await dbaccess.exeQuery(GET_DAILYREPORT_BY_USER, [empId]));
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
    }
}

async function getDailyreportToUser(req, res) {
    try {
        const empId = req.employee_id;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send("Get daily report of user failed");
            return;
        }
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`)
        res.status(200).send(await dbaccess.exeQuery(GET_DAILYREPORT_SEND_TO_USER, [empId]));
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
    }
}

module.exports = {
    createDailyReport,
    getDailyrepotByUser,
    getDailyreportToUser,
}