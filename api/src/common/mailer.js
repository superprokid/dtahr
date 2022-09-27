const mailer = require('nodemailer');
const logger = require('./logger');
const { EMPLOYEE_WEB_LOGIN } = require('../config/constants');
const { MAIL_SENDER, MAIL_PASS } = require('../config/env');

const transporter = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: MAIL_SENDER,
        pass: MAIL_PASS
    }
})

function sendMail(receiver, password) {
    return new Promise((resolve, reject) => {
        if (!receiver) {
            return;
        }
        const message = {
            from: "UTE-HRM",
            to: receiver,
            subject: 'UTE-HRM Login information - your password',
            text: 'For employee with password',
            html: `    <h3>Welcome to UTE-HRM</h3>
            <p>Your password is: ${password}</p>
            <p>Go to <a href="http://127.0.0.1:8080/user/login">Login</a> to login with your email and working with us</p>`,
        }
        transporter.sendMail(message).then(result => {
            logger.info(`[Send mail service]: Send mail success ` + result);
            resolve(true);
        }).catch(error => {
            logger.error(`[Send mail service]: Send mail error` + error.stack);
            reject(false);
        });
    })
}

module.exports = {
    sendMail,
}