const mailer = require('nodemailer');
const { MAIL_SENDER, MAIL_PASS } = require('../config/env');

const transporter = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: MAIL_SENDER,
        pass: MAIL_PASS
    } 
})

function sendMail(receiver, subject = "", text = "", html = "", apm = "") {
    if (!receiver) {
        return;
    }
    const message = {
        from: "UTE-HRM",
        to: receiver,
        subject: 'AMP4EMAIL message',
        text: 'For clients with plaintext support only',
        html: '<p>For clients that do not support AMP4EMAIL or amp content is not valid</p>',
        amp: `<!doctype html>
        <html ⚡4email>
          <head>
            <meta charset="utf-8">
            <style amp4email-boilerplate>body{visibility:hidden}</style>
            <script async src="https://cdn.ampproject.org/v0.js"></script>
            <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
          </head>
          <body>
            <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
            <p>GIF (requires "amp-anim" script in header):<br/>
              <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
          </body>
        </html>`
    }
    transporter.sendMail(message);
}

module.exports = {
    sendMail,
}