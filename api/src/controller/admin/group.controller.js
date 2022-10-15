const logger = require('../../common/logger');
const { exeQuery, getConnection, beginTransaction, queryTransaction, commitTransaction, releaseConnection, rollback } = require("../../common/dbaccess");

const LOG_CATEGORY = "AdminGroupController";
const GET_ALL_GROUP = "SELECT g.*, CONCAT(e.first_name, ' ', e.last_name) as manager_name"
    + "                 FROM `group` g "
    + "	                    INNER JOIN employee e ON g.manager_id = e.employee_id";
const GET_ALL_USER_BY_GROUP = "SELECT * FROM employee WHERE group_id = ?"

async function getAllGroup(req, res) {
    try {
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] - response`);
        res.status(200).send(await exeQuery(GET_ALL_GROUP));
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR")
    }
}

async function getAllEmployeeInGroup(req, res) {
    try {
        const { groupId } = req.query;
        if (!groupId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] groupId is required`);
            res.status(403).send("groupId is required");
        }

        const result = await exeQuery(GET_ALL_GROUP, [groupId]);
        const response = result.map((item) => {
            delete item.password;
            return item;
        })

        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] - response`);
        res.status(200).send(response);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR")
    }
}

module.exports = {
    getAllGroup,
    getAllEmployeeInGroup,
}