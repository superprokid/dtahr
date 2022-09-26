const cron = require('node-cron');
const logger = require('../common/logger');
const { CHECKOUT_BATCH_CRON } = require('../config/constants');
const autoCheckout = require('../batchs/autocheckout');

function run() {
    cron.schedule(CHECKOUT_BATCH_CRON, () => {
        logger.info(`[Batch] Auto check out batch start`);
        autoCheckout.run(() => {
            logger.info(`[Batch] Auto check out batch end`);
        })
    })
}

module.exports = {
    run,
}