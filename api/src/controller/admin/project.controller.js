const { exeQuery, getConnection, beginTransaction, rollback, releaseConnection, queryTransaction, commitTransaction } = require('../../common/dbaccess');
const logger = require('../../common/logger');
const { validateRequest, generateId } = require('../../common/utils');
const { ROLE, MAX_PROJECT_ID_LENGTH } = require('../../config/constants');

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

const CHECK_EXIST_EMPLOYEE_ID = "SELECT employee_id FROM employee where employee_id = ?";
const GET_NEWEST_PROJECT_ID = "SELECT project_id FROM `project` ORDER BY project_id DESC LIMIT 1";
const INSERT_NEW_PROJECT = "INSERT INTO project (project_id, project_name, client_id, project_manager_id, project_manager_assigned_date) VALUES (?, ?, ?, ?, ?)";
const INSERT_ASSIGNMENT = "INSERT INTO assignment (project_id, employee_id, assigned_date) VALUES (?, ?, ?) "
    + "                     ON DUPLICATE KEY UPDATE assigned_date=VALUES(assigned_date)"

async function getDetailsPojectByEmployee(req, res) {
    try {
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

async function createNewProject(req, res) {
    const connection = await getConnection();
    await beginTransaction(connection);
    try {
        const validateSchema = {
            projectName: {
                type: 'string',
                required: true,
            },
            client: {
                type: 'string',
                required: true,
            },
            projectManagerId: {
                type: 'string',
                required: true,
            },
            projectManagerStartDate: {
                type: 'datetime',
                required: true,
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

        const { projectName, client, projectManagerId, projectManagerStartDate } = req.body;

        const managerList = await queryTransaction(connection, CHECK_EXIST_EMPLOYEE_ID, [projectManagerId]);
        if (!managerList.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] manager not exist`);
            await rollback(connection);
            releaseConnection(connection);
            res.status(403).send("Manager ID not exist");
            return;
        }

        const currentProjectId = await queryTransaction(connection, GET_NEWEST_PROJECT_ID);
        let projectId = 1;
        if (currentProjectId.length) {
            projectId = currentProjectId[0].project_id;
        }
        const newId = generateId(projectId, MAX_PROJECT_ID_LENGTH);
        // Insert project
        await queryTransaction(connection, INSERT_NEW_PROJECT, [newId, projectName, client, projectManagerId, new Date(projectManagerStartDate)]);
        // Insert assigment on duplicate update
        await queryTransaction(connection, INSERT_ASSIGNMENT, [newId, projectManagerId, projectManagerStartDate]);

        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] insert new project success`);
        await commitTransaction(connection);
        releaseConnection(connection);
        res.status(200).send("Create project success");
    } catch (error) {
        await rollback(connection);
        releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
    }
}

async function editProject(req, res) {
    const connection = await getConnection();
    await beginTransaction(connection);
    try {
        const validateSchema = {
            projectId: {
                type: 'string',
                required: true,
            },
            projectName: {
                type: 'string',
                required: false,
            },
            client: {
                type: 'string',
                required: false,
            },
            projectManagerId: {
                type: 'string',
                required: false,
            },
            projectManagerStartDate: {
                type: 'datetime',
                required: false,
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

        const { projectId, projectName, client, projectManagerId, projectManagerStartDate } = req.body;

        const setClauseArray = [];

        if (projectManagerId) {
            const managerList = await queryTransaction(connection, CHECK_EXIST_EMPLOYEE_ID, [projectManagerId]);
            if (!managerList.length) {
                logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] manager not exist`);
                await rollback(connection);
                releaseConnection(connection);
                res.status(403).send("Manager ID not exist");
                return;
            } else {
                setClauseArray.push(` project_manager_id = '${projectManagerId}'`);
            }
        }
        if (projectName) setClauseArray.push(` project_name = '${projectName}'`);
        if (client) setClauseArray.push(` client_id = '${client}'`);
        if (projectManagerStartDate) setClauseArray.push(` project_manager_assigned_date = '${projectManagerStartDate}'`);

        const setClause = " SET " + setClauseArray.join(',');
        const query = `UPDATE project ${setClause} WHERE project_id = '${projectId}'`;

        await queryTransaction(connection, query);

        if (projectManagerId) {
            // Insert assigment on duplicate update
            await queryTransaction(connection, INSERT_ASSIGNMENT, [projectId, projectManagerId, projectManagerStartDate || new Date()]);
        }

        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] update project success`);
        await commitTransaction(connection);
        releaseConnection(connection);
        res.status(200).send("Update project success");
    } catch (error) {
        await rollback(connection);
        releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
    }
}

module.exports = {
    getAllProjects,
    getDetailsPojectByEmployee,
    createNewProject,
    editProject,
}