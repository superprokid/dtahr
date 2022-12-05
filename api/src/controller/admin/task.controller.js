const { exeQuery, getConnection, beginTransaction, rollback, releaseConnection, queryTransaction, commitTransaction } = require('../../common/dbaccess');
const logger = require('../../common/logger');
const fs = require('fs');
const dbaccess = require('../../common/dbaccess');
const { validateRequest } = require('../../common/utils');

const LOG_CATEGORY = "[Task Controller]"
const GET_ALL_TASK = "  SELECT t.*, CONCAT(first_name, ' ', last_name) as assignee, avt, category_name, category_color "
    + "                 FROM task t INNER JOIN employee e on t.assignee_id = e.employee_id"
    + "                 	LEFT JOIN category c ON t.category_id = c.category_id"
    + "                 WHERE t.project_id = ?"
    + "                 ORDER BY t.update_at DESC";
const GET_ALL_CATEGORY = "SELECT * FROM category";
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
const GET_CHILD_TASK = "SELECT t.*, p.project_name, CONCAT(e.first_name, ' ', e.last_name) as creator, e.avt as creator_avt, category_name, category_color , CONCAT(a.first_name, ' ', a.last_name) as assignee, a.avt as assignee_avt"
    + "                         FROM task t "
    + "	                            INNER JOIN employee e on t.employee_id = e.employee_id"
    + "	                            INNER JOIN employee a ON t.assignee_id = a.employee_id"
    + "	                            INNER JOIN project p ON p.project_id = t.project_id"
    + "                             LEFT JOIN category c ON t.category_id = c.category_id"
    + "                         WHERE parent_task_id = ?";

// delete task
const GET_ATTACHMENTS_OF_PROJECT = "SELECT * "
    + "                             FROM taskattachment "
    + "                             WHERE task_id = ?";
const DELETE_ATTACHMENT_OF_PROJECT = "DELETE FROM taskattachment "
    + "                               WHERE task_id = ? ";
const DELETE_COMMENTS_OF_TASK_IN_PROJECT = "DELETE FROM taskcomment WHERE task_id = ?";
const DELETE_TASKS_IN_PROJECT = "DELETE FROM task WHERE task_id = ? or parent_task_id = ?";

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
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function getTaskDetails(req, res) {
    try {
        const { taskId } = req.query;
        if (!taskId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] taskId is required`);
            res.status(403).send({ message: "taskId is required" });
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
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function deleteTask(req, res) {
    const connection = await getConnection();
    await beginTransaction(connection);
    try {
        const validateSchema = {
            taskId: {
                type: 'number',
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

        const { taskId } = req.body;
        // Delete attachments
        const listAttachment = await queryTransaction(connection, GET_ATTACHMENTS_OF_PROJECT, [taskId]);
        for (let i = 0; i < listAttachment.length; i++) {
            const attachment = listAttachment[i];
            const ATTACHMENTS_PATH = __basedir + "/public/attachments/";
            const filepath = ATTACHMENTS_PATH + attachment.path;
            deleteAttachments([{ path: filepath }]);
        }
        const deleteAttachmentResult = await queryTransaction(connection, DELETE_ATTACHMENT_OF_PROJECT, [taskId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] Done delete attachments - ${deleteAttachmentResult.affectedRows} record`);
        // Delete comment of task in project
        const deleteCommentResult = await queryTransaction(connection, DELETE_COMMENTS_OF_TASK_IN_PROJECT, [taskId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] Done delete comments - ${deleteCommentResult.affectedRows} record`);
        // Delete task
        const deleteTaskResult = await queryTransaction(connection, DELETE_TASKS_IN_PROJECT, [taskId, taskId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] Done delete tasks - ${deleteTaskResult.affectedRows} record`);
        
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] Delete task success`);
        await commitTransaction(connection);
        releaseConnection(connection);
        res.status(200).send({ message: "Delete task success" });
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
    getAllTask,
    getAllCategory,
    getTaskDetails,
    deleteTask,
}