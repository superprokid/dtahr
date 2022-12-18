const { UnAuthorization, InvalidToken } = require('../config/code');
const { FACERECOG_API_KEY } = require('../config/env');
const logger = require('../common/logger');

const LOG_CATEGORY = "FACE AUTHEN";

function faceRecogAuthen(req, res, next) {
    const headers = req.headers;
    const apiKey = headers['api-key'];
    if (!apiKey || apiKey !== FACERECOG_API_KEY) {
        res.status(UnAuthorization.statusCode).send(UnAuthorization);
        return
    }
    
    logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] request with body: ${JSON.stringify(req.body)} and params: ${JSON.stringify(req.query)}`);
    next()
}

module.exports = {
    faceRecogAuthen
}