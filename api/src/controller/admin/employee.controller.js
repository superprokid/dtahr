const logger = require('../../common/logger');
const dbaccess = require('../../common/dbaccess');
const { sendMail } = require('../../common/mailer');
const { validateRequest, randomString, generateEmployeeId } = require('../../common/utils');
const { hash } = require('../../common/cryptcommon');
const { ROLE } = require('../../config/constants');

const LOG_CATEGORY = "ADMIN EMPLOYEE CONTROLLER"
const GET_NEWEST_EMPLPOYEE_ID = "SELECT employee_id FROM employee ORDER BY employee_id DESC LIMIT 1";
const GET_CURRENT_EMAIL = "SELECT email FROM employee WHERE email = ? LIMIT 1";
const GET_CURRENT_GROUP = "SELECT group_id FROM `group` WHERE group_id = ? LIMIT 1";
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

module.exports = {
    createNewEmployee
}