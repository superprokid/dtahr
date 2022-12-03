const logger = require("../../common/logger");
const dbaccess = require("../../common/dbaccess");
const moment = require("moment");
const Excel = require("../excel");
const ExcelJS = require("exceljs");
const { getDateStringWithFormat } = require("../../common/utils");
const HEADER = [
    {
        title: "ID",
        width: 15,
    },
    {
        title: "First Name",
        width: 20,
    },
    {
        title: "Last Name",
        width: 15,
    },
    {
        title: "Gender",
        width: 15,
    },
    {
        title: "Date Of Birth",
        width: 30,
    },
    {
        title: "Position",
        width: 20,
    },
    {
        title: "Skill",
        width: 15,
    },
    {
        title: "Sub Skill",
        width: 15,
    },
    {
        title: "Phone",
        width: 25,
    },
    {
        title: "Address",
        width: 40,
    },
    {
        title: "Join Date",
        width: 25,
    },
];
const HEADER_TITLE = ["ID", "First Name", "Last Name", "Gender", "Date Of Birth", "Position", "Skill", "Sub Skill", "Phone", "Address", "Join Date"];

const GET_EMPLOYEE = "SELECT employee_id, first_name, last_name, "
    + "                 CASE gender"
    + "                     WHEN 0 THEN 'Male'"
    + "                     WHEN 1 THEN 'Female' "
    + "                     WHEN 2 THEN 'Other'"
    + "                 ELSE '' END as gender, "
    + "                 DATE_FORMAT(dob, '%M %d %Y') as dob, job_role, main_skill, sub_skill, phone, address, DATE_FORMAT(join_date, '%M %d %Y') as join_date"
    + "             FROM employee WHERE group_id = ?"
const GET_GROUP_INFO = "SELECT group_name as groupName, group_full_name as groupFullName, CONCAT(first_name,' ',last_name) as managerName"
    + "                     FROM `group` g INNER JOIN employee e ON g.group_id = e.group_id"
    + "                     WHERE g.group_id = ?";

const ROW_DATA_START = 6;    

/**
 * Export Overtime of all staff from startDate to endDate
 * @param {Excel} excel
 * @param {Array} listGroup
 */
async function run(excel, listGroup) {
    // await excel.open();
    for (let i = 0; i < listGroup.length; i++) {
        const groupId = listGroup[i];
        const workSheet = excel.getWorkSheet(groupId);
        workSheet.columns = HEADER;
        await writeTitle(groupId, excel, workSheet);
        const listemployee = await getListEmployee(groupId);
        writeHeader(excel, workSheet, listemployee.length);
        writeData(excel, workSheet, listemployee);
        workSheet.getColumn(1).alignment = {
            vertical: "center",
            horizontal: "center",
        };
        const cells = excel.getRange(workSheet, 1, 1, 4, 1);
        cells.forEach(cell => {
            cell.alignment = {
                vertical: "middle",
                horizontal: "left",
            }
        })
    }
}

/**
 * Get all employee in group
 * @param {*} groupId 
 * @returns 
 */
async function getListEmployee(groupId) {
    const result = [];
    const listemployee = await dbaccess.exeQuery(GET_EMPLOYEE, [groupId]);
    for (let i = 0; i < listemployee.length; i++) {
        result.push([...Object.values(listemployee[i])]);
    }
    return result;
}

async function writeTitle(groupId, excel, workSheet) {
    const { groupFullName, groupName, managerName } = await getInfo(groupId);
    excel.writeCell("Group", workSheet, 1, 1, Excel.FONT_HEADER);
    excel.writeCell("Group Name", workSheet, 2, 1, Excel.FONT_HEADER);
    excel.writeCell("Manager", workSheet, 3, 1, Excel.FONT_HEADER);
    excel.writeCell("Member", workSheet, 4, 1, Excel.FONT_HEADER);
    excel.writeCell(groupName, workSheet, 1, 2, Excel.FONT_RED);
    excel.writeCell(groupFullName, workSheet, 2, 2, Excel.FONT_RED);
    excel.writeCell(managerName, workSheet, 3, 2, Excel.FONT_RED);
}

async function getInfo(groupId) {
    const info = await dbaccess.exeQuery(GET_GROUP_INFO, [groupId])
    return info.length ? info[0] : { groupFullName: '', groupName: '', managerName: '' };
}

/**
 * 
 * @param {*} excel 
 * @param {*} workSheet 
 */
function writeHeader(excel, workSheet, number) {
    const firstRow = ROW_DATA_START,
        firstColumn = 1;
        
    excel.writeCell(String(number), workSheet, 4, 2, Excel.FONT_RED);
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
    const firstRow = ROW_DATA_START + 1;
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

    excel.addBorderStyleRange(excel.getRange(workSheet, 6, 1, 6 + i, HEADER_TITLE.length));
}

module.exports = {
    run,
};
