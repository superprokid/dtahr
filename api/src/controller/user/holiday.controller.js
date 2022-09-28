const { exeQuery } = require('../../common/dbaccess');
const logger = require('../../common/logger')
const LOG_CATEGORY = "[Holiday Controller]"
const GET_ALL_HOLIDAY = "SELECT holiday_id, date, description FROM holiday ORDER BY date DESC";

async function getAllHoliday(req, res) {
    try {
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] resonse `);
        res.status(200).send(await exeQuery(GET_ALL_HOLIDAY));
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
    }
}

module.exports = {
    getAllHoliday
}