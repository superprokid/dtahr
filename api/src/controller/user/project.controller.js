const { exeQuery } = require('../../common/dbaccess');
const logger = require('../../common/logger')
const LOG_CATEGORY = "[Project Controller]"
const GET_CURRENT_PROJECT = "SELECT * FROM project";

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
    getAllProjects
}