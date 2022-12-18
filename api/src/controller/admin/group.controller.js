const logger = require('../../common/logger');
const { exeQuery, getConnection, beginTransaction, queryTransaction, commitTransaction, releaseConnection, rollback } = require("../../common/dbaccess");
const { validateRequest, generateId, getDateTimeString } = require('../../common/utils');
const { MAX_GROUP_ID_LENGTH } = require('../../config/constants');

const LOG_CATEGORY = "AdminGroupController";
const GET_ALL_GROUP = "SELECT g.*, CONCAT(e.first_name, ' ', e.last_name) as manager_name, e.avt, COUNT(ee.employee_id) as number"
    + "                 FROM `group` g "
    + "	                    INNER JOIN employee e ON g.manager_id = e.employee_id"
    + "                     LEFT JOIN employee ee ON ee.group_id = g.group_id"
    + "                 GROUP BY g.group_id";
const GET_ALL_USER_BY_GROUP = "SELECT e.*,  CONCAT(e.first_name, ' ', e.last_name) as full_name, CONCAT(er.first_name, ' ', er.last_name) as employer_full_name, g.group_name "
    + "                         FROM employee e "
    + "                              LEFT JOIN employee er ON e.employer_id = er.employee_id "
    + "                              INNER JOIN `group` g ON g.group_id = e.group_id"
    + "                         WHERE e.group_id = ? ";
    // + "                         WHERE e.group_id = ? and e.employee_id <> g.manager_id";
const GET_NEWEST_GROUP_ID = "SELECT group_id FROM `group` ORDER BY group_id DESC LIMIT 1";
const CHECK_EXIST_EMPLOYEE_ID = "SELECT employee_id FROM employee where employee_id = ?";
const INSERT_NEW_GROUP = "INSERT INTO `group` (group_id, group_name, group_full_name, manager_id, manager_start_date) VALUES (?, ?, ?, ?, ?) ";
const DELETE_GROUP = "DELETE FROM `group` WHERE group_id = ?";
const CHECK_EXIST_EMPLOYEE_IN_GROUP = " SELECT employee_id FROM employee WHERE group_id = ? LIMIT 1";
const UPDATE_EMPLOYER_OF_USER = "Update employee SET employer_id = ? WHERE group_id = ?";
const UPDATE_EMPLOYER_AND_GROUP_OF_USER = "UPDATE employee set employer_id = ?, group_id = ? WHERE employee_id = ?"

async function getAllGroup(req, res) {
    try {
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] - response`);
        res.status(200).send(await exeQuery(GET_ALL_GROUP));
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"})
    }
}

async function getAllEmployeeInGroup(req, res) {
    try {
        const { groupId } = req.query;
        if (!groupId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] groupId is required`);
            res.status(403).send("groupId is required");
        }

        const result = await exeQuery(GET_ALL_USER_BY_GROUP, [groupId]);
        const response = result.map((item) => {
            delete item.password;
            return item;
        })

        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] - response`);
        res.status(200).send(response);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"})
    }
}

async function createGroup(req, res) {
    const connection = await getConnection();
    await beginTransaction(connection);
    try {
        const validateSchema = {
            groupName: {
                type: 'string',
                required: true,
            },
            groupFullName: {
                type: 'string',
                required: true,
            },
            managerId: {
                type: 'string',
                required: true,
            },
            managerStartDate: {
                type: 'datetime',
                required: true,
            }
        }

        const validResult = validateRequest(req.body, validateSchema);
        if (validResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            await rollback(connection);
            releaseConnection(connection);
            res.status(403).send(validResult);
            return;
        }

        const { groupName, groupFullName, managerId, managerStartDate } = req.body;

        const managerList = await queryTransaction(connection, CHECK_EXIST_EMPLOYEE_ID, [managerId]);
        if (!managerList.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] manager not exist`);
            await rollback(connection);
            releaseConnection(connection);
            res.status(403).send("Manager ID not exist");
            return;
        }

        const currentGroupId = await queryTransaction(connection, GET_NEWEST_GROUP_ID);
        let groupId = 1;
        if (currentGroupId.length) {
            groupId = currentGroupId[0].group_id;
        }
        const newId = generateId(groupId, MAX_GROUP_ID_LENGTH);
        await queryTransaction(connection, INSERT_NEW_GROUP, [newId, groupName, groupFullName, managerId, new Date(managerStartDate)]);
        
        await queryTransaction(connection, UPDATE_EMPLOYER_AND_GROUP_OF_USER, [managerId, newId, managerId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] insert new group success`);
        await commitTransaction(connection);
        releaseConnection(connection);
        res.status(200).send("Create group success");
    } catch (error) {
        await rollback(connection);
        releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"});
    }
}

async function updateGroup(req, res) {
    const connection = await getConnection();
    await beginTransaction(connection);
    try {
        const validateSchema = {
            groupId: {
                type: 'string',
                required: true,
            },
            groupName: {
                type: 'string',
                required: false,
            },
            groupFullName: {
                type: 'string',
                required: false,
            },
            managerId: {
                type: 'string',
                required: false,
            },
            managerStartDate: {
                type: 'datetime',
                required: false,
            }
        }

        const validResult = validateRequest(req.body, validateSchema);
        if (validResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            await rollback(connection);
            releaseConnection(connection);
            res.status(403).send(validResult);
            return;
        }

        const { groupId, groupName, groupFullName, managerId, managerStartDate } = req.body;

        if (managerId) {
            const managerList = await queryTransaction(connection, CHECK_EXIST_EMPLOYEE_ID, [managerId]);
            if (!managerList.length) {
                logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] manager not exist`);
                await rollback(connection);
                releaseConnection(connection);
                res.status(403).send("Manager ID not exist");
                return;
            } else {
                // update group and employer of user
                await queryTransaction(connection, UPDATE_EMPLOYER_AND_GROUP_OF_USER, [managerId, groupId, managerId]);
                // update employer of user
                await queryTransaction(connection, UPDATE_EMPLOYER_OF_USER, [managerId, groupId]);
                logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] update employer of employees in group_id = ${groupId}`);
            }
        }

        const setClauseArray = [];
        const whereClause = ` WHERE group_id = '${groupId}'`;
        if (groupName) setClauseArray.push(` group_name = '${groupName}' `);
        if (groupFullName) setClauseArray.push(` group_full_name = '${groupFullName}' `);
        if (managerId) setClauseArray.push(` manager_id = '${managerId}' `);
        if (managerStartDate) setClauseArray.push(` manager_start_date = '${getDateTimeString(managerStartDate)}' `);

        if (!setClauseArray.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] no columns update`);
            await rollback(connection);
            releaseConnection(connection);
            res.status(403).send("Update failed, no columns need to update");
            return;
        }
        const setClause = " SET " + setClauseArray.join(',');
        const query = "UPDATE `group` " + setClause + whereClause;

        await queryTransaction(connection, query);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] update new group success`);

        await commitTransaction(connection);
        releaseConnection(connection);
        res.status(200).send("Update group success");
    } catch (error) {
        await rollback(connection);
        releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"});
    }
}

async function deleteGroup(req, res) {
    const connection = await getConnection();
    await beginTransaction(connection);
    try {
        const validateSchema = {
            groupId: {
                type: 'string',
                required: true,
            }
        }

        const validResult = validateRequest(req.body, validateSchema);
        if (validResult) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            await rollback(connection);
            releaseConnection(connection);
            res.status(403).send(validResult);
            return;
        }

        const { groupId } = req.body;
        const listEmployee = await queryTransaction(connection, CHECK_EXIST_EMPLOYEE_IN_GROUP, [groupId]);
        if (listEmployee.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] there are ${listEmployee.length} employees in group_id = ${groupId}, can't delete`);
            await rollback(connection);
            releaseConnection(connection);
            res.status(403).send('Exist employees in this group, delete failed');
            return;
        }

        await queryTransaction(connection, DELETE_GROUP, [groupId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] delete group success`);

        await commitTransaction(connection);
        releaseConnection(connection);
        res.status(200).send("Update group success");
    } catch (error) {
        await rollback(connection);
        releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({message: "SERVER ERROR"});
    }
}

module.exports = {
    getAllGroup,
    getAllEmployeeInGroup,
    createGroup,
    updateGroup,
    deleteGroup,
}