const { exeQuery } = require('../../common/dbaccess');
const logger = require('../../common/logger');
const { validateRequest } = require('../../common/utils');
const { ROLE } = require('../../config/constants');

const LOG_CATEGORY = "[Project Controller]"
const GET_CURRENT_PROJECT = "SELECT * FROM project";
const GET_PROJECT_DETAILS_BY_MANAGER = "SELECT a.employee_id, a.assigned_date, tb.*"
    + "                                 FROM assignment a "
    + "                                 	INNER JOIN (SELECT p.project_name, p.project_id, CONCAT(e.first_name, ' ', e.last_name) as project_manager_name, p.project_manager_id, p.client_id, p.project_manager_assigned_date, COUNT(a.employee_id) as number"
    + "	                    							FROM `project` p"
    + "		                								LEFT JOIN assignment a ON p.project_id = a.project_id"
    + "										                INNER JOIN employee e ON p.project_manager_id = e.employee_id"
    + "								                    WHERE p.project_id = ?) tb on tb.project_id = a.project_id"
    + "                                 WHERE a.employee_id = ?"

async function getDetailsPojectByManager(req, res) {
    try {
        const empId = req.employee_id;
        const role = req.role;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send("Update failed");
            await rollback(connection);
            releaseConnection(connection);
            return;
        }

        if (role != ROLE.employer) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not a manager`);
            res.status(403).send("Update failed");
            await rollback(connection);
            releaseConnection(connection);
            return;
        }

        const validateSchema = {
            employeeId: {
                type: 'string',
                required: true
            },
            projectId: {
                type: 'string',
                required: false
            }
        }

        const validResult = validateRequest(req.query, validateSchema);
        if (validResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            res.status(403).send(validResult);
            return;
        }

        const { employeeId, projectId } = req.query;
        const response = await exeQuery(GET_PROJECT_DETAILS_BY_MANAGER, [projectId, employeeId]);

        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] resonse `);
        res.status(200).send(response.length ? response[0] : {});
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
    }
}

async function getAllProjects(req, res) {
    try {
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] resonse `);
        res.status(200).send(await exeQuery(GET_CURRENT_PROJECT));
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");

    }
}

module.exports = {
    getAllProjects,
    getDetailsPojectByManager
}