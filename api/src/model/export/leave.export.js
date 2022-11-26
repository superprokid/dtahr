const logger = require('../../common/logger');
const dbaccess = require('../../common/dbaccess');
const moment = require('moment');
const Excel = require('../excel');
const GET_LEAVE_TICKET = "SELECT CONCAT(e.first_name, ' ', e.last_name) as full_name, e.job_role, g.group_name, CONCAT(er.first_name, ' ', er.last_name) as manager_full_name, DATE_FORMAT(l.start_date, '%M %d %Y %H:%i:%s') as start_date, DATE_FORMAT(l.end_date, '%M %d %Y %H:%i:%s') as end_date, IF(type = 0,'OFF','LATE') as type, l.reason "
    + "                     FROM `leave` l "
    + "                     	INNER JOIN employee e ON l.employee_id = e.employee_id	"
    + "                     	INNER JOIN `group` g ON g.group_id = e.group_id	"
    + "                     	LEFT JOIN employee er ON e.employer_id = er.employee_id	"
    + "                     WHERE CAST(start_date as DATE) BETWEEN ? and ? and `status` = 1"

/**
 * Export Leave ticket of all staff from startDate to endDate
 * @param {Excel} excel 
 * @param {*} startDate 
 * @param {*} endDate 
 */
async function run(excel, startDate, endDate) {
    await excel.open();
    const workSheet = excel.getWorkSheet('Leave');
    const data = await getLeaveTicker(startDate, endDate);
    writeDate(excel, workSheet, data);
}

async function getLeaveTicker(startDate, endDate) {
    const list = [];
    const result = await dbaccess.exeQuery(GET_LEAVE_TICKET, [startDate, endDate]);
    for (let i = 0; i < result.length; i++) {
        list.push([i + 1, ...Object.values(result[i])])
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
    excel.addBorderStyleRange(excel.getRange(workSheet, firstRow, firstColumn, firstRow + i - 1, 9));
}

module.exports = {
    run
}