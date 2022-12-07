const logger = require('../../common/logger');
const dbaccess = require('../../common/dbaccess');
const moment = require('moment');
const Excel = require('../excel');
const header = ['No', 'Name', 'Position', 'Group', 'Manager', 'Time start', 'Time end', 'Project', 'Payment', 'Note']
const GET_OVERTIME_TICKET = "SELECT CONCAT(e.first_name, ' ', e.last_name) as full_name, e.job_role, g.group_name, CONCAT(er.first_name, ' ', er.last_name) as manager_full_name, DATE_FORMAT(ot.start_date, '%M %d %Y %H:%i:%s') as start_date, DATE_FORMAT(ot.end_date, '%M %d %Y %H:%i:%s') as end_date, p.project_name, FORMAT(ot.payment, 0), ot.reason "
    + "                     FROM overtime ot "
    + "                     	INNER JOIN project p ON ot.project_id = p.project_id"
    + "                     	INNER JOIN employee e ON ot.employee_id = e.employee_id	"
    + "                     	INNER JOIN `group` g ON g.group_id = e.group_id	"
    + "                     	LEFT JOIN employee er ON e.employer_id = er.employee_id	"
    + "                     WHERE CAST(start_date as DATE) BETWEEN ? and ? and `status` = 1";

/**
 * Export Overtime of all staff from startDate to endDate
 * @param {Excel} excel 
 * @param {*} startDate 
 * @param {*} endDate 
 */
async function run(excel, startDate, endDate) {
    await excel.open();
    const workSheet = excel.getWorkSheet('Overtime');
    const data = await getOvertimeTicket(startDate, endDate);
    writeDate(excel, workSheet, data);
}

async function getOvertimeTicket(startDate, endDate) {
    const list = [];
    const result = await dbaccess.exeQuery(GET_OVERTIME_TICKET, [startDate, endDate]);
    for (let i = 0; i < result.length; i++) {
        list.push([i + 1, ...Object.values(result[i])])
    }
    return list;
}

function writeDate(excel, workSheet, data) {
    let i = 0
    const firstRow = 6;
    const firstColumn = 1;
    for (; i< data.length; i++) {
        excel.write(data[i], workSheet, firstRow + i, firstColumn, Excel.LEFT_TO_RIGHT, false, Excel.FONT_BLACK);
    }

    excel.addBorderStyleRange(excel.getRange(workSheet, firstRow, firstColumn, firstRow + i - 1, 10));
}

module.exports = {
    run
}