const logger = require("../../common/logger");
const dbaccess = require("../../common/dbaccess");
const moment = require("moment");
const Excel = require("../excel");
const ExcelJS = require("exceljs");
const { getDateStringWithFormat } = require("../../common/utils");
const HEADER = [
    {
        title: "No",
        width: 7,
    },
    {
        title: "Date",
        width: 20,
    },
    {
        title: "Total (min)",
        width: 15,
    },
    {
        title: "Status",
        width: 15,
    },
    {
        title: "Note",
        width: 30,
    },
];
const HEADER_TITLE = ["No", "Date", "Total (min)", "Status", "Note"];

const GET_WORKLOG = "SELECT DATE_FORMAT(work_date, '%M %d %Y') as work_date, work_total, IF(work_status = 0, 'CHECK IN', 'CHECK OUT'), IF(is_not_working = 1, 'Did not come to work', '') FROM worklog WHERE employee_id = ? AND CAST(work_date as DATE) BETWEEN ? and ?";
const GET_NAME_AND_GROUP = "SELECT CONCAT(first_name, ' ', last_name) as full_name, group_name"
    + "                     FROM employee e INNER JOIN `group` g ON e.group_id = g.group_id"
    + "                     WHERE employee_id = ?";

/**
 * Export Overtime of all staff from startDate to endDate
 * @param {Excel} excel
 * @param {Array} listemployee
 * @param {*} startDate
 * @param {*} endDate
 */
async function run(excel, listemployee, startDate, endDate) {
    // await excel.open();
    for (let i = 0; i < listemployee.length; i++) {
        const employeeId = listemployee[i];
        const workSheet = excel.getWorkSheet(employeeId);
        workSheet.columns = HEADER;
        await writeTitle(employeeId, startDate, endDate, excel, workSheet);
        writeHeader(excel, workSheet);
        const listWorkLog = await getWorkLog(employeeId, startDate, endDate);
        writeData(excel, workSheet, listWorkLog);
        workSheet.getColumn(1).alignment = {
            vertical: "center",
            horizontal: "center",
        };
    }
}

async function getWorkLog(employeeId, startDate, endDate) {
    const result = [];
    const listWorkLog = await dbaccess.exeQuery(GET_WORKLOG, [
        employeeId,
        startDate,
        endDate,
    ]);
    for (let i = 0; i < listWorkLog.length; i++) {
        result.push([i + 1, ...Object.values(listWorkLog[i])]);
    }
    return result;
}

async function writeTitle(employeeId, startDate, endDate, excel, workSheet) {
    const { fullName, groupName } = await getInfo(employeeId);
    excel.writeCell("Staff", workSheet, 1, 1, Excel.FONT_HEADER);
    excel.writeCell("Group", workSheet, 2, 1, Excel.FONT_HEADER);
    excel.writeCell("Period", workSheet, 3, 1, Excel.FONT_HEADER);
    excel.writeCell(fullName, workSheet, 1, 2, Excel.FONT_RED);
    excel.writeCell(groupName, workSheet, 2, 2, Excel.FONT_RED);
    excel.writeCell(`${getDateStringWithFormat(startDate, 'DD/MM/YYYY')} - ${getDateStringWithFormat(endDate, 'DD/MM/YYYY')}`, workSheet, 3, 2, Excel.FONT_RED);
}

async function getInfo(employeeId) {
    const info = await dbaccess.exeQuery(GET_NAME_AND_GROUP, [employeeId])
    return info.length ? { fullName: info[0].full_name, groupName: info[0].group_name } : { fullName: '', groupName: '' };
}

/**
 * 
 * @param {*} excel 
 * @param {*} workSheet 
 */
function writeHeader(excel, workSheet) {
    const firstRow = 5,
        firstColumn = 1;
    excel.write(
        HEADER_TITLE,
        workSheet,
        firstRow,
        firstColumn,
        Excel.LEFT_TO_RIGHT,
        false,
        Excel.FONT_HEADER
    );
}

/**
 *
 * @param {Excel} excel
 * @param {*} workSheet
 * @param {*} data
 */
function writeData(excel, workSheet, data) {
    let i = 0;
    const firstRow = 6;
    const firstColumn = 1;
    for (; i < data.length; i++) {
        excel.write(
            data[i],
            workSheet,
            firstRow + i,
            firstColumn,
            Excel.LEFT_TO_RIGHT,
            false,
            Excel.FONT_BLACK
        );
    }

    excel.addBorderStyleRange(excel.getRange(workSheet, 5, 1, 5 + i, 5));
}

module.exports = {
    run,
};
