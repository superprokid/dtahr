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
    OT_PAYMENT_DEFAULT: {
        ot_payment_daily_day: 1,
        ot_payment_weekend: 1.5,
        ot_payment_daily_night: 1.5,
        ot_payment_holiday: 2.5,
    },
    OT_TICKET_STATUS: {
        approve: 1,
        pending: 0,
    },
    CHECKOUT_BATCH_CRON: "0 */5 * * * *",
    VALID_HOUR: 7,
}