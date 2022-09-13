const logger = require('../common/logger');
const { verifyToken, signToken, signRefreshToken, verifyRefreshToken, hash, compare } = require('../common/cryptcommon');
const { exeQuery } = require('../common/dbaccess');

const LOG_CATEGORY = "UserController"
const QUERY_VERIFY_USER = "SELECT * FROM employee WHERE employee_id = ? and is_deleted <> 1 LIMIT 1";
const GET_USER_BY_EMAIL = "SELECT * FROM employee WHERE email = ? and is_deleted <> 1 ORDER BY update_at DESC  LIMIT 1";

async function verifyUser(data) {
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
}

async function refreshToken(req, res) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] refreshToken is not exist`);
        res.status(403).send("RefreshToken is required");
        return;
    }
    const data = verifyRefreshToken(refreshToken);
    if (!data || !(await verifyUser(data))) {
        logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] user is not exist`);
        res.status(403).send("User is not exist");
        return;
    }
    const newToken = signToken(data);
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`);
    res.status(200).send({
        accessToken: newToken,
        refreshToken: refreshToken
    });
}

async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] email or password is not exist`);
        res.status(400).send("Email or Password not valid");
        return;
    }

    const result = await exeQuery(GET_USER_BY_EMAIL, [email]);
    if (!result.length) {
        logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] email is not exist in database`);
        res.status(400).send("Email or Password not valid");
        return;
    }
    const listUser = Object.values(JSON.parse(JSON.stringify(result)));
    const user = listUser[0];
    if (!compare(password, user.password)) {
        logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] password is not match`);
        res.status(400).send("Wrong password");
        return;
    }
    delete user.password;
    const accessToken = signToken(user);
    const refreshToken = signRefreshToken(user);
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`);
    res.status(200).send({
        accessToken,
        refreshToken
    })

}

function get(req, res) {
    res.status(200).send("get success");
}

module.exports = {
    login,
    get,
    refreshToken,
}