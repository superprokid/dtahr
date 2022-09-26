const logger = require('../../common/logger');
const moment = require('moment')
const { signToken, signRefreshToken, verifyRefreshToken, compare } = require('../../common/cryptcommon');
const { exeQuery, getConnection, beginTransaction, commitTransaction, releaseConnection, queryTransaction, rollback } = require('../../common/dbaccess');
const { minDiff, compareTwoTimeGreaterOrEqual, calWorkingTime } = require('../../common/utils');
const { WORKLOG_STATUS, WORKHISTORY_STATUS, WORKTIME_DEFAULT, VALID_HOUR } = require('../../config/constants');

const LOG_CATEGORY = "UserController"
const QUERY_VERIFY_USER = "SELECT * FROM employee WHERE employee_id = ? and is_deleted <> 1 LIMIT 1";
const GET_USER_BY_EMAIL = "SELECT * FROM employee WHERE email = ? and is_deleted <> 1 ORDER BY update_at DESC  LIMIT 1";
const GET_WORKLOG_OF_USER = "SELECT * FROM worklog WHERE employee_id = ? and work_date = ? LIMIT 1";
const INSERT_NEW_WORKLOG = "INSERT INTO worklog (employee_id, work_status, work_date, work_total) VALUES (?, 0, ?, 0)";
const UPDATE_WORKLOG_STATUS = "UPDATE worklog SET work_status = ?, work_total = ? WHERE worklog_id = ?";
const INSERT_NEW_WORKHISTORY = "INSERT INTO workhistory (employee_id, workhistory_status, workhistory_description, work_date) VALUES (?, ?, ?, now())";
const GET_WORKTIME = "SELECT * FROM worktime WHERE approve_date <= now() ORDER BY approve_date DESC LIMIT 1";
const GET_EMPLOYEE_INFO = "SELECT e1.employee_id, e1.first_name, e1.last_name, e1.group_id, g.group_name,  e1.holiday_time, e1.avt, "
    + "                         e1.phone, e1.main_skill, e1.sub_skill, e1.role, e2.first_name as employer_firstname, e2.last_name as employer_lastname "
    + "                     FROM employee e1 INNER JOIN `group` g on e1.group_id = g.group_id "
    + "                     LEFT JOIN employee e2 on e1.employer_id = e2.employee_id "
    + "                     WHERE e1.employee_id = ? LIMIT 1 "

async function verifyUser(data) {
    try {
        if (!data || !data.employee_id) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] data or data.employee_id is not exist`);
            return false;
        }
        const listUser = await exeQuery(QUERY_VERIFY_USER, [data.employee_id]);
        if (!listUser.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] user is not exist in database`);
            return false;
        }
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] verify user success - return user`);
        return listUser[0];
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        return false;
    }
}

async function refreshToken(req, res) {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] refreshToken is not exist`);
            res.status(403).send("RefreshToken is required");
            return;
        }
        const data = verifyRefreshToken(refreshToken);
        if (!data || !(await verifyUser(data))) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] user is not exist`);
            res.status(403).send("User is not exist");
            return;
        }
        const newToken = signToken(data);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`);
        res.status(200).send({
            accessToken: newToken,
            refreshToken: refreshToken
        });
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR")
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] email or password is not exist`);
            res.status(400).send("Email or Password not valid");
            return;
        }

        const result = await exeQuery(GET_USER_BY_EMAIL, [email]);
        if (!result.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] email is not exist in database`);
            res.status(400).send("Email or Password not valid");
            return;
        }
        const listUser = Object.values(JSON.parse(JSON.stringify(result)));
        const user = listUser[0];
        if (!compare(password, user.password)) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] password is not match`);
            res.status(400).send("Wrong password");
            return;
        }
        delete user.password;
        const accessToken = signToken(user);
        const refreshToken = signRefreshToken(user);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response`);
        res.status(200).send({
            accessToken,
            refreshToken
        })
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR")
    }

}

function get(req, res) {
    res.status(200).send("get success");
}

async function isAvalibleCheckinTime(connection) {
    const workTimeList = await queryTransaction(connection, GET_WORKTIME);
    let workTime = WORKTIME_DEFAULT
    if (workTimeList.length) {
        workTime = workTimeList[0];
    }
    const now = new Date();
    if (now.getHours() < VALID_HOUR) {
        return false;
    }
    if (compareTwoTimeGreaterOrEqual(now.getHours(), now.getMinutes(), workTime.hour_end, workTime.min_end)) {
        return false;
    }
    return true;
}

async function checkin(req, res) {
    const connection = await getConnection();
    await beginTransaction(connection);
    try {
        const empId = req.employee_id;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send("Check in failed");
            await commitTransaction(connection);
            releaseConnection(connection);
            return;
        }
        if (!(await isAvalibleCheckinTime(connection))) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] now is not work time`);
            res.status(403).send("Check in failed");
            await commitTransaction(connection);
            releaseConnection(connection);
            return;
        }
        const today = moment().format('YYYY-MM-DD');
        const now = moment().format('YYYY-MM-DD, hh:mm:ss a');
        const curWorkLogList = await queryTransaction(connection, GET_WORKLOG_OF_USER, [empId, today]);
        if (!curWorkLogList.length) {
            logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] today worklog not exist - create new worklog`);
            await queryTransaction(connection, INSERT_NEW_WORKLOG, [empId, today]);

            // add work history
            logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] add work history - check in`);
            await queryTransaction(connection, INSERT_NEW_WORKHISTORY, [empId, WORKHISTORY_STATUS.checkin, `Check in at ${now}`])
        } else {
            const currentWorkLog = curWorkLogList[0];
            if (currentWorkLog.work_status === WORKLOG_STATUS.checkin) {
                logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] worklog status is checkin - not update`);
            } else {
                logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] update today worklog - check in`);
                await queryTransaction(connection, UPDATE_WORKLOG_STATUS, [WORKLOG_STATUS.checkin, currentWorkLog.work_total, currentWorkLog.worklog_id]);

                // add work history
                logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] add work history - check in`);
                await queryTransaction(connection, INSERT_NEW_WORKHISTORY, [empId, WORKHISTORY_STATUS.checkin, `Check in at ${now}`])
            }
        }
        await commitTransaction(connection);
        releaseConnection(connection);
        res.status(200).send("Check in success");
    } catch (error) {
        await rollback(connection);
        releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
    }
}

async function checkout(req, res) {
    const connection = await getConnection();
    await beginTransaction(connection);
    try {
        const empId = req.employee_id;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send("Check out failed");
            await commitTransaction(connection);
            releaseConnection(connection);
            return;
        }
        const today = moment().format('YYYY-MM-DD');
        const curWorkLogList = await queryTransaction(connection, GET_WORKLOG_OF_USER, [empId, today]);
        if (!curWorkLogList.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] today worklog not exist - can not check out`);
            await commitTransaction(connection);
            releaseConnection(connection);
            res.status(403).send("Check out failed");
            return;
        }
        const workTimeList = await queryTransaction(connection, GET_WORKTIME);
        let workTime = WORKTIME_DEFAULT
        if (workTimeList.length) {
            workTime = workTimeList[0];
        }
        const nowDate = new Date();
        // check if checkout when out of working time
        if (compareTwoTimeGreaterOrEqual(nowDate.getHours(), nowDate.getMinutes(), workTime.hour_end, workTime.min_end)) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] Working time is finished - can not check out`);
            await commitTransaction(connection);
            releaseConnection(connection);
            res.status(403).send("You are out of working time");
            return;
        }
        const currentWorkLog = curWorkLogList[0];
        if (currentWorkLog.work_status === WORKLOG_STATUS.checkout) {
            logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] worklog status is checkout - not update`);
        } else {
            let workLogUpdateDate = new Date(currentWorkLog.update_at);
            if (compareTwoTimeGreaterOrEqual(workTime.hour_start, workTime.min_start, workLogUpdateDate.getHours(), workLogUpdateDate.getMinutes())) {
                workLogUpdateDate.setHours(workTime.hour_start);
                workLogUpdateDate.setMinutes(workTime.min_start);
            }
            // Set time for calculate working time
            const startTime = workLogUpdateDate;
            const endTime = new Date();
            const lunchStart = new Date();
            lunchStart.setHours(workTime.lunch_hour_start, workTime.lunch_min_start, 0);
            const lunchEnd = new Date();
            lunchEnd.setHours(workTime.lunch_hour_end, workTime.lunch_min_end, 0);
            // Calculate work total
            const workTotal = currentWorkLog.work_total + calWorkingTime(startTime, endTime, lunchStart, lunchEnd);
            logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] update today worklog - check out, work total: ${workTotal} minutes`);
            await queryTransaction(connection, UPDATE_WORKLOG_STATUS, [WORKLOG_STATUS.checkout, workTotal, currentWorkLog.worklog_id]);

            // add work history
            const now = moment().format('YYYY-MM-DD, hh:mm:ss a');
            logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] add work history - check out`);
            await queryTransaction(connection, INSERT_NEW_WORKHISTORY, [empId, WORKHISTORY_STATUS.checkout, `Check out at ${now}`])
        }
        await commitTransaction(connection);
        releaseConnection(connection);
        res.status(200).send("Check out success");
    } catch (error) {
        await rollback(connection);
        releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
    }
}

async function getStart(req, res) {
    try {
        const empId = req.employee_id;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id is not exist`);
            res.status(403).send("Get Failed");
            return;
        }
        const employeeInfo = await exeQuery(GET_EMPLOYEE_INFO, [empId]);
        if (!employeeInfo.length) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id is not exist in database`);
            res.status(403).send("Get Failed");
            return;
        }

        const response = { ...employeeInfo[0], workLog: null, workTime: WORKTIME_DEFAULT };

        const today = moment().format('YYYY-MM-DD');
        const curWorkLogList = await exeQuery(GET_WORKLOG_OF_USER, [empId, today]);
        if (curWorkLogList.length) {
            response.workLog = curWorkLogList[0];
        }

        const currentWorktime = await exeQuery(GET_WORKTIME);
        if (currentWorktime.length) {
            response.workTime = currentWorktime[0];
        }

        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response success`);
        res.status(200).send(response);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send("SERVER ERROR");
    }
}

module.exports = {
    login,
    get,
    refreshToken,
    checkin,
    checkout,
    getStart,
}