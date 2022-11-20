const logger = require('../../common/logger');
const { getDateStartOfMonth, getDateEndOfMonth, getDateStringWithFormat } = require('../../common/utils');
const Excel = require('../../model/excel');
const exportOT = require('../../model/export/overtime.export');
const exportLeave = require('../../model/export/leave.export');
const exportSalary = require('../../model/export/salary.export');
const { exeQuery } = require('../../common/dbaccess');

const LOG_CATEGORY = "[EXPORT EXCEL]";
const OVERTIME_TEMPLATE_PATH = './src/template/overtime_template.xlsx';
const LEAVE_TEMPLATE_PATH = './src/template/leave_template.xlsx';
const SALARY_TEMPLATE_PATH = './src/template/salary_template.xlsx';

const GET_NUMBER_OVERTIME_TICKER = "SELECT COUNT(*) as number FROM `overtime` WHERE `status` = 1 and start_date BETWEEN ? and ?";
const GET_NUMBER_LEAVE_TICKER = "SELECT COUNT(*) as number FROM `leave` WHERE `status` = 1 and start_date BETWEEN ? and ?";
const GET_NUMBER_MONTHLYREPORT = "SELECT COUNT(*) as number FROM monthlyreport WHERE `month` = ? and `year` = ?"

async function exportOverTime(req, res) {
    try {
        const { date } = req.query;
        if (!date) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}]: date is required`);
            res.status(400).send({ message: "Something went wrong, please contact administrator to solve this problem!" });
            return;
        }

        const firstDate = getDateStartOfMonth(date);
        const lastDate = getDateEndOfMonth(date);

        const checkExist = await exeQuery(GET_NUMBER_OVERTIME_TICKER, [firstDate, lastDate]);
        if (checkExist[0]?.number <= 0) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}]: not exist data to export`);
            res.status(400).send({ message: "There are no data of overtime to export in this month" });
            return;
        }

        const excel = new Excel(OVERTIME_TEMPLATE_PATH);
        await exportOT.run(excel, firstDate, lastDate);
        const buffer = await excel.getFile();
        const filename = `Overtime-${getDateStringWithFormat(date, 'MMM-YYYY')}.xlsx`
        res.set('Content-disposition', 'attachment; filename=' + filename);
        res.set('Content-Type', 'text/plain');
        res.status(200).send(buffer);

    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function exportLeaveTicket(req, res) {
    try {
        const { date } = req.query;
        if (!date) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}]: date is required`);
            res.status(400).send({ message: "Something went wrong, please contact administrator to solve this problem!" });
            return;
        }

        const firstDate = getDateStartOfMonth(date);
        const lastDate = getDateEndOfMonth(date);

        const checkExist = await exeQuery(GET_NUMBER_LEAVE_TICKER, [firstDate, lastDate]);
        if (checkExist[0]?.number <= 0) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}]: not exist data to export`);
            res.status(400).send({ message: "There are no data of leave ticket to export in this month" });
            return;
        }

        const excel = new Excel(LEAVE_TEMPLATE_PATH);
        await exportLeave.run(excel, firstDate, lastDate);
        const buffer = await excel.getFile();
        const filename = `LeaveTicket-${getDateStringWithFormat(date, 'MMM-YYYY')}.xlsx`
        res.set('Content-disposition', 'attachment; filename=' + filename);
        res.set('Content-Type', 'text/plain');
        res.status(200).send(buffer);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function exportSalaryAll(req, res) {
    try {
        const { month, year } = req.query;
        if (!year || !month) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}]: year and month is required`);
            res.status(400).send({ message: "Something went wrong, please contact administrator to solve this problem!" });
            return;
        }

        const checkExist = await exeQuery(GET_NUMBER_MONTHLYREPORT, [month, year]);
        if (checkExist[0]?.number <= 0) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}]: not exist data to export`);
            res.status(400).send({ message: "There are no data of salary to export in this month" });
            return;
        }

        const excel = new Excel(SALARY_TEMPLATE_PATH);
        await exportSalary.run(excel, month, year);
        const buffer = await excel.getFile();
        const filename = `Salary-${month}-${year}.xlsx`
        res.set('Content-disposition', 'attachment; filename=' + filename);
        res.set('Content-Type', 'text/plain');
        res.status(200).send(buffer);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

module.exports = {
    exportOverTime,
    exportLeaveTicket,
    exportSalaryAll,
}