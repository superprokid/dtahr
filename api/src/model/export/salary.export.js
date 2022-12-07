const dbaccess = require('../../common/dbaccess');
const Excel = require('../excel');
const GET_SALARY = "SELECT CONCAT(first_name, ' ', last_name) as full_name, job_role, group_name, FORMAT(salary_basic, 0),   FORMAT(house_support, 0),  FORMAT(lunch_support, 0),  FORMAT(transport_support, 0),  FORMAT(internet_support, 0),  FORMAT(phone_support, 0),  FORMAT(insurance, 0),  FORMAT(tax, 0),  FORMAT(overtime_payment_total, 0),  FORMAT(salary_total, 0), bank_name, bank_account"
    + "             FROM monthlyreport mr "
    + "             	INNER JOIN employee e on e.employee_id = mr.employee_id "
    + "             	INNER JOIN `group` g ON e.group_id = g.group_id"
    + "             WHERE `month` = ? and `year` = ?"

/**
 * Export Leave ticket of all staff from startDate to endDate
 * @param {Excel} excel 
 * @param {*} startDate 
 * @param {*} endDate 
 */
async function run(excel, month, year) {
    await excel.open();
    const workSheet = excel.getWorkSheet('Salary');
    const data = await getSalary(month, year);
    writeDate(excel, workSheet, data);
}

async function getSalary(month, year) {
    const list = [];
    const result = await dbaccess.exeQuery(GET_SALARY, [month, year]);
    for (let i = 0; i < result.length; i++) {
        list.push([i + 1, ...Object.values(result[i])])
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