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

 Date: 17/09/2022 18:11:09
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
INSERT INTO `administrator` VALUES ('thangld', '$2b$12$UkRKm.cjbVgDmaMNO7L1du1kr9kVTWKvBm/mplvFFF5qurOM8Nb4i', '2022-09-17 18:05:48', NULL, '2022-12-17 15:53:48', 'U2FsdGVkX19YeIGNnsj0gyE2lUQSxaE6Dp+a3GBmIfjlon3PPQzTQz82Y2Z0XveCDslYJNSUfJOXOFJMKHOYZOXE0JXRS/rBaygUHtqtu/cKHsrmf6XAn2ezrUAzPdSbp2D9N/bA5pHgSdqFs6cGLyOfhO3wCpcT6QbcCcoFJauZDIS0M3NnsIh6KTG4azsZ5I+exGY4vzXmG6w8k90a1dDlBz9QH0UyTJ1yzzXl7/KaiMRa8Gf8pZC7x4l8OG9NiqB2xNR3/9HDMZVbxdeYxg2dzr8mIAcUfU1syypuQ1tQ3u0iG7DKvpSnZsakW+tDvD5pnKqTzIWzhRusguf64m6cDcEAvXSO280Cyz/ZJAxgSq+/2F5ESMkO1OCdMCkvH5hQMyaf+aEWBnbPW+nM7w==', '2022-09-17 18:07:40', '2022-09-17 15:54:06', '2022-09-17 18:07:54');

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
INSERT INTO `employee` VALUES ('0000001', 'Thang', 'Le', '2022-09-14', '123', 0, 'ldthang2201@gmail.com', '$2b$12$UkRKm.cjbVgDmaMNO7L1du1kr9kVTWKvBm/mplvFFF5qurOM8Nb4i', '000001', 0.0000, '2022-09-17', '123456', NULL, NULL, NULL, 0, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 0, '2022-09-17 15:26:37', '2022-09-17 17:11:01');

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
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of holiday
-- ----------------------------

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
INSERT INTO `keyvalue` VALUES ('ot_payment_daily', '100000', 'lương OT theo giờ trong ngày thường', '2022-09-10 10:37:34', '2022-09-10 10:37:34');
INSERT INTO `keyvalue` VALUES ('ot_payment_weekend', '1.5', 'Hệ số lương trong ngày nghỉ', '2022-09-10 10:38:06', '2022-09-10 10:38:06');

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
  `status` tinyint NOT NULL COMMENT '0: pending, 1: confirm',
  `payment` decimal(10, 2) NULL DEFAULT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp,
  `update_at` datetime NOT NULL,
  PRIMARY KEY (`overtime_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of overtime
-- ----------------------------

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
  `workhistory_id` int NOT NULL,
  `employee_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `workhistory_status` tinyint NULL DEFAULT NULL,
  `work_date` datetime NULL DEFAULT NULL,
  `workhistory_description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp,
  `update_at` datetime NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`workhistory_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of workhistory
-- ----------------------------

-- ----------------------------
-- Table structure for worklog
-- ----------------------------
DROP TABLE IF EXISTS `worklog`;
CREATE TABLE `worklog`  (
  `worklog_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `work_status` tinyint NULL DEFAULT NULL,
  `work_date` datetime NULL DEFAULT NULL,
  `work_total` decimal(5, 1) NULL DEFAULT 0.0,
  `create_at` datetime NOT NULL DEFAULT current_timestamp,
  `update_at` datetime NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`worklog_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of worklog
-- ----------------------------

-- ----------------------------
-- Table structure for worktime
-- ----------------------------
DROP TABLE IF EXISTS `worktime`;
CREATE TABLE `worktime`  (
  `worktime_id` int NOT NULL AUTO_INCREMENT,
  `start_time` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'HH:MM:SS',
  `end_time` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `approve_date` datetime NULL DEFAULT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp,
  `update_at` datetime NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`worktime_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of worktime
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
