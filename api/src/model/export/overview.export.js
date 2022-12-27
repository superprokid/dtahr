const logger = require('../../common/logger');
const dbaccess = require('../../common/dbaccess');
const moment = require('moment');
const Excel = require('../excel');
const GET_OVERVIEW = "SELECT emp.*, mr.work_total_hours, mr.work_total_days, ot.number_ot, FORMAT(mr.overtime_payment_total, 0), lea.number_leave, FORMAT(mr.salary_total, 0) "
    + "FROM ("
    + " 	SELECT e.employee_id, CONCAT(e.first_name, ' ', e.last_name) as full_name, e.job_role, g.group_name, CONCAT(er.first_name, ' ', er.last_name) as manager_full_name"
    + " 	FROM employee e "
    + " 	INNER JOIN `group` g ON g.group_id = e.group_id	"
    + " 	LEFT JOIN employee er ON e.employer_id = er.employee_id	"
    + ") emp"
    + " 	LEFT JOIN ("
    + " 	SELECT employee_id, count(*) as number_leave FROM `leave` WHERE CAST(start_date as DATE) BETWEEN ? and ? and `status` = 1 GROUP BY employee_id"
    + ") lea ON emp.employee_id = lea.employee_id"
    + " 	LEFT JOIN ("
    + " 	SELECT employee_id, count(*) as number_ot FROM `overtime` WHERE CAST(start_date as DATE) BETWEEN ? and ? and `status` = 1 GROUP BY employee_id"
    + ")	ot ON emp.employee_id = ot.employee_id"
    + " 	LEFT JOIN ("
    + " 	SELECT * FROM `monthlyreport` WHERE `month` = ? and `year` = ? "
    + ") mr ON emp.employee_id = mr.employee_id"

/**
 * Export Leave ticket of all staff from startDate to endDate
 * @param {Excel} excel 
 * @param {*} startDate 
 * @param {*} endDate 
 */
async function run(excel, startDate, endDate, month, year) {
    await excel.open();
    const workSheet = excel.getWorkSheet('Overview');
    const data = await getOverview(startDate, endDate, month, year);
    writeDate(excel, workSheet, data);
}

async function getOverview(startDate, endDate, month, year) {
    const list = [];
    const result = await dbaccess.exeQuery(GET_OVERVIEW, [startDate, endDate, startDate, endDate, month, year]);
    for (let i = 0; i < result.length; i++) {
        list.push([...Object.values(result[i])])
    }
    return list;
}

function writeDate(excel, workSheet, data) {
    let i = 0
    const firstRow = 6;
    const firstColumn = 1;
    for (; i < data.length; i++) {
        excel.write(data[i], workSheet, firstRow + i, firstColumn, Excel.LEFT_TO_RIGHT, false, Excel.FONT_BLACK);
    }
    excel.addBorderStyleRange(excel.getRange(workSheet, firstRow, firstColumn, firstRow + i - 1, 11));
}

module.exports = {
    run
}