const express = require('express');
const { authen } = require('../policy/user.authentication');
const { adminAuthen } = require('../policy/admin.authentication');
const { faceRecogAuthen } = require('../policy/facerecog.authentication');
const { uploadFile, sendFile, attachment, uploadCSV } = require('../common/uploadUtls');
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
const notifyController = require('../controller/user/notify.controller');

// Import for admin controller
const adminController = require('../controller/admin/admin.controller');
const adminEmpController = require('../controller/admin/employee.controller');
const adminGroupController = require('../controller/admin/group.controller');
const adminHolidayController = require('../controller/admin/holiday.controller');
const adminWorkTimeController = require('../controller/admin/worktime.controler');
const adminWorkLogController = require('../controller/admin/worklog.controller');
const adminProjectController = require('../controller/admin/project.controller');
const adminExportController = require('../controller/admin/export.controller');
const adminTaskController = require('../controller/admin/task.controller');
const adminPolicyController = require('../controller/admin/policy.controller');
const adminSalaryController = require('../controller/admin/salary.controler');

// user
Router.post('/user/login', userController.login);
Router.post('/user/refreshtoken', userController.refreshToken);
// Router.get('/user/get', userController.get);
Router.post('/user/app/checkin', authen, sendFile.any(), userController.checkInMobile);
Router.get('/user/getalluser', authen, userController.getAllUser);
Router.get('/user/getalluserofproject', authen, userController.getAllUserOfProject);
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
Router.post('/user/comment/delete', authen, taskController.deleteComment);
Router.get('/user/task/getbystatus', authen, taskController.getAllTaskWithStatus);
Router.get('/user/task/getall', authen, taskController.getAllTask);
Router.get('/user/task/getdetails', authen, taskController.getTaskByID);
Router.get('/user/task/getallforgantt', authen, taskController.getAllTaskGanttChart);
Router.post('/user/task/attachment/upload', authen, attachment.array('file'), taskController.addAttachments);
Router.post('/user/task/attachment/delete', authen, taskController.deleteTaskAttachments);
Router.post('/user/task/search', authen, taskController.searchTasks)
Router.get('/user/category/getall', authen, taskController.getAllCategory);
Router.get('/public/download/:dirname/:filename', (req, res) => {
    res.download(path.join(__basedir, './public/attachments/', req.params.dirname, '/', req.params.filename))
});
Router.get('/user/project/getlist', authen, projectController.getAllProjectByUser);
// notify
Router.get('/user/notify/get', authen, notifyController.getNotifyByUser)
Router.post('/user/notify/update', authen, notifyController.makeReadNotify)

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
Router.post('/admin/employee/changepassword', adminAuthen, adminEmpController.changePassword);
Router.post('/admin/holiday/create', adminAuthen, adminHolidayController.addNewHoliday);
Router.post('/admin/holiday/delete', adminAuthen, adminHolidayController.deleteHoliday);
Router.get('/admin/holiday/get', adminAuthen, adminHolidayController.getAllHoliday);
Router.get('/admin/worktime/get', adminAuthen, adminWorkTimeController.getAllWorkTime);
Router.post('/admin/worktime/create', adminAuthen, adminWorkTimeController.addNewWorktime);
Router.post('/admin/worktime/update', adminAuthen, adminWorkTimeController.updateWorkTime);
Router.post('/admin/worktime/delete', adminAuthen, adminWorkTimeController.deleteWorkTime);
Router.get('/admin/worklog/get', adminAuthen, adminWorkLogController.getWorkLogOfUser);
Router.get('/admin/workhistory/get', adminAuthen, adminWorkLogController.getWorkHistoryByEmployee);
Router.get('/admin/employee/getinfo', adminAuthen, adminEmpController.getEmployeeInfoById);
Router.get('/admin/employee/getproject', adminAuthen, adminProjectController.getDetailsPojectByEmployee);
Router.post('/admin/worklog/update', adminAuthen, adminWorkLogController.updateWorklog);
Router.post('/admin/holidaytime/update', adminAuthen, adminWorkLogController.updateHolidayTime);
Router.post('/admin/project/create', adminAuthen, adminProjectController.createNewProject);
Router.post('/admin/project/update', adminAuthen, adminProjectController.editProject);
Router.post('/admin/delete/employee', adminAuthen, adminEmpController.deleteEmployee);
Router.post('/admin/active/employee', adminAuthen, adminEmpController.activeEmployee);
// Project Task
Router.get('/admin/project/getall', adminAuthen, adminProjectController.getAllProjects);
Router.get('/admin/project/getstatus', adminAuthen, adminProjectController.getStatusOfProject);
Router.get('/admin/project/getassignment', adminAuthen, adminProjectController.getAssignmentOfProject);
Router.get('/admin/project/getdetails', adminAuthen, adminProjectController.getProjectDetails);
Router.post('/admin/project/assignee', adminAuthen, adminProjectController.addAssignmentToProject);
Router.post('/admin/project/removeassignee', adminAuthen, adminProjectController.removeAssignmentInProject);
Router.get('/admin/project/getemployeenotassign', adminAuthen, adminProjectController.getEmployeeNotAssign);
Router.post('/admin/project/delete', adminAuthen, adminProjectController.deleteProject);
Router.get('/admin/task/getall', adminAuthen, adminTaskController.getAllTask);
Router.get('/admin/task/getdetails', adminAuthen, adminTaskController.getTaskDetails);
Router.post('/admin/task/delete', adminAuthen, adminTaskController.deleteTask);
Router.get('/admin/project/getalluserofproject', adminAuthen, adminProjectController.getAllUserOfProject);
Router.get('/admin/category/getall', adminAuthen, adminTaskController.getAllCategory);
// Policy
Router.get('/admin/policy/get', adminAuthen, adminPolicyController.getAllPolicy);
Router.post('/admin/policy/update', adminAuthen, adminPolicyController.updatePolicy);
// Dashboard
Router.get('/admin/dashboard/getworkingstatus', adminAuthen, adminController.workingStatus);
Router.get('/admin/dashboard/checkinstatus', adminAuthen, adminController.getCheckinStatus);
Router.get('/admin/dashboard/worktimeandholiday', adminAuthen, adminWorkTimeController.getCurrentWorkingTimeAndHoliday);
Router.get('/admin/dashboard/projectstatus', adminAuthen, adminProjectController.getProjectStatus);
//Salary
Router.get('/admin/salary/get', adminAuthen, adminSalaryController.getSalaryByMonth);
Router.post('/admin/salary/update', adminAuthen, adminSalaryController.updateSalary);

// Admin export
Router.get('/admin/export/overtime', adminExportController.exportOverTime);
Router.get('/admin/export/leave', adminAuthen, adminExportController.exportLeaveTicket);
Router.get('/admin/export/salary', adminAuthen, adminExportController.exportSalaryAll);
Router.post('/admin/export/worklog', adminAuthen, adminExportController.exportWorklogByListEmp);
Router.post('/admin/export/information', adminAuthen, adminExportController.exportInformationByListEmp);
Router.post('/admin/export/group', adminAuthen, adminExportController.exportGroupByList);
Router.post('/admin/export/project', adminAuthen, adminExportController.exportProjectByList);
// Admin import
Router.post('/admin/import/employee', uploadCSV.any(), adminEmpController.importEmployee);
Router.get('/admin/template/download/:filename', (req, res) => {
    res.download(path.join(__basedir, './src/template/', req.params.filename))
});

// face python system
Router.post('/face/checkin', faceRecogAuthen, userController.checkInFaceId);

module.exports = Router;  