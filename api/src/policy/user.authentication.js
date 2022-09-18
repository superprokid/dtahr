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
    const data = verifyToken(token)
    if (!data) {
        res.status(InvalidToken.statusCode).send(InvalidToken);
        return
    }
    req.employee_id = data.employee_id
    next()
}

module.exports = {
    authen
}