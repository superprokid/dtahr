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
        title: "Assigned Date",
        width: 25,
    },
];
const HEADER_TITLE = ["ID", "First Name", "Last Name", "Gender", "Date Of Birth", "Position", "Skill", "Sub Skill", "Phone", "Address", "Assigned Date"];

const GET_EMPLOYEE = "SELECT e.employee_id, first_name, last_name, "
    + "                 CASE gender"
    + "                     WHEN 0 THEN 'Male'"
    + "                     WHEN 1 THEN 'Female' "
    + "                     WHEN 2 THEN 'Other'"
    + "                 ELSE '' END as gender, "
    + "                 DATE_FORMAT(dob, '%M %d %Y') as dob, job_role, main_skill, sub_skill, phone, address, DATE_FORMAT(a.assigned_date, '%M %d %Y') as assigne_date"
    + "             FROM employee e INNER JOIN assignment a ON e.employee_id = a.employee_id WHERE project_id = ?"
const GET_PROJECT_INFO = "SELECT p.project_name as projectName, p.client_id as client, CONCAT(e.first_name,' ',e.last_name) as managerName,  DATE_FORMAT(p.project_manager_assigned_date, '%M %d %Y') as assignDate"
    + "                     FROM project p INNER JOIN employee e ON p.project_manager_id = e.employee_id"
    + "                     WHERE p.project_id = ?";

const ROW_DATA_START = 6;

/**
 * Export Overtime of all staff from startDate to endDate
 * @param {Excel} excel
 * @param {Array} listProject
 */
async function run(excel, listProject) {
    // await excel.open();
    for (let i = 0; i < listProject.length; i++) {
        const projectId = listProject[i];
        const workSheet = excel.getWorkSheet(projectId);
        workSheet.columns = HEADER;
        await writeTitle(projectId, excel, workSheet);
        const listemployee = await getListEmployee(projectId);
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
 * @param {*} projectId 
 * @returns 
 */
async function getListEmployee(projectId) {
    const result = [];
    const listemployee = await dbaccess.exeQuery(GET_EMPLOYEE, [projectId]);
    for (let i = 0; i < listemployee.length; i++) {
        result.push([...Object.values(listemployee[i])]);
    }
    return result;
}

async function writeTitle(projectId, excel, workSheet) {
    const { client, projectName, managerName, assignDate } = await getInfo(projectId);
    excel.writeCell("Project", workSheet, 1, 1, Excel.FONT_HEADER);
    excel.writeCell("Client", workSheet, 2, 1, Excel.FONT_HEADER);
    excel.writeCell("Manager", workSheet, 3, 1, Excel.FONT_HEADER);
    excel.writeCell("Assign Date", workSheet, 4, 1, Excel.FONT_HEADER);
    excel.writeCell(projectName, workSheet, 1, 2, Excel.FONT_RED);
    excel.writeCell(client, workSheet, 2, 2, Excel.FONT_RED);
    excel.writeCell(managerName, workSheet, 3, 2, Excel.FONT_RED);
    excel.writeCell(assignDate, workSheet, 4, 2, Excel.FONT_RED);
}

async function getInfo(projectId) {
    const info = await dbaccess.exeQuery(GET_PROJECT_INFO, [projectId])
    return info.length ? info[0] : { client: '', projectName: '', managerName: '', assignDate: '' };
}

/**
 * 
 * @param {*} excel 
 * @param {*} workSheet 
 */
function writeHeader(excel, workSheet, number) {
    const firstRow = ROW_DATA_START,
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
