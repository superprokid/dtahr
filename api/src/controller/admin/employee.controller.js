const logger = require('../../common/logger');
const dbaccess = require('../../common/dbaccess');
const { sendMail } = require('../../common/mailer');
const { validateRequest, randomString, generateEmployeeId, getDateTimeString, getDateString } = require('../../common/utils');
const { hash } = require('../../common/cryptcommon');
const { ROLE } = require('../../config/constants');

const LOG_CATEGORY = "ADMIN EMPLOYEE CONTROLLER"
const GET_NEWEST_EMPLPOYEE_ID = "SELECT employee_id FROM employee ORDER BY employee_id DESC LIMIT 1";
const GET_CURRENT_EMAIL = "SELECT email FROM employee WHERE email = ? LIMIT 1";
const GET_CURRENT_GROUP = "SELECT group_id FROM `group` WHERE group_id = ? LIMIT 1";
const GET_ALL_MANAGER_FREE = "SELECT e.employee_id, CONCAT(e.first_name, ' ', e.last_name) as full_name, avt "
+ "                           FROM `employee` e"
+ "                               LEFT JOIN `group` g ON e.employee_id = g.manager_id"
+ "                           WHERE e.role = 1 and e.is_deleted <> 1 and g.group_id is null";
const INSERT_NEW_EMPLOYEE = "INSERT INTO `employee` VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now(), now())";

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
            res.status(403).send(validResult);
            return;
        }


        const { email, firstName, lastName, dob, address, gender, groupId, joinDate,
            phone, mainSkill, subSkill, jobRole, employerId, relativeName, relativeGender,
            relativePhone, relativeDob, relationShip, salary, bankAccount, bankName } = req.body;

        const currentEmail = await dbaccess.queryTransaction(connection, GET_CURRENT_EMAIL, [email]);
        if (currentEmail.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] email is already exist`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(400).send('Email is already exist');
            return;
        }

        const currentGroup = await dbaccess.queryTransaction(connection, GET_CURRENT_GROUP, [groupId]);
        if (!currentGroup.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] group_id not exist`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(400).send('Group is not exist');
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
        relativePhone ?? null, relativeDob ?? null, relationShip ?? null, null, salary ?? null, bankAccount ?? null, bankName ?? null, null, 0];
        logger.info('Your password is: ' + password);
        await dbaccess.queryTransaction(connection, INSERT_NEW_EMPLOYEE, params);
        await dbaccess.commitTransaction(connection);
        dbaccess.releaseConnection(connection);
        const sendMailResult = await sendMail(email, password);
        if (!sendMailResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] end mail failed`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(400).send('Can not send your password to email, please check your email');
            return;
        }
        res.status(200).send("Create new employee success");
    } catch (error) {
        await dbaccess.rollback(connection);
        dbaccess.releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
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
            relativePhone, relativeDob, relationship, salary, bankAccount, bankName, role } = req.body;

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
        if (role) setClauseArray.push(` role = '${role}' `);

        if (!setClauseArray.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] no columns update`);
            await dbaccess.rollback(connection);
            dbaccess.releaseConnection(connection);
            res.status(403).send("Update failed, no columns need to update");
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
        res.status(500).send("SERVER ERROR");
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
        res.status(500).send("SERVER ERROR");
    }
}

module.exports = {
    createNewEmployee,
    editEmployee,
    getAllFreeManager,
}