const cron = require('node-cron');
const logger = require('../common/logger');
const { CHECKOUT_BATCH_CRON, MONTHLY_REPORT_BATCH_CRON, UPDATE_HOLIDAY_AUTO_BATCH } = require('../config/constants');
const autoCheckout = require('../batchs/autocheckout');
const monthlyReport = require('../batchs/monthlyreport');
const updateHoliday = require('../batchs/autoIncrePaidLeave');

const LIMIT_BATCH = 1;
let countAutoCheckout = 0;
let countMonthlyReport = 0;
let countUpdateHolidayTime = 0;

function run() {
    cron.schedule(CHECKOUT_BATCH_CRON, () => {
        if (countAutoCheckout < LIMIT_BATCH) {
            countAutoCheckout++;
            logger.info(`[Batch] Auto check out batch start`);
            autoCheckout.run(() => {
                logger.info(`[Batch] Auto check out batch end`);
                countAutoCheckout--;
            })
        }
    })
    cron.schedule(MONTHLY_REPORT_BATCH_CRON, () => {
        if (countMonthlyReport < LIMIT_BATCH) {
            countMonthlyReport++;
            logger.info(`[Batch] Monthly report batch start`);
            monthlyReport.run(() => {
                logger.info(`[Batch] Monthly report batch end`);
                countMonthlyReport--;
            })
        }
    })
    cron.schedule(UPDATE_HOLIDAY_AUTO_BATCH, () => {
        if (countUpdateHolidayTime < LIMIT_BATCH) {
            countUpdateHolidayTime++;
            logger.info(`[Batch] Monthly update holiday time start`);
            updateHoliday.run(() => {
                logger.info(`[Batch] Monthly update holiday time end`);
                countUpdateHolidayTime--;
            })
        }
    })
}

module.exports = {
    run,
}