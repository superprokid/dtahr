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
        autoDetectedSystem: 3,
        byAdmin: 4
    },
    WORKTIME_DEFAULT: {
        hour_start: 8,
        min_start: 30,
        hour_end: 17,
        min_end: 30,
        lunch_hour_start: 12,
        lunch_min_start: 0,
        lunch_hour_end: 13,
        lunch_min_end: 0,
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
    LEAVE_TYPE: {
        off: 0,
        late: 1,
    },
    LEAVE_TICKET_STATUS: {
        approve: 1,
        pending: 0,
    },
    CHECKOUT_BATCH_CRON: "0 30 18 * * 1-5", // At 19:00 on every day-of-week from Monday through Friday 
    VALID_HOUR: 7,
    WORK_TIME_FULL: 8,
    MAX_EMPLOYEE_ID_LENGTH: 7,
    ROLE: {
        employee: 0,
        employer: 1,
    },
    EMPLOYEE_WEB_LOGIN: 'http://127.0.0.1:8080/user/login',
}