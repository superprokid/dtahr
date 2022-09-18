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
    return Math.round(((diff % 86400000) % 3600000) / 60000);
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

module.exports = {
    randomString,
    convertSQLResultToJSON,
    minDiff,
    compareTwoTimeGreaterOrEqual
}