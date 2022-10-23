const dbaccess = require('../../common/dbaccess');
const logger = require('../../common/logger');
const { validateRequest } = require('../../common/utils');

const LOG_CATEGORY = "DailyReportController";
const GET_DAILYREPORT_BY_USER = "SELECT *, p.project_name FROM dailyreport dr INNER JOIN project p ON dr.project_id = p.project_id WHERE employee_id = ? ORDER BY dailyreport_date DESC"
const GET_DAILYREPORT_SEND_TO_USER = "  SELECT DISTINCT dr.*, CONCAT(e.first_name, ' ', e.last_name) as sender, p.project_name "
    + "                                 FROM dailyreport dr INNER JOIN reportreceiver rr ON dr.dailyreport_id = rr.dailyreport_id "
    + "                                                     INNER JOIN employee e ON dr.employee_id = e.employee_id "
    + "                                                     INNER JOIN project p ON p.project_id = dr.project_id "
    + "                                 WHERE rr.employee_id = ? and e.is_deleted <> 1"
    + "                                 ORDER BY dailyreport_date DESC "
const GET_DAILYREPORT_DETAILS_BY_ID = "SELECT dr.*, p.project_name, rr.employee_id as receiver_id"
    + "                                 FROM dailyreport dr "
    + "                                 	INNER JOIN project p ON dr.project_id = p.project_id"
    + "                                 	INNER JOIN reportreceiver rr ON dr.dailyreport_id = rr.dailyreport_id"
    + "                                 WHERE dr.dailyreport_id = ? and dr.employee_id = ?"
const INSERT_NEW_DAILYREPORT = "INSERT INTO dailyreport (employee_id, project_id, tasks, problems, next_day_plan, process_status, dailyreport_date) VALUES (?, ?, ?, ?, ?, ?, ?)";
const INSERT_REPORT_RECEIVER = "INSERT INTO reportreceiver (dailyreport_id, employee_id) VALUES ";
const DELETE_MY_REPORT = "DELETE FROM dailyreport WHERE dailyreport_id = ? and employee_id = ?";
const DELETE_MY_REPORT_RECEIVER = "DELETE FROM reportreceiver WHERE dailyreport_id = ?";
const EDIT_MY_REPORT = "UPDATE dailyreport set project_id = ?, tasks = ?, problems = ?, next_day_plan = ?, process_status = ? where dailyreport_id = ? and employee_id = ?"

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

async function getDetailsDailyReportById(req, res) {
    try {
        const empId = req.employee_id;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send("Get daily report of user failed");
            return;
        }
        const { dailyReportId } = req.query;
        if (!dailyReportId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] dailyReportId is required`);
            res.status(403).send("Get daily report of user failed");
            return;
        }
        const result = await dbaccess.exeQuery(GET_DAILYREPORT_DETAILS_BY_ID, [dailyReportId, empId]);
        let response = {}
        if (result.length > 0) {
            response = {...result[0]};
            response.receivers = []
            for (let i = 0 ; i< result.length; i++) {
                response.receivers.push(result[i].receiver_id);
            }
            delete response.receiver_id
        }
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response success`)
        res.status(200).send(response);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
    }
}

async function deleteMyReport(req, res) {
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
            dailyReportId: {
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

        const { dailyReportId } = req.body;
        const deleteReportResult = await dbaccess.queryTransaction(connection, DELETE_MY_REPORT, [dailyReportId, empId]);
        if (deleteReportResult.affectedRows) {
            logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] Delete ${deleteReportResult.affectedRows} records, start delete dailyreport receiver`)
            await dbaccess.queryTransaction(connection, DELETE_MY_REPORT_RECEIVER, [dailyReportId]);
        }
        await dbaccess.commitTransaction(connection);
        dbaccess.releaseConnection(connection);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] Delete daily report success, ${deleteReportResult.affectedRows} affected rows`)
        res.status(200).send("Delete success");
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
        await dbaccess.rollback(connection);
        dbaccess.releaseConnection(connection);
    }
}
async function editMyDailyReport(req, res) {
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
            dailyreportId: {
                type: 'number',
                required: true
            },
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

        const { dailyreportId, projectId, tasks, problems, nextDayPlan, processStatus, receivers } = req.body;
        const updateStatus = await dbaccess.queryTransaction(connection, EDIT_MY_REPORT, [projectId, tasks, problems, nextDayPlan, processStatus, dailyreportId, empId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] insert into dailyreport success, affcetedRows = ${updateStatus.affectedRows}`);

        if(updateStatus.affectedRows) {
            // Delete old receiver;
            
            logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] Start delete dailyreport receiver`)
            await dbaccess.queryTransaction(connection, DELETE_MY_REPORT_RECEIVER, [dailyreportId]);

            logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] Add new dailyReport receiver`)
            const insertParams = receivers.map(item => `(${dailyreportId}, '${item}')`);
            const insertQuery = INSERT_REPORT_RECEIVER + insertParams.join(", ");
            await dbaccess.queryTransaction(connection, insertQuery);
            logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] insert into reportreceiver success`);
        }

        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`);
        res.status(200).send("Edit success");
        await dbaccess.commitTransaction(connection);
        dbaccess.releaseConnection(connection);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
        await dbaccess.rollback(connection);
        dbaccess.releaseConnection(connection);
    }
}

module.exports = {
    createDailyReport,
    getDailyrepotByUser,
    getDailyreportToUser,
    deleteMyReport,
    getDetailsDailyReportById,
    editMyDailyReport,
}