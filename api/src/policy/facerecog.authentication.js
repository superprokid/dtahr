const { UnAuthorization, InvalidToken } = require('../config/code');
const { FACERECOG_API_KEY } = require('../config/env');

function faceRecogAuthen(req, res, next) {
    const headers = req.headers;
    const apiKey = headers['api-key'];
    console.log(headers);
    if (!apiKey || apiKey !== FACERECOG_API_KEY) {
        res.status(UnAuthorization.statusCode).send(UnAuthorization);
        return
    }
    next()
}

module.exports = {
    faceRecogAuthen
}