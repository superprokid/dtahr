const logger = require('../common/logger')
const { UnAuthorization, InvalidToken } = require('../config/code');
const { verifyToken, decrypt } = require('../common/cryptcommon');
const { getConnection, beginTransaction, rollback, releaseConnection, commitTransaction, exeQuery, queryTransaction } = require('../common/dbaccess');
const { query } = require('express');

const GET_ADMIN_BY_USERNAME = "SELECT * FROM administrator WHERE username = ? LIMIT 1";
const UPDATE_SESSION_EXPIRES_DATE = "UPDATE administrator SET login_session_expired = ? WHERE username = ?"

const LOG_CATEGORY = "Admin Authentication"
async function adminAuthen(req, res, next) {
    const connection = await getConnection();
    await beginTransaction(connection);
    try {
        const headers = req.headers;
        const authorization = headers.authorization;
        if (!authorization) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] authorization is undefinded`);
            res.status(UnAuthorization.statusCode).send(UnAuthorization);
            await commitTransaction(connection);
            releaseConnection(connection);
            return;
        }
        const authArr = authorization.split(" ");
        if (authArr.length < 2 || authArr[0] !== "Bearer") {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] authorization without Bearer`);
            res.status(UnAuthorization.statusCode).send(UnAuthorization);
            await commitTransaction(connection);
            releaseConnection(connection);
            return;
        }
        const session = authArr[1];
        const decryptData = decrypt(session);
        if (!decryptData || !decryptData.username || !decryptData.login_session_expired) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] session is not valid`);
            res.status(UnAuthorization.statusCode).send(UnAuthorization);
            await commitTransaction(connection);
            releaseConnection(connection);
            return;
        }
        const result = await queryTransaction(connection, GET_ADMIN_BY_USERNAME, [decryptData.username]);
        if (!result || !result.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] username is exist in database`);
            res.status(UnAuthorization.statusCode).send(UnAuthorization);
            await commitTransaction(connection);
            releaseConnection(connection);
            return;
        }
        const admin = result[0];
        if (!(admin.login_session === session)) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] session is not match`);
            res.status(UnAuthorization.statusCode).send(UnAuthorization);
            await commitTransaction(connection);
            releaseConnection(connection);
            return;
        }
        const today = new Date();
        const expriesDate = new Date(admin.login_session_expired);
        if (today.getTime() >= expriesDate.getTime()) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] session is expried`);
            res.status(UnAuthorization.statusCode).send(UnAuthorization);
            await commitTransaction(connection);
            releaseConnection(connection);
            return;
        }
        today.setHours(today.getHours() + 1);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] update session expries`);
        await queryTransaction(connection, UPDATE_SESSION_EXPIRES_DATE, [today, decryptData.username]);
        await commitTransaction(connection);
        releaseConnection(connection);

        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] body: ${JSON.stringify(req.body)})`);
        req.username = admin.username;

        next()
    } catch (error) {
        await rollback(connection);
        releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"})
    }
}

module.exports = {
    adminAuthen
}