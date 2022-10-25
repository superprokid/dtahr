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

 Date: 23/10/2022 18:54:33
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
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of administrator
-- ----------------------------
INSERT INTO `administrator` VALUES ('thangld', '$2b$12$UkRKm.cjbVgDmaMNO7L1du1kr9kVTWKvBm/mplvFFF5qurOM8Nb4i', '2022-10-23 15:32:06', NULL, '2022-12-17 15:53:48', 'U2FsdGVkX1/iyHMYRkT73Gu2X5D3/BVTSeaPL76H1TJswBU5iOwW5Qbjx7w0ZKCG8XXhjhejxC+O0/pGh2HCE4JxcRi3pwIHjBb1Wtx+/PJjiDAspF2v/BsDcxIzsJov45X1JlvcrODDeHfLHkCe6VH2Um87l4f1E9W31gctH3lJxCvW1gFDuCOZ9qpkOu/tkccLsLX6A/NR6F4WIectqm/8t/1+9Xxz6BQ1MvCVCXyTW1eYnywjwYyHee+tO7CC7ByWDY0KOD2FpPW0d3x0NJ7y6IQxCp0se39/8g3sdxXqlAVWV1y8p7B7utuJKcEBJLTLp040vcEKXZOtspk1C/rcH8PNBFlCEHh2/vkVa3HaQBzjW0W+Bd+wr/OlkdzK/Om/F+KI5aUSll6D86BzAQ==', '2022-10-23 19:50:33', '2022-09-17 15:54:06', '2022-10-23 18:50:33');

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
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of assignment
-- ----------------------------
INSERT INTO `assignment` VALUES ('0001', '0000002', '2022-10-09 10:50:14', '2022-10-09 10:40:14', '2022-10-09 10:58:35');
INSERT INTO `assignment` VALUES ('0001', '0000003', '2022-10-15 13:46:02', '2022-10-15 13:46:02', '2022-10-15 13:46:02');
INSERT INTO `assignment` VALUES ('0001', '0000004', '2022-10-09 10:40:49', '2022-10-09 10:40:49', '2022-10-15 13:50:25');
INSERT INTO `assignment` VALUES ('0002', '0000002', '2022-10-15 14:10:57', '2022-10-15 14:10:57', '2022-10-15 14:10:57');

-- ----------------------------
-- Table structure for dailyreport
-- ----------------------------
DROP TABLE IF EXISTS `dailyreport`;
CREATE TABLE `dailyreport`  (
  `dailyreport_id` int NOT NULL AUTO_INCREMENT,
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
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of dailyreport
-- ----------------------------
INSERT INTO `dailyreport` VALUES (7, '0000001', '0001', '2020 - ahaha - edit success', '2020 - ahaha -edit', 'edit', 'Ahead of schedule', '2022-10-06', '2022-10-06 15:51:28', '2022-10-09 15:10:04');
INSERT INTO `dailyreport` VALUES (8, '0000001', '0002', '- Create screen\n- no no\n-- tes\nersdf', '- No-sdsd', '- Offfff', 'Ahead of schedule', '2022-10-08', '2022-10-08 18:30:19', '2022-10-09 15:09:07');
INSERT INTO `dailyreport` VALUES (9, '0000001', '0002', 'sda', 'dasd', 'asd', 'Ahead of schedule', '2022-10-08', '2022-10-08 18:33:27', '2022-10-09 15:08:44');
INSERT INTO `dailyreport` VALUES (10, '0000001', '0001', '123', '123', '123', 'On schedule', '2022-10-08', '2022-10-08 18:34:15', '2022-10-08 18:34:15');
INSERT INTO `dailyreport` VALUES (11, '0000001', '0002', 'sdasd', 'sadasd', 'asdasd', 'On schedule', '2022-10-09', '2022-10-09 11:27:45', '2022-10-09 11:27:45');
INSERT INTO `dailyreport` VALUES (12, '0000002', '0001', 'lam viec nhieu', 'kho qua', 'an choi nhay mua', 'On schedule', '2022-10-22', '2022-10-22 15:53:52', '2022-10-22 15:53:52');

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
  `holiday_time` double NULL DEFAULT 0,
  `join_date` date NULL DEFAULT NULL,
  `phone` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `main_skill` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sub_skill` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `job_role` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `role` tinyint NOT NULL,
  `employer_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `relative_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `relative_gender` tinyint NULL DEFAULT NULL,
  `relative_phone` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `relative_address` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `relative_dob` date NULL DEFAULT NULL,
  `relationship` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `avt` varchar(10000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `salary` decimal(10, 2) NULL DEFAULT NULL COMMENT 'tính theo giờ',
  `bank_account` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `bank_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `face_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `is_deleted` tinyint NOT NULL DEFAULT 0,
  `create_at` datetime NOT NULL DEFAULT current_timestamp,
  `update_at` datetime NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`employee_id`) USING BTREE,
  FULLTEXT INDEX `manhanvien`(`employee_id`)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of employee
-- ----------------------------
INSERT INTO `employee` VALUES ('0000001', 'Thang THang', 'Thang THang', '2000-01-01', '123 CND - SG', 0, 'thangld@gmail.com', '$2b$12$yPE/mcCEEr1hUMvnFc1F6eB0wI4E8HkalN8pUrb.7./9OvKsncpwG', '000001', 5.020833333333333, '2022-09-28', '10xasdzx', 'NodeJS', 'VueJS', 'Developer', 1, '0000001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 600000.00, NULL, NULL, NULL, 0, '2022-09-28 14:41:19', '2022-10-22 15:49:34');
INSERT INTO `employee` VALUES ('0000002', 'An', 'Dinh Tuan', '2000-10-10', '1 VVN', 0, 'andt@gmail.com', '$2b$12$UwIW7e1W1jrYAOZunt4HNOa/rXComBkJWInFUXI7ou0/rZt0J3BfO', '000001', 260.41041666666655, '2022-10-22', '0896563253a', 'VueJS', 'AI', 'BPM', 1, '0000001', 'Duy Bùi Việt', 1, '0906854315', '1 Võ Văn Ngân, Thủ Đức, Hồ Chí Minh', '1980-10-20', 'Cha Con Guộc', '1666510092157_bdmt.jpg', 600000.00, '123456789', 'ACB - SaiGon', NULL, 0, '2022-09-28 14:43:07', '2022-10-23 15:14:46');
INSERT INTO `employee` VALUES ('0000003', 'Duy', 'Wjbu', '2000-07-05', '204/6 Linh Dong', 0, 'duybv@gmail.com', '$2b$12$SXTyIOpmrMmP3jfBwdTcneW69dFVJ6EiY4ZzBHyoN3dLG6Ilj1.4i', '000001', 532.0171666666666, '2022-09-28', '0253263120', 'Prozjp', 'Dep trai', NULL, 0, '0000001', NULL, NULL, NULL, NULL, NULL, NULL, '1666517499759_288020.jpg', 600000.00, NULL, NULL, NULL, 0, '2022-09-28 14:43:26', '2022-10-23 17:57:45');
INSERT INTO `employee` VALUES ('0000004', 'Thang', 'Le Duc', '2000-10-10', NULL, 0, 'ldthang2201@gmail.com', '$2b$12$G3DVMLIjLTfc7ep3t7BnmutTbheR9.K8y9LgqquXdzi7T3T5GcaRa', '000001', -8, '2022-09-28', '2121212121', NULL, NULL, 'Tester', 1, '0000001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 600000.00, NULL, NULL, NULL, 0, '2022-09-28 17:50:26', '2022-10-23 16:26:16');
INSERT INTO `employee` VALUES ('0000005', 'Hao', 'Duc', '2000-10-10', NULL, 2, 'haond@gmail.com', '$2b$12$SXTyIOpmrMmP3jfBwdTcneW69dFVJ6EiY4ZzBHyoN3dLG6Ilj1.4i', '000002', 0, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-10-23 16:28:34', '2022-10-23 16:29:19');

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
INSERT INTO `group` VALUES ('000001', 'SPT', 'Super Pro Team', '0000001', '2022-09-17 17:07:58', '2022-09-17 17:07:58', '2022-10-15 14:19:19');
INSERT INTO `group` VALUES ('000002', 'dsfsfdsfd', 'fdsfdsdfsa', '0000004', '2022-10-26 07:00:00', '2022-10-16 15:49:12', '2022-10-23 18:46:10');
INSERT INTO `group` VALUES ('000003', 'spkt', 'su pham', '0000002', '2022-10-23 07:00:00', '2022-10-23 18:02:15', '2022-10-23 18:02:15');
INSERT INTO `group` VALUES ('000004', 'test111', 'tesssssss3213213', '0000005', '2022-10-31 07:00:00', '2022-10-23 18:49:43', '2022-10-23 18:50:33');

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
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of holiday
-- ----------------------------
INSERT INTO `holiday` VALUES (1, '2022-09-29', 'Nghi le hang nam', '2022-09-24 16:43:09', '2022-09-24 16:43:09');
INSERT INTO `holiday` VALUES (2, '2022-09-27', 'Nghir dai thoi', '2022-09-28 20:54:50', '2022-09-28 21:52:20');
INSERT INTO `holiday` VALUES (3, '2022-09-07', 'ascsa', '2022-09-28 20:59:17', '2022-09-28 20:59:17');
INSERT INTO `holiday` VALUES (4, '2022-07-07', 's', '2022-09-28 20:59:24', '2022-09-28 20:59:24');
INSERT INTO `holiday` VALUES (5, '2022-09-04', 'sdsd', '2022-09-28 20:59:29', '2022-09-28 20:59:31');
INSERT INTO `holiday` VALUES (6, '2023-01-01', 'TEt nguyen dan', '2022-09-28 20:59:43', '2022-09-28 20:59:43');

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
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of leave
-- ----------------------------
INSERT INTO `leave` VALUES (3, '0000001', 0, '2022-09-27 08:10:10', '2022-09-27 22:10:10', 'hahahahaha', 1, '2022-10-01 10:10:55', '2022-10-01 10:37:54');
INSERT INTO `leave` VALUES (4, '0000004', 0, '2022-10-01 10:17:56', '2022-10-01 10:17:58', 'sdsaczxcxzc', 1, '2022-10-01 10:18:03', '2022-10-02 21:40:46');
INSERT INTO `leave` VALUES (5, '0000001', 0, '2022-09-27 08:10:10', '2022-09-27 22:10:10', 'hahahahaha', 2, '2022-10-01 15:11:31', '2022-10-02 22:54:21');
INSERT INTO `leave` VALUES (7, '0000003', 0, '2022-10-03 21:46:00', '2022-10-03 22:46:00', '123123', 1, '2022-10-02 20:46:39', '2022-10-02 20:48:03');
INSERT INTO `leave` VALUES (8, '0000003', 1, '2022-10-03 21:48:00', '2022-10-12 22:48:00', '123', 1, '2022-10-02 20:48:45', '2022-10-02 22:54:23');
INSERT INTO `leave` VALUES (9, '0000003', 0, '2022-10-03 10:07:00', '2022-10-06 22:06:00', '123', 1, '2022-10-02 21:06:41', '2022-10-23 15:37:10');
INSERT INTO `leave` VALUES (10, '0000003', 0, '2022-10-03 22:08:00', '2022-10-10 21:08:00', '123', 2, '2022-10-02 21:08:46', '2022-10-23 15:36:59');
INSERT INTO `leave` VALUES (12, '0000001', 0, '2022-10-08 16:50:00', '2022-10-08 17:50:00', '123', 1, '2022-10-08 15:51:10', '2022-10-08 15:51:29');
INSERT INTO `leave` VALUES (20, '0000003', 0, '2022-10-03 06:15:00', '2022-10-03 18:16:00', '123213', 1, '2022-10-23 17:14:50', '2022-10-23 17:15:04');
INSERT INTO `leave` VALUES (21, '0000003', 0, '2022-10-18 18:16:00', '2022-10-18 20:19:00', '123123', 1, '2022-10-23 17:16:20', '2022-10-23 17:16:30');
INSERT INTO `leave` VALUES (22, '0000003', 0, '2022-10-23 06:18:00', '2022-10-23 19:17:00', '123', 2, '2022-10-23 17:17:18', '2022-10-23 17:17:24');

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
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of overtime
-- ----------------------------
INSERT INTO `overtime` VALUES (1, '0000001', '0001', '2022-09-27 00:10:10', '2022-09-27 10:10:10', 'hahahahaha', 1, 9000000.00, '2022-09-24 17:44:10', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (3, '0000001', '0001', '2022-10-01 08:00:00', '2022-10-01 17:00:00', 'lam them', 2, 0.00, '2022-10-01 18:44:38', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (5, '0000001', '0001', '2022-10-02 05:19:00', '2022-10-02 17:19:00', '42425454', 2, 10800000.00, '2022-10-02 17:19:22', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (6, '0000001', '0002', '2022-10-02 05:19:00', '2022-10-02 17:19:00', '42425454', 0, 10800000.00, '2022-10-02 17:19:27', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (7, '0000001', '0002', '2022-10-02 05:19:00', '2022-10-02 17:19:00', '42425454', 0, 10800000.00, '2022-10-02 17:19:45', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (9, '0000001', '0001', '2022-10-02 12:02:00', '2022-10-04 12:02:00', '123123', 0, 43200000.00, '2022-10-02 23:02:18', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (10, '0000003', '0001', '2022-10-03 10:28:00', '2022-10-05 10:28:00', '123', 2, 28800000.00, '2022-10-08 09:28:59', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (13, '0000001', '0001', '2022-10-09 01:36:00', '2022-10-09 13:36:00', '123', 2, 10800000.00, '2022-10-09 12:37:07', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (14, '0000002', '0001', '2022-10-22 08:00:00', '2022-10-22 17:00:00', 'gfdgdsgfsdgfdsrererere', 1, 8100000.00, '2022-10-22 16:01:06', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (17, '0000002', '0002', '2022-10-09 18:00:00', '2022-10-09 21:00:00', '123123', 1, 2700000.00, '2022-10-23 17:00:44', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (18, '0000003', '0001', '2022-10-24 18:18:00', '2022-10-24 19:18:00', '123123213', 1, 600000.00, '2022-10-23 17:18:48', '0000-00-00 00:00:00');

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
INSERT INTO `project` VALUES ('0002', 'ABC', 'ADT', '0000003', '2022-09-29 15:44:56', '2022-09-29 15:44:56', '2022-10-15 15:01:33');

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
) ENGINE = InnoDB AUTO_INCREMENT = 58 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reportreceiver
-- ----------------------------
INSERT INTO `reportreceiver` VALUES (3, 0, '0000002', '2022-10-01 15:36:02', '2022-10-02 15:27:25');
INSERT INTO `reportreceiver` VALUES (4, 0, '0000003', '2022-10-01 15:36:02', '2022-10-01 16:39:32');
INSERT INTO `reportreceiver` VALUES (5, 0, '0000004', '2022-10-01 15:36:02', '2022-10-01 16:39:36');
INSERT INTO `reportreceiver` VALUES (38, 10, '0000001', '2022-10-09 15:05:32', '2022-10-09 15:05:32');
INSERT INTO `reportreceiver` VALUES (39, 10, '0000002', '2022-10-09 15:05:32', '2022-10-09 15:05:32');
INSERT INTO `reportreceiver` VALUES (40, 10, '0000003', '2022-10-09 15:05:32', '2022-10-09 15:05:32');
INSERT INTO `reportreceiver` VALUES (41, 10, '0000004', '2022-10-09 15:05:32', '2022-10-09 15:05:32');
INSERT INTO `reportreceiver` VALUES (42, 11, '0000001', '2022-10-09 15:06:33', '2022-10-09 15:06:33');
INSERT INTO `reportreceiver` VALUES (43, 11, '0000002', '2022-10-09 15:06:33', '2022-10-09 15:06:33');
INSERT INTO `reportreceiver` VALUES (48, 9, '0000001', '2022-10-09 15:08:44', '2022-10-09 15:08:44');
INSERT INTO `reportreceiver` VALUES (49, 9, '0000002', '2022-10-09 15:08:44', '2022-10-09 15:08:44');
INSERT INTO `reportreceiver` VALUES (50, 9, '0000003', '2022-10-09 15:08:44', '2022-10-09 15:08:44');
INSERT INTO `reportreceiver` VALUES (51, 9, '0000004', '2022-10-09 15:08:44', '2022-10-09 15:08:44');
INSERT INTO `reportreceiver` VALUES (52, 8, '0000001', '2022-10-09 15:09:07', '2022-10-09 15:09:07');
INSERT INTO `reportreceiver` VALUES (53, 8, '0000002', '2022-10-09 15:09:07', '2022-10-09 15:09:07');
INSERT INTO `reportreceiver` VALUES (54, 8, '0000003', '2022-10-09 15:09:07', '2022-10-09 15:09:07');
INSERT INTO `reportreceiver` VALUES (55, 7, '0000001', '2022-10-09 15:10:04', '2022-10-09 15:10:04');
INSERT INTO `reportreceiver` VALUES (56, 7, '0000004', '2022-10-09 15:10:04', '2022-10-09 15:10:04');
INSERT INTO `reportreceiver` VALUES (57, 12, '0000001', '2022-10-22 15:53:52', '2022-10-22 15:53:52');

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
) ENGINE = InnoDB AUTO_INCREMENT = 370 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of workhistory
-- ----------------------------
INSERT INTO `workhistory` VALUES (1, '0000001', 0, '2022-09-18 16:52:25', 'Check in at 2022-09-18, 04:52:25 pm', '2022-09-18 16:52:25', '2022-09-25 18:26:01');
INSERT INTO `workhistory` VALUES (2, '0000001', 1, '2022-09-18 17:22:51', 'Check out at 2022-09-18, 05:22:51 pm', '2022-09-18 17:22:51', '2022-09-18 17:25:25');
INSERT INTO `workhistory` VALUES (4, '0000001', 0, '2022-09-18 17:50:23', 'Check in at 2022-09-18, 05:50:23 pm', '2022-09-18 17:50:23', '2022-09-18 17:50:23');
INSERT INTO `workhistory` VALUES (5, '0000001', 1, '2022-09-18 17:52:10', 'Check out at 2022-09-18, 05:52:10 pm', '2022-09-18 17:52:10', '2022-09-18 17:52:10');
INSERT INTO `workhistory` VALUES (6, '0000001', 0, '2022-09-24 09:09:22', 'Check in at 2022-09-24, 09:09:22 am', '2022-09-24 09:09:22', '2022-09-24 09:09:22');
INSERT INTO `workhistory` VALUES (7, '0000001', 1, '2022-09-24 09:11:27', 'Check out at 2022-09-24, 09:11:27 am', '2022-09-24 09:11:27', '2022-09-24 09:11:27');
INSERT INTO `workhistory` VALUES (8, '0000001', 0, '2022-09-24 09:12:14', 'Check in at 2022-09-24, 09:12:14 am', '2022-09-24 09:12:14', '2022-09-24 09:12:14');
INSERT INTO `workhistory` VALUES (9, '0000001', 1, '2022-09-24 09:12:19', 'Check out at 2022-09-24, 09:12:19 am', '2022-09-24 09:12:19', '2022-09-24 09:12:19');
INSERT INTO `workhistory` VALUES (10, '0000001', 0, '2022-09-24 09:14:56', 'Check in at 2022-09-24, 09:14:56 am', '2022-09-24 09:14:56', '2022-09-25 18:26:06');
INSERT INTO `workhistory` VALUES (11, '0000001', 0, '2022-09-25 09:06:41', 'Check in at 2022-09-25, 09:06:41 am', '2022-09-25 09:06:41', '2022-09-25 18:26:08');
INSERT INTO `workhistory` VALUES (12, '0000001', 1, '2022-09-25 18:03:04', 'Check out at 2022-09-25, 06:03:04 pm', '2022-09-25 18:03:04', '2022-09-25 18:03:04');
INSERT INTO `workhistory` VALUES (13, '1000101', 3, '2022-09-25 18:21:27', 'Test Work history', '2022-09-25 18:21:52', '2022-09-25 18:21:52');
INSERT INTO `workhistory` VALUES (148, '0000002', 2, '2022-09-25 19:31:45', 'CHECK OUT - Auto check out by bot', '2022-09-25 19:31:45', '2022-09-25 19:31:45');
INSERT INTO `workhistory` VALUES (149, '0000002', 3, '2022-09-25 19:31:45', 'AUTO DETECTED - You worked not enough time: 8 hours', '2022-09-25 19:31:45', '2022-09-25 19:31:45');
INSERT INTO `workhistory` VALUES (150, '0000003', 2, '2022-09-25 19:31:45', 'CHECK OUT - Auto check out by bot', '2022-09-25 19:31:45', '2022-09-25 19:31:45');
INSERT INTO `workhistory` VALUES (151, '0000003', 3, '2022-09-25 19:31:45', 'AUTO DETECTED - You worked not enough time: 8 hours', '2022-09-25 19:31:45', '2022-09-25 19:31:45');
INSERT INTO `workhistory` VALUES (152, '0000004', 2, '2022-09-25 19:31:45', 'CHECK OUT - Auto check out by bot', '2022-09-25 19:31:45', '2022-09-25 19:31:45');
INSERT INTO `workhistory` VALUES (153, '0000004', 3, '2022-09-25 19:31:45', 'AUTO DETECTED - You worked not enough time: 8 hours', '2022-09-25 19:31:45', '2022-09-25 19:31:45');
INSERT INTO `workhistory` VALUES (154, '0000002', 2, '2022-09-25 19:39:45', 'CHECK OUT - Auto check out by bot', '2022-09-25 19:39:45', '2022-09-25 19:39:45');
INSERT INTO `workhistory` VALUES (155, '0000002', 3, '2022-09-25 19:39:45', 'AUTO DETECTED - You worked not enough time: 8 hours', '2022-09-25 19:39:45', '2022-09-25 19:39:45');
INSERT INTO `workhistory` VALUES (156, '0000003', 2, '2022-09-25 19:39:45', 'CHECK OUT - Auto check out by bot', '2022-09-25 19:39:45', '2022-09-25 19:39:45');
INSERT INTO `workhistory` VALUES (157, '0000003', 3, '2022-09-25 19:39:45', 'AUTO DETECTED - You worked not enough time: 8 hours', '2022-09-25 19:39:45', '2022-09-25 19:39:45');
INSERT INTO `workhistory` VALUES (158, '0000004', 2, '2022-09-25 19:39:45', 'CHECK OUT - Auto check out by bot', '2022-09-25 19:39:45', '2022-09-25 19:39:45');
INSERT INTO `workhistory` VALUES (159, '0000004', 3, '2022-09-25 19:39:45', 'AUTO DETECTED - You worked not enough time: 8 hours', '2022-09-25 19:39:45', '2022-09-25 19:39:45');
INSERT INTO `workhistory` VALUES (160, '0000001', 3, '2022-09-26 22:09:39', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 2 to 1', '2022-09-26 22:09:39', '2022-09-26 22:09:39');
INSERT INTO `workhistory` VALUES (161, '0000002', 3, '2022-09-26 22:09:39', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 48 to 47', '2022-09-26 22:09:39', '2022-09-26 22:09:39');
INSERT INTO `workhistory` VALUES (162, '0000003', 3, '2022-09-26 22:09:39', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -2 to -3', '2022-09-26 22:09:39', '2022-09-26 22:09:39');
INSERT INTO `workhistory` VALUES (163, '0000004', 3, '2022-09-26 22:09:39', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -2 to -3', '2022-09-26 22:09:39', '2022-09-26 22:09:39');
INSERT INTO `workhistory` VALUES (164, '0000001', 3, '2022-09-26 22:12:28', 'AUTO DETECTED - Worked not enough 8 hours - duration: ', '2022-09-26 22:12:28', '2022-09-26 22:12:28');
INSERT INTO `workhistory` VALUES (165, '0000002', 3, '2022-09-26 22:12:28', 'AUTO DETECTED - Worked not enough 8 hours - duration: ', '2022-09-26 22:12:28', '2022-09-26 22:12:28');
INSERT INTO `workhistory` VALUES (166, '0000003', 3, '2022-09-26 22:12:28', 'AUTO DETECTED - Worked not enough 8 hours - duration: ', '2022-09-26 22:12:28', '2022-09-26 22:12:28');
INSERT INTO `workhistory` VALUES (167, '0000004', 3, '2022-09-26 22:12:28', 'AUTO DETECTED - Worked not enough 8 hours - duration: ', '2022-09-26 22:12:28', '2022-09-26 22:12:28');
INSERT INTO `workhistory` VALUES (168, '0000001', 3, '2022-09-26 22:13:49', 'AUTO DETECTED - Worked not enough 8 hours - duration: ', '2022-09-26 22:13:49', '2022-09-26 22:13:49');
INSERT INTO `workhistory` VALUES (169, '0000002', 3, '2022-09-26 22:13:49', 'AUTO DETECTED - Worked not enough 8 hours - duration: ', '2022-09-26 22:13:49', '2022-09-26 22:13:49');
INSERT INTO `workhistory` VALUES (170, '0000003', 3, '2022-09-26 22:13:49', 'AUTO DETECTED - Worked not enough 8 hours - duration: ', '2022-09-26 22:13:49', '2022-09-26 22:13:49');
INSERT INTO `workhistory` VALUES (171, '0000004', 3, '2022-09-26 22:13:49', 'AUTO DETECTED - Worked not enough 8 hours - duration: ', '2022-09-26 22:13:49', '2022-09-26 22:13:49');
INSERT INTO `workhistory` VALUES (172, '0000001', 3, '2022-09-26 22:15:56', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480', '2022-09-26 22:15:56', '2022-09-26 22:15:56');
INSERT INTO `workhistory` VALUES (173, '0000002', 3, '2022-09-26 22:15:56', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480', '2022-09-26 22:15:56', '2022-09-26 22:15:56');
INSERT INTO `workhistory` VALUES (174, '0000003', 3, '2022-09-26 22:15:56', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480', '2022-09-26 22:15:56', '2022-09-26 22:15:56');
INSERT INTO `workhistory` VALUES (175, '0000004', 3, '2022-09-26 22:15:56', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480', '2022-09-26 22:15:56', '2022-09-26 22:15:56');
INSERT INTO `workhistory` VALUES (185, '0000001', 3, '2022-09-26 22:18:13', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-26 22:18:13', '2022-09-26 22:18:13');
INSERT INTO `workhistory` VALUES (186, '0000002', 3, '2022-09-26 22:18:13', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-26 22:18:13', '2022-09-26 22:18:13');
INSERT INTO `workhistory` VALUES (187, '0000003', 3, '2022-09-26 22:18:13', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-26 22:18:13', '2022-09-26 22:18:13');
INSERT INTO `workhistory` VALUES (188, '0000004', 2, '2022-09-26 22:18:13', 'CHECK OUT - Auto check out by bot', '2022-09-26 22:18:13', '2022-09-26 22:18:13');
INSERT INTO `workhistory` VALUES (189, '0000004', 3, '2022-09-26 22:18:13', 'AUTO DETECTED - Worked not enough 8 hours - duration: 782 mins', '2022-09-26 22:18:13', '2022-09-26 22:18:13');
INSERT INTO `workhistory` VALUES (190, '0000001', 3, '2022-09-26 22:19:18', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-26 22:19:18', '2022-09-26 22:19:18');
INSERT INTO `workhistory` VALUES (191, '0000002', 3, '2022-09-26 22:19:18', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-26 22:19:18', '2022-09-26 22:19:18');
INSERT INTO `workhistory` VALUES (192, '0000003', 2, '2022-09-26 22:19:18', 'CHECK OUT - Auto check out by bot', '2022-09-26 22:19:18', '2022-09-26 22:19:18');
INSERT INTO `workhistory` VALUES (193, '0000003', 3, '2022-09-26 22:19:18', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-26 22:19:18', '2022-09-26 22:19:18');
INSERT INTO `workhistory` VALUES (194, '0000004', 3, '2022-09-26 22:19:18', 'AUTO DETECTED - Worked not enough 8 hours - duration: 782 mins', '2022-09-26 22:19:18', '2022-09-26 22:19:18');
INSERT INTO `workhistory` VALUES (195, '0000001', 3, '2022-09-26 22:19:47', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-26 22:19:47', '2022-09-26 22:19:47');
INSERT INTO `workhistory` VALUES (196, '0000002', 3, '2022-09-26 22:19:47', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-26 22:19:47', '2022-09-26 22:19:47');
INSERT INTO `workhistory` VALUES (197, '0000003', 2, '2022-09-26 22:19:47', 'CHECK OUT - Auto check out by bot', '2022-09-26 22:19:47', '2022-09-26 22:19:47');
INSERT INTO `workhistory` VALUES (198, '0000003', 3, '2022-09-26 22:19:47', 'AUTO DETECTED - Worked not enough 8 hours - duration: 64 mins', '2022-09-26 22:19:47', '2022-09-26 22:19:47');
INSERT INTO `workhistory` VALUES (199, '0000004', 3, '2022-09-26 22:19:47', 'AUTO DETECTED - Worked not enough 8 hours - duration: 782 mins', '2022-09-26 22:19:47', '2022-09-26 22:19:47');
INSERT INTO `workhistory` VALUES (200, '0000001', 0, '2022-09-27 21:12:31', 'Check in at 2022-09-27, 09:12:31 pm', '2022-09-27 21:12:31', '2022-09-27 21:12:31');
INSERT INTO `workhistory` VALUES (201, '0000001', 1, '2022-09-27 22:08:27', 'Check out at 2022-09-27, 10:08:27 pm', '2022-09-27 22:08:27', '2022-09-27 22:08:27');
INSERT INTO `workhistory` VALUES (202, '0000001', 0, '2022-09-27 22:10:55', 'Check in at 2022-09-27, 10:10:55 pm', '2022-09-27 22:10:55', '2022-09-27 22:10:55');
INSERT INTO `workhistory` VALUES (203, '0000001', 1, '2022-09-27 22:13:11', 'Check out at 2022-09-27, 10:13:11 pm', '2022-09-27 22:13:11', '2022-09-27 22:13:11');
INSERT INTO `workhistory` VALUES (204, '0000001', 0, '2022-09-27 22:22:16', 'Check in at 2022-09-27, 10:22:16 pm', '2022-09-27 22:22:16', '2022-09-27 22:22:16');
INSERT INTO `workhistory` VALUES (205, '0000001', 1, '2022-09-27 22:22:34', 'Check out at 2022-09-27, 10:22:34 pm', '2022-09-27 22:22:34', '2022-09-27 22:22:34');
INSERT INTO `workhistory` VALUES (206, '0000001', 0, '2022-09-27 22:24:34', 'Check in at 2022-09-27, 10:24:34 pm', '2022-09-27 22:24:34', '2022-09-27 22:24:34');
INSERT INTO `workhistory` VALUES (207, '0000001', 1, '2022-09-27 22:24:35', 'Check out at 2022-09-27, 10:24:35 pm', '2022-09-27 22:24:35', '2022-09-27 22:24:35');
INSERT INTO `workhistory` VALUES (208, '0000001', 3, '2022-09-27 22:27:10', 'AUTO DETECTED - Worked not enough 8 hours - duration: 422 mins', '2022-09-27 22:27:10', '2022-09-27 22:27:10');
INSERT INTO `workhistory` VALUES (209, '0000002', 3, '2022-09-27 22:27:10', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 47 to 46', '2022-09-27 22:27:10', '2022-09-27 22:27:10');
INSERT INTO `workhistory` VALUES (210, '0000003', 3, '2022-09-27 22:27:10', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -4.133333333333334 to -5.133333333333334', '2022-09-27 22:27:10', '2022-09-27 22:27:10');
INSERT INTO `workhistory` VALUES (211, '0000004', 3, '2022-09-27 22:27:10', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -4.629166666666666 to -5.629166666666666', '2022-09-27 22:27:10', '2022-09-27 22:27:10');
INSERT INTO `workhistory` VALUES (212, '0000001', 3, '2022-09-27 22:27:11', 'AUTO DETECTED - Worked not enough 8 hours - duration: 422 mins', '2022-09-27 22:27:11', '2022-09-27 22:27:11');
INSERT INTO `workhistory` VALUES (213, '0000002', 3, '2022-09-27 22:27:11', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:27:11', '2022-09-27 22:27:11');
INSERT INTO `workhistory` VALUES (214, '0000003', 3, '2022-09-27 22:27:11', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:27:11', '2022-09-27 22:27:11');
INSERT INTO `workhistory` VALUES (215, '0000004', 3, '2022-09-27 22:27:11', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:27:11', '2022-09-27 22:27:11');
INSERT INTO `workhistory` VALUES (216, '0000001', 3, '2022-09-27 22:27:11', 'AUTO DETECTED - Worked not enough 8 hours - duration: 422 mins', '2022-09-27 22:27:11', '2022-09-27 22:27:11');
INSERT INTO `workhistory` VALUES (217, '0000002', 3, '2022-09-27 22:27:11', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:27:11', '2022-09-27 22:27:11');
INSERT INTO `workhistory` VALUES (218, '0000003', 3, '2022-09-27 22:27:11', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:27:11', '2022-09-27 22:27:11');
INSERT INTO `workhistory` VALUES (219, '0000004', 3, '2022-09-27 22:27:11', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:27:11', '2022-09-27 22:27:11');
INSERT INTO `workhistory` VALUES (220, '0000001', 3, '2022-09-27 22:27:28', 'AUTO DETECTED - Worked not enough 8 hours - duration: 422 mins', '2022-09-27 22:27:28', '2022-09-27 22:27:28');
INSERT INTO `workhistory` VALUES (221, '0000002', 3, '2022-09-27 22:27:28', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:27:28', '2022-09-27 22:27:28');
INSERT INTO `workhistory` VALUES (222, '0000003', 3, '2022-09-27 22:27:28', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:27:28', '2022-09-27 22:27:28');
INSERT INTO `workhistory` VALUES (223, '0000004', 3, '2022-09-27 22:27:28', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:27:28', '2022-09-27 22:27:28');
INSERT INTO `workhistory` VALUES (224, '0000001', 3, '2022-09-27 22:27:29', 'AUTO DETECTED - Worked not enough 8 hours - duration: 422 mins', '2022-09-27 22:27:29', '2022-09-27 22:27:29');
INSERT INTO `workhistory` VALUES (225, '0000002', 3, '2022-09-27 22:27:29', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:27:29', '2022-09-27 22:27:29');
INSERT INTO `workhistory` VALUES (226, '0000003', 3, '2022-09-27 22:27:29', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:27:29', '2022-09-27 22:27:29');
INSERT INTO `workhistory` VALUES (227, '0000004', 3, '2022-09-27 22:27:29', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:27:29', '2022-09-27 22:27:29');
INSERT INTO `workhistory` VALUES (228, '0000001', 3, '2022-09-27 22:27:29', 'AUTO DETECTED - Worked not enough 8 hours - duration: 422 mins', '2022-09-27 22:27:29', '2022-09-27 22:27:29');
INSERT INTO `workhistory` VALUES (229, '0000002', 3, '2022-09-27 22:27:29', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:27:29', '2022-09-27 22:27:29');
INSERT INTO `workhistory` VALUES (230, '0000003', 3, '2022-09-27 22:27:29', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:27:29', '2022-09-27 22:27:29');
INSERT INTO `workhistory` VALUES (231, '0000004', 3, '2022-09-27 22:27:29', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:27:29', '2022-09-27 22:27:29');
INSERT INTO `workhistory` VALUES (232, '0000001', 3, '2022-09-27 22:28:53', 'AUTO DETECTED - Worked not enough 8 hours - duration: 422 mins', '2022-09-27 22:28:53', '2022-09-27 22:28:53');
INSERT INTO `workhistory` VALUES (233, '0000002', 3, '2022-09-27 22:28:53', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:28:53', '2022-09-27 22:28:53');
INSERT INTO `workhistory` VALUES (234, '0000003', 3, '2022-09-27 22:28:53', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:28:53', '2022-09-27 22:28:53');
INSERT INTO `workhistory` VALUES (235, '0000004', 3, '2022-09-27 22:28:54', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:28:54', '2022-09-27 22:28:54');
INSERT INTO `workhistory` VALUES (236, '0000001', 3, '2022-09-27 22:28:55', 'AUTO DETECTED - Worked not enough 8 hours - duration: 422 mins', '2022-09-27 22:28:55', '2022-09-27 22:28:55');
INSERT INTO `workhistory` VALUES (237, '0000002', 3, '2022-09-27 22:28:55', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:28:55', '2022-09-27 22:28:55');
INSERT INTO `workhistory` VALUES (238, '0000003', 3, '2022-09-27 22:28:55', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:28:55', '2022-09-27 22:28:55');
INSERT INTO `workhistory` VALUES (239, '0000004', 3, '2022-09-27 22:28:55', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:28:55', '2022-09-27 22:28:55');
INSERT INTO `workhistory` VALUES (240, '0000001', 3, '2022-09-27 22:28:55', 'AUTO DETECTED - Worked not enough 8 hours - duration: 422 mins', '2022-09-27 22:28:55', '2022-09-27 22:28:55');
INSERT INTO `workhistory` VALUES (241, '0000002', 3, '2022-09-27 22:28:55', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:28:55', '2022-09-27 22:28:55');
INSERT INTO `workhistory` VALUES (242, '0000003', 3, '2022-09-27 22:28:55', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:28:55', '2022-09-27 22:28:55');
INSERT INTO `workhistory` VALUES (243, '0000004', 3, '2022-09-27 22:28:55', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:28:55', '2022-09-27 22:28:55');
INSERT INTO `workhistory` VALUES (244, '0000001', 3, '2022-09-27 22:33:43', 'AUTO DETECTED - Worked not enough 8 hours - duration: 422 mins', '2022-09-27 22:33:43', '2022-09-27 22:33:43');
INSERT INTO `workhistory` VALUES (245, '0000002', 3, '2022-09-27 22:33:44', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:33:44', '2022-09-27 22:33:44');
INSERT INTO `workhistory` VALUES (246, '0000003', 3, '2022-09-27 22:33:44', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:33:44', '2022-09-27 22:33:44');
INSERT INTO `workhistory` VALUES (247, '0000004', 3, '2022-09-27 22:33:44', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:33:44', '2022-09-27 22:33:44');
INSERT INTO `workhistory` VALUES (248, '0000001', 3, '2022-09-27 22:33:47', 'AUTO DETECTED - Worked not enough 8 hours - duration: 422 mins', '2022-09-27 22:33:47', '2022-09-27 22:33:47');
INSERT INTO `workhistory` VALUES (249, '0000002', 3, '2022-09-27 22:33:47', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:33:47', '2022-09-27 22:33:47');
INSERT INTO `workhistory` VALUES (250, '0000003', 3, '2022-09-27 22:33:47', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:33:47', '2022-09-27 22:33:47');
INSERT INTO `workhistory` VALUES (251, '0000004', 3, '2022-09-27 22:33:47', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:33:47', '2022-09-27 22:33:47');
INSERT INTO `workhistory` VALUES (252, '0000001', 3, '2022-09-27 22:33:48', 'AUTO DETECTED - Worked not enough 8 hours - duration: 422 mins', '2022-09-27 22:33:48', '2022-09-27 22:33:48');
INSERT INTO `workhistory` VALUES (253, '0000002', 3, '2022-09-27 22:33:48', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:33:48', '2022-09-27 22:33:48');
INSERT INTO `workhistory` VALUES (254, '0000003', 3, '2022-09-27 22:33:48', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:33:48', '2022-09-27 22:33:48');
INSERT INTO `workhistory` VALUES (255, '0000004', 3, '2022-09-27 22:33:48', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:33:48', '2022-09-27 22:33:48');
INSERT INTO `workhistory` VALUES (256, '0000001', 3, '2022-09-27 22:33:48', 'AUTO DETECTED - Worked not enough 8 hours - duration: 422 mins', '2022-09-27 22:33:48', '2022-09-27 22:33:48');
INSERT INTO `workhistory` VALUES (257, '0000002', 3, '2022-09-27 22:33:48', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:33:48', '2022-09-27 22:33:48');
INSERT INTO `workhistory` VALUES (258, '0000003', 3, '2022-09-27 22:33:48', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:33:48', '2022-09-27 22:33:48');
INSERT INTO `workhistory` VALUES (259, '0000004', 3, '2022-09-27 22:33:48', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-09-27 22:33:48', '2022-09-27 22:33:48');
INSERT INTO `workhistory` VALUES (260, '0000001', 0, '2022-09-27 22:34:44', 'Check in at 2022-09-27, 10:34:44 pm', '2022-09-27 22:34:44', '2022-09-27 22:34:44');
INSERT INTO `workhistory` VALUES (261, '0000001', 1, '2022-09-27 22:34:49', 'Check out at 2022-09-27, 10:34:49 pm', '2022-09-27 22:34:49', '2022-09-27 22:34:49');
INSERT INTO `workhistory` VALUES (262, '0000001', 0, '2022-09-27 22:35:11', 'Check in at 2022-09-27, 10:35:11 pm', '2022-09-27 22:35:11', '2022-09-27 22:35:11');
INSERT INTO `workhistory` VALUES (263, '0000001', 1, '2022-09-27 22:35:16', 'Check out at 2022-09-27, 10:35:16 pm', '2022-09-27 22:35:16', '2022-09-27 22:35:16');
INSERT INTO `workhistory` VALUES (264, '0000001', 0, '2022-09-27 23:08:32', 'Check in at 2022-09-27, 11:08:32 pm', '2022-09-27 23:08:32', '2022-09-27 23:08:32');
INSERT INTO `workhistory` VALUES (265, '0000001', 1, '2022-09-27 23:08:39', 'Check out at 2022-09-27, 11:08:39 pm', '2022-09-27 23:08:39', '2022-09-27 23:08:39');
INSERT INTO `workhistory` VALUES (266, '0000001', 3, '2022-09-28 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 12 to 11', '2022-09-28 18:30:00', '2022-09-28 18:30:00');
INSERT INTO `workhistory` VALUES (267, '0000002', 3, '2022-09-28 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 0 to -1', '2022-09-28 18:30:00', '2022-09-28 18:30:00');
INSERT INTO `workhistory` VALUES (268, '0000003', 3, '2022-09-28 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 0 to -1', '2022-09-28 18:30:00', '2022-09-28 18:30:00');
INSERT INTO `workhistory` VALUES (269, '0000004', 3, '2022-09-28 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 0 to -1', '2022-09-28 18:30:00', '2022-09-28 18:30:00');
INSERT INTO `workhistory` VALUES (270, '0000003', 0, '2022-09-28 22:10:08', 'Check in at 2022-09-28, 10:10:08 pm', '2022-09-28 22:10:08', '2022-09-28 22:10:08');
INSERT INTO `workhistory` VALUES (271, '0000003', 1, '2022-09-28 22:23:48', 'Check out at 2022-09-28, 10:23:48 pm', '2022-09-28 22:23:48', '2022-09-28 22:23:48');
INSERT INTO `workhistory` VALUES (272, '0000003', 0, '2022-09-28 22:26:40', 'Check in at 2022-09-28, 10:26:40 pm', '2022-09-28 22:26:40', '2022-09-28 22:26:40');
INSERT INTO `workhistory` VALUES (273, '0000003', 1, '2022-09-28 22:26:47', 'Check out at 2022-09-28, 10:26:47 pm', '2022-09-28 22:26:47', '2022-09-28 22:26:47');
INSERT INTO `workhistory` VALUES (274, '0000003', 0, '2022-09-28 22:27:11', 'Check in at 2022-09-28, 10:27:11 pm', '2022-09-28 22:27:11', '2022-09-28 22:27:11');
INSERT INTO `workhistory` VALUES (275, '0000001', 0, '2022-10-01 15:13:21', 'Check in at 2022-10-01, 03:13:21 pm', '2022-10-01 15:13:21', '2022-10-01 15:13:21');
INSERT INTO `workhistory` VALUES (276, '0000001', 1, '2022-10-01 15:13:36', 'Check out at 2022-10-01, 03:13:36 pm', '2022-10-01 15:13:36', '2022-10-01 15:13:36');
INSERT INTO `workhistory` VALUES (277, '0000001', 0, '2022-10-01 15:13:40', 'Check in at 2022-10-01, 03:13:40 pm', '2022-10-01 15:13:40', '2022-10-01 15:13:40');
INSERT INTO `workhistory` VALUES (278, '0000001', 2, '2022-10-01 19:20:00', 'CHECK OUT - Auto check out by bot', '2022-10-01 19:20:00', '2022-10-01 19:20:00');
INSERT INTO `workhistory` VALUES (279, '0000001', 3, '2022-10-01 19:20:00', 'AUTO DETECTED - Worked not enough 8 hours - duration: 359 mins', '2022-10-01 19:20:00', '2022-10-01 19:20:00');
INSERT INTO `workhistory` VALUES (280, '0000002', 3, '2022-10-01 19:20:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -1 to -2', '2022-10-01 19:20:00', '2022-10-01 19:20:00');
INSERT INTO `workhistory` VALUES (281, '0000003', 3, '2022-10-01 19:20:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -1 to -2', '2022-10-01 19:20:00', '2022-10-01 19:20:00');
INSERT INTO `workhistory` VALUES (282, '0000004', 3, '2022-10-01 19:20:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -1 to -2', '2022-10-01 19:20:00', '2022-10-01 19:20:00');
INSERT INTO `workhistory` VALUES (283, '0000001', 0, '2022-10-08 10:21:41', 'Check in at 2022-10-08, 10:21:41 am', '2022-10-08 10:21:41', '2022-10-08 10:21:41');
INSERT INTO `workhistory` VALUES (284, '0000001', 1, '2022-10-08 10:39:30', 'Check out at 2022-10-08, 10:39:30 am', '2022-10-08 10:39:30', '2022-10-08 10:39:30');
INSERT INTO `workhistory` VALUES (285, '0000001', 4, '2022-10-05 00:00:00', 'Increase by manager:  132, duration: 0 mins ', '2022-10-09 18:15:46', '2022-10-09 18:15:46');
INSERT INTO `workhistory` VALUES (286, '0000002', 4, '2022-10-07 00:00:00', 'Increase by manager:  Thich, duration: 0 mins ', '2022-10-09 18:17:29', '2022-10-09 18:17:29');
INSERT INTO `workhistory` VALUES (287, '0000001', 3, '2022-10-11 21:53:01', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 10.252083333333333 to 9.252083333333333', '2022-10-11 21:53:01', '2022-10-11 21:53:01');
INSERT INTO `workhistory` VALUES (288, '0000002', 3, '2022-10-11 21:53:01', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -2 to -3', '2022-10-11 21:53:01', '2022-10-11 21:53:01');
INSERT INTO `workhistory` VALUES (289, '0000003', 3, '2022-10-11 21:53:01', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -2.012 to -3.012', '2022-10-11 21:53:01', '2022-10-11 21:53:01');
INSERT INTO `workhistory` VALUES (290, '0000004', 3, '2022-10-11 21:53:01', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -2 to -3', '2022-10-11 21:53:01', '2022-10-11 21:53:01');
INSERT INTO `workhistory` VALUES (291, '0000001', 3, '2022-10-12 21:39:48', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 9.252083333333333 to 8.252083333333333', '2022-10-12 21:39:48', '2022-10-12 21:39:48');
INSERT INTO `workhistory` VALUES (292, '0000002', 3, '2022-10-12 21:39:48', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -3 to -4', '2022-10-12 21:39:48', '2022-10-12 21:39:48');
INSERT INTO `workhistory` VALUES (293, '0000003', 3, '2022-10-12 21:39:48', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -3.012 to -4.0120000000000005', '2022-10-12 21:39:48', '2022-10-12 21:39:48');
INSERT INTO `workhistory` VALUES (294, '0000004', 3, '2022-10-12 21:39:48', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -3 to -4', '2022-10-12 21:39:48', '2022-10-12 21:39:48');
INSERT INTO `workhistory` VALUES (295, '0000001', 3, '2022-10-12 21:39:49', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-10-12 21:39:49', '2022-10-12 21:39:49');
INSERT INTO `workhistory` VALUES (296, '0000002', 3, '2022-10-12 21:39:49', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-10-12 21:39:49', '2022-10-12 21:39:49');
INSERT INTO `workhistory` VALUES (297, '0000003', 3, '2022-10-12 21:39:49', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-10-12 21:39:49', '2022-10-12 21:39:49');
INSERT INTO `workhistory` VALUES (298, '0000004', 3, '2022-10-12 21:39:49', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-10-12 21:39:49', '2022-10-12 21:39:49');
INSERT INTO `workhistory` VALUES (299, '0000001', 3, '2022-10-12 21:39:49', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-10-12 21:39:49', '2022-10-12 21:39:49');
INSERT INTO `workhistory` VALUES (300, '0000002', 3, '2022-10-12 21:39:49', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-10-12 21:39:49', '2022-10-12 21:39:49');
INSERT INTO `workhistory` VALUES (301, '0000003', 3, '2022-10-12 21:39:49', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-10-12 21:39:49', '2022-10-12 21:39:49');
INSERT INTO `workhistory` VALUES (302, '0000004', 3, '2022-10-12 21:39:49', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-10-12 21:39:49', '2022-10-12 21:39:49');
INSERT INTO `workhistory` VALUES (303, '0000001', 3, '2022-10-12 21:53:00', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-10-12 21:53:00', '2022-10-12 21:53:00');
INSERT INTO `workhistory` VALUES (304, '0000002', 3, '2022-10-12 21:53:00', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-10-12 21:53:00', '2022-10-12 21:53:00');
INSERT INTO `workhistory` VALUES (305, '0000003', 3, '2022-10-12 21:53:00', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-10-12 21:53:00', '2022-10-12 21:53:00');
INSERT INTO `workhistory` VALUES (306, '0000004', 3, '2022-10-12 21:53:00', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-10-12 21:53:00', '2022-10-12 21:53:00');
INSERT INTO `workhistory` VALUES (307, '0000001', 0, '2022-10-13 10:05:44', 'Check in at 2022-10-13, 10:05:44 am', '2022-10-13 10:05:44', '2022-10-13 10:05:44');
INSERT INTO `workhistory` VALUES (308, '0000001', 1, '2022-10-13 10:08:14', 'Check out at 2022-10-13, 10:08:14 am', '2022-10-13 10:08:14', '2022-10-13 10:08:14');
INSERT INTO `workhistory` VALUES (309, '0000001', 0, '2022-10-13 10:08:29', 'Check in at 2022-10-13, 10:08:29 am', '2022-10-13 10:08:29', '2022-10-13 10:08:29');
INSERT INTO `workhistory` VALUES (310, '0000001', 1, '2022-10-13 10:08:31', 'Check out at 2022-10-13, 10:08:31 am', '2022-10-13 10:08:31', '2022-10-13 10:08:31');
INSERT INTO `workhistory` VALUES (311, '0000001', 0, '2022-10-13 10:08:38', 'Check in at 2022-10-13, 10:08:38 am', '2022-10-13 10:08:38', '2022-10-13 10:08:38');
INSERT INTO `workhistory` VALUES (312, '0000002', 0, '2022-10-13 10:20:19', 'Check in at 2022-10-13, 10:20:19 am', '2022-10-13 10:20:19', '2022-10-13 10:20:19');
INSERT INTO `workhistory` VALUES (313, '0000003', 0, '2022-10-13 10:41:38', 'Check in at 2022-10-13, 10:41:38 am', '2022-10-13 10:41:38', '2022-10-13 10:41:38');
INSERT INTO `workhistory` VALUES (314, '0000002', 1, '2022-10-13 10:44:51', 'Check out at 2022-10-13, 10:44:51 am', '2022-10-13 10:44:51', '2022-10-13 10:44:51');
INSERT INTO `workhistory` VALUES (315, '0000002', 0, '2022-10-13 16:05:33', 'Check in at 2022-10-13, 04:05:33 pm', '2022-10-13 16:05:33', '2022-10-13 16:05:33');
INSERT INTO `workhistory` VALUES (316, '0000003', 1, '2022-10-13 16:05:49', 'Check out at 2022-10-13, 04:05:49 pm', '2022-10-13 16:05:49', '2022-10-13 16:05:49');
INSERT INTO `workhistory` VALUES (317, '0000001', 2, '2022-10-13 17:30:00', 'CHECK OUT - Auto check out by bot', '2022-10-13 17:30:00', '2022-10-13 17:30:00');
INSERT INTO `workhistory` VALUES (318, '0000001', 3, '2022-10-13 17:30:00', 'AUTO DETECTED - Worked not enough 8 hours - duration: 111 mins', '2022-10-13 17:30:00', '2022-10-13 17:30:00');
INSERT INTO `workhistory` VALUES (319, '0000002', 2, '2022-10-13 17:30:00', 'CHECK OUT - Auto check out by bot', '2022-10-13 17:30:00', '2022-10-13 17:30:00');
INSERT INTO `workhistory` VALUES (320, '0000002', 3, '2022-10-13 17:30:00', 'AUTO DETECTED - Worked not enough 8 hours - duration: 386 mins', '2022-10-13 17:30:00', '2022-10-13 17:30:00');
INSERT INTO `workhistory` VALUES (321, '0000003', 3, '2022-10-13 17:30:00', 'AUTO DETECTED - Worked not enough 8 hours - duration: 216 mins', '2022-10-13 17:30:00', '2022-10-13 17:30:00');
INSERT INTO `workhistory` VALUES (322, '0000004', 3, '2022-10-13 17:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -7.000 to -8.000', '2022-10-13 17:30:00', '2022-10-13 17:30:00');
INSERT INTO `workhistory` VALUES (325, '0000002', 4, '2022-10-15 09:39:52', 'Update annual holiday by manager: test des, total: -12354 mins ', '2022-10-15 09:39:52', '2022-10-15 09:39:52');
INSERT INTO `workhistory` VALUES (326, '0000002', 4, '2022-10-15 09:40:32', 'Update annual holiday by manager: test des, total: 12354 mins ', '2022-10-15 09:40:32', '2022-10-15 09:40:32');
INSERT INTO `workhistory` VALUES (327, '0000002', 4, '2022-10-15 09:41:05', 'Update annual holiday by manager: test des, total: -800 mins ', '2022-10-15 09:41:05', '2022-10-15 09:41:05');
INSERT INTO `workhistory` VALUES (328, '0000002', 4, '2022-10-15 09:41:14', 'Update annual holiday by manager: test des, total: 4800 mins ', '2022-10-15 09:41:14', '2022-10-15 09:41:14');
INSERT INTO `workhistory` VALUES (329, '0000002', 4, '2022-10-15 09:41:52', 'Update annual holiday by manager: test des, total: -4800 mins ', '2022-10-15 09:41:52', '2022-10-15 09:41:52');
INSERT INTO `workhistory` VALUES (330, '0000002', 4, '2022-10-15 09:44:20', 'Update annual holiday by manager: test des, total: -4800 mins ', '2022-10-15 09:44:20', '2022-10-15 09:44:20');
INSERT INTO `workhistory` VALUES (331, '0000002', 4, '2022-10-15 09:44:45', 'Update annual holiday by manager: test des, total: -48000 mins ', '2022-10-15 09:44:45', '2022-10-15 09:44:45');
INSERT INTO `workhistory` VALUES (332, '0000002', 4, '2022-10-15 09:44:49', 'Update annual holiday by manager: test des, total: -48000 mins ', '2022-10-15 09:44:49', '2022-10-15 09:44:49');
INSERT INTO `workhistory` VALUES (333, '0000002', 4, '2022-10-15 09:44:57', 'Update annual holiday by manager: test des, total: 480000 mins ', '2022-10-15 09:44:57', '2022-10-15 09:44:57');
INSERT INTO `workhistory` VALUES (334, '0000002', 4, '2022-10-15 09:45:11', 'Update annual holiday by manager: test des, total: 4800 mins ', '2022-10-15 09:45:11', '2022-10-15 09:45:11');
INSERT INTO `workhistory` VALUES (335, '0000002', 4, '2022-10-15 09:46:05', 'Update annual holiday by manager: Reset your annual holiday, total: 4800 mins ', '2022-10-15 09:46:05', '2022-10-15 09:46:05');
INSERT INTO `workhistory` VALUES (336, '0000002', 4, '2022-10-15 09:48:16', 'Update annual holiday by manager: Reset your annual holiday, total: 200 mins ', '2022-10-15 09:48:16', '2022-10-15 09:48:16');
INSERT INTO `workhistory` VALUES (337, '0000002', 4, '2022-10-15 09:50:27', 'Update annual holiday by manager: Add annual holiday time with 5 hours, total: 320 mins ', '2022-10-15 09:50:27', '2022-10-15 09:50:27');
INSERT INTO `workhistory` VALUES (338, '0000002', 4, '2022-10-10 00:00:00', 'Increase by manager:  Add work time, duration: 120 mins ', '2022-10-15 13:34:00', '2022-10-15 13:34:00');
INSERT INTO `workhistory` VALUES (339, '0000002', 4, '2022-10-10 00:00:00', 'Increase by manager:  Add work time - after, duration: 180 mins ', '2022-10-15 13:36:11', '2022-10-15 13:36:11');
INSERT INTO `workhistory` VALUES (340, '0000001', 0, '2022-10-15 14:43:29', 'Check in at 2022-10-15, 02:43:29 pm', '2022-10-15 14:43:29', '2022-10-15 14:43:29');
INSERT INTO `workhistory` VALUES (341, '0000001', 1, '2022-10-15 14:43:50', 'Check out at 2022-10-15, 02:43:50 pm', '2022-10-15 14:43:50', '2022-10-15 14:43:50');
INSERT INTO `workhistory` VALUES (342, 'An Dinh Tu', 4, '2022-10-14 00:00:00', 'Increase by manager:  12312312312, duration: 123123 mins ', '2022-10-15 15:02:50', '2022-10-15 15:02:50');
INSERT INTO `workhistory` VALUES (343, '0000002', 4, '2022-10-14 00:00:00', 'Increase by manager:  Ngu qua phai OT, duration: 123123 mins ', '2022-10-15 15:05:31', '2022-10-15 15:05:31');
INSERT INTO `workhistory` VALUES (344, '0000002', 4, '2022-10-14 00:00:00', 'Increase by manager:  , duration: 0 mins ', '2022-10-15 15:06:57', '2022-10-15 15:06:57');
INSERT INTO `workhistory` VALUES (345, '0000003', 4, '2022-10-14 00:00:00', 'Increase by manager:  123123, duration: 123 mins ', '2022-10-15 15:18:21', '2022-10-15 15:18:21');
INSERT INTO `workhistory` VALUES (346, '0000003', 4, '2022-10-14 00:00:00', 'Increase by manager:  124124, duration: 123 mins ', '2022-10-15 15:23:07', '2022-10-15 15:23:07');
INSERT INTO `workhistory` VALUES (347, '0000003', 4, '2022-10-14 00:00:00', 'Increase by manager:  124124, duration: 123 mins ', '2022-10-15 15:25:00', '2022-10-15 15:25:00');
INSERT INTO `workhistory` VALUES (348, '0000003', 4, '2022-10-14 00:00:00', 'Increase by manager:  123123, duration: 123123 mins ', '2022-10-15 15:26:00', '2022-10-15 15:26:00');
INSERT INTO `workhistory` VALUES (349, '0000003', 4, '2022-10-14 00:00:00', 'Increase by manager:  123123, duration: 12312 mins ', '2022-10-15 15:28:08', '2022-10-15 15:28:08');
INSERT INTO `workhistory` VALUES (350, '0000003', 4, '2022-10-14 00:00:00', 'Increase by manager:  12123123, duration: -123 mins ', '2022-10-15 15:29:11', '2022-10-15 15:29:11');
INSERT INTO `workhistory` VALUES (351, '0000003', 4, '2022-10-14 00:00:00', 'Update by manager:  123123, duration: 123123 mins ', '2022-10-15 15:31:01', '2022-10-15 15:31:01');
INSERT INTO `workhistory` VALUES (352, '0000002', 4, '2022-10-15 16:10:12', 'Update annual holiday by manager - 123123, total: 0 mins ', '2022-10-15 16:10:12', '2022-10-15 16:10:12');
INSERT INTO `workhistory` VALUES (353, '0000002', 0, '2022-10-23 14:18:59', 'Check in at 2022-10-23, 02:18:59 pm', '2022-10-23 14:18:59', '2022-10-23 14:18:59');
INSERT INTO `workhistory` VALUES (354, '0000002', 1, '2022-10-23 14:19:23', 'Check out at 2022-10-23, 02:19:23 pm', '2022-10-23 14:19:23', '2022-10-23 14:19:23');
INSERT INTO `workhistory` VALUES (355, '0000002', 0, '2022-10-23 14:21:24', 'Check in at 2022-10-23, 02:21:24 pm', '2022-10-23 14:21:24', '2022-10-23 14:21:24');
INSERT INTO `workhistory` VALUES (356, '0000002', 1, '2022-10-23 14:21:49', 'Check out at 2022-10-23, 02:21:49 pm', '2022-10-23 14:21:49', '2022-10-23 14:21:49');
INSERT INTO `workhistory` VALUES (357, '0000003', 0, '2022-10-23 17:28:09', 'Check in at 2022-10-23, 05:28:09 pm', '2022-10-23 17:28:09', '2022-10-23 17:28:09');
INSERT INTO `workhistory` VALUES (358, '0000003', 1, '2022-10-23 17:28:55', 'Check out at 2022-10-23, 05:28:55 pm', '2022-10-23 17:28:55', '2022-10-23 17:28:55');
INSERT INTO `workhistory` VALUES (359, '0000003', 0, '2022-10-23 17:30:22', 'Check in at 2022-10-23, 05:30:22 pm', '2022-10-23 17:30:22', '2022-10-23 17:30:22');
INSERT INTO `workhistory` VALUES (360, '0000003', 1, '2022-10-23 17:33:20', 'Check out at 2022-10-23, 05:33:20 pm', '2022-10-23 17:33:20', '2022-10-23 17:33:20');
INSERT INTO `workhistory` VALUES (361, '0000003', 0, '2022-10-23 17:44:08', 'Check in at 2022-10-23, 05:44:08 pm', '2022-10-23 17:44:08', '2022-10-23 17:44:08');
INSERT INTO `workhistory` VALUES (362, '0000003', 1, '2022-10-23 17:44:11', 'Check out at 2022-10-23, 05:44:11 pm', '2022-10-23 17:44:11', '2022-10-23 17:44:11');
INSERT INTO `workhistory` VALUES (363, '0000003', 0, '2022-10-23 17:50:31', 'Check in at 2022-10-23, 05:50:31 pm', '2022-10-23 17:50:31', '2022-10-23 17:50:31');
INSERT INTO `workhistory` VALUES (364, '0000003', 1, '2022-10-23 17:50:36', 'Check out at 2022-10-23, 05:50:36 pm', '2022-10-23 17:50:36', '2022-10-23 17:50:36');
INSERT INTO `workhistory` VALUES (365, '0000003', 0, '2022-10-23 17:50:46', 'Check in at 2022-10-23, 05:50:46 pm', '2022-10-23 17:50:46', '2022-10-23 17:50:46');
INSERT INTO `workhistory` VALUES (366, '0000003', 1, '2022-10-23 17:50:50', 'Check out at 2022-10-23, 05:50:50 pm', '2022-10-23 17:50:50', '2022-10-23 17:50:50');
INSERT INTO `workhistory` VALUES (367, '0000003', 0, '2022-10-23 17:53:35', 'Check in at 2022-10-23, 05:53:35 pm', '2022-10-23 17:53:35', '2022-10-23 17:53:35');
INSERT INTO `workhistory` VALUES (368, '0000003', 4, '2022-10-21 00:00:00', 'Update by manager:  1231231231231, duration: 23 mins ', '2022-10-23 17:57:20', '2022-10-23 17:57:20');
INSERT INTO `workhistory` VALUES (369, '0000003', 4, '2022-10-23 17:57:44', 'Update annual holiday by manager - 123123123, total: 123 mins ', '2022-10-23 17:57:44', '2022-10-23 17:57:44');

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
  `is_not_working` tinyint(1) NOT NULL DEFAULT 0,
  `create_at` datetime NOT NULL DEFAULT current_timestamp,
  `update_at` datetime NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`worklog_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 163 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of worklog
-- ----------------------------
INSERT INTO `worklog` VALUES (3, '0000001', 1, '2022-09-18', 35.0, 0, '2022-09-18 16:52:25', '2022-09-18 17:52:10');
INSERT INTO `worklog` VALUES (4, '0000001', 0, '2022-09-24', 2.0, 0, '2022-09-24 09:09:22', '2022-09-24 09:14:56');
INSERT INTO `worklog` VALUES (5, '0000001', 1, '2022-09-25', 536.0, 0, '2022-09-25 09:06:41', '2022-09-25 18:03:04');
INSERT INTO `worklog` VALUES (6, '1000101', 0, '2022-09-25', 80.0, 0, '2022-09-25 18:22:38', '2022-09-25 18:22:38');
INSERT INTO `worklog` VALUES (121, '0000002', 1, '2022-09-25', 0.0, 1, '2022-09-25 19:39:45', '2022-10-13 10:25:38');
INSERT INTO `worklog` VALUES (122, '0000003', 1, '2022-09-25', 0.0, 1, '2022-09-25 19:39:45', '2022-10-13 10:25:39');
INSERT INTO `worklog` VALUES (123, '0000004', 1, '2022-09-25', 0.0, 1, '2022-09-25 19:39:45', '2022-10-13 10:25:41');
INSERT INTO `worklog` VALUES (124, '0000001', 1, '2022-09-26', 0.0, 1, '2022-09-26 22:09:39', '2022-10-13 10:25:43');
INSERT INTO `worklog` VALUES (125, '0000002', 1, '2022-09-26', 0.0, 1, '2022-09-26 22:09:39', '2022-10-13 10:25:44');
INSERT INTO `worklog` VALUES (126, '0000003', 1, '2022-09-26', 416.0, 0, '2022-09-26 09:09:39', '2022-09-26 22:19:47');
INSERT INTO `worklog` VALUES (127, '0000004', 1, '2022-09-26', 0.0, 1, '2022-09-26 22:09:39', '2022-10-13 10:25:33');
INSERT INTO `worklog` VALUES (128, '0000001', 1, '2022-09-27', 58.0, 0, '2022-09-27 21:12:31', '2022-10-13 10:25:18');
INSERT INTO `worklog` VALUES (129, '0000002', 1, '2022-09-27', 0.0, 1, '2022-09-27 22:27:10', '2022-10-13 10:25:46');
INSERT INTO `worklog` VALUES (130, '0000003', 1, '2022-09-27', 0.0, 1, '2022-09-27 22:27:10', '2022-10-13 10:25:48');
INSERT INTO `worklog` VALUES (131, '0000004', 1, '2022-09-27', 0.0, 1, '2022-09-27 22:27:10', '2022-10-13 10:25:49');
INSERT INTO `worklog` VALUES (132, '0000001', 1, '2022-09-28', 0.0, 1, '2022-09-28 18:30:00', '2022-10-13 10:25:50');
INSERT INTO `worklog` VALUES (133, '0000002', 1, '2022-09-28', 0.0, 1, '2022-09-28 18:30:00', '2022-10-13 10:25:52');
INSERT INTO `worklog` VALUES (134, '0000003', 0, '2022-09-28', 14.0, 0, '2022-09-28 18:30:00', '2022-09-28 22:27:11');
INSERT INTO `worklog` VALUES (135, '0000004', 1, '2022-09-28', 0.0, 1, '2022-09-28 18:30:00', '2022-10-13 10:25:53');
INSERT INTO `worklog` VALUES (136, '0000001', 1, '2022-10-01', 121.0, 0, '2022-10-01 15:13:21', '2022-10-01 19:20:00');
INSERT INTO `worklog` VALUES (137, '0000002', 1, '2022-10-01', 0.0, 1, '2022-10-01 19:20:00', '2022-10-13 10:25:55');
INSERT INTO `worklog` VALUES (138, '0000003', 1, '2022-10-01', 0.0, 1, '2022-10-01 19:20:00', '2022-10-13 10:25:57');
INSERT INTO `worklog` VALUES (139, '0000004', 1, '2022-10-01', 0.0, 1, '2022-10-01 19:20:00', '2022-10-13 10:25:59');
INSERT INTO `worklog` VALUES (140, '0000001', 1, '2022-10-08', 18.0, 0, '2022-10-08 10:21:41', '2022-10-08 10:39:30');
INSERT INTO `worklog` VALUES (141, '0000001', 1, '2022-10-05', 0.0, 1, '2022-10-09 18:15:46', '2022-10-13 10:26:00');
INSERT INTO `worklog` VALUES (142, '0000002', 1, '2022-10-07', 0.0, 1, '2022-10-09 18:17:29', '2022-10-13 10:26:01');
INSERT INTO `worklog` VALUES (143, '0000001', 1, '2022-10-11', 0.0, 1, '2022-10-11 21:53:01', '2022-10-13 10:26:03');
INSERT INTO `worklog` VALUES (144, '0000002', 1, '2022-10-11', 0.0, 1, '2022-10-11 21:53:01', '2022-10-13 10:26:04');
INSERT INTO `worklog` VALUES (145, '0000003', 1, '2022-10-11', 0.0, 1, '2022-10-11 21:53:01', '2022-10-13 10:26:05');
INSERT INTO `worklog` VALUES (146, '0000004', 1, '2022-10-11', 0.0, 1, '2022-10-11 21:53:01', '2022-10-13 10:26:06');
INSERT INTO `worklog` VALUES (147, '0000001', 1, '2022-10-12', 0.0, 1, '2022-10-12 21:39:48', '2022-10-13 10:26:07');
INSERT INTO `worklog` VALUES (148, '0000002', 1, '2022-10-12', 0.0, 1, '2022-10-12 21:39:48', '2022-10-13 10:26:08');
INSERT INTO `worklog` VALUES (149, '0000003', 1, '2022-10-12', 0.0, 1, '2022-10-12 21:39:48', '2022-10-13 10:26:09');
INSERT INTO `worklog` VALUES (150, '0000004', 1, '2022-10-12', 0.0, 1, '2022-10-12 21:39:48', '2022-10-13 10:26:11');
INSERT INTO `worklog` VALUES (151, '0000001', 1, '2022-10-13', 369.0, 0, '2022-10-13 10:05:44', '2022-10-13 17:30:00');
INSERT INTO `worklog` VALUES (152, '0000002', 1, '2022-10-13', 94.0, 0, '2022-10-13 10:20:19', '2022-10-13 17:30:00');
INSERT INTO `worklog` VALUES (153, '0000003', 1, '2022-10-13', 264.0, 0, '2022-10-13 10:41:38', '2022-10-13 16:05:49');
INSERT INTO `worklog` VALUES (154, '0000004', 1, '2022-10-13', 0.0, 1, '2022-10-13 17:30:00', '2022-10-13 17:30:00');
INSERT INTO `worklog` VALUES (155, '0000002', 1, '2022-10-10', 300.0, 0, '2022-10-15 13:34:00', '2022-10-15 13:36:11');
INSERT INTO `worklog` VALUES (156, '0000001', 1, '2022-10-15', 0.0, 0, '2022-10-15 14:43:29', '2022-10-15 14:43:50');
INSERT INTO `worklog` VALUES (158, '0000002', 1, '2022-10-14', 9999.9, 0, '2022-10-15 15:05:31', '2022-10-15 15:05:31');
INSERT INTO `worklog` VALUES (159, '0000003', 1, '2022-10-14', 9999.9, 0, '2022-10-15 15:18:21', '2022-10-15 15:31:01');
INSERT INTO `worklog` VALUES (160, '0000002', 1, '2022-10-23', 0.0, 0, '2022-10-23 14:18:59', '2022-10-23 14:21:49');
INSERT INTO `worklog` VALUES (161, '0000003', 0, '2022-10-23', 4.0, 0, '2022-10-23 17:28:09', '2022-10-23 17:53:35');
INSERT INTO `worklog` VALUES (162, '0000003', 1, '2022-10-21', 23.0, 0, '2022-10-23 17:57:20', '2022-10-23 17:57:20');

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
  `lunch_hour_start` int NULL DEFAULT NULL,
  `lunch_min_start` int NULL DEFAULT NULL,
  `lunch_hour_end` int NULL DEFAULT 1,
  `lunch_min_end` int NULL DEFAULT NULL,
  `approve_date` date NULL DEFAULT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp,
  `update_at` datetime NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`worktime_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of worktime
-- ----------------------------
INSERT INTO `worktime` VALUES (1, 8, 0, 17, 0, 12, 0, 13, 0, '2022-09-18', '2022-09-18 15:41:37', '2022-09-26 22:10:09');
INSERT INTO `worktime` VALUES (2, 8, 30, 17, 30, 12, 0, 13, 0, '2022-11-15', '2022-09-18 16:57:39', '2022-09-26 22:10:10');
INSERT INTO `worktime` VALUES (3, 8, 15, 18, 50, 12, 0, 13, 0, '2022-09-24', '2022-09-18 16:58:55', '2022-10-23 17:50:19');

SET FOREIGN_KEY_CHECKS = 1;
