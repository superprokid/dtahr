const logger = require('../../common/logger');
const dbaccess = require('../../common/dbaccess');
const { sendMail } = require('../../common/mailer');
const { validateRequest, randomString, generateEmployeeId, getDateTimeString, getDateString, isNullOrUndefinded } = require('../../common/utils');
const { hash } = require('../../common/cryptcommon');
const { ROLE } = require('../../config/constants');
const Excel = require('../../model/excel');

const LOG_CATEGORY = "ADMIN EMPLOYEE CONTROLLER"
const GET_NEWEST_EMPLPOYEE_ID = "SELECT employee_id FROM employee ORDER BY employee_id DESC LIMIT 1";
const GET_CURRENT_EMAIL = "SELECT email FROM employee WHERE email = ? LIMIT 1";
const GET_CURRENT_GROUP = "SELECT group_id FROM `group` WHERE group_id = ? LIMIT 1";
const GET_ALL_MANAGER_FREE = "SELECT e.employee_id, CONCAT(e.first_name, ' ', e.last_name) as full_name, avt "
    + "                           FROM `employee` e"
    + "                               LEFT JOIN `group` g ON e.employee_id = g.manager_id"
    + "                           WHERE e.role = 1 and e.is_deleted <> 1 and g.group_id is null";
const INSERT_NEW_EMPLOYEE = "INSERT INTO `employee` VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, 0, now(), now())";
const SOFT_DELETE_EMPLOYEE = "UPDATE employee SET is_deleted = 1 WHERE employee_id = ?";
const ACTIVE_EMPLOYEE = "UPDATE employee SET is_deleted = 0 WHERE employee_id = ?";
const GET_USER_INFO = "SELECT DISTINCT e.*, CONCAT(e.first_name, ' ' ,e.last_name) as full_name, p.project_name, p.project_id "
    + "                         FROM employee e "
    + "                             LEFT JOIN (SELECT a.project_id, a.employee_id, a.assigned_date "
    + "                                         FROM assignment a, "
    + "                                             (SELECT DISTINCT employee_id, MAX(assigned_date) as assigned_date FROM assignment GROUP BY employee_id) aa"
    + "                                         WHERE a.employee_id = aa.employee_id and a.assigned_date = aa.assigned_date) asign ON e.employee_id = asign.employee_id"
    + "                             LEFT JOIN project p ON p.project_id = asign.project_id"
    + "                         WHERE e.employee_id = ?";
const GET_PROJECT_DETAILS_OF_USER = "SELECT a.employee_id, a.assigned_date, tb.*"
    + "                                 FROM assignment a "
    + "                                 	INNER JOIN (SELECT p.project_name, p.project_id, CONCAT(e.first_name, ' ', e.last_name) as project_manager_name, p.project_manager_id, p.client_id, p.project_manager_assigned_date, COUNT(a.employee_id) as number"
    + "	                    							FROM `project` p"
    + "		                								LEFT JOIN assignment a ON p.project_id = a.project_id"
    + "										                INNER JOIN employee e ON p.project_manager_id = e.employee_id"
    + "								                    WHERE p.project_id = ?) tb on tb.project_id = a.project_id"
    + "                                 WHERE a.employee_id = ?";
const GET_EMAIL_BY_EMPLOYEE = "SELECT email FROM employee WHERE employee_id = ? LIMIT 1";
const UPDATE_PASSWORD = "UPDATE employee SET password = ? WHERE employee_id = ?";

async function createNewEmployee(req, res) {
    const connection = await dbaccess.getConnection();
    await dbaccess.beginTransaction(connection);
    try {
        const validateSchema = {
            email: {
                type: 'string',
                required: true,
            },
            firstName: {
                type: 'string',
                required: true,
            },
            lastName: {
                type: 'string',
                required: true,
            },
            dob: {
                type: 'datetime',
                required: true,
            },
            address: {
                type: 'string',
                required: false,
            },
            gender: {
                type: 'number',
                required: true,
            },
            groupId: {
                type: 'string',
                required: true,
            },
            joinDate: {
                type: 'string',
                required: false,
            },
            phone: {
                type: 'string',
                required: false,
            },
            mainSkill: {
                type: 'string',
                required: false
            },
            jobRole: {
                type: 'string',
                required: false
            },
            employerId: {
                type: 'string',
                required: true
            },
            relativeName: {
                type: 'string',
                required: false
            },
            relativeDob: {
                type: 'datetime',
                required: false
            },
            relativeGender: {
                type: 'string',
                required: false
            },
            relativePhone: {
                type: 'string',
                required: false
            },
            relativeAddress: {
                type: 'string',
                required: false
            },
            relationShip: {
                type: 'string',
                required: false
            },
            salary: {
                type: 'string',
                required: false
            },
            bankAccount: {
                type: 'string',
                required: false
            },
            bankName: {
                type: 'string',
                required: false
            },
        }

        const validResult = validateRequest(req.body, validateSchema);
        if (validResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(400).send({ message: validResult });
            return;
        }

        const { email, firstName, lastName, dob, address, gender, groupId, joinDate,
            phone, mainSkill, subSkill, jobRole, employerId, relativeName, relativeGender, relativeAddress,
            relativePhone, relativeDob, relationShip, salary, bankAccount, bankName } = req.body;

        const currentEmail = await dbaccess.queryTransaction(connection, GET_CURRENT_EMAIL, [email]);
        if (currentEmail.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] email is already exist`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(400).send({ message: 'Email is already exist', failed: true });
            return;
        }

        const currentGroup = await dbaccess.queryTransaction(connection, GET_CURRENT_GROUP, [groupId]);
        if (!currentGroup.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] group_id not exist`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(400).send({ message: 'Group is not exist', failed: true });
            return;
        }

        const password = randomString(8);
        const hashPassword = hash(password);
        const now = new Date();
        const currentEmpId = await dbaccess.queryTransaction(connection, GET_NEWEST_EMPLPOYEE_ID);
        let empId = 1;
        if (currentEmpId.length) {
            empId = currentEmpId[0].employee_id;
        }
        const params = [generateEmployeeId(empId), firstName, lastName, new Date(dob), address, gender, email, hashPassword, groupId, 0, joinDate || now, phone || null,
        mainSkill ?? null, subSkill ?? null, jobRole ?? null, ROLE.employee, employerId, relativeName ?? null, relativeGender ?? null,
        relativePhone ?? null, relativeAddress ?? null, relativeDob ?? null, relationShip ?? null, null, salary ?? null, bankAccount ?? null, bankName ?? null, null];
        logger.info('Your password is: ' + password);
        await dbaccess.queryTransaction(connection, INSERT_NEW_EMPLOYEE, params);
        await dbaccess.commitTransaction(connection);
        dbaccess.releaseConnection(connection);
        const sendMailResult = await sendMail(email, password);
        if (!sendMailResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] end mail failed`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(400).send({ message: 'Can not send your password to email, please check your email' });
            return;
        }
        res.status(200).send({
            email,
            password
        });
    } catch (error) {
        await dbaccess.rollback(connection);
        dbaccess.releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function editEmployee(req, res) {
    const connection = await dbaccess.getConnection();
    await dbaccess.beginTransaction(connection);
    try {
        const validateSchema = {
            employeeId: {
                type: 'string',
                required: true,
            },
            email: {
                type: 'string',
                required: false,
            },
            firstName: {
                type: 'string',
                required: false,
            },
            lastName: {
                type: 'string',
                required: false,
            },
            dob: {
                type: 'datetime',
                required: false,
            },
            address: {
                type: 'string',
                required: false,
            },
            gender: {
                type: 'number',
                required: false,
            },
            phone: {
                type: 'string',
                required: false,
            },
            mainSkill: {
                type: 'string',
                required: false,
            },
            subSkill: {
                type: 'string',
                required: false,
            },
            groupId: {
                type: 'string',
                required: false,
            },
            joinDate: {
                type: 'datetime',
                required: false,
            },
            jobRole: {
                type: 'string',
                required: false
            },
            employerId: {
                type: 'string',
                required: false
            },
            relativeName: {
                type: 'string',
                required: false
            },
            relativeDob: {
                type: 'datetime',
                required: false
            },
            relativeGender: {
                type: 'number',
                required: false
            },
            relativeAddress: {
                type: 'string',
                required: false
            },
            relativePhone: {
                type: 'string',
                required: false
            },
            relationship: {
                type: 'string',
                required: false
            },
            salary: {
                type: 'number',
                required: false
            },
            bankAccount: {
                type: 'string',
                required: false
            },
            bankName: {
                type: 'string',
                required: false
            },
            role: {
                type: 'number',
                required: false
            },
        }

        const validResult = validateRequest(req.body, validateSchema);
        if (validResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(403).send(validResult);
            return;
        }

        const { employeeId, email, groupId, joinDate, jobRole, employerId, relativeName, relativeGender, relativeAddress,
            relativePhone, relativeDob, relationship, salary, bankAccount, bankName, role,
            firstName, lastName, dob, address, gender, phone, mainSkill, subSkill } = req.body;

        const setClauseArray = [];
        // if change email
        if (email) {
            const currentEmail = await dbaccess.queryTransaction(connection, GET_CURRENT_EMAIL, [email]);
            if (currentEmail.length) {
                logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] email is already exist`);
                await dbaccess.rollback(connection);
                dbaccess.releaseConnection(connection);
                res.status(400).send('Email is already exist');
                return;
            }
            setClauseArray.push(` email = '${email}' `);
        }

        if (groupId) setClauseArray.push(` group_id = '${groupId}' `);
        if (joinDate) setClauseArray.push(` join_date = '${getDateString(joinDate)}' `);
        if (jobRole) setClauseArray.push(` job_role = '${jobRole}' `);
        if (employerId) setClauseArray.push(` employer_id = '${employerId}' `);
        if (relativeName) setClauseArray.push(` relative_name = '${relativeName}' `);
        if (relativeGender) setClauseArray.push(` relative_gender = '${relativeGender}' `);
        if (relativeAddress) setClauseArray.push(` relative_address = '${relativeAddress}' `);
        if (relativePhone) setClauseArray.push(` relative_phone = '${relativePhone}' `);
        if (relativeDob) setClauseArray.push(` relative_dob = '${getDateString(relativeDob)}' `);
        if (relationship) setClauseArray.push(` relationship = '${relationship}' `);
        if (salary) setClauseArray.push(` salary = '${salary}' `);
        if (bankAccount) setClauseArray.push(` bank_account = '${bankAccount}' `);
        if (bankName) setClauseArray.push(` bank_name = '${bankName}' `);
        if (!isNullOrUndefinded(role)) setClauseArray.push(` role = '${role}' `);
        if (firstName) setClauseArray.push(` first_name = '${firstName}' `);
        if (lastName) setClauseArray.push(` last_name = '${lastName}' `);
        if (dob) setClauseArray.push(` dob = '${getDateString(dob)}' `);
        if (address) setClauseArray.push(` address = '${address}' `);
        if (!isNullOrUndefinded(gender)) setClauseArray.push(` gender = '${gender}' `);
        if (phone) setClauseArray.push(` phone = '${phone}' `);
        if (mainSkill) setClauseArray.push(` main_skill = '${mainSkill}' `);
        if (subSkill) setClauseArray.push(` sub_skill = '${subSkill}' `);

        if (!setClauseArray.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] no columns update`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(200).send({ message: "No columns need to update" });
            return;
        }

        const whereClause = ` WHERE employee_id = '${employeeId}'`;
        const setClause = " SET " + setClauseArray.join(',');
        const query = "UPDATE `employee` " + setClause + whereClause;

        await dbaccess.queryTransaction(connection, query);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] update information success, employee_id = ${employeeId}`);

        await dbaccess.commitTransaction(connection);
        dbaccess.releaseConnection(connection);
        res.status(200).send("Update information success");
    } catch (error) {
        await dbaccess.rollback(connection);
        dbaccess.releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

/**
 * Get all manager is not manage any group
 * @param {*} req 
 * @param {*} res 
 */
async function getAllFreeManager(req, res) {
    try {
        const result = await dbaccess.exeQuery(GET_ALL_MANAGER_FREE);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] get success, length = ${result.length}`);
        res.status(200).send(result);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function getEmployeeInfoById(req, res) {
    try {
        const { employeeId } = req.query;

        if (!employeeId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employeeId is required`);
            res.status(403).send("Get failed");
            return;
        }

        let result = await dbaccess.exeQuery(GET_USER_INFO, [employeeId]);
        if (result.length) {
            result = result[0];
            let projectDetail = await dbaccess.exeQuery(GET_PROJECT_DETAILS_OF_USER, [result.project_id, employeeId]);
            if (projectDetail.length) {
                result.project = projectDetail[0];
            } else {
                result.project = {}
            }
        } else {
            result = {};
        }
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response success`);
        res.status(200).send(result);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function deleteEmployee(req, res) {
    const connection = await dbaccess.getConnection();
    await dbaccess.beginTransaction(connection);
    try {
        const validateSchema = {
            employeeId: {
                type: 'string',
                required: true,
            },
        }
        const validResult = validateRequest(req.body, validateSchema);
        if (validResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(403).send(validResult);
            return;
        }
        const { employeeId } = req.body
        await dbaccess.queryTransaction(connection, SOFT_DELETE_EMPLOYEE, [employeeId]);
        res.status(200).send('Delete success');
        await dbaccess.commitTransaction(connection);
        dbaccess.releaseConnection(connection);
    } catch (error) {
        await dbaccess.rollback(connection);
        dbaccess.releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function activeEmployee(req, res) {
    const connection = await dbaccess.getConnection();
    await dbaccess.beginTransaction(connection);
    try {
        const validateSchema = {
            employeeId: {
                type: 'string',
                required: true,
            },
        }
        const validResult = validateRequest(req.body, validateSchema);
        if (validResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(403).send(validResult);
            return;
        }
        const { employeeId } = req.body
        await dbaccess.queryTransaction(connection, ACTIVE_EMPLOYEE, [employeeId]);
        res.status(200).send({ message: 'Active success' });
        await dbaccess.commitTransaction(connection);
        dbaccess.releaseConnection(connection);
    } catch (error) {
        await dbaccess.rollback(connection);
        dbaccess.releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function changePassword(req, res) {
    const connection = await dbaccess.getConnection();
    await dbaccess.beginTransaction(connection);
    try {
        const validateSchema = {
            employeeId: {
                type: 'string',
                required: true,
            },
            password: {
                type: 'string',
                required: true,
            }
        }

        const validResult = validateRequest(req.body, validateSchema);
        if (validResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(403).send({ message: validResult });
            return;
        }

        const { employeeId, password } = req.body;

        await dbaccess.queryTransaction(connection, UPDATE_PASSWORD, [hash(password), employeeId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] update password success, employee_id = ${employeeId}`);

        const currentEmail = dbaccess.queryTransaction(connection, GET_EMAIL_BY_EMPLOYEE, [employeeId]);
        if (currentEmail.length) {
            const email = currentEmail[0].email;
            const sendMailResult = await sendMail(email, password);
            if (!sendMailResult) {
                logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] end mail failed`);
                await dbaccess.rollback(connection);
                dbaccess.releaseConnection(connection);
                res.status(400).send({ message: 'Can not send your password to email, please check your email' });
                return;
            }
        }

        await dbaccess.commitTransaction(connection);
        dbaccess.releaseConnection(connection);
        res.status(200).send({ message: "Change password success" });
    } catch (error) {
        await dbaccess.rollback(connection);
        dbaccess.releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}


const IMPORT_HEADER = ["Email", "First Name", "Last Name", "Date Of Birth", "Address", "Gender", "Phone", "Position", "Main Skill", "Relative Name", "Relative Gender", "Relative Phone", "Relative Address", "Relationship", "Salary", "Bank Name", "Bank Account"]
const EMAIL_INDEX = 1, FIRST_NAME_INDEX = 2, LAST_NAME_INDEX = 3, DOB_INDEX = 4, ADDRESS_INDEX = 5, GENDER_INDEX = 6, PHONE_INDEX = 7, POSITION_INDEX = 8, MAIN_SKILL_INDEX = 9,
    RELATIVE_NAME_INDEX = 10, RELATIVE_GENDER = 11, RELATIVE_PHONE_INDEX = 12, RELATIVE_ADDRESS_INDEX = 13, RELATIONSHIP_INDEX = 14, SALARY_INDEX = 15, BACK_NAME_INDEX = 16, BANK_ACCOUNT_INDEX = 17;
async function importEmployee(req, res) {
    const file = req.files?.length ? req.files[0] : null;
    if (!file) {
        res.status(400).send({ message: "Import file not found", failed: true })
        return;
    }
    const fileName = file.originalname;
    const fileNameArr = String(fileName).split('.');
    if (fileNameArr.length < 2 || (fileNameArr[1] != 'xlsx' && fileNameArr[1] != 'xls')) {
        res.status(400).send({ message: "File type not allowed!", failed: true });
        return;
    }

    const connection = await dbaccess.getConnection();
    await dbaccess.beginTransaction(connection);

    try {
        const validateSchema = {
            managerId: {
                type: 'string',
                required: true,
            },
            groupId: {
                type: 'string',
                required: true,
            }
        }

        const validResult = validateRequest(req.body, validateSchema);
        if (validResult) {
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            res.status(403).send({ message: validResult });
            return;
        }
        const excel = new Excel();
        await excel.openBuffer(file.buffer);
        const workSheet = excel.getWorkSheet('Import');
        const header = workSheet.getRow(1);
        for (let i = 0; i < IMPORT_HEADER.length; i++) {
            const cell = header.getCell(i + 1);
            if (cell.value != IMPORT_HEADER[i]) {
                await dbaccess.rollback(connection);
                dbaccess.releaseConnection(connection);
                res.status(400).send({ message: `Header is invalid`, failed: true });
                return;
            }
        }

        const { groupId, managerId } = req.body;

        const currentGroup = await dbaccess.exeQuery(GET_CURRENT_GROUP, [groupId]);
        if (!currentGroup.length) {
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(400).send({ message: 'Group is not exist', failed: true });
            return;
        }

        let index = 2;
        while (1) {
            const row = workSheet.getRow(index);
            if (!row.getCell(1).value) {
                break;
            }
            const body = {
                email: row.getCell(EMAIL_INDEX).value.text || row.getCell(EMAIL_INDEX).value,
                firstName: row.getCell(FIRST_NAME_INDEX).value,
                lastName: row.getCell(LAST_NAME_INDEX).value,
                dob: row.getCell(DOB_INDEX).value,
                address: row.getCell(ADDRESS_INDEX).value,
                gender: String(row.getCell(GENDER_INDEX).value).toUpperCase() == "MALE" ? 0 : 1 ,
                phone: row.getCell(PHONE_INDEX).value,
                jobRole: row.getCell(POSITION_INDEX).value,
                mainSkill: row.getCell(MAIN_SKILL_INDEX).value,
                groupId: groupId,
                employerId: managerId,
                relativeName: row.getCell(RELATIVE_NAME_INDEX).value,
                relativeGender: row.getCell(RELATIVE_GENDER).value,
                relativePhone: row.getCell(RELATIVE_PHONE_INDEX).value,
                relativeAddress: row.getCell(RELATIVE_ADDRESS_INDEX).value,
                relationShip: row.getCell(RELATIONSHIP_INDEX).value,
                salary: row.getCell(SALARY_INDEX).value,
                bankAccount: row.getCell(BANK_ACCOUNT_INDEX).value,
                bankName: row.getCell(BACK_NAME_INDEX).value,
            }

            const validateSchemaBody = {
                email: {
                    type: 'string',
                    required: true,
                },
                firstName: {
                    type: 'string',
                    required: true,
                },
                lastName: {
                    type: 'string',
                    required: true,
                },
                dob: {
                    type: 'datetime',
                    required: true,
                },
                address: {
                    type: 'string',
                    required: false,
                },
                gender: {
                    type: 'number',
                    required: true,
                },
                groupId: {
                    type: 'string',
                    required: true,
                },
                joinDate: {
                    type: 'string',
                    required: false,
                },
                phone: {
                    type: 'string',
                    required: false,
                },
                mainSkill: {
                    type: 'string',
                    required: false
                },
                jobRole: {
                    type: 'string',
                    required: false
                },
                employerId: {
                    type: 'string',
                    required: true
                },
                relativeName: {
                    type: 'string',
                    required: false
                },
                relativeDob: {
                    type: 'datetime',
                    required: false
                },
                relativeGender: {
                    type: 'string',
                    required: false
                },
                relativePhone: {
                    type: 'string',
                    required: false
                },
                relativeAddress: {
                    type: 'string',
                    required: false
                },
                relationShip: {
                    type: 'string',
                    required: false
                },
                salary: {
                    type: 'number',
                    required: false
                },
                bankAccount: {
                    type: 'string',
                    required: false
                },
                bankName: {
                    type: 'string',
                    required: false
                },
            }
            
            const validateResultBody = validateRequest(body, validateSchemaBody);
            if (validateResultBody) {
                await dbaccess.rollback(connection);
                dbaccess.releaseConnection(connection);
                res.status(400).send({ message: `Employee in row ${index} is invalid - ${validateResultBody}`, failed: true });
                return;
            }

            const currentEmail = await dbaccess.queryTransaction(connection, GET_CURRENT_EMAIL, [body.email]);
            if (currentEmail.length) {
                await dbaccess.rollback(connection);
                dbaccess.releaseConnection(connection);
                res.status(400).send({ message: `Employee in row ${index} is invalid - Email is already exist`, failed: true });
                return;
            }

            const password = randomString(8);
            const hashPassword = hash(password);
            const now = new Date();
            const currentEmpId = await dbaccess.queryTransaction(connection, GET_NEWEST_EMPLPOYEE_ID);
            let empId = 1;
            if (currentEmpId.length) {
                empId = currentEmpId[0].employee_id;
            }
            const params = [generateEmployeeId(empId), body.firstName, body.lastName, new Date(body.dob), body.address, body.gender, body.email, hashPassword, groupId, 0, now, body.phone,
                body.mainSkill, null, body.join, ROLE.employee, managerId, body.relativeName, body.relativeGender, body.relativePhone, body.relativeAddress, null, body.relationShip, null, body.salary, body.bankAccount, body.bankName, null];

            await dbaccess.queryTransaction(connection, INSERT_NEW_EMPLOYEE, params);

            sendMail(body.email, password);
            index++;
        }

        await dbaccess.commitTransaction(connection);
        dbaccess.releaseConnection(connection);
        res.status(200).send({ message: "Import success" });
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

module.exports = {
    createNewEmployee,
    editEmployee,
    getAllFreeManager,
    getEmployeeInfoById,
    deleteEmployee,
    changePassword,
    importEmployee,
    activeEmployee,
}