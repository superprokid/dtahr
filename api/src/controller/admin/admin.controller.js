const logger = require('../../common/logger');
const { exeQuery, getConnection, beginTransaction, queryTransaction, commitTransaction, releaseConnection, rollback } = require("../../common/dbaccess");
const { convertSQLResultToJSON } = require("../../common/utils");
const { encrypt, decrypt, compare } = require("../../common/cryptcommon");
const { sendMail } = require('../../common/mailer');

const LOG_CATEGORY = "AdminController";
const GET_ADMIN_BY_USERNAME = "SELECT * FROM administrator WHERE username = ? ORDER BY update_at DESC  LIMIT 1";
const UPDATE_LOGIN_STATUS = "   UPDATE administrator "
    + "                         SET login_date = now(), login_failed_date = NULL, login_session = ?, login_session_expired = ?"
    + "                         WHERE username = ? ";
const UPDATE_LOGIN_FAILED_STATUS = "   UPDATE administrator "
    + "                         SET login_failed_date = now()"
    + "                         WHERE username = ? "
const GET_ALL_USER = "  SELECT e.*,  CONCAT(e.first_name, ' ', e.last_name) as full_name, CONCAT(er.first_name, ' ', er.last_name) as employer_full_name, g.group_name, g.group_full_name "
    + "                 FROM employee e INNER JOIN `group` g ON e.group_id = g.group_id "
    + "                      LEFT JOIN employee er ON e.employer_id = er.employee_id";
const GET_START_ADMIN = " SELECT username, login_date, login_failed_date, password_expired, create_at, update_at FROM administrator WHERE username = ? "

/**
 * login for admin
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function login(req, res) {
    const connection = await getConnection();
    await beginTransaction(connection);
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] username or password is undefinded`);
            res.status(400).send({message: "Username or Password is invalid"}); 
            await commitTransaction(connection);
            releaseConnection(connection);
            return;
        }
        const result = await exeQuery(GET_ADMIN_BY_USERNAME, [username]);
        if (!result.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] username is not exist in database`);
            res.status(400).send({message: "Username or Password is invalid"});
            await commitTransaction(connection);
            releaseConnection(connection);
            return;
        }
        convertSQLResultToJSON(result);
        const admin = convertSQLResultToJSON(result)[0];
        if (!compare(password, admin.password)) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] password is not match`);
            // update login failed status
            await queryTransaction(connection, UPDATE_LOGIN_FAILED_STATUS, [username]);
            // commit query and release
            await commitTransaction(connection);
            releaseConnection(connection)
            res.status(400).send({message: "Username or Password is invalid"});
            return;
        }
        delete admin.password;
        delete admin.login_session;
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] - Create new session`);
        const session = encrypt(admin);
        const today = new Date();
        today.setHours(today.getHours() + 1);
        // update login session
        queryTransaction(connection, UPDATE_LOGIN_STATUS, [session, today, username])
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] - response`);
        res.status(200).send({
            loginSession: session
        })
        await commitTransaction(connection);
        releaseConnection(connection);
    } catch (error) {
        await rollback(connection);
        releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"})
    }
}

/**
 * Get all employees
 * @param {*} req 
 * @param {*} res 
 */
async function getAllUser(req, res) {
    try {
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] - response`);
        res.status(200).send({
            listEmployees: await exeQuery(GET_ALL_USER)
        })
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"})
    }
}

async function getStartAdmin(req, res) {
    try {
        const username = req.username;
        const result = await exeQuery(GET_START_ADMIN, [username]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] - response`);
        res.status(200).send(result.length ? result[0] : {});
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"})
    }
}

async function createNewEmployee(req, res) {
    sendMail("ldthang2201@gmail.com");
}

module.exports = {
    login,
    getAllUser,
    createNewEmployee,
    getStartAdmin,
}