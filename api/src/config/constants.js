module.exports = {
    PORT: 3000,
    EXPIRES_TIME: 86400, // 24h
    WORKER_MAX: 2,
    WORKLOG_STATUS: {
        checkin: 0,
        checkout: 1,
    },
    WORKHISTORY_STATUS: {
        checkin: 0,
        checkout: 1,
        autoCheckout: 2,
    },
    WORKTIME_DEFAULT: {
        hour_start: 8,
        min_start: 30,
        hour_end: 17,
        min_end: 30,
        lunch_time: 1,
    },
    CHECKOUT_BATCH_CRON: "0 */5 * * * *",
}