const { UnAuthorization, InvalidToken } = require('../config/code');
const { verifyToken } = require('../common/cryptcommon');


function authen(req, res, next) {
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
    if (!verifyToken(token)) {
        res.status(InvalidToken.statusCode).send(InvalidToken);
        return
    }
    next()
}

module.exports = {
    authen
}