/**
 * Database utilities to process for mysql
 * Create by: ThangLD
 * Create at: 15/09/2022
 */

const mysql = require('mysql');
const database = require('../config/database');

const pool = mysql.createPool({
    connectionLimit: database.limit,
    host: database.host,
    port: database.port,
    database: database.database,
    user: database.user,
    password: database.passwrod,
    charset: database.charset
});

/**
 * Get mysql connection
 * @returns 
 */
function getConnection() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                reject(err);
            } else {
                resolve(conn);
            }
        })
    })
}

/**
 * Begin transaction sql
 * @param {mysql.Connection} conn 
 * @returns 
 */
function beginTransaction(conn) {
    return new Promise((resolve, reject) => {
        conn.beginTransaction((err) => {
            if (err) {
                reject(err);
            } else {
                resolve(conn);
            }
        })
    })
}

/**
 * Execute query with transaction
 * @param {mysql.Connection} conn 
 * @param {String} sql 
 * @param {Array} params 
 * @returns 
 */
function queryTransaction(conn, sql, params = []) {
    return new Promise((resolve, reject) => {
        conn.query(sql, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

/**
 * Commit transaction mysql
 * @param {mysql.Connection} conn 
 * @returns 
 */
function commitTransaction(conn) {
    return new Promise((resolve, reject) => {
        conn.commit((err) => {
            if (err) {
                reject(err);
            } else {
                resolve(conn);
            }
        })
    })
}

/**
 * Query sql without connection
 * @param {String} sql 
 * @param {Array} params 
 * @returns 
 */
function queryThenRelease(sql, params) {
    return new Promise((resolve, reject) => {
        pool.query({ sql, timeout: 5000 }, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

/**
 * Query without transaction
 * Should be select clause
 * @param {String} sql 
 * @param {Array} params 
 * @returns 
 */
async function exeQuery(sql, params = []) {
    let result = [];
    try {
        result = await queryThenRelease(sql, params);
    } catch (ex) {
        throw ex;
    }
    return result;
}
/**
 * Rollback transaction
 * @param {mysql.Connection} conn 
 */
async function rollback(conn) {
    return new Promise((resolve, reject) => {
        conn.rollback(() => { resolve() })
    })
}
/**
 * Release Connection
 * @param {mysql.Connection} conn 
 */
function releaseConnection(conn) {
    return conn.release();
}

module.exports = {
    getConnection,
    beginTransaction,
    queryTransaction,
    commitTransaction,
    exeQuery,
    rollback,
    releaseConnection
}