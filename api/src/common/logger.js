const log4js = require('log4js');
log4js.configure({
    appenders: { hrm: { type: "console"} },
    categories: { default: { appenders: ["hrm"], level: "info" } },
});

const logger = log4js.getLogger("hrm");

function info(message = "") {
    logger.info(message);
}

function error(message = "") {
    logger.error(message);
}

function warn(message = "") {
    logger.warn(message);
}

module.exports = {
    info,
    error,
    warn,
}