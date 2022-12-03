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
        reject: 2,
    },
    LEAVE_TYPE: {
        off: 0,
        late: 1,
    },
    LEAVE_TICKET_STATUS: {
        approve: 1,
        pending: 0,
        reject: 2,
    },
    WFH_TICKET_STATUS: {
        approve: 1,
        pending: 0,
        reject: 2,
    },
    CHECKOUT_BATCH_CRON: "0 30 18 * * 1-5", // At 19:00 on every day-of-week from Monday through Friday 
    MONTHLY_REPORT_BATCH_CRON: "0 1 0 1 * *", // At 00:01 every first day of month,
    UPDATE_HOLIDAY_AUTO_BATCH: "0 0 2 1 * *", // At 02:00 every first day of month,
    VALID_HOUR: 7,
    WORK_TIME_FULL: 8,
    MAX_EMPLOYEE_ID_LENGTH: 7,
    MAX_GROUP_ID_LENGTH: 6,
    MAX_PROJECT_ID_LENGTH: 4,
    ROLE: {
        employee: 0,
        employer: 1,
    },
    EMPLOYEE_WEB_LOGIN: 'http://127.0.0.1:8080/user/login',
    TASK_PRIORITY: {
        low: 0,
        normal: 1,
        high: 2
    },
    TASK_PRIORITY_TEXT: ['Low', 'Normal', 'High'],
    TASK_STATUS: {
        open: 0,
        inProgress: 1,
        resolved: 2,
        closed: 3
    },
    TASK_STATUS_TEXT: ['Open', 'In Progress', 'Resolved', 'Closed'],
    EXPORT_TYPE: {
        infor: 1,
        overtime: 2,
        leave: 3,
        workHistory: 4,
        monthlyreport: 5,
        workLog: 6,
    },
    ALLOWANCE_DEFAULT: {
        lunch: 700000,
        house: 3000000,
        transport: 500000,
        phone: 400000,
        internet: 200000,
        insurance: 0.1,
        tax: 0.1
    },
    POLICY_TYPE: {
        overtime: 1,
        allowance: 2,
        holidayIncrease: 3
    }
}