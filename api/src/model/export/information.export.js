const logger = require('../../common/logger');
const dbaccess = require('../../common/dbaccess');
const moment = require('moment');
const Excel = require('../excel');
const header = ['No', 'Name', 'Position', 'Group', 'Manager', 'Time start', 'Time end', 'Project', 'Payment', 'Note']
const GET_INFORMATION = "SELECT e.employee_id, CONCAT(first_name,' ',last_name), "
    + "                     CASE gender"
    + "                         WHEN 0 THEN 'Male'"
    + "                         WHEN 1 THEN 'Female' "
    + "                         WHEN 2 THEN 'Other'"
    + "                     ELSE '' END as gender, "
    + "                     DATE_FORMAT(dob, '%M %d %Y') as dob, "
    + "                     job_role, group_name, DATE_FORMAT(join_date, '%M %d %Y') as join_date, main_skill, sub_skill, phone, address, relative_name, relative_address, relative_phone,"
    + "                     CASE relative_gender"
    + "                         WHEN 0 THEN 'Male'"
    + "                         WHEN 1 THEN 'Female' "
    + "                         WHEN 2 THEN 'Other'"
    + "                     ELSE '' END as relative_gender, "
    + "                     relationship"
    + "                 FROM employee e"
    + "                     INNER JOIN `group` g ON e.group_id = g.group_id"
    + "                 WHERE e.employee_id in (?)";

/**
 * Export Overtime of all staff from startDate to endDate
 * @param {Excel} excel 
 * @param {*} startDate 
 * @param {*} endDate 
 */
async function run(excel, listEmployee) {
    await excel.open();
    const workSheet = excel.getWorkSheet('Information');
    const data = await getInformation(listEmployee);
    writeDate(excel, workSheet, data);
}

/**
 * 
 * @param {Array} listEmployee 
 * @returns 
 */
async function getInformation(listEmployee) {
    const list = [];
    const result = await dbaccess.exeQuery(GET_INFORMATION, [listEmployee]);
    for (let i = 0; i < result.length; i++) {
        list.push([...Object.values(result[i])])
    } 
    return list;
}

function writeDate(excel, workSheet, data) {
    let i = 0
    const firstRow = 7;
    const firstColumn = 1;
    for (; i < data.length; i++) {
        excel.write(data[i], workSheet, firstRow + i, firstColumn, Excel.LEFT_TO_RIGHT, false, Excel.FONT_BLACK);
    }
    excel.addBorderStyleRange(excel.getRange(workSheet, firstRow, firstColumn, firstRow + i - 1, 16));
}

module.exports = {
    run
}