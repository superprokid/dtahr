/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 100417
 Source Host           : localhost:3306
 Source Schema         : hrm

 Target Server Type    : MySQL
 Target Server Version : 100417
 File Encoding         : 65001

 Date: 24/09/2022 19:43:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for administrator
-- ----------------------------
DROP TABLE IF EXISTS `administrator`;
CREATE TABLE `administrator`  (
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `login_date` datetime NULL DEFAULT NULL,
  `login_failed_date` datetime NULL DEFAULT NULL,
  `password_expired` datetime NULL DEFAULT NULL,
  `login_session` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `login_session_expired` datetime NULL DEFAULT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp,
  `update_at` datetime NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of administrator
-- ----------------------------
INSERT INTO `administrator` VALUES ('thangld', '$2b$12$UkRKm.cjbVgDmaMNO7L1du1kr9kVTWKvBm/mplvFFF5qurOM8Nb4i', '2022-09-24 19:00:05', NULL, '2022-12-17 15:53:48', 'U2FsdGVkX18BntsvTnAje3y1Xv2/bJYbLYHEQ/G55lw9/hqyUEt67Uzu/25m5Lf0h0DhmM4t5iIVttPAXWxvE4pBj783Sepc/RYExI6fJh/quiRXXFye7ygFUNwnjLAV4jsuIksA7afmBalKWc3k6ZdBB/yuixkcElgR369D0kF5A7J/Po9pGTxCK1bEdNvBim3DQPM0G5qhQduA0M3KKwUqVsM9iTendkamhoJ3/9B8589E6wEQMy2VkAyRR8rBVvO4amQ223hHnssZlH4ImlMET3VRlujbnX4TuEGAdhHCQ7mcBMthBHi3eVeUee84yS+RDRKlCYotY8RgQKtsRNDUfyNNKhpRXCHF8gRA3Ju7HmZHLC/mc55zoNq18T9P1DC9F+/AMNLzZzQmSawT8g==', '2022-09-24 20:00:05', '2022-09-17 15:54:06', '2022-09-24 19:00:05');

-- ----------------------------
-- Table structure for assignment
-- ----------------------------
DROP TABLE IF EXISTS `assignment`;
CREATE TABLE `assignment`  (
  `project_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `employee_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `assigned_date` datetime NOT NULL DEFAULT current_timestamp,
  `create_at` datetime NOT NULL DEFAULT current_timestamp,
  `update_at` datetime NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_id`, `employee_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of assignment
-- ----------------------------

-- ----------------------------
-- Table structure for dailyreport
-- ----------------------------
DROP TABLE IF EXISTS `dailyreport`;
CREATE TABLE `dailyreport`  (
  `dailyreport_id` int NOT NULL,
  `employee_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `project_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tasks` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Công việc của ngày hôm nay',
  `problems` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Vấn đề gặp phải',
  `next_day_plan` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Kế hoạch cho ngày hôm sau',
  `process_status` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Tiến trình của công việc',
  `dailyreport_date` date NULL DEFAULT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp,
  `update_at` datetime NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`dailyreport_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dailyreport
-- ----------------------------

-- ----------------------------
-- Table structure for employee
-- ----------------------------
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee`  (
  `employee_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `first_name` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `last_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `dob` date NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gender` tinyint(1) NULL DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `group_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `holiday_time` decimal(4, 4) NULL DEFAULT 0.0000,
  `join_date` date NOT NULL,
  `phone` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `main_skill` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sub_skill` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `job_role` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `role` tinyint NOT NULL,
  `employer_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `relative_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `relative_gender` tinyint NULL DEFAULT NULL,
  `relative_phone` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `relative_dob` date NULL DEFAULT NULL,
  `relationship` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avt` blob NOT NULL,
  `salary` decimal(10, 2) NULL DEFAULT NULL COMMENT 'tính theo giờ',
  `face_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `is_deleted` tinyint NOT NULL DEFAULT 0,
  `create_at` datetime NOT NULL DEFAULT current_timestamp,
  `update_at` datetime NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`employee_id`) USING BTREE,
  FULLTEXT INDEX `manhanvien`(`employee_id`)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of employee
-- ----------------------------
INSERT INTO `employee` VALUES ('0000001', 'Thang', 'Le', '2022-09-14', '123', 0, 'ldthang2201@gmail.com', '$2b$12$UkRKm.cjbVgDmaMNO7L1du1kr9kVTWKvBm/mplvFFF5qurOM8Nb4i', '000001', 0.0000, '2022-09-17', '123456', NULL, NULL, NULL, 0, '', NULL, NULL, NULL, NULL, '', '', 600000.00, NULL, 0, '2022-09-17 15:26:37', '2022-09-24 16:52:10');
INSERT INTO `employee` VALUES ('0000002', 'An', 'Dinh Tuan', '2022-09-24', '123', 0, 'andt@gmail.com', '$2b$12$UkRKm.cjbVgDmaMNO7L1du1kr9kVTWKvBm/mplvFFF5qurOM8Nb4i', '000001', 0.0000, '0000-00-00', '123456', NULL, NULL, NULL, 0, '', NULL, NULL, NULL, NULL, '', '', 600000.00, NULL, 0, '2022-09-24 14:41:36', '2022-09-24 16:52:11');
INSERT INTO `employee` VALUES ('0000003', 'Duy', 'Bui Viet', '2022-09-24', '123', 0, 'duybv@gmail.com', '$2b$12$UkRKm.cjbVgDmaMNO7L1du1kr9kVTWKvBm/mplvFFF5qurOM8Nb4i', '000001', 0.0000, '0000-00-00', '123456', NULL, NULL, NULL, 0, '', NULL, NULL, NULL, NULL, '', '', 600000.00, NULL, 0, '2022-09-24 14:41:59', '2022-09-24 18:32:40');

-- ----------------------------
-- Table structure for group
-- ----------------------------
DROP TABLE IF EXISTS `group`;
CREATE TABLE `group`  (
  `group_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `group_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `group_full_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `manager_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `manager_start_date` datetime NOT NULL DEFAULT current_timestamp,
  `create_at` datetime NOT NULL DEFAULT current_timestamp,
  `update_at` datetime NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`group_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of group
-- ----------------------------
INSERT INTO `group` VALUES ('000001', 'SPT', 'Super Pro Team', '000001', '2022-09-17 17:07:58', '2022-09-17 17:07:58', '2022-09-17 17:07:58');

-- ----------------------------
-- Table structure for holiday
-- ----------------------------
DROP TABLE IF EXISTS `holiday`;
CREATE TABLE `holiday`  (
  `holiday_id` int NOT NULL AUTO_INCREMENT,
  `date` date NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp,
  `update_at` datetime NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`holiday_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of holiday
-- ----------------------------
INSERT INTO `holiday` VALUES (1, '2022-09-29', 'Nghi le hang nam', '2022-09-24 16:43:09', '2022-09-24 16:43:09');

-- ----------------------------
-- Table structure for keyvalue
-- ----------------------------
DROP TABLE IF EXISTS `keyvalue`;
CREATE TABLE `keyvalue`  (
  `key` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp,
  `update_at` datetime NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`key`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of keyvalue
-- ----------------------------
INSERT INTO `keyvalue` VALUES ('ot_payment_daily_day', '1.0', 'lương OT theo giờ trong ngày thường', '2022-09-10 10:37:34', '2022-09-24 15:45:07');
INSERT INTO `keyvalue` VALUES ('ot_payment_daily_night', '1.5', NULL, '2022-09-24 15:44:49', '2022-09-24 15:44:49');
INSERT INTO `keyvalue` VALUES ('ot_payment_holiday', '3.0', 'Hệ số lương trong ngày lễ', '2022-09-24 15:24:35', '2022-09-24 15:34:09');
INSERT INTO `keyvalue` VALUES ('ot_payment_weekend', '1.5', 'Hệ số lương trong ngày nghỉ', '2022-09-10 10:38:06', '2022-09-24 15:34:17');

-- ----------------------------
-- Table structure for leave
-- ----------------------------
DROP TABLE IF EXISTS `leave`;
CREATE TABLE `leave`  (
  `leave_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `type` tinyint NULL DEFAULT NULL COMMENT '0: off, 1: late',
  `start_date` datetime NULL DEFAULT NULL,
  `end_date` datetime NULL DEFAULT NULL,
  `reason` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` tinyint NULL DEFAULT NULL COMMENT '0: peding, 1: confirm',
  `create_at` datetime NULL DEFAULT current_timestamp,
  `update_at` datetime NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`leave_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of leave
-- ----------------------------

-- ----------------------------
-- Table structure for overtime
-- ----------------------------
DROP TABLE IF EXISTS `overtime`;
CREATE TABLE `overtime`  (
  `overtime_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `project_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `start_date` datetime NULL DEFAULT NULL,
  `end_date` datetime NULL DEFAULT NULL,
  `reason` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` tinyint NOT NULL COMMENT '0: pending, 1: confirm',
  `payment` decimal(10, 2) NULL DEFAULT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp,
  `update_at` datetime NOT NULL,
  PRIMARY KEY (`overtime_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of overtime
-- ----------------------------
INSERT INTO `overtime` VALUES (1, '0000001', '0001', '2022-09-27 00:10:10', '2022-09-27 10:10:10', 'hahahahaha', 0, 9000000.00, '2022-09-24 17:44:10', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (2, '0000002', '0001', '2022-09-27 00:10:10', '2022-09-27 10:10:10', '123aedsasd', 0, 9000000.00, '2022-09-24 18:21:37', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for overtimepayment
-- ----------------------------
DROP TABLE IF EXISTS `overtimepayment`;
CREATE TABLE `overtimepayment`  (
  `otpayment_id` int NOT NULL AUTO_INCREMENT,
  `ot_payment_weekend` decimal(4, 1) NULL DEFAULT NULL,
  `ot_payment_daily_day` decimal(4, 1) NULL DEFAULT NULL,
  `ot_payment_daily_night` decimal(4, 1) NULL DEFAULT NULL,
  `ot_payment_holiday` decimal(4, 1) NULL DEFAULT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp,
  `update_at` datetime NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`otpayment_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of overtimepayment
-- ----------------------------
INSERT INTO `overtimepayment` VALUES (1, 1.5, 1.0, 1.5, 2.0, '2022-09-24 17:17:19', '2022-09-24 17:17:19');

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project`  (
  `project_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `project_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `client_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `project_manager_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `project_manager_assigned_date` datetime NOT NULL DEFAULT current_timestamp,
  `create_at` datetime NOT NULL DEFAULT current_timestamp,
  `update_at` datetime NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES ('0001', 'HRM', 'UTE', '0000001', '2022-09-24 17:53:44', '2022-09-24 17:53:44', '2022-09-24 17:53:44');

-- ----------------------------
-- Table structure for reportreceiver
-- ----------------------------
DROP TABLE IF EXISTS `reportreceiver`;
CREATE TABLE `reportreceiver`  (
  `reportreceiver_id` int NOT NULL AUTO_INCREMENT,
  `dailyreport_id` int NULL DEFAULT NULL,
  `employee_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp,
  `update_at` datetime NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`reportreceiver_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reportreceiver
-- ----------------------------

-- ----------------------------
-- Table structure for workhistory
-- ----------------------------
DROP TABLE IF EXISTS `workhistory`;
CREATE TABLE `workhistory`  (
  `workhistory_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `workhistory_status` tinyint NULL DEFAULT NULL,
  `work_date` datetime NULL DEFAULT NULL,
  `workhistory_description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp,
  `update_at` datetime NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`workhistory_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of workhistory
-- ----------------------------
INSERT INTO `workhistory` VALUES (1, '0000001', 0, '2022-09-18 16:52:25', 'Check in at 2022-09-18, 04:52:25 pm', '2022-09-18 16:52:25', '2022-09-18 16:52:25');
INSERT INTO `workhistory` VALUES (2, '0000001', 1, '2022-09-18 17:22:51', 'Check out at 2022-09-18, 05:22:51 pm', '2022-09-18 17:22:51', '2022-09-18 17:25:25');
INSERT INTO `workhistory` VALUES (4, '0000001', 0, '2022-09-18 17:50:23', 'Check in at 2022-09-18, 05:50:23 pm', '2022-09-18 17:50:23', '2022-09-18 17:50:23');
INSERT INTO `workhistory` VALUES (5, '0000001', 1, '2022-09-18 17:52:10', 'Check out at 2022-09-18, 05:52:10 pm', '2022-09-18 17:52:10', '2022-09-18 17:52:10');
INSERT INTO `workhistory` VALUES (6, '0000001', 0, '2022-09-24 09:09:22', 'Check in at 2022-09-24, 09:09:22 am', '2022-09-24 09:09:22', '2022-09-24 09:09:22');
INSERT INTO `workhistory` VALUES (7, '0000001', 1, '2022-09-24 09:11:27', 'Check out at 2022-09-24, 09:11:27 am', '2022-09-24 09:11:27', '2022-09-24 09:11:27');
INSERT INTO `workhistory` VALUES (8, '0000001', 0, '2022-09-24 09:12:14', 'Check in at 2022-09-24, 09:12:14 am', '2022-09-24 09:12:14', '2022-09-24 09:12:14');
INSERT INTO `workhistory` VALUES (9, '0000001', 1, '2022-09-24 09:12:19', 'Check out at 2022-09-24, 09:12:19 am', '2022-09-24 09:12:19', '2022-09-24 09:12:19');
INSERT INTO `workhistory` VALUES (10, '0000001', 0, '2022-09-24 09:14:56', 'Check in at 2022-09-24, 09:14:56 am', '2022-09-24 09:14:56', '2022-09-24 09:14:56');

-- ----------------------------
-- Table structure for worklog
-- ----------------------------
DROP TABLE IF EXISTS `worklog`;
CREATE TABLE `worklog`  (
  `worklog_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `work_status` tinyint NULL DEFAULT NULL,
  `work_date` date NULL DEFAULT NULL,
  `work_total` decimal(5, 1) NULL DEFAULT 0.0,
  `create_at` datetime NOT NULL DEFAULT current_timestamp,
  `update_at` datetime NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`worklog_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of worklog
-- ----------------------------
INSERT INTO `worklog` VALUES (3, '0000001', 1, '2022-09-18', 35.0, '2022-09-18 16:52:25', '2022-09-18 17:52:10');
INSERT INTO `worklog` VALUES (4, '0000001', 0, '2022-09-24', 2.0, '2022-09-24 09:09:22', '2022-09-24 09:14:56');

-- ----------------------------
-- Table structure for worktime
-- ----------------------------
DROP TABLE IF EXISTS `worktime`;
CREATE TABLE `worktime`  (
  `worktime_id` int NOT NULL AUTO_INCREMENT,
  `hour_start` int NULL DEFAULT NULL,
  `min_start` int NULL DEFAULT NULL,
  `hour_end` int NULL DEFAULT NULL,
  `min_end` int NULL DEFAULT NULL,
  `lunch_time` decimal(2, 1) NULL DEFAULT 1.0,
  `approve_date` date NULL DEFAULT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp,
  `update_at` datetime NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`worktime_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of worktime
-- ----------------------------
INSERT INTO `worktime` VALUES (1, 8, 0, 17, 0, 1.0, '2022-09-18', '2022-09-18 15:41:37', '2022-09-18 17:39:01');
INSERT INTO `worktime` VALUES (2, 8, 30, 17, 30, 1.0, '2022-11-15', '2022-09-18 16:57:39', '2022-09-18 17:39:06');
INSERT INTO `worktime` VALUES (3, 8, 15, 17, 15, 1.0, '2022-09-24', '2022-09-18 16:58:55', '2022-09-24 09:15:45');

SET FOREIGN_KEY_CHECKS = 1;
