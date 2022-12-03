const { exeQuery, getConnection, beginTransaction, rollback, releaseConnection, queryTransaction, commitTransaction } = require('../../common/dbaccess');
const logger = require('../../common/logger');
const fs = require('fs');
const { validateRequest, generateId } = require('../../common/utils');
const { ROLE, MAX_PROJECT_ID_LENGTH } = require('../../config/constants');

const LOG_CATEGORY = "[Project Controller]"
const GET_ALL_PROJECT = "SELECT p.*, e.avt as manager_avt, CONCAT(e.first_name, ' ',e.last_name) as manager_full_name "
    + "                      FROM project p "
    + "                          INNER JOIN employee e ON p.project_manager_id = e.employee_id ";
const GET_PROJECT_BY_ID = "SELECT p.*, e.avt as manager_avt, CONCAT(e.first_name, ' ',e.last_name) as manager_full_name "
    + "                      FROM project p "
    + "                          INNER JOIN employee e ON p.project_manager_id = e.employee_id "
    + "                      WHERE p.project_id = ?";
const GET_PROJECT_DETAILS_BY_MANAGER = "SELECT a.employee_id, a.assigned_date, tb.*"
    + "                                 FROM assignment a "
    + "                                 	INNER JOIN (SELECT p.project_name, p.project_id, CONCAT(e.first_name, ' ', e.last_name) as project_manager_name, p.project_manager_id, p.client_id, p.project_manager_assigned_date, COUNT(a.employee_id) as number"
    + "	                    							FROM `project` p"
    + "		                								LEFT JOIN assignment a ON p.project_id = a.project_id"
    + "										                INNER JOIN employee e ON p.project_manager_id = e.employee_id"
    + "								                    WHERE p.project_id = ?) tb on tb.project_id = a.project_id"
    + "                                 WHERE a.employee_id = ?";
const GET_STATUS_OF_PROJECT = "SELECT count(*) as total, count(IF(status=0, 1, NULL)) as `open`, count(IF(status=1, 1, NULL)) as `inprogress`, count(IF(status=2, 1, NULL)) as `resolved`, count(IF(status=3, 1, NULL)) as `closed` "
    + "                         FROM `task`"
    + "                         WHERE project_id = ?";
const GET_ASSIGNMENT_OF_PROJECT = "SELECT e.employee_id, CONCAT(e.first_name,' ',e.last_name) as full_name, e.avt, a.assigned_date, e.main_skill, e.job_role, e.gender, e.is_deleted "
    + "                             FROM assignment a "
    + "                             	INNER JOIN project p ON a.project_id = p.project_id"
    + "                                 INNER JOIN employee e ON a.employee_id = e.employee_id"
    + "                             WHERE p.project_id = ? AND e.employee_id <> p.project_manager_id";

const CHECK_EXIST_EMPLOYEE_ID = "SELECT employee_id FROM employee where employee_id = ?";
const GET_NEWEST_PROJECT_ID = "SELECT project_id FROM `project` ORDER BY project_id DESC LIMIT 1";
const INSERT_NEW_PROJECT = "INSERT INTO project (project_id, project_name, client_id, project_manager_id, project_manager_assigned_date) VALUES (?, ?, ?, ?, ?)";
const INSERT_ASSIGNMENT = "INSERT INTO assignment (project_id, employee_id, assigned_date) VALUES (?, ?, ?) "
    + "                     ON DUPLICATE KEY UPDATE assigned_date=VALUES(assigned_date)";
const DELETE_ASSIGNMENT = "DELETE FROM assignment WHERE project_id = ? and employee_id = ?";
const GET_EMPLOYEES_NOT_ASSIGN = "  SELECT e.*,  CONCAT(e.first_name, ' ', e.last_name) as full_name, CONCAT(er.first_name, ' ', er.last_name) as employer_full_name, g.group_name, g.group_full_name "
    + "                             FROM employee e INNER JOIN `group` g ON e.group_id = g.group_id "
    + "                                 LEFT JOIN employee er ON e.employer_id = er.employee_id"
    + "                             WHERE e.employee_id NOT IN (SELECT employee_id FROM assignment WHERE project_id = ?)"

// DELETE PROJECT
const GET_ATTACHMENTS_OF_PROJECT = "SELECT * "
    + "                             FROM taskattachment "
    + "                             WHERE task_id IN (SELECT task_id from task WHERE project_id = ?)";
const DELETE_ATTACHMENT_OF_PROJECT = "DELETE FROM taskattachment "
    + "                               WHERE task_id IN (SELECT task_id from task WHERE project_id = ?)";
const DELETE_ASSIGNMENT_OF_PROJECT = "DELETE FROM assignment WHERE project_id = ?";
const DELETE_COMMENTS_OF_TASK_IN_PROJECT = "DELETE FROM taskcomment WHERE task_id IN (SELECT task_id FROM task WHERE project_id = ?)";
const DELETE_TASKS_IN_PROJECT = "DELETE FROM task WHERE project_id = ?";
const DELETE_PROJECT = "DELETE FROM project WHERE project_id = ?";

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
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function getAllProjects(req, res) {
    try {
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] resonse `);
        res.status(200).send(await exeQuery(GET_ALL_PROJECT));
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });

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
        res.status(500).send({ message: "SERVER ERROR" });
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
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function getStatusOfProject(req, res) {
    try {
        const validateSchema = {
            projectId: {
                type: 'string',
                required: true
            }
        }

        const validResult = validateRequest(req.query, validateSchema);
        if (validResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            res.status(403).send({ message: validResult });
            return;
        }

        const { projectId } = req.query;
        let result = {
            total: 0,
            open: 0,
            inprogress: 0,
            resolved: 0,
            closed: 0
        };
        const response = await exeQuery(GET_STATUS_OF_PROJECT, [projectId]);
        if (response.length) {
            result = response[0];
        }
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] resonse `);
        res.status(200).send(result);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function getAssignmentOfProject(req, res) {
    try {
        const validateSchema = {
            projectId: {
                type: 'string',
                required: true
            }
        }
        const validResult = validateRequest(req.query, validateSchema);
        if (validResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            res.status(403).send({ message: validResult });
            return;
        }

        const { projectId } = req.query;
        const response = await exeQuery(GET_ASSIGNMENT_OF_PROJECT, [projectId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] resonse `);
        res.status(200).send(response || []);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function addAssignmentToProject(req, res) {
    const connection = await getConnection();
    await beginTransaction(connection);
    try {
        const validateSchema = {
            projectId: {
                type: 'string',
                required: true,
            },
            employeeId: {
                type: 'string',
                required: true,
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

        const { projectId, employeeId } = req.body;

        await queryTransaction(connection, INSERT_ASSIGNMENT, [projectId, employeeId, new Date()]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] add assignee to project success, project_id = ${projectId}`);
        await commitTransaction(connection);
        releaseConnection(connection);
        res.status(200).send({ message: "Add assignee success" });
    } catch (error) {
        await rollback(connection);
        releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function getProjectDetails(req, res) {
    try {
        const validateSchema = {
            projectId: {
                type: 'string',
                required: true
            }
        }

        const validResult = validateRequest(req.query, validateSchema);
        if (validResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            res.status(403).send({ message: validResult });
            return;
        }

        const { projectId } = req.query;
        const response = await exeQuery(GET_PROJECT_BY_ID, [projectId]);
        let result = {}
        if (response.length) {
            result = response[0];
            const listAssignee = await exeQuery(GET_ASSIGNMENT_OF_PROJECT, [projectId])
            result.employees = listAssignee;
        }
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] resonse `);
        res.status(200).send(result);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function getEmployeeNotAssign(req, res) {
    try {
        const validateSchema = {
            projectId: {
                type: 'string',
                required: true
            }
        }

        const validResult = validateRequest(req.query, validateSchema);
        if (validResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            res.status(403).send({ message: validResult });
            return;
        }

        const { projectId } = req.query;
        const response = await exeQuery(GET_EMPLOYEES_NOT_ASSIGN, [projectId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] resonse `);
        res.status(200).send(response || []);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function removeAssignmentInProject(req, res) {
    const connection = await getConnection();
    await beginTransaction(connection);
    try {
        const validateSchema = {
            projectId: {
                type: 'string',
                required: true,
            },
            employeeId: {
                type: 'string',
                required: true,
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

        const { projectId, employeeId } = req.body;

        await queryTransaction(connection, DELETE_ASSIGNMENT, [projectId, employeeId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] remove assignee from project success, project_id = ${projectId}`);
        await commitTransaction(connection);
        releaseConnection(connection);
        res.status(200).send({ message: "Remove assignee success" });
    } catch (error) {
        await rollback(connection);
        releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function deleteProject(req, res) {
    const connection = await getConnection();
    await beginTransaction(connection);
    try {
        const validateSchema = {
            projectId: {
                type: 'string',
                required: true,
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

        const { projectId } = req.body;
        // Delete attachments
        const listAttachment = await queryTransaction(connection, GET_ATTACHMENTS_OF_PROJECT, [projectId]);
        for (let i = 0; i < listAttachment.length; i++) {
            const attachment = listAttachment[i];
            const ATTACHMENTS_PATH = __basedir + "/public/attachments/";
            const filepath = ATTACHMENTS_PATH + attachment.path;
            deleteAttachments([{ path: filepath }]);
        }
        const deleteAttachmentResult = await queryTransaction(connection, DELETE_ATTACHMENT_OF_PROJECT, [projectId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] Done delete attachments - ${deleteAttachmentResult.affectedRows} record`);
        // Delete comment of task in project
        const deleteCommentResult = await queryTransaction(connection, DELETE_COMMENTS_OF_TASK_IN_PROJECT, [projectId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] Done delete comments - ${deleteCommentResult.affectedRows} record`);
        // Delete assignment
        const deleteAssignmentResult = await queryTransaction(connection, DELETE_ASSIGNMENT_OF_PROJECT, [projectId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] Done delete assignments - ${deleteAssignmentResult.affectedRows} record`);
        // Delete task
        const deleteTaskResult = await queryTransaction(connection, DELETE_TASKS_IN_PROJECT, [projectId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] Done delete tasks - ${deleteTaskResult.affectedRows} record`);
        // Delete project
        const deleteProjectResult = await queryTransaction(connection, DELETE_PROJECT, [projectId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] Done delete project - ${deleteProjectResult.affectedRows} record`);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] Delete project success`);
        await commitTransaction(connection);
        releaseConnection(connection);
        res.status(200).send({ message: "Delete project success" });
    } catch (error) {
        await rollback(connection);
        releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

function deleteAttachments(files) {
    const ATTACHMENTS_PATH = __basedir + "/public/attachments/";
    for (let i = 0; i < files?.length; i++) {
        const element = files[i];
        if (fs.existsSync(element.path)) {
            fs.unlink(element.path, (err) => {
                if (err) logger.warn('delete file failed - ' + err);
                const filename = String(element.path).substring(ATTACHMENTS_PATH.length);
                const dirArr = filename.split("\\");
                const dirPath = ATTACHMENTS_PATH + dirArr[0];
                if (fs.existsSync(dirPath)) {
                    fs.rmdir(dirPath, (err) => {
                        if (err) logger.warn('delete path failed - ' + err)
                    });
                }
            });
        }
    }
}

module.exports = {
    getAllProjects,
    getDetailsPojectByEmployee,
    createNewProject,
    editProject,
    getStatusOfProject,
    getAssignmentOfProject,
    addAssignmentToProject,
    getProjectDetails,
    getEmployeeNotAssign,
    removeAssignmentInProject,
    deleteProject,
}