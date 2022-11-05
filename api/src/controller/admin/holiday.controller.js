const logger = require('../../common/logger');
const dbaccess = require('../../common/dbaccess');
const { validateRequest } = require('../../common/utils');

const LOG_CATEGORY = "ADMIN HOLIDAY CONTROLLER";
const INSERT_NEW_HOLIDAY = "INSERT holiday (date, description) VALUES (?, ?)";
const DELETE_HOLIDAY = "DELETE FROM holiday WHERE holiday_id = ?";
const GET_ALL_HOLIDAY = "SELECT holiday_id, date, description FROM holiday ORDER BY date DESC"

async function addNewHoliday(req, res) {
    const connection = await dbaccess.getConnection();
    dbaccess.beginTransaction(connection);
    try {
        const validateSchema = {
            date: {
                type: 'datetime',
                required: true
            },
            description: {
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
        const { date, description } = req.body;
        await dbaccess.queryTransaction(connection, INSERT_NEW_HOLIDAY, [date, description]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] create success`);
        res.status(200).send('Create success');
    } catch (error) {
        await dbaccess.rollback(connection);
        dbaccess.releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
    }
    await dbaccess.commitTransaction(connection);
    dbaccess.releaseConnection(connection);
}

async function deleteHoliday(req, res) {
    const connection = await dbaccess.getConnection();
    dbaccess.beginTransaction(connection);
    try {
        const validateSchema = {
            holidayId: {
                type: 'number',
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
        const { holidayId } = req.body;
        await dbaccess.queryTransaction(connection, DELETE_HOLIDAY, [holidayId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] delete success`);
        res.status(200).send('Delete success');
    } catch (error) {
        await dbaccess.rollback(connection);
        dbaccess.releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
    }
    await dbaccess.commitTransaction(connection);
    dbaccess.releaseConnection(connection);
}

async function getAllHoliday(req, res) {
    try {
        const result = await dbaccess.exeQuery(GET_ALL_HOLIDAY);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] get success`);
        res.status(200).send(result)
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
    }
}

module.exports = {
    addNewHoliday,
    deleteHoliday,
    getAllHoliday
}