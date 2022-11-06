const dbaccess = require('../../common/dbaccess');
const logger = require('../../common/logger');
const moment = require('moment');
const { validateRequest, getDateString } = require('../../common/utils');
const { TASK_STATUS, TASK_STATUS_TEXT, TASK_PRIORITY_TEXT } = require('../../config/constants');

const LOG_CATEGORY = "Task Controller"
const INSERT_NEW_CATEGORY = "INSERT INTO category (category_name, category_color) VALUES (?, ?)";
const INSERT_NEW_TASK = "INSERT INTO task (task_title, task_description, employee_id, assignee_id, `status`, priority, category_id, start_date, end_date, estimated_hours, actual_hours) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
const INSERT_NEW_COMMENT = "INSERT INTO taskcomment (task_id, employee_id, content, is_edit) VALUES (?, ?, ?, ?)";
const EDIT_COMMENT = "UPDATE taskcomment SET content = ? WHERE taskcomment_id = ? and is_edit = 1 and employee_id = ?";
const GET_TASK_BY_ID = "SELECT * FROM task WHERE task_id = ?";
const GET_ALL_TASK_BY_STATUS = "  SELECT t.*, CONCAT(first_name, ' ', last_name) as assignee, avt, category_name, category_color "
    + "                 FROM task t INNER JOIN employee e on t.assignee_id = e.employee_id"
    + "                 	LEFT JOIN category c ON t.category_id = c.category_id"
    + "                 ORDER BY task_id DESC";
const GET_ALL_TASK = "  SELECT t.*, CONCAT(first_name, ' ', last_name) as assignee, avt, category_name, category_color "
    + "                 FROM task t INNER JOIN employee e on t.assignee_id = e.employee_id"
    + "                 	LEFT JOIN category c ON t.category_id = c.category_id"
    + "                 ORDER BY t.update_at DESC";
const GET_TASK_DETAILS_BY_ID = "SELECT t.*, CONCAT(e.first_name, ' ', e.last_name) as creator, e.avt as creator_avt, category_name, category_color , CONCAT(a.first_name, ' ', a.last_name) as assignee, a.avt as assignee_avt"
    + "                         FROM task t "
    + "	                            INNER JOIN employee e on t.employee_id = e.employee_id"
    + "	                            INNER JOIN employee a ON t.assignee_id = a.employee_id"
    + "                             LEFT JOIN category c ON t.category_id = c.category_id"
    + "                         WHERE task_id = ?";
const GET_ALL_COMMENT_OF_TASK = "SELECT tc.*, CONCAT(first_name, ' ', last_name) as creator, avt"
    + "                         FROM taskcomment tc INNER JOIN employee e ON tc.employee_id = e.employee_id"
    + "                         WHERE task_id = ?";
const GET_ALL_CATEGORY = "SELECT * FROM category";

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
        res.status(500).send("SERVER ERROR");
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

        const { taskTitle, taskDescription, assigneeId, priority, categoryId, startDate, endDate, estimatedHours, actualHours } = req.body;

        if (moment(startDate).isAfter(moment(startDate))) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] startDate must be smaller or equal than endDate`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(403).send(validResult);
            return;
        }

        await dbaccess.queryTransaction(connection, INSERT_NEW_TASK, [taskTitle, taskDescription, employeeId, assigneeId, TASK_STATUS.open, priority, categoryId, getDateString(startDate), getDateString(endDate), estimatedHours || 0, actualHours ?? null]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] insert new task success`);
        await dbaccess.commitTransaction(connection);
        dbaccess.releaseConnection(connection);
        res.status(200).send('Create success');
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
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
            startDate = getDateString(targetTask.endDate);
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
        if (assigneeId) {
            setClauseArray.push(` assignee_id = '${assigneeId}'`);
            commentContent = commentContent.concat(`<p>Assignee changed</p></br>`);
        }
        if (status) {
            setClauseArray.push(` status = '${status}'`);
            commentContent = commentContent.concat(`<p>Status changed: ${TASK_STATUS_TEXT[targetTask.status]} → ${TASK_STATUS_TEXT[status]}</p></br>`);
        }
        if (priority) {
            setClauseArray.push(` priority = '${priority}'`);
            commentContent = commentContent.concat(`<p>Priority changed: ${TASK_PRIORITY_TEXT[targetTask.priority]} → ${TASK_STATUS_TEXT[priority]}</p></br>`);
        }
        if (estimatedHours) {
            setClauseArray.push(` estimated_hours = '${estimatedHours}'`);
            commentContent = commentContent.concat(`<p>Estimated hours changed: ${targetTask.estimated_hours} → ${estimatedHours}</p></br>`);
        }
        if (actualHours) {
            setClauseArray.push(` actual_hours = '${actualHours}'`);
            commentContent = commentContent.concat(`<p>Estimated hours changed: ${Number(targetTask.actual_hours).toFixed(2)} → ${Number(actualHours).toFixed(2)}</p></br>`);
        }
        if (isEditDate) {
            setClauseArray.push(` start_date = '${getDateString(startDate)}'`);
            setClauseArray.push(` end_date = '${getDateString(endDate)}'`);
            commentContent = commentContent.concat(`<p>Duration change: ${getDateString(startDate)} → ${getDateString(endDate)}</p></br>`);
        }

        if (!setClauseArray.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] no columns update`);
            await rollback(connection);
            releaseConnection(connection);
            res.status(403).send("Update failed, no columns need to update");
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
        res.status(500).send("SERVER ERROR");
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
        res.status(500).send("SERVER ERROR");
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
        res.status(500).send("SERVER ERROR");
        await dbaccess.rollback(connection);
        dbaccess.releaseConnection(connection);
    }
}

async function getAllTaskWithStatus(req, res) {
    try {
        const listTask = await dbaccess.exeQuery(GET_ALL_TASK_BY_STATUS);
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
        res.status(500).send("SERVER ERROR");
    }
}

async function getAllTask(req, res) {
    try {
        const listTask = await dbaccess.exeQuery(GET_ALL_TASK);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`);
        res.status(200).send(listTask);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
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
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`);
        res.status(200).send(task);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
    }
}

async function getAllCategory(req, res) {
    try {
        const listCategory = await dbaccess.exeQuery(GET_ALL_CATEGORY);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`);
        res.status(200).send(listCategory);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
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
}