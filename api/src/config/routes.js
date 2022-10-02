const express = require('express');
const { authen } = require('../policy/user.authentication');
const { adminAuthen } = require('../policy/admin.authentication');
const Router = express.Router();
// Import for user controller
const userController = require('../controller/user/user.controller');
const worklogController = require('../controller/user/worklog.controller');
const overtimeController = require('../controller/user/overtime.controller');
const holidayController = require('../controller/user/holiday.controller');
const projectController = require('../controller/user/project.controller');
const leaveController = require('../controller/user/leave.controller');
const dailyreportController = require('../controller/user/dailyreport.controller');

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
Router.post('/user/create/dailyreport', authen, dailyreportController.createDailyReport);
Router.post('/user/create/leave', authen, leaveController.registerLeaveTicket)
Router.get('/user/overtime/get', authen, overtimeController.getListOverTimeTicketOfUser);
Router.get('/user/overtime/getall', authen, overtimeController.getListOverTimeTicketOfGroup);
Router.get('/user/getstart', authen, userController.getStart);
Router.get('/user/getholidays', authen, holidayController.getAllHoliday);
Router.get('/user/getprojects', authen, projectController.getAllProjects);
Router.get('/user/leave/get', authen, leaveController.getLeaveTicketByUser);
Router.get('/user/leave/getall', authen, leaveController.getAllLeaveTicket);
Router.get('/user/dailyreport/get', authen, dailyreportController.getDailyrepotByUser);
Router.post('/user/delete/leave', authen, leaveController.deleteLeaveTicket);
Router.post('/user/delete/overtime', authen, overtimeController.deleteOvertimeTicket);
// user - manager
Router.post('/user/manager/update/leave', authen, leaveController.updateStatusLeaveTicket);
Router.post('/user/manager/update/overtime', authen, overtimeController.updateStatusOvertimeTicket);

// admin
Router.post('/admin/login', adminController.login);
Router.get('/admin/getalluser', adminAuthen, adminController.getAllUser);
Router.post('/admin/create/employee', adminEmpController.createNewEmployee);

module.exports = Router;