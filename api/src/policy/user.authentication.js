const { UnAuthorization, InvalidToken } = require('../config/code');
const { verifyToken } = require('../common/cryptcommon');
const logger = require('../common/logger');
const { exeQuery } = require('../common/dbaccess');

const LOG_CATEGORY = "UserAuthentication";
const QUERY_VERIFY_USER = "SELECT * FROM employee WHERE employee_id = ? and is_deleted <> 1 LIMIT 1";

async function authen(req, res, next) {
    const headers = req.headers;
    const authorization = headers.authorization;
    if (!authorization) {
        res.status(UnAuthorization.statusCode).send(UnAuthorization);
        return
    }
    const authArr = authorization.split(" ");
    if (authArr.length < 2 || authArr[0] !== "Bearer") {
        res.status(UnAuthorization.statusCode).send(UnAuthorization);
        return
    }
    const token = authArr[1];
    const data = verifyToken(token)
    if (!data) {
        res.status(InvalidToken.statusCode).send(InvalidToken);
        return
    }

    const user = await verifyUser(data);
    req.employee_id = user.employee_id;
    req.employer_id = user.employer_id;
    req.group_id = user.group_id;
    req.role = user.role;
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] request with body: ${JSON.stringify(req.body)} and params: ${JSON.stringify(req.query)}`);

    next()
}

async function verifyUser(data) {
    try {
        if (!data || !data.employee_id) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] data or data.employee_id is not exist`);
            return false;
        }
        const listUser = await exeQuery(QUERY_VERIFY_USER, [data.employee_id]);
        if (!listUser.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] user is not exist in database`);
            return false;
        }
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] verify user success - return user`);
        return listUser[0];
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        return false;
    }
}

module.exports = {
    authen
}