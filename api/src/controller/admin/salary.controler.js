const logger = require('../../common/logger');
const dbaccess = require('../../common/dbaccess');
const { validateRequest } = require('../../common/utils');

const LOG_CATEGORY = "ADMIN SALARY CONTROLLER";
const GET_SALARY_BY_MONTH = "SELECT e.employee_id, CONCAT(first_name, ' ', last_name) as full_name, FORMAT(e.salary, 0) as current_salary, e.avt, job_role, group_name, bank_name, bank_account, report.* "
    + "                     FROM employee e LEFT JOIN ("
    + "                     		SELECT mr.employee_id as employeeId, work_total_hours, FORMAT(salary_basic, 0) as salary_basic, FORMAT(salary_hour, 0) as salary_hour,  FORMAT(house_support, 0) as house_support,  FORMAT(lunch_support, 0) as lunch_support,  FORMAT(transport_support, 0) as transport_support, "
    + "                                     FORMAT(internet_support, 0) as internet_support,  FORMAT(phone_support, 0) as phone_support, FORMAT(insurance, 0) as insurance,  FORMAT(tax, 0) as tax,  FORMAT(overtime_payment_total, 0) as overtime_payment_total, FORMAT(bonus_reward, 0) as bonus_reward, FORMAT(salary_total, 0) as salary_total"
    + "                     		FROM monthlyreport mr "
    + "                     		WHERE `month` = ? and `year` = ?) report ON e.employee_id = report.employeeId"
    + "                     	INNER JOIN `group` g ON e.group_id = g.group_id"
    + "                     WHERE e.is_deleted <> 1";
const SELECT_MONTHLY_REPORT = "SELECT * FROM monthlyreport WHERE employee_id = ? and month = ? and year = ?";
const UPDATE_MONTHLY_REPORT = "UPDATE monthlyreport SET salary_total = ?, bonus_reward = ?, overtime_payment_total = ? WHERE employee_id = ? and month = ? and year = ?";

async function getSalaryByMonth(req, res) {
    try {
        const validateSchema = {
            month: {
                type: 'number',
                required: true
            },
            year: {
                type: 'number',
                required: true
            },
        }

        const validResult = validateRequest(req.query, validateSchema);
        if (validResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            res.status(403).send({ message: validResult });
            return;
        }

        const { month, year } = req.query;
        const result = await dbaccess.exeQuery(GET_SALARY_BY_MONTH, [month, year]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] get salary success`);
        res.status(200).send(result);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function updateSalary(req, res) {
    const connection = await dbaccess.getConnection();
    dbaccess.beginTransaction(connection);
    try {
        const validateSchema = {
            employeeId: {
                type: 'string',
                required: true
            },
            month: {
                type: 'number',
                required: true
            },
            year: {
                type: 'number',
                required: true
            },
            bonusReward: {
                type: 'number',
                required: true
            },
            overtimePayment: {
                type: 'number',
                required: true
            }
        }

        const validResult = validateRequest(req.body, validateSchema);
        if (validResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(403).send({ message: validResult, failed: true });
            return;
        }
        const { employeeId, month, year, bonusReward, overtimePayment } = req.body;
        const currentSalary = await dbaccess.queryTransaction(connection, SELECT_MONTHLY_REPORT, [employeeId, month, year]);
        if (currentSalary.length) {
            const current = currentSalary[0];
            const salaryTotal = current.salary_basic + current.transport_support + current.house_support + current.internet_support + current.lunch_support - current.insurance - current.tax + Number(bonusReward) + Number(overtimePayment);
            await dbaccess.queryTransaction(connection, UPDATE_MONTHLY_REPORT, [salaryTotal, bonusReward, overtimePayment, employeeId, month, year]);
        }

        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] Update success`);
        res.status(200).send({ message: 'Update success' });
        await dbaccess.commitTransaction(connection);
        dbaccess.releaseConnection(connection);
    } catch (error) {
        await dbaccess.rollback(connection);
        dbaccess.releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

module.exports = {
    getSalaryByMonth,
    updateSalary,
}