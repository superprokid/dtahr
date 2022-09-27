const express = require('express');
const { authen } = require('../policy/user.authentication');
const { adminAuthen } = require('../policy/admin.authentication');
const Router = express.Router();
const userController = require('../controller/user/user.controller');
const worklogController = require('../controller/user/worklog.controller');
const overtimeController = require('../controller/user/overtime.controller');

// Import for admin controller
const adminController = require('../controller/admin/admin.controller');
const adminEmpController = require('../controller/admin/employee.controller');

// user
Router.post('/user/login', userController.login);
Router.post('/user/refreshtoken', userController.refreshToken);
Router.get('/user/get', authen, userController.get);
Router.post('/user/checkin', authen, userController.checkin);
Router.post('/user/checkout', authen, userController.checkout);
Router.get('/user/workhistory', authen, worklogController.getWorkHistory);
Router.get('/user/worklog', authen, worklogController.getWorkLogByUser);
Router.post('/user/create/overtime', authen, overtimeController.registerOverTime);
Router.get('/user/overtime/get', authen, overtimeController.getListOverTimeTicketOfUser);
Router.get('/user/overtime/getAll', authen, overtimeController.getListOverTimeTicketOfGroup);
Router.get('/user/getstart', authen, userController.getStart);

// admin
Router.post('/admin/login', adminController.login);
Router.get('/admin/getalluser', adminAuthen, adminController.getAllUser);
Router.post('/admin/create/employee', adminEmpController.createNewEmployee);

module.exports = Router;