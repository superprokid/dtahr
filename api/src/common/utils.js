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

function convertSQLResultToJSON(rows) {
    if (!rows || !rows.length) {
        return null;
    }
    return Object.values(JSON.parse(JSON.stringify(rows)));
}

module.exports = {
    randomString,
    convertSQLResultToJSON,
}