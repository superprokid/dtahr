const { exeQuery } = require('../../common/dbaccess');
const logger = require('../../common/logger');
const LOG_CATEGORY = "WorkLogController"

const GET_WORK_HISTORY = "SELECT * FROM workhistory WHERE employee_id = ? and work_date between ? and ?"

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

module.exports = {
    getWorkHistory,
}