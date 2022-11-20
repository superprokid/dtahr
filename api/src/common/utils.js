const moment = require('moment')
const { MAX_EMPLOYEE_ID_LENGTH } = require("../config/constants");
const YYYY_MM_DD = 'YYYY-MM-DD';
const YYYY_MM_DD_HH_MM_SS = "YYYY-MM-DD hh:mm:ss";

/**
 * Generate random string
 * @param {Number} length 
 * @returns 
 */
function randomString(length = 1) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/**
 * Convert SQLResult Rows to JSON
 * @param {*} rows 
 * @returns 
 */
function convertSQLResultToJSON(rows) {
    if (!rows || !rows.length) {
        return null;
    }
    return Object.values(JSON.parse(JSON.stringify(rows)));
}

/**
 * Diff minutes between two dates
 * @param {Date} dateFrom 
 * @param {Date} dateTo 
 */
function minDiff(dateFrom, dateTo) {
    const diff = dateTo - dateFrom;
    return Math.round(diff / 60000);
}

/**
 * Get start of date
 * @param {Date} date 
 * @returns 
 */
function getStartOfDate(date) {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0);
    return newDate;
}

/**
 * Get date with YYYY-MM-DD format
 * @param {*} date 
 * @returns 
 */
function getDateString(date) {
    if (date) {
        return moment(date).format(YYYY_MM_DD)
    } else {
        return moment().format(YYYY_MM_DD);
    }
}

/**
 * Get date with YYYY-MM-DD hh:mm:ss format
 * @param {*} date 
 * @returns 
 */
function getDateTimeString(date) {
    return moment(new Date(date)).format(YYYY_MM_DD_HH_MM_SS);
}

/**
 * Calculate work time total from startTime to endTime if has lunch time
 * @param {Date} startTime 
 * @param {Date} endTime 
 * @param {Date} lunchTime 
 * @param {Date} lunchStart 
 */
function calWorkingTime(startTime, endTime, lunchStart, lunchEnd) {
    if (lunchEnd <= endTime && lunchStart >= startTime) {
        return minDiff(startTime, lunchStart) + minDiff(lunchEnd, endTime);
    } else if (startTime < lunchStart && endTime < lunchEnd && endTime > lunchStart) {
        return minDiff(startTime, lunchStart);
    } else if (startTime > lunchStart && startTime < lunchEnd && endTime > lunchEnd) {
        return minDiff(lunchEnd, endTime);
    } else if (startTime > lunchStart && endTime < lunchEnd) {
        return 0;
    } else {
        return minDiff(startTime, endTime);
    }
}

/**
 * Compare two time
 * @param {Number} date1 
 * @param {Number} date2 
 */
function compareTwoTimeGreaterOrEqual(hours1, min1, hours2, min2) {
    if (hours1 > hours2) {
        return true;
    } else if (hours1 < hours2) {
        return false;
    } else {
        if (min1 >= min2) {
            return true;
        } else {
            return false;
        }
    }
}
/**
 * Validate request body
 * @param {Object} validateObj 
 * @param {Object} validateSchema 
 * @returns false if body is valid
 */
function validateRequest(validateObj, validateSchema) {
    for (const [key, value] of Object.entries(validateSchema)) {
        if (value.required) {
            if (isNullOrUndefinded(validateObj[key])) {
                return `${key} is required`
            }
        }

        if (!isNullOrUndefinded(validateObj[key]) && !validateType(validateObj[key], value.type)) {
            return `${key} is not a ${value.type}`
        }
    }
    return false;
}

function validateType(value, type) {
    switch (type) {
        case 'string':
            return isValidString(value);
        case 'datetime':
            return isValidDate(value);
        case 'number':
            return isValidNumber(value);
        case 'array':
            return isValidArray(value);
        case 'time':
            return isValidTime(value);
        default:
            return false;
    }
}

function isValidString(s) {
    if (typeof s === 'string' || s instanceof String) {
        return true;
    } else {
        return false;
    }
}

function isValidDate(d) {
    const date = new Date(d);
    return date instanceof Date && !isNaN(date);
}

function isValidTime(time) {
    return moment(time, 'HH:mm', true).isValid()
}

function isValidNumber(n) {
    return !isNaN(n)
}

function isValidArray(arr) {
    return Array.isArray(arr) && arr.length;
}

function generateEmployeeId(employeeId) {
    let empId = Number(employeeId);
    empId = String(empId + 1);
    const length = MAX_EMPLOYEE_ID_LENGTH - empId.length;
    for (let i = 0; i < length; i++) {
        empId = '0' + empId;
    }
    return empId;
}

function generateId(latestId, maxLength) {
    let newId = Number(latestId);
    newId = String(newId + 1);
    const length = maxLength - newId.length;
    for (let i = 0; i < length; i++) {
        newId = '0' + newId;
    }
    return newId;
}

function isNullOrUndefinded(value) {
    return value === null || value === undefined;
}

function groupArrayByKey(arr, key) {
    return arr.reduce(function (newArr, item) {
        newArr[item[key]] = newArr[item[key]] || [];
        newArr[item[key]].push(item);
        return newArr;
    }, {});
}

function getDateStartOfMonth(date) {
    return moment(date).startOf('month').format(YYYY_MM_DD);
}

function getDateEndOfMonth(date) {
    return moment(date).endOf('month').format(YYYY_MM_DD);
}

function getDateStringWithFormat(date, format) {
    return moment(date).format(format);
}

module.exports = {
    randomString,
    convertSQLResultToJSON,
    minDiff,
    compareTwoTimeGreaterOrEqual,
    validateRequest,
    getStartOfDate,
    calWorkingTime,
    generateEmployeeId,
    isNullOrUndefinded,
    getDateString,
    groupArrayByKey,
    isValidDate,
    generateId,
    getDateTimeString,
    getDateStartOfMonth,
    getDateEndOfMonth,
    getDateStringWithFormat,
}