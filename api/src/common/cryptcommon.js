const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const { randomString } = require('./utils');
const { EXPIRES_TIME } = require('../config/constants');
const { SALT_ROUNDS, CRYPTO_KEY, PRIVATE_KEY, PRIVATE_KEY_REFRESH } = require('../config/env');

/**
 * Hash your password
 * @param {String} password 
 * @returns 
 */
function hash(password = "") {
    if (!password) {
        return null;
    }
    return bcrypt.hashSync(password, SALT_ROUNDS);
}

/**
 * Compare your password
 * @param {String} password 
 * @param {String} hashPassword 
 * @returns 
 */
function compare(password = "", hashPassword = "") {
    if (!password || !hashPassword) {
        return false;
    }
    return bcrypt.compareSync(password, hashPassword);
}

/**
 * Encrypt your data with AES
 * @param {any} data 
 * @returns 
 */
function encrypt(data) {
    if (!data) {
        return null;
    }
    const stringData = JSON.stringify([randomString(10), data]);
    if (!stringData) {
        return null; 
    }
    return CryptoJS.AES.encrypt(stringData, CRYPTO_KEY).toString();
}

/**
 * Decrypt your Data with AES
 * @param {any} encryptData 
 * @returns 
 */
function decrypt(encryptData = "") {
    try {
        if (!encryptData) {
            return null;
        }
        const bytes = CryptoJS.AES.decrypt(encryptData, CRYPTO_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))[1];
    } catch (error) {
        return null;
    }
}

function signToken(data = {}) {
    return jwt.sign(data, PRIVATE_KEY, { expiresIn: EXPIRES_TIME });
}

function signRefreshToken(data = {}) {
    return jwt.sign(data, PRIVATE_KEY_REFRESH);
}

function verifyToken(token = '') {
    try {
        return jwt.verify(token, PRIVATE_KEY);
    } catch (ex) {
        return false;
    }
}

function verifyRefreshToken(refreshToken = '') {
    try {
        const data = jwt.verify(refreshToken, PRIVATE_KEY_REFRESH);
        delete data.iat
        return data;
    } catch (ex) {
        console.error(ex+"");
        return false;
    }
}

module.exports = {
    hash,
    compare,
    encrypt,
    decrypt,
    signToken,
    signRefreshToken,
    verifyToken,
    verifyRefreshToken
}