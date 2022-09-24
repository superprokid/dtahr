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
 * Compare two time
 * @param {Number} date1 
 * @param {Number} date2 
 */
function compareTwoTimeGreaterOrEqual(hours1, min1, hours2, min2) {
    if (hours1 >= hours2 && min1 >= min2) {
        return true;
    } else {
        return false;
    }
}
/**
 * Validate request body
 * @param {Object} validateObj 
 * @param {Object} validateSchema 
 * @returns false if body is valid
 */
function validateRequest(validateObj, validateSchema) {
    const a = {
        name: 'thang',
        pass: '123'
    }

    const schema = {
        name: {
            type: 'string',
            required: true,
        }
    }

    for (const [key, value] of Object.entries(validateSchema)) {
        if (value.required) {
            if (!validateObj[key]) {
                return `${key} is required`
            }
        }

        if (!validateType(validateObj[key], value.type)) {
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

function isValidNumber(n) {
    return !isNaN(n)
}

module.exports = {
    randomString,
    convertSQLResultToJSON,
    minDiff,
    compareTwoTimeGreaterOrEqual,
    validateRequest,
    getStartOfDate,
}