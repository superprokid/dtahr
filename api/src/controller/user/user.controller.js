const logger = require('../../common/logger');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const FormData = require('form-data');
const { axiosBase } = require('../../common/axiosBase')
const { signToken, signRefreshToken, verifyRefreshToken, compare, hash } = require('../../common/cryptcommon');
const { exeQuery, getConnection, beginTransaction, commitTransaction, releaseConnection, queryTransaction, rollback } = require('../../common/dbaccess');
const { minDiff, compareTwoTimeGreaterOrEqual, calWorkingTime, getStartOfDate, getDateString, isValidDate, validateRequest } = require('../../common/utils');
const { WORKLOG_STATUS, WORKHISTORY_STATUS, WORKTIME_DEFAULT, VALID_HOUR, ROLE } = require('../../config/constants');
const { log } = require('console');
const { FACE_SERVE_URL } = require('../../config/env');

const LOG_CATEGORY = "UserController"
const QUERY_VERIFY_USER = "SELECT * FROM employee WHERE employee_id = ? and is_deleted <> 1 LIMIT 1";
const GET_USER_BY_EMAIL = "SELECT * FROM employee WHERE email = ? and is_deleted <> 1 ORDER BY update_at DESC  LIMIT 1";
const GET_WORKLOG_OF_USER = "SELECT * FROM worklog WHERE employee_id = ? and work_date = ? LIMIT 1";
const GET_HOLYDAY = "SELECT * FROM holiday WHERE date = ?";
const GET_CURRENT_HOLIDAY = "SELECT * FROM holiday WHERE date = CAST(now() as DATE)";
const INSERT_NEW_WORKLOG = "INSERT INTO worklog (employee_id, work_status, work_date, work_total) VALUES (?, 0, ?, 0)";
const UPDATE_WORKLOG_STATUS = "UPDATE worklog SET work_status = ?, work_total = ? WHERE worklog_id = ?";
const INSERT_NEW_WORKHISTORY = "INSERT INTO workhistory (employee_id, workhistory_status, workhistory_description, work_date) VALUES (?, ?, ?, now())";
const GET_WORKTIME = "SELECT * FROM worktime WHERE approve_date <= now() ORDER BY approve_date DESC LIMIT 1";
const GET_EMPLOYEE_INFO = "SELECT e1.employee_id, e1.first_name, e1.last_name, e1.group_id, g.group_name,  e1.holiday_time, e1.avt, e1.gender, e1.address, e1.dob, e1.email, "
    + "                         e1.relative_name, e1.relationship, e1.relative_phone, e1.relative_address, "
    + "                         e1.phone, e1.main_skill, e1.sub_skill, e1.role, e2.first_name as employer_firstname, e2.last_name as employer_lastname "
    + "                     FROM employee e1 INNER JOIN `group` g on e1.group_id = g.group_id "
    + "                     LEFT JOIN employee e2 on e1.employer_id = e2.employee_id "
    + "                     WHERE e1.employee_id = ? LIMIT 1 ";
const GET_ALL_USER = "SELECT employee_id, CONCAT(first_name, ' ', last_name) as name, avt FROM employee WHERE is_deleted <> 1"
const GET_ALL_USER_BY_MANAGER = "SELECT DISTINCT e.employee_id, CONCAT(e.first_name, ' ' ,e.last_name) as full_name, e.dob, e.holiday_time, gender, join_date, phone, main_skill, e.email, e.job_role, salary, p.project_name, p.project_id"
    + "                         FROM employee e "
    + "                             LEFT JOIN (SELECT a.project_id, a.employee_id, a.assigned_date "
    + "                                         FROM assignment a, "
    + "                                             (SELECT DISTINCT employee_id, MAX(assigned_date) as assigned_date FROM assignment GROUP BY employee_id) aa"
    + "                                         WHERE a.employee_id = aa.employee_id and a.assigned_date = aa.assigned_date) asign ON e.employee_id = asign.employee_id"
    + "                             LEFT JOIN project p ON p.project_id = asign.project_id"
    + "                         WHERE e.employer_id = ? and e.is_deleted <> 1"
const GET_REALTIME_STATUS_BY_MANAGER = "SELECT DISTINCT e.employee_id, CONCAT(first_name,' ',last_name) as full_name, IF(work_status is null or is_not_working = 1, null, work_status) as work_status, IF(leave_id is not null, 1, 0) as isOff "
    + "                                 FROM employee e "
    + "		                                LEFT JOIN (SELECT * FROM worklog WHERE work_date = ?) w ON e.employee_id = w.employee_id"
    + "		                                LEFT JOIN ( SELECT * FROM `leave` WHERE CAST(start_date AS DATE) = ? and `status` = 1) l ON e.employee_id = l.employee_id"
    + "                                 WHERE e.employer_id = ? and e.is_deleted <> 1 ORDER BY e.employee_id ASC"
const GET_USER_INFO_BY_ID = "SELECT *, CONCAT(first_name, ' ', last_name) as full_name FROM employee WHERE employee_id = ? and is_deleted <> 1";
const UPDATE_PASSWORD = "UPDATE employee SET password = ? WHERE employee_id = ?";
const AVT_PATH = "../../../public/avts/";
const GET_USERS_OF_PROJECT = "SELECT DISTINCT e.employee_id, CONCAT(first_name, ' ', last_name) as name, avt "
    + "                         FROM employee e "
    + "                         	LEFT JOIN (SELECT *"
    + "                    						FROM assignment a "
    + "	                    					WHERE project_id = ?) tb1 on e.employee_id = tb1.employee_id"
    + "                         WHERE e.role = 1 OR tb1.assigned_date is not null"

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
        res.status(500).send({ message: "SERVER ERROR" })
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
        res.status(500).send({ message: "SERVER ERROR" })
    }

}

async function checkInFaceId(req, res) {
    req.employee_id = req.body.employeeId;
    req.isFaceId = true;
    await checkin(req, res);
    return
}

async function checkInMobile(req, res) {
    try {
        const file = req.files?.length ? req.files[0] : null;
        if (file) {
            const empId = req.employee_id;
            console.log('empId', empId);
            const form = new FormData();
            const fileStream = fs.createReadStream(file.path);
            form.append('file', fileStream);
            fileStream.on('close', () => {
                deleteFile(file.path)
            });
            fileStream.on('error', () => {
                deleteFile(file.path)
            });
            form.append('employeeId', empId);
            axiosBase.post(`${FACE_SERVE_URL}/check`, form).then((result) => {
                console.log('faceid = ', result.data);
                const empFaceId = result.data;
                if (empFaceId && empFaceId.employeeId === empId) {
                    req.isFaceId = true;
                    checkin(req, res);
                } else {
                    logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] - can request to face server`);
                    res.status(400).send({ message: 'Can not recognize your face, please try again!' })
                }
            }).catch((err) => {
                logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] - can request to face server`);
                res.status(400).send({ message: 'Request failed, please try again' })
            }).finally(() => {
                deleteFile(file.path)
            })
        } else {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] - file not exist`);
            res.status(400).send({ message: 'Request failed, please try again' })
        }
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }

}

async function isAvalibleCheckinTime(connection) {
    const currentHoliday = await queryTransaction(connection, GET_CURRENT_HOLIDAY);
    if (currentHoliday.length) {
        return false;
    }
    const workTimeList = await queryTransaction(connection, GET_WORKTIME);
    let workTime = WORKTIME_DEFAULT
    if (workTimeList.length) {
        workTime = workTimeList[0];
    }
    const now = new Date();
    if (now.getHours() < VALID_HOUR) {
        return false;
    }

    if (now.getDay() === 0 || now.getDay() === 6) {
        return false;
    }

    if (compareTwoTimeGreaterOrEqual(now.getHours(), now.getMinutes(), workTime.hour_end, workTime.min_end)) {
        return false;
    }
    return true;
}

async function checkin(req, res) {
    if (!req.isFaceId) {
        const { ip } = req.body;
        if (ip != __myPublicIP) {
            console.log('__myPublicIP', __myPublicIP);
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] You can't check in if you not in office`);
            res.status(403).send({ message: "You can't check in if you not in office", failed: true })
            return;
        }
    }
    const connection = await getConnection();
    await beginTransaction(connection);
    try {
        const empId = req.employee_id;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send({ message: "Something went wrong, please try later!", failed: true });
            await commitTransaction(connection);
            releaseConnection(connection);
            return;
        }
        if (!(await isAvalibleCheckinTime(connection))) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] now is not work time`);
            res.status(403).send({ message: "Today is not working day, can't checkin", failed: true });
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
        res.status(200).send({ message: "Check in success" });
    } catch (error) {
        await rollback(connection);
        releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR", failed: true });
    }
}

async function checkout(req, res) {
    const connection = await getConnection();
    await beginTransaction(connection);
    try {
        const empId = req.employee_id;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send({ message: "Something went wrong, please try later!" });
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
            res.status(403).send({ message: "Something went wrong, please try later!" });
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
            res.status(403).send({ message: "You are out of working time" });
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
                workLogUpdateDate.setSeconds(0);
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
            logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] update today worklog - check out, work total: ${workTotal < 0 ? 0 : workTotal} minutes`);
            await queryTransaction(connection, UPDATE_WORKLOG_STATUS, [WORKLOG_STATUS.checkout, workTotal < 0 ? 0 : workTotal, currentWorkLog.worklog_id]);

            // add work history
            const now = moment().format('YYYY-MM-DD, hh:mm:ss a');
            logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] add work history - check out`);
            await queryTransaction(connection, INSERT_NEW_WORKHISTORY, [empId, WORKHISTORY_STATUS.checkout, `Check out at ${now}`])
        }
        await commitTransaction(connection);
        releaseConnection(connection);
        res.status(200).send({ message: 'Check out success'});
    } catch (error) {
        await rollback(connection);
        releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function changePassword(req, res) {
    const connection = await getConnection();
    await beginTransaction(connection);
    try {
        const empId = req.employee_id;
        if (!empId) {
            await rollback(connection);
            releaseConnection(connection);
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id is not exist`);
            res.status(403).send("Get Failed");
            return;
        }

        const validateSchema = {
            currentPassword: {
                type: 'string',
                required: true
            },
            newPassword: {
                type: 'string',
                required: true
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

        const { currentPassword, newPassword } = req.body;

        // if current password is equal than new password
        if (currentPassword === newPassword) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] New password must be difference from current password`);
            await rollback(connection);
            releaseConnection(connection);
            res.status(403).send("New password must be difference from current password");
            return;
        }

        const userResult = await queryTransaction(connection, QUERY_VERIFY_USER, [empId]);
        if (!userResult.length) {
            await rollback(connection);
            releaseConnection(connection);
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] user is not exist in database`);
            res.status(403).send("Change failed")
            return false;
        }

        const password = userResult[0].password;
        // if password is not match
        if (!compare(currentPassword, password)) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] password is not match`);
            res.status(400).send("Wrong password");
            return;
        }

        await queryTransaction(connection, UPDATE_PASSWORD, [hash(newPassword), empId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] Change password success`);
        await commitTransaction(connection);
        releaseConnection(connection);
        res.status(200).send("Success");
    } catch (error) {
        await rollback(connection);
        releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
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
        const currentHoliday = await exeQuery(GET_HOLYDAY, [getDateString()]);
        if (currentWorktime.length) {
            response.workTime = currentWorktime[0];
            // if today is holiday
            if (currentHoliday.length) {
                response.workTime.isHoliday = true;
            } else {
                response.workTime.isHoliday = false;
            }
        }

        response.today = new Date();

        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response success`);
        res.status(200).send(response);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function getAllUser(req, res) {
    try {
        const empId = req.employee_id;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id is not exist`);
            res.status(403).send("Get Failed");
            return;
        }
        const result = await exeQuery(GET_ALL_USER);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response success`);
        res.status(200).send(result)
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function getAllUserByManager(req, res) {
    try {
        const empId = req.employee_id;
        const role = req.role;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send("Get failed");
            return;
        }

        if (role != ROLE.employer) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not a manager`);
            res.status(403).send("Get failed");
            return;
        }
        const result = await exeQuery(GET_ALL_USER_BY_MANAGER, [empId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response success`);
        res.status(200).send(result)
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function getRealTimeStatusByManager(req, res) {
    try {
        const empId = req.employee_id;
        const role = req.role;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send("Get failed");
            return;
        }

        if (role != ROLE.employer) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not a manager`);
            res.status(403).send("Get failed");
            return;
        }

        const respone = [];

        let { startDate, endDate } = req.query;
        if (!isValidDate(startDate) || !isValidDate(endDate)) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] startDate and endDate is required or not valid`);
            res.status(403).send("Get failed");
            return;
        }
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        if (startDate > endDate) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] startDate can't greater endDate`);
            res.status(403).send("Get failed");
            return;
        }
        let currDate = new Date(startDate);
        for (let i = 0; getStartOfDate(currDate) < getStartOfDate(endDate); i++) {
            currDate = new Date(moment(startDate).add(i, 'days').format('YYYY-MM-DD'));
            // if currentDate is sunday or saturday
            if (currDate.getDay() === 0 || currDate.getDay() === 6) {
                continue;
            }
            const currDateString = getDateString(currDate);
            const result = await exeQuery(GET_REALTIME_STATUS_BY_MANAGER, [currDateString, currDateString, empId]);
            respone.push({ date: currDateString, employee: result });
        }
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response success`);
        res.status(200).send(respone)
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function getEmployeeInfoById(req, res) {
    try {
        const empId = req.employee_id;
        const role = req.role;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            res.status(403).send("Get failed");
            return;
        }

        if (role != ROLE.employer) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not a manager`);
            res.status(403).send("Get failed");
            return;
        }

        const { employeeId } = req.query;

        if (!employeeId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employeeId is required`);
            res.status(403).send("Get failed");
            return;
        }

        let result = await exeQuery(GET_USER_INFO_BY_ID, [employeeId]);
        if (result.length) {
            result = result[0];
        } else {
            result = {};
        }
        delete result.password;
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response success`);
        res.status(200).send(result);
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function updateInformation(req, res) {
    const avt = req.files?.length ? req.files[0]?.filename : null;
    const connection = await getConnection();
    await beginTransaction(connection);
    try {
        const empId = req.employee_id;
        if (!empId) {
            if (avt) deleteAvt(avt);
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id not exist`);
            await rollback(connection);
            releaseConnection(connection);
            res.status(403).send("Update failed");
            return;
        }

        const validateSchema = {
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
        }

        const validResult = validateRequest(req.body, validateSchema);
        if (validResult) {
            if (avt) deleteAvt(avt);
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] ${validResult}`);
            await rollback(connection);
            releaseConnection(connection);
            res.status(403).send(validResult);
            return;
        }

        const { firstName, lastName, dob, address, gender, phone, mainSkill, subSkill } = req.body;

        const setClauseArray = [];
        const whereClause = ` WHERE employee_id = '${empId}'`;
        if (firstName) setClauseArray.push(` first_name = '${firstName}' `);
        if (lastName) setClauseArray.push(` last_name = '${lastName}' `);
        if (dob) setClauseArray.push(` dob = '${getDateString(dob)}' `);
        if (address) setClauseArray.push(` address = '${address}' `);
        if (gender) setClauseArray.push(` gender = '${gender}' `);
        if (phone) setClauseArray.push(` phone = '${phone}' `);
        if (mainSkill) setClauseArray.push(` main_skill = '${mainSkill}' `);
        if (subSkill) setClauseArray.push(` sub_skill = '${subSkill}' `);

        if (avt) {
            const currentUser = await queryTransaction(connection, QUERY_VERIFY_USER, [empId]);
            const currentAvt = currentUser.length ? currentUser[0].avt : null;
            if (currentAvt) {
                deleteAvt(currentAvt);
            }
            setClauseArray.push(` avt = '${avt}' `);
        }

        if (!setClauseArray.length) {
            if (avt) deleteAvt(avt);
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] no columns update`);
            await rollback(connection);
            releaseConnection(connection);
            res.status(403).send("Update failed, no columns need to update");
            return;
        }
        const setClause = " SET " + setClauseArray.join(',');
        const query = "UPDATE `employee` " + setClause + whereClause;

        await queryTransaction(connection, query);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] update profile success`);

        await commitTransaction(connection);
        releaseConnection(connection);
        res.status(200).send("update profile success");
    } catch (error) {
        if (avt) deleteAvt(avt);
        await rollback(connection);
        releaseConnection(connection);
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

async function getAllUserOfProject(req, res) {
    try {
        const empId = req.employee_id;
        if (!empId) {
            logger.warn(`[${LOG_CATEGORY} - ${arguments.callee.name}] employee_id is not exist`);
            res.status(403).send({ message: "Get Failed" });
            return;
        }
        const { projectId } = req.query;

        const result = await exeQuery(GET_USERS_OF_PROJECT, [projectId]);
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] response success`);
        res.status(200).send(result)
    } catch (error) {
        logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] - error` + error.stack);
        res.status(500).send({ message: "SERVER ERROR" });
    }
}

function deleteAvt(filename) {
    const newPath = path.join(__basedir, "/public/avts", filename);
    if (fs.existsSync(newPath)) {
        fs.unlink(newPath, (err) => { });
        logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] delete old avt success`);
    }
}

function deleteFile(filePath) {
    if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
            if (err) {
                logger.error(`[${LOG_CATEGORY} - ${arguments.callee.name}] delete file failed ${err.stack}`)
            } else {
                logger.info(`[${LOG_CATEGORY} - ${arguments.callee.name}] delete file success`)
            }
        });
    }
}

module.exports = {
    login,
    checkInFaceId,
    refreshToken,
    checkin,
    checkout,
    getStart,
    getAllUser,
    getAllUserByManager,
    getRealTimeStatusByManager,
    getEmployeeInfoById,
    changePassword,
    updateInformation,
    checkInMobile,
    getAllUserOfProject,
}