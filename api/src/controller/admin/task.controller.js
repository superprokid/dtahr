const { exeQuery, getConnection, beginTransaction, rollback, releaseConnection, queryTransaction, commitTransaction } = require('../../common/dbaccess');
const logger = require('../../common/logger');
const fs = require('fs');
const dbaccess = require('../../common/dbaccess');

const LOG_CATEGORY = "[Task Controller]"
const GET_ALL_TASK = "  SELECT t.*, CONCAT(first_name, ' ', last_name) as assignee, avt, category_name, category_color "
    + "                 FROM task t INNER JOIN employee e on t.assignee_id = e.employee_id"
    + "                 	LEFT JOIN category c ON t.category_id = c.category_id"
    + "                 WHERE t.project_id = ?"
    + "                 ORDER BY t.update_at DESC";
const GET_ALL_CATEGORY = "SELECT * FROM category";

async function getAllTask(req, res) {
    try {
        const { projectId } = req.query;
        if (!projectId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] projectId is required`);
            res.status(200).send([]);
            return;
        }
        const listTask = await dbaccess.exeQuery(GET_ALL_TASK, [projectId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`);
        res.status(200).send(listTask);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function getAllCategory(req, res) {
    try {
        const listCategory = await dbaccess.exeQuery(GET_ALL_CATEGORY);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`);
        res.status(200).send(listCategory);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"});
    }
}

module.exports = {
    getAllTask,
    getAllCategory,
}