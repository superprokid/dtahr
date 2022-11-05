const express = require('express');
const { authen } = require('../policy/user.authentication');
const { adminAuthen } = require('../policy/admin.authentication');
const { faceRecogAuthen } = require('../policy/facerecog.authentication');
const { uploadFile, sendFile } = require('../common/uploadUtls');
const path = require('path')
const Router = express.Router();
// Import for user controller
const userController = require('../controller/user/user.controller');
const worklogController = require('../controller/user/worklog.controller');
const overtimeController = require('../controller/user/overtime.controller');
const holidayController = require('../controller/user/holiday.controller');
const projectController = require('../controller/user/project.controller');
const leaveController = require('../controller/user/leave.controller');
const dailyreportController = require('../controller/user/dailyreport.controller');
const workFromHomeController = require('../controller/user/workfromhome.controller');
const taskController = require('../controller/user/task.controller');

// Import for admin controller
const adminController = require('../controller/admin/admin.controller');
const adminEmpController = require('../controller/admin/employee.controller');
const adminGroupController = require('../controller/admin/group.controller');
const adminHolidayController = require('../controller/admin/holiday.controller');
const adminWorkTimeController = require('../controller/admin/worktime.controler');

// user
Router.post('/user/login', userController.login);
Router.post('/user/refreshtoken', userController.refreshToken);
// Router.get('/user/get', userController.get);
Router.post('/user/app/checkin', sendFile.any(), userController.checkInMobile);
Router.get('/user/getalluser', authen, userController.getAllUser);
Router.post('/user/checkin', authen, userController.checkin);
Router.post('/user/checkout', authen, userController.checkout);
Router.get('/user/workhistory', authen, worklogController.getWorkHistory);
Router.get('/user/worklog', authen, worklogController.getWorkLogByUser);
Router.post('/user/create/overtime', authen, overtimeController.registerOverTime);
Router.post('/user/create/dailyreport', authen, dailyreportController.createDailyReport);
Router.post('/user/create/leave', authen, leaveController.registerLeaveTicket);
Router.post('/user/create/wfh', authen, workFromHomeController.registerWFHTicket);
Router.get('/user/overtime/get', authen, overtimeController.getListOverTimeTicketOfUser);
Router.get('/user/overtime/getall', authen, overtimeController.getListOverTimeTicketOfGroup);
Router.get('/user/wfh/get', authen, workFromHomeController.getListWFHTicketOfUser);
Router.get('/user/getstart', authen, userController.getStart);
Router.get('/user/getholidays', authen, holidayController.getAllHoliday);
Router.get('/user/getprojects', authen, projectController.getAllProjects);
Router.get('/user/leave/get', authen, leaveController.getLeaveTicketByUser);
Router.get('/user/leave/getall', authen, leaveController.getAllLeaveTicket);
Router.get('/user/dailyreport/get', authen, dailyreportController.getDailyrepotByUser);
Router.get('/user/dailyreport/getreceive', authen, dailyreportController.getDailyreportToUser);
Router.get('/user/dailyreport/getdetails', authen, dailyreportController.getDetailsDailyReportById);
Router.post('/user/delete/leave', authen, leaveController.deleteLeaveTicket);
Router.post('/user/delete/overtime', authen, overtimeController.deleteOvertimeTicket);
Router.post('/user/delete/dailyreport', authen, dailyreportController.deleteMyReport);
Router.post('/user/delete/wfh', authen, workFromHomeController.deleteWFHTicket);
Router.post('/user/edit/dailyreport', authen, dailyreportController.editMyDailyReport);
Router.post('/user/changepassword', authen, userController.changePassword);
Router.post('/user/changeprofile', uploadFile.any(), authen, userController.updateInformation);
Router.get('/public/avts/:filename', (req, res) => {
    res.sendFile(path.join(__basedir, './public/avts', req.params.filename))
});
Router.post('/user/task/create', authen, taskController.addNewTask);
Router.post('/user/category/create', authen, taskController.addNewCategory);
Router.post('/user/comment/create', authen, taskController.addNewComment);
Router.post('/user/task/update', authen, taskController.updateTask);
Router.post('/user/comment/update', authen, taskController.editComment);
Router.get('/user/task/getbystatus', authen, taskController.getAllTaskWithStatus);
Router.get('/user/task/getall', authen, taskController.getAllTask);
Router.get('/user/task/getdetails', authen, taskController.getTaskByID);
Router.get('/user/category/getall', authen, taskController.getAllCategory);

// user - manager
Router.post('/user/manager/update/leave', authen, leaveController.updateStatusLeaveTicket);
Router.post('/user/manager/update/overtime', authen, overtimeController.updateStatusOvertimeTicket);
Router.post('/user/manager/update/wfh', authen, workFromHomeController.updateStatusWFHTicket);
Router.get('/user/manager/getalluser', authen, userController.getAllUserByManager);
Router.get('/user/manager/getrealtime', authen, userController.getRealTimeStatusByManager);
Router.get('/user/manager/worklog/get', authen, worklogController.getWorkLogOfUserByManager);
Router.get('/user/manager/workhistory/get', authen, worklogController.getWorkHistoryByManager);
Router.get('/user/manager/employee/getinfo', authen, userController.getEmployeeInfoById);
Router.get('/user/manager/project/get', authen, projectController.getDetailsPojectByManager);
Router.get('/user/manager/wfh/get', authen, workFromHomeController.getListWFHByManager);
Router.get('/user/manager/wfh/getall', authen, workFromHomeController.getListWFHOfGroup);
Router.post('/user/manager/worklog/update', authen, worklogController.updateWorklogByManager);
Router.post('/user/manager/holiday/update', authen, worklogController.updateHolidayTimeByManager);

// admin
Router.post('/admin/login', adminController.login);
Router.get('/admin/getstart', adminAuthen, adminController.getStartAdmin);
Router.get('/admin/getalluser', adminAuthen, adminController.getAllUser);
Router.post('/admin/create/employee', adminEmpController.createNewEmployee);
Router.get('/admin/group/get', adminAuthen, adminGroupController.getAllGroup);
Router.get('/admin/employee/getfreemanager', adminAuthen, adminEmpController.getAllFreeManager);
Router.get('/admin/group/getalluser', adminAuthen, adminGroupController.getAllEmployeeInGroup);
Router.post('/admin/group/create', adminAuthen, adminGroupController.createGroup);
Router.post('/admin/group/update', adminAuthen, adminGroupController.updateGroup);
Router.post('/admin/group/delete', adminAuthen, adminGroupController.deleteGroup);
Router.post('/admin/employee/update', adminAuthen, adminEmpController.editEmployee);
Router.post('/admin/holiday/create', adminAuthen, adminHolidayController.addNewHoliday);
Router.post('/admin/holiday/delete', adminAuthen, adminHolidayController.deleteHoliday);
Router.get('/admin/holiday/get', adminAuthen, adminHolidayController.getAllHoliday);
Router.get('/admin/worktime/get', adminAuthen, adminWorkTimeController.getAllWorkTime);
Router.post('/admin/worktime/create', adminAuthen, adminWorkTimeController.addNewWorktime);
Router.post('/admin/worktime/update', adminAuthen, adminWorkTimeController.updateWorkTime);
Router.post('/admin/worktime/delete', adminAuthen, adminWorkTimeController.deleteWorkTime);

// face python system
Router.post('/face/checkin', faceRecogAuthen, userController.checkInFaceId);

module.exports = Router;  