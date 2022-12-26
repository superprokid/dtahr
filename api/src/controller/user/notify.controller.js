const dbaccess = require('../../common/dbaccess');
const logger = require('../../common/logger');
const { validateRequest } = require('../../common/utils');

const LOG_CATEGORY = "NotifyController";
const GET_ALL_NOTIFY = "SELECT n.*, CONCAT(first_name, ' ', last_name) as full_name, avt"
    + "                 FROM notify n INNER JOIN employee e ON n.notify_creator = e.employee_id"
    + "                 WHERE n.employee_id = ? ORDER BY n.create_at DESC";
const UPDATE_NOTIFY = "UPDATE notify SET is_readed = 1 WHERE employee_id = ? and notify_id = ?"

async function getNotifyByUser(req, res) {
    try {
        const empId = req.employee_id;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send({ message: 'Get notify failed' });
            return;
        }
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`)
        res.status(200).send(await dbaccess.exeQuery(GET_ALL_NOTIFY, [empId]));
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function makeReadNotify(req, res) {
    const connection = await dbaccess.getConnection();
    await dbaccess.beginTransaction(connection);
    try {
        const empId = req.employee_id;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send({ message: 'Update notify failed' });
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection)
            return;
        }

        const validateSchema = {
            notifyId: {
                type: 'number',
                required: true
            },
        }
        const validResult = validateRequest(req.body, validateSchema);
        if (validResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(403).send({ message: validResult });
            return;
        }

        const { notifyId } = req.body;

        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`);
        await dbaccess.queryTransaction(connection, UPDATE_NOTIFY, [empId, notifyId]);
        res.status(200).send({ message: 'Update success' });
        await dbaccess.commitTransaction(connection);
        dbaccess.releaseConnection(connection);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

module.exports = {
    getNotifyByUser,
    makeReadNotify
}