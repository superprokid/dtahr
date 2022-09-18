const express = require('express');
const { authen } = require('../policy/user.authentication');
const { adminAuthen } = require('../policy/admin.authentication');
const Router = express.Router();
const userController = require('../controller/user.controller');
const adminController = require('../controller/admin/admin.controller');

// user
Router.post('/user/login', userController.login);
Router.post('/user/refreshtoken', userController.refreshToken);
Router.get('/user/get', authen, userController.get);
Router.post('/user/checkin', authen, userController.checkin);
Router.post('/user/checkout', authen, userController.checkout);

// admin
Router.post('/admin/login', adminController.login);
Router.get('/admin/getalluser', adminAuthen, adminController.getAllUser);
Router.get('/admin/create/employee', adminController.createNewEmployee);

module.exports = Router;