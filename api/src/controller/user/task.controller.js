const fs = require('fs');
const dbaccess = require('../../common/dbaccess');
const logger = require('../../common/logger');
const moment = require('moment');
const { validateRequest, getDateString, isNullOrUndefinded } = require('../../common/utils');
const { TASK_STATUS, TASK_STATUS_TEXT, TASK_PRIORITY_TEXT } = require('../../config/constants');

const LOG_CATEGORY = "Task Controller"
const INSERT_NEW_CATEGORY = "INSERT INTO category (category_name, category_color) VALUES (?, ?)";
const INSERT_NEW_TASK = "INSERT INTO task (task_title, task_number, project_id, task_description, employee_id, assignee_id, `status`, priority, category_id, start_date, end_date, estimated_hours, actual_hours, parent_task_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
const INSERT_NEW_COMMENT = "INSERT INTO taskcomment (task_id, employee_id, content, is_edit) VALUES (?, ?, ?, ?)";
const EDIT_COMMENT = "UPDATE taskcomment SET content = ? WHERE taskcomment_id = ? and is_edit = 1 and employee_id = ?";
const GET_TASK_BY_ID = "SELECT * FROM task WHERE task_id = ?";
const GET_ALL_TASK_BY_STATUS = "  SELECT t.*, CONCAT(first_name, ' ', last_name) as assignee, avt, category_name, category_color "
    + "                 FROM task t INNER JOIN employee e on t.assignee_id = e.employee_id"
    + "                 	LEFT JOIN category c ON t.category_id = c.category_id"
    + "                 WHERE t.project_id = ?"
    + "                 ORDER BY task_id DESC";
const GET_ALL_TASK = "  SELECT t.*, CONCAT(first_name, ' ', last_name) as assignee, avt, category_name, category_color "
    + "                 FROM task t INNER JOIN employee e on t.assignee_id = e.employee_id"
    + "                 	LEFT JOIN category c ON t.category_id = c.category_id"
    + "                 WHERE t.project_id = ?"
    + "                 ORDER BY t.update_at DESC";
const GET_TASK_DETAILS_BY_ID = "SELECT t.*, p.project_name, CONCAT(e.first_name, ' ', e.last_name) as creator, e.avt as creator_avt, category_name, category_color , CONCAT(a.first_name, ' ', a.last_name) as assignee, a.avt as assignee_avt"
    + "                         FROM task t "
    + "	                            INNER JOIN employee e on t.employee_id = e.employee_id"
    + "	                            INNER JOIN employee a ON t.assignee_id = a.employee_id"
    + "	                            INNER JOIN project p ON p.project_id = t.project_id"
    + "                             LEFT JOIN category c ON t.category_id = c.category_id"
    + "                         WHERE task_id = ?";
const GET_ALL_COMMENT_OF_TASK = "SELECT tc.*, CONCAT(first_name, ' ', last_name) as creator, avt"
    + "                         FROM taskcomment tc INNER JOIN employee e ON tc.employee_id = e.employee_id"
    + "                         WHERE task_id = ?";
const GET_ALL_ATTACHMENTS_OF_TASK = "SELECT * FROM taskattachment where task_id = ?";
const GET_ALL_CATEGORY = "SELECT * FROM category";
const GET_CHILD_TASK = "SELECT t.*, p.project_name, CONCAT(e.first_name, ' ', e.last_name) as creator, e.avt as creator_avt, category_name, category_color , CONCAT(a.first_name, ' ', a.last_name) as assignee, a.avt as assignee_avt"
+ "                         FROM task t "
+ "	                            INNER JOIN employee e on t.employee_id = e.employee_id"
+ "	                            INNER JOIN employee a ON t.assignee_id = a.employee_id"
+ "	                            INNER JOIN project p ON p.project_id = t.project_id"
+ "                             LEFT JOIN category c ON t.category_id = c.category_id"
+ "                         WHERE parent_task_id = ?";
const GET_ALL_TASK_FOR_GANTT = "  SELECT t.*, CONCAT(first_name, ' ', last_name) as assignee, avt, category_name, category_color "
    + "                 FROM task t INNER JOIN employee e on t.assignee_id = e.employee_id"
    + "                 	LEFT JOIN category c ON t.category_id = c.category_id"
    + "                 WHERE t.project_id = ? and ((? BETWEEN start_date and end_date) OR (start_date BETWEEN ? and ?) OR (end_date BETWEEN ? and ?))"
    + "                 ORDER BY t.start_date ASC";
const GET_FULL_NAME_OF_EMPLOYEE = "SELECT CONCAT(first_name, ' ', last_name) as full_name FROM employee WHERE employee_id = ? LIMIT 1";
const DELETE_COMMENT = "DELETE FROM taskcomment WHERE taskcomment_id = ? and is_edit = 1 and employee_id = ?";
const INSERT_ATTACHMENT = "INSERT INTO taskattachment (task_id, path) VALUES (?, ?)";
const GET_ATTACHMENT_BY_ID = "SELECT * FROM taskattachment WHERE attachment_id = ?";
const DELETE_ATTACHMENT = "DELETE FROM taskattachment WHERE attachment_id = ?";
const GET_CURRENT_PROECT = "SELECT project_id FROM project WHERE project_id = ? LIMIT 1";
const GET_NEWEST_TASK_NUMBER = "SELECT * FROM task WHERE project_id = ? ORDER BY task_number DESC LIMIT 1";

async function addNewCategory(req, res) {
    const connection = await dbaccess.getConnection();
    await dbaccess.beginTransaction(connection);
    try {
        const validateSchema = {
            categoryName: {
                type: 'string',
                required: true
            },
            categoryColor: {
                type: 'string',
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

        const { categoryName, categoryColor } = req.body;
        await dbaccess.queryTransaction(connection, INSERT_NEW_CATEGORY, [categoryName, categoryColor]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] insert new category success`);
        await dbaccess.commitTransaction(connection);
        dbaccess.releaseConnection(connection);
        res.status(200).send('Create success');
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"});
        await dbaccess.rollback(connection);
        dbaccess.releaseConnection(connection);
    }
}

async function addNewTask(req, res) {
    const connection = await dbaccess.getConnection();
    await dbaccess.beginTransaction(connection);
    try {
        const employeeId = req.employee_id;
        if (!employeeId) {
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send("Process failed");
            return;
        }

        const validateSchema = {
            taskTitle: {
                type: 'string',
                required: true
            },
            projectId: {
                type: 'string',
                required: true
            },
            taskDescription: {
                type: 'string',
                required: false
            },
            assigneeId: {
                type: 'string',
                required: true,
            },
            priority: {
                type: 'number',
                required: true,
            },
            categoryId: {
                type: 'number',
                required: true,
            },
            startDate: {
                type: 'datetime',
                required: false
            },
            endDate: {
                type: 'datetime',
                required: false,
            },
            estimatedHours: {
                type: 'number',
                required: false,
            },
            actualHours: {
                type: 'number',
                required: false,
            },
            parentTaskId: {
                type: 'number',
                required: false,
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

        let { taskTitle, projectId, taskDescription, assigneeId, priority, categoryId, startDate, endDate, estimatedHours, actualHours, parentTaskId } = req.body;

        if (startDate && endDate) {
            // no implement
        } else if (startDate) {
            endDate = new Date(startDate);
        } else if (endDate) {
            startDate = new Date(endDate);
        } else {
            startDate = new Date();
            endDate = new Date();
        }
        if (moment(startDate).isAfter(moment(endDate), 'date')) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] startDate is > endDate, so set endDate = startDate`);
            endDate = startDate;
        }

        const currentProject = await dbaccess.queryTransaction(connection, GET_CURRENT_PROECT, [projectId]);
        if (!currentProject.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] Project not exist`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(403).send({ message: "The selected project is not exist" });
            return;
        }

        if (parentTaskId) {
            const currentParentTask = await dbaccess.queryTransaction(connection, GET_TASK_BY_ID, [parentTaskId]);
            if (!currentParentTask.length) {
                logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] Parent task is not exist`);
                await dbaccess.rollback(connection);
                dbaccess.releaseConnection(connection);
                res.status(403).send({ message: "The selected parent task is not exist" });
                return;
            }
        }

        const newestTask = await dbaccess.queryTransaction(connection, GET_NEWEST_TASK_NUMBER, [projectId]);
        let taskNumber = 1;
        if (newestTask.length) {
            taskNumber = Number(newestTask[0].task_number) + 1;
        }

        await dbaccess.queryTransaction(connection, INSERT_NEW_TASK, [taskTitle, taskNumber, projectId, taskDescription, employeeId, assigneeId, TASK_STATUS.open, priority, categoryId, getDateString(startDate), getDateString(endDate), estimatedHours || 0, actualHours ?? null, parentTaskId || null]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] insert new task success`);
        await dbaccess.commitTransaction(connection);
        dbaccess.releaseConnection(connection);
        res.status(200).send({message: "Create success"});
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"});
        await dbaccess.rollback(connection);
        dbaccess.releaseConnection(connection);
    }
}

async function updateTask(req, res) {
    const connection = await dbaccess.getConnection();
    await dbaccess.beginTransaction(connection);
    try {
        const employeeId = req.employee_id;
        if (!employeeId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(403).send("Update failed");
            return;
        }

        const validateSchema = {
            taskId: {
                type: 'number',
                required: true,
            },
            taskTitle: {
                type: 'string',
                required: false
            },
            taskDescription: {
                type: 'string',
                required: false
            },
            assigneeId: {
                type: 'string',
                required: false,
            },
            status: {
                type: 'number',
                required: false
            },
            priority: {
                type: 'number',
                required: false,
            },
            categoryId: {
                type: 'number',
                required: false,
            },
            startDate: {
                type: 'datetime',
                required: false
            },
            endDate: {
                type: 'datetime',
                required: false,
            },
            estimatedHours: {
                type: 'number',
                required: false,
            },
            actualHours: {
                type: 'number',
                required: false,
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

        let { taskId, taskTitle, taskDescription, assigneeId, status, priority, categoryId, startDate, endDate, estimatedHours, actualHours } = req.body;

        const targetTaskList = await dbaccess.queryTransaction(connection, GET_TASK_BY_ID, [taskId]);
        if (!targetTaskList.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] not exist task_id = ${taskId}`);
            await dbaccess.rollback(connection);
            releaseConnection(connection);
            res.status(403).send('Update failed');
            return;
        }
        const targetTask = targetTaskList[0];
        let isEditDate = false;
        if (startDate && endDate) {
            isEditDate = true;
        } else if (startDate) {
            endDate = getDateString(targetTask.end_date);
            isEditDate = true;
        } else if (endDate) {
            startDate = getDateString(targetTask.start_date);
            isEditDate = true;
        }

        const setClauseArray = [];
        const whereClause = ` WHERE task_id = '${taskId}'`;
        let commentContent = '';
        if (categoryId) {
            setClauseArray.push(` category_id = '${categoryId}' `);
            commentContent = commentContent.concat(`<p>Category changed</p></br>`);
        }
        if (taskTitle) {
            setClauseArray.push(` task_title = '${taskTitle}' `);
            commentContent = commentContent.concat(`<p>Title changed</p></br>`);
        }
        if (taskDescription) {
            setClauseArray.push(` task_description = '${taskDescription}'`);
            commentContent = commentContent.concat(`<p>Content changed</p></br>`);
        }
        if (assigneeId && targetTask.assignee_id != assigneeId) {
            setClauseArray.push(` assignee_id = '${assigneeId}'`);
            const targetEmployeeName = await getTargetEmployeeName(connection, targetTask.assignee_id);
            const updateEmployeeName = await getTargetEmployeeName(connection, assigneeId);
            commentContent = commentContent.concat(`<p>Assignee changed: ${targetEmployeeName} → ${updateEmployeeName}</p></br>`);
        }
        if (!isNullOrUndefinded(status)) {
            setClauseArray.push(` status = '${status}'`);
            commentContent = commentContent.concat(`<p>Status changed: ${TASK_STATUS_TEXT[targetTask.status]} → ${TASK_STATUS_TEXT[status]}</p></br>`);
        }
        if (!isNullOrUndefinded(priority)) {
            setClauseArray.push(` priority = '${priority}'`);
            commentContent = commentContent.concat(`<p>Priority changed: ${TASK_PRIORITY_TEXT[targetTask.priority]} → ${TASK_STATUS_TEXT[priority]}</p></br>`);
        }
        if (!isNullOrUndefinded(estimatedHours)) {
            setClauseArray.push(` estimated_hours = '${estimatedHours}'`);
            commentContent = commentContent.concat(`<p>Estimated hours changed: ${targetTask.estimated_hours} → ${estimatedHours}</p></br>`);
        }
        if (!isNullOrUndefinded(actualHours)) {
            setClauseArray.push(` actual_hours = '${actualHours}'`);
            commentContent = commentContent.concat(`<p>Estimated hours changed: ${Number(targetTask.actual_hours).toFixed(2)} → ${Number(actualHours).toFixed(2)}</p></br>`);
        }
        if (isEditDate) {
            if (moment(startDate).isAfter(moment(endDate), 'date')) {
                logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] startDate is > endDate, so set endDate = startDate`);
                endDate = startDate;
            }
            setClauseArray.push(` start_date = '${getDateString(startDate)}'`);
            setClauseArray.push(` end_date = '${getDateString(endDate)}'`);
            commentContent = commentContent.concat(`<p>Duration change: ${getDateString(startDate)} → ${getDateString(endDate)}</p></br>`);
        }

        if (!setClauseArray.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] no columns update`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(200).send("Update failed, no columns need to update");
            return;
        }

        const setClause = " SET " + setClauseArray.join(',');
        const query = "UPDATE `task` " + setClause + whereClause;
        await dbaccess.queryTransaction(connection, query);
        console.log(commentContent);
        await dbaccess.queryTransaction(connection, INSERT_NEW_COMMENT, [taskId, employeeId, commentContent, 0]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] update task success`);

        await dbaccess.commitTransaction(connection);
        dbaccess.releaseConnection(connection);
        res.status(200).send("update task success");
    } catch (error) {
        await dbaccess.rollback(connection);
        dbaccess.releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"});
    }
}

async function addNewComment(req, res) {
    const connection = await dbaccess.getConnection();
    await dbaccess.beginTransaction(connection);
    try {
        const employeeId = req.employee_id;
        if (!employeeId) {
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send("Process failed");
            return;
        }

        const validateSchema = {
            taskId: {
                type: 'number',
                required: true,
            },
            content: {
                type: 'string',
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

        const { taskId, content } = req.body;
        await dbaccess.queryTransaction(connection, INSERT_NEW_COMMENT, [taskId, employeeId, content, 1]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] insert new comment success`);
        await dbaccess.commitTransaction(connection);
        dbaccess.releaseConnection(connection);
        res.status(200).send('Create success');
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"});
        await dbaccess.rollback(connection);
        dbaccess.releaseConnection(connection);
    }
}

async function editComment(req, res) {
    const connection = await dbaccess.getConnection();
    await dbaccess.beginTransaction(connection);
    try {
        const employeeId = req.employee_id;
        if (!employeeId) {
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send("Process failed");
            return;
        }

        const validateSchema = {
            commentId: {
                type: 'number',
                required: true
            },
            content: {
                type: 'string',
                required: true
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

        const { commentId, content } = req.body;
        await dbaccess.queryTransaction(connection, EDIT_COMMENT, [content, commentId, employeeId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] edit comment done`);
        await dbaccess.commitTransaction(connection);
        dbaccess.releaseConnection(connection);
        res.status(200).send('Edit success');
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"});
        await dbaccess.rollback(connection);
        dbaccess.releaseConnection(connection);
    }
}

async function getAllTaskWithStatus(req, res) {
    try {
        const { projectId } = req.query;
        if (!projectId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] projectId is required`);
            res.status(200).send([]);
            return;
        }
        const listTask = await dbaccess.exeQuery(GET_ALL_TASK_BY_STATUS, [projectId]);
        const response = {
            open: [],
            inProgress: [],
            resolved: [],
            closed: []
        }

        listTask.forEach(task => {
            switch (Number(task.status)) {
                case TASK_STATUS.open:
                    response.open.push(task);
                    break;
                case TASK_STATUS.inProgress:
                    response.inProgress.push(task);
                    break;
                case TASK_STATUS.resolved:
                    response.resolved.push(task);
                    break;
                case TASK_STATUS.closed:
                    response.closed.push(task);
                    break;
                default:
                    break;
            }
        });
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`);
        res.status(200).send(response);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"});
    }
}

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
        res.status(500).send({message: "SERVER ERROR"});
    }
}

async function getAllTaskGanttChart(req, res) {
    try {
        let { projectId, startDate, endDate } = req.query;
        if (!projectId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] projectId is required`);
            res.status(200).send([]);
            return;
        }

        if (!startDate) {
            startDate = getDateString();
        }
        if (!endDate) {
            endDate = moment(startDate).add(3, 'month').format('YYYY-MM-DD');
        }
        const listTask = await dbaccess.exeQuery(GET_ALL_TASK_FOR_GANTT, [projectId, startDate, startDate, endDate, startDate, endDate]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`);
        res.status(200).send(listTask);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"});
    }
}

async function getTaskByID(req, res) {
    try {
        const { taskId } = req.query;
        if (!taskId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] taskId is required`);
            res.status(403).send("taskId is required");
        }
        const listTask = await dbaccess.exeQuery(GET_TASK_DETAILS_BY_ID, [taskId]);
        if (!listTask.length) {
            res.status(200).send({});
            return;
        }
        const task = listTask[0];
        const listComment = await dbaccess.exeQuery(GET_ALL_COMMENT_OF_TASK, [taskId]);
        task.comments = listComment
        const listAttachments = await dbaccess.exeQuery(GET_ALL_ATTACHMENTS_OF_TASK, [taskId]);
        task.attachments = listAttachments;
        const listChildrentTask = await dbaccess.exeQuery(GET_CHILD_TASK, [taskId]);
        task.childTasks = listChildrentTask;
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`);
        res.status(200).send(task);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"});
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

async function getTargetEmployeeName(connection, employeeId) {
    const result = await dbaccess.queryTransaction(connection, GET_FULL_NAME_OF_EMPLOYEE, [employeeId]);
    return result.length ? result[0].full_name : 'Anonymous';
}

async function deleteComment(req, res) {
    const connection = await dbaccess.getConnection();
    await dbaccess.beginTransaction(connection);
    try {
        const employeeId = req.employee_id;
        if (!employeeId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(403).send("Update failed");
            return;
        }

        const validateSchema = {
            commentId: {
                type: 'number',
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

        const { commentId } = req.body;
        await dbaccess.queryTransaction(connection, DELETE_COMMENT, [commentId, employeeId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] delete comment done`);
        await dbaccess.commitTransaction(connection);
        dbaccess.releaseConnection(connection);
        res.status(200).send('Delete success');
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"});
        await dbaccess.rollback(connection);
        dbaccess.releaseConnection(connection);
    }
}

async function addAttachments(req, res) {
    const ATTACHMENTS_PATH = __basedir + "/public/attachments/";
    const connection = await dbaccess.getConnection();
    await dbaccess.beginTransaction(connection);
    try {
        const employeeId = req.employee_id;
        if (!employeeId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(403).send("Update failed");
            return;
        }

        const validateSchema = {
            taskId: {
                type: 'number',
                required: true,
            }
        }
        const validResult = validateRequest(req.body, validateSchema);
        if (validResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            deleteAttachments(req.files);
            res.status(403).send(validResult);
            return;
        }
        const { taskId } = req.body;
        for (let i = 0; i < req.files?.length; i++) {
            const element = req.files[i];
            const filename = String(element.path).substring(ATTACHMENTS_PATH.length);
            await dbaccess.queryTransaction(connection, INSERT_ATTACHMENT, [taskId, filename]);
        }
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] Add attachments success`);
        await dbaccess.commitTransaction(connection);
        dbaccess.releaseConnection(connection);
        res.status(200).send({ message: "OK" });
    } catch (error) {
        deleteAttachments(req.files);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"});
        await dbaccess.rollback(connection);
        dbaccess.releaseConnection(connection);
    }
}

async function deleteTaskAttachments(req, res) {
    const connection = await dbaccess.getConnection();
    await dbaccess.beginTransaction(connection);
    try {
        const employeeId = req.employee_id;
        if (!employeeId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(403).send("Update failed");
            return;
        }

        const validateSchema = {
            attachmentId: {
                type: 'number',
                required: true,
            }
        }
        const validResult = validateRequest(req.body, validateSchema);
        if (validResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            deleteAttachments(req.files);
            res.status(403).send(validResult);
            return;
        }
        const { attachmentId } = req.body;
        const targetAttachmentsList = await dbaccess.queryTransaction(connection, GET_ATTACHMENT_BY_ID, [attachmentId]);
        if (targetAttachmentsList.length) {
            const ATTACHMENTS_PATH = __basedir + "/public/attachments/";
            const targetAttachment = targetAttachmentsList[0];
            const filepath = ATTACHMENTS_PATH + targetAttachment.path;
            deleteAttachments([{ path: filepath }]);
            await dbaccess.queryTransaction(connection, DELETE_ATTACHMENT, [attachmentId]);
        }
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] Delete attachment success`);
        await dbaccess.commitTransaction(connection);
        dbaccess.releaseConnection(connection);
        res.status(200).send({ message: "OK" });
    } catch (error) {
        deleteAttachments(req.files);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"});
        await dbaccess.rollback(connection);
        dbaccess.releaseConnection(connection);
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
    addNewCategory,
    addNewComment,
    addNewTask,
    editComment,
    updateTask,
    getAllTaskWithStatus,
    getAllTask,
    getTaskByID,
    getAllCategory,
    deleteComment,
    addAttachments,
    deleteTaskAttachments,
    getAllTaskGanttChart,
}