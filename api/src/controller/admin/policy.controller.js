const logger = require('../../common/logger');
const dbaccess = require('../../common/dbaccess');
const { validateRequest } = require('../../common/utils');
const { OT_PAYMENT_DEFAULT, ALLOWANCE_DEFAULT, POLICY_TYPE } = require('../../config/constants');

const LOG_CATEGORY = "[ADMIN POLICY]"
const GET_ALLOWANCE_POLICY = "SELECT * FROM allowance";
const GET_OT_PAYMENT = "SELECT * FROM overtimepayment";
const GET_NUMBER_INCREASE = "SELECT * FROM keyvalue WHERE `key` = 'increase_paid_leave_month'";

const UPDATE_OT_PAYMENT = "UPDATE overtimepayment SET ot_payment_daily_day = ?, ot_payment_weekend = ?, ot_payment_daily_night = ?, ot_payment_holiday = ?";
const UPDATE_ALLOWANCE = "UPDATE allowance SET lunch = ?, house = ?, transport = ?, phone = ?, internet = ?, insurance = ?, tax = ?";
const UPDATE_NUMBER_INCREASE_HOLIDAY = " UPDATE keyvalue SET `value` = ? WHERE `key` = 'increase_paid_leave_month'";

async function getAllPolicy(req, res) {
    try {
        const result = {};
        const listOTPayment = await dbaccess.exeQuery(GET_OT_PAYMENT);
        result.otPayment = listOTPayment.length ? listOTPayment[0] : OT_PAYMENT_DEFAULT;
        const listAllowance = await dbaccess.exeQuery(GET_ALLOWANCE_POLICY);
        result.allowance = listAllowance.length ? listAllowance[0] : ALLOWANCE_DEFAULT;
        const holidayIncrease = await dbaccess.exeQuery(GET_NUMBER_INCREASE);
        result.increase_paid_leave_month = holidayIncrease.length ? holidayIncrease[0].value : 1;
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`);
        res.status(200).send(result);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function updatePolicy(req, res) {
    const connection = await dbaccess.getConnection();
    dbaccess.beginTransaction(connection);
    try {
        const validateSchema = {
            type: {
                type: 'number',
                required: true
            },
            data: {
                required: true,
            }
        }
        const validResult = validateRequest(req.body, validateSchema);
        if (validResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(403).send(validResult);
            return;
        }

        const { type, data} = req.body;

        switch (type) {
            case POLICY_TYPE.overtime:
                const { ot_payment_daily_day, ot_payment_weekend, ot_payment_daily_night, ot_payment_holiday } = data;
                await dbaccess.queryTransaction(connection, UPDATE_OT_PAYMENT, [ot_payment_daily_day, ot_payment_weekend, ot_payment_daily_night, ot_payment_holiday]);
                break;
            case POLICY_TYPE.allowance:
                const { lunch, house, transport, phone, internet, insurance, tax } = data;
                await dbaccess.queryTransaction(connection, UPDATE_ALLOWANCE, [lunch, house, transport, phone, internet, insurance, tax]);
                break;
            case POLICY_TYPE.holidayIncrease:
                const { increase_paid_leave_month } = data;
                await dbaccess.queryTransaction(connection, UPDATE_NUMBER_INCREASE_HOLIDAY, [increase_paid_leave_month]);
                break;
            default:
                // not implement
                break;
        }

        await dbaccess.commitTransaction(connection);
        dbaccess.releaseConnection(connection);
        res.status(200).send({ message: "Update success" });
    } catch (error) {
        await dbaccess.rollback(connection);
        dbaccess.releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

module.exports = {
    getAllPolicy,
    updatePolicy,
}