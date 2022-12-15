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

 Date: 12/12/2022 22:51:05
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
INSERT INTO `administrator` VALUES ('admin', '$2b$12$UkRKm.cjbVgDmaMNO7L1du1kr9kVTWKvBm/mplvFFF5qurOM8Nb4i', '2022-12-11 18:19:22', NULL, '2022-12-17 15:53:48', 'U2FsdGVkX18bvRMtYo3DSZP7V/QNaPftywqK9iw0C3q7DMSh6Aaj/680AIsCu0Iml4MTZFRkDyKw93rpwUFJVojgXFQWY7A42tFnMPxigsqsvuymxO7qDaXaYkzExmIkhfu+a40euWICKBL1kpNbsFrIL70hKuJ/0akPfqBT4RXmf3sBf1dy4QrDNEwXsw01K0x9t73Klf4LrlFQphyJTH4D9XPzs9B9hM2qKJW9nXOozseSEByao98uoTst66k5cHrcuQOlUqe8PgASY6i2rzfbFAYUkA4cEZjl7UB3bu03dFq3eX5SzWd3iKkDvrERlOGF9jImF+U8JarffjcKsVuGQQFvb6ETvPueYZ2X8NGcQ+Pn5xlR7nF5ro1pw8lNXMwNf0cWyAubzIr02PN2+g==', '2022-12-11 19:51:42', '2022-11-20 16:53:49', '2022-12-11 18:51:42');
INSERT INTO `administrator` VALUES ('duywjbu', '$2b$12$UkRKm.cjbVgDmaMNO7L1du1kr9kVTWKvBm/mplvFFF5qurOM8Nb4i', '2022-12-11 15:19:49', NULL, '2022-12-17 15:53:48', 'U2FsdGVkX1/Irhn6MSCdW9f7vvidEA3U4en4JrpxxzRH4WKzu9cROc5ivQrgEBPJM/5xM1jU0RNHBMunaD32q+LyiU/w9crkzUQx3dwRC0HSLpvmsXIRZR7M0eWUABli3kfgxZdf2HEZNk6N33Ww98Id9NFuqdE1suYb8HdhbhLf6+bjRz9Fs7HA+aj5UElOKhR8ZzF+2a1xkce5Pz7mlIGcQcYhcJ7uVK/DH1LRceRvvcM4xtB+o2XlMRvcJcgALA6vwt9lPoNKX2pbzhZQViChqQYKwcDrRKMMVqLVugbyCil2bXlVgXVxgHP8ce6EKpnn47JxG7BKlIQ+3y0d04zmuxxIO4O9K+Dc3uND7AB/FKfziOZKetBvrfkQnt6b4o07VH2iZK5HjD5Zc0WhMt80pA8hm8NIXG18QhgoSVI=', '2022-12-11 16:38:35', '2022-11-03 20:10:07', '2022-12-11 15:38:35');
INSERT INTO `administrator` VALUES ('thangld', '$2b$12$UkRKm.cjbVgDmaMNO7L1du1kr9kVTWKvBm/mplvFFF5qurOM8Nb4i', '2022-12-12 08:58:26', NULL, '2022-12-17 15:53:48', 'U2FsdGVkX18YRbQ962GLIJ51bVyKhOM1Qz+oXNZAMOJtX4t3llXSxZ3J5eP0b679P2GMtujON8YF96tiKdoN6u7bQ1GdftS+q2Ky6tiyFZVlw7Vl7uOuTtcKULWX3i/XwvY5k+MYf6QqIkURoB/G97woxz1dWgf7g3ieRDUVRkOiUgfJmaCYDC45DsoDl1zzRzj3jJXg+DAEq9SmoYqgJgMVzpWbS7XyF7oZEwQOzkV0eVMP+Apja1FA8xt3ovQmmTVQBMHConj8mv+GmBO3HKl8kA0jotROTAFcprr7ntG9D4YujDp1Gz+28dGtVIqUlQ5v0/gr4R7aH0jFIbnZk/5iS8sFKD+4qGDo9iZuDgK5ctor60aOy9rdc/V3NLQbniSjmTe/9MTWuBmagfmemg==', '2022-12-12 10:03:56', '2022-09-17 15:54:06', '2022-12-12 09:03:56');

-- ----------------------------
-- Table structure for allowance
-- ----------------------------
DROP TABLE IF EXISTS `allowance`;
CREATE TABLE `allowance`  (
  `lunch` decimal(10, 2) NULL DEFAULT NULL COMMENT 'trợ cấp ăn trưa',
  `house` decimal(10, 2) NULL DEFAULT NULL COMMENT 'trợ cấp thuê nha',
  `transport` decimal(10, 2) NULL DEFAULT NULL COMMENT 'trợ cấp đi lại',
  `phone` decimal(10, 2) NULL DEFAULT NULL COMMENT 'trợ cấp tiền điện thoại',
  `internet` decimal(10, 2) NULL DEFAULT NULL COMMENT 'Trợ cấp internet',
  `insurance` decimal(10, 2) NULL DEFAULT NULL COMMENT 'phần trăm bảo hiểu',
  `tax` decimal(10, 2) NULL DEFAULT NULL COMMENT 'Phần trăm thuế'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of allowance
-- ----------------------------
INSERT INTO `allowance` VALUES (700000.00, 2500000.00, 1000000.00, 100000.00, 200000.00, 0.10, 0.10);

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
INSERT INTO `assignment` VALUES ('0001', '0000001', '2022-11-19 12:10:10', '2022-10-15 13:46:02', '2022-11-27 10:51:30');
INSERT INTO `assignment` VALUES ('0001', '0000002', '2022-11-27 14:27:41', '2022-10-09 10:40:14', '2022-11-27 14:27:41');
INSERT INTO `assignment` VALUES ('0001', '0000003', '2022-12-02 17:11:20', '2022-12-02 17:11:20', '2022-12-02 17:11:20');
INSERT INTO `assignment` VALUES ('0002', '0000002', '2022-10-15 14:10:57', '2022-10-15 14:10:57', '2022-10-15 14:10:57');
INSERT INTO `assignment` VALUES ('0002', '0000003', '2000-10-18 00:00:00', '2022-11-19 09:34:50', '2022-11-19 17:29:06');
INSERT INTO `assignment` VALUES ('0003', '0000001', '2022-11-27 14:29:09', '2022-11-27 12:35:10', '2022-11-27 14:29:09');
INSERT INTO `assignment` VALUES ('0003', '0000002', '2022-11-27 12:35:15', '2022-11-27 12:35:15', '2022-11-27 12:35:15');
INSERT INTO `assignment` VALUES ('0003', '0000003', '2022-11-27 14:28:56', '2022-11-27 12:35:18', '2022-11-27 14:28:56');
INSERT INTO `assignment` VALUES ('0003', '0000005', '2022-10-10 03:00:00', '2022-11-19 09:40:37', '2022-11-19 17:29:13');
INSERT INTO `assignment` VALUES ('0004', '0000003', '2022-12-03 09:40:28', '2022-12-03 09:40:28', '2022-12-03 09:40:28');
INSERT INTO `assignment` VALUES ('0005', '0000006', '2022-12-03 00:00:00', '2022-12-03 12:11:30', '2022-12-03 12:11:30');
INSERT INTO `assignment` VALUES ('0006', '0000002', '2022-12-13 08:47:12', '2022-12-13 08:47:12', '2022-12-13 08:47:12');
INSERT INTO `assignment` VALUES ('0006', '0000012', '2022-12-05 00:00:00', '2022-12-05 20:30:37', '2022-12-05 20:30:37');

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `category_color` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_at` datetime NULL DEFAULT current_timestamp,
  `update_at` datetime NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, 'Document', '#36FF20', '2022-11-05 14:06:12', '2022-11-05 14:06:12');
INSERT INTO `category` VALUES (2, 'Caculating', '#F44336', '2022-11-05 16:58:50', '2022-11-05 16:58:50');
INSERT INTO `category` VALUES (3, 'FixBug', '#673AB7', '2022-11-05 16:59:23', '2022-11-05 17:00:06');
INSERT INTO `category` VALUES (4, 'Refactor', '#00BCD4', '2022-11-12 17:21:40', '2022-11-12 17:21:40');
INSERT INTO `category` VALUES (5, 'Coding', '#BF360C', '2022-11-19 17:23:21', '2022-11-19 17:23:21');

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
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of dailyreport
-- ----------------------------
INSERT INTO `dailyreport` VALUES (7, '0000001', '0001', '2020 - ahaha - edit success', '2020 - ahaha -edit', 'edit', 'Ahead of schedule', '2022-10-06', '2022-10-06 15:51:28', '2022-10-09 15:10:04');
INSERT INTO `dailyreport` VALUES (8, '0000001', '0002', '- Create screen\n- no no\n-- tes\nersdf', '- No-sdsd', '- Offfff', 'Ahead of schedule', '2022-10-08', '2022-10-08 18:30:19', '2022-10-09 15:09:07');
INSERT INTO `dailyreport` VALUES (9, '0000001', '0002', 'sda', 'dasd', 'asd', 'Ahead of schedule', '2022-10-08', '2022-10-08 18:33:27', '2022-10-09 15:08:44');
INSERT INTO `dailyreport` VALUES (10, '0000001', '0001', '123', '123', '123', 'On schedule', '2022-10-08', '2022-10-08 18:34:15', '2022-10-08 18:34:15');
INSERT INTO `dailyreport` VALUES (11, '0000001', '0002', 'sdasd', 'sadasd', 'asdasd', 'On schedule', '2022-10-09', '2022-10-09 11:27:45', '2022-10-09 11:27:45');
INSERT INTO `dailyreport` VALUES (12, '0000002', '0001', 'lam viec nhieu', 'kho qua', 'an choi nhay mua', 'On schedule', '2022-10-22', '2022-10-22 15:53:52', '2022-10-22 15:53:52');
INSERT INTO `dailyreport` VALUES (13, '0000002', '0001', '- Task 1\n_ Task 2', 'No', 'Off', 'On schedule', '2022-10-25', '2022-10-25 20:35:57', '2022-10-25 20:35:57');
INSERT INTO `dailyreport` VALUES (14, '0000001', '0002', '- test\n- xuong hang\nhahaha', 'sdsd', 'sdd', 'On schedule', '2022-11-03', '2022-11-03 22:12:00', '2022-11-03 22:12:00');
INSERT INTO `dailyreport` VALUES (15, '0000003', '0002', '- Task 1\n- Task 2', '- Problem 1', '- Plan 1', 'Ahead of schedule', '2022-11-04', '2022-11-04 15:28:07', '2022-11-04 15:28:07');
INSERT INTO `dailyreport` VALUES (16, '0000001', '0002', '2312', '123', '123', 'Ahead of schedule', '2022-11-19', '2022-11-19 16:51:15', '2022-11-19 16:51:15');
INSERT INTO `dailyreport` VALUES (17, '0000001', '0002', '123', '123', '123', 'Ahead of schedule', '2022-11-19', '2022-11-19 16:52:10', '2022-11-19 16:52:10');

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
INSERT INTO `employee` VALUES ('0000001', 'Le Duc', 'Thang', '2000-01-01', '123 CND - SG', 0, 'thangld@gmail.com', '$2b$12$yPE/mcCEEr1hUMvnFc1F6eB0wI4E8HkalN8pUrb.7./9OvKsncpwG', '000001', 4.372916666666666, '2000-01-01', '10xasdzxs', 'NodeJSs', 'VueJSs', 'Developer', 1, '0000001', NULL, NULL, NULL, NULL, NULL, NULL, '1668855135709_activate deactivate conda.png', 150000.00, '67910000000', 'BIDV', NULL, 0, '2022-09-28 14:41:19', '2022-12-12 18:30:00');
INSERT INTO `employee` VALUES ('0000002', 'An', 'Dinh Tuan', '2000-01-01', '1 VVN', 0, 'andt@gmail.com', '$2b$12$yPE/mcCEEr1hUMvnFc1F6eB0wI4E8HkalN8pUrb.7./9OvKsncpwG', '000001', 11.022916666666548, '2000-01-01', '0896563253a', 'VueJS', 'AI', 'BPM', 0, '0000001', 'Duy Bùi Việt', 1, '0906854315', '1 Võ Văn Ngân, Thủ Đức, Hồ Chí Minh', '1980-01-01', 'Cha Con Guộc', '1666510092157_bdmt.jpg', 80000.00, '123456789', 'ACB - SaiGon', NULL, 0, '2022-09-28 14:43:07', '2022-12-12 18:30:00');
INSERT INTO `employee` VALUES ('0000003', 'Duy', 'Wjbu', '2000-07-05', '204/6 Linh Dong', 0, 'duybv@gmail.com', '$2b$12$SXTyIOpmrMmP3jfBwdTcneW69dFVJ6EiY4ZzBHyoN3dLG6Ilj1.4i', '000001', 4.021333333333359, '2022-09-28', '0253263120', 'Prozjp', 'Dep trai', NULL, 1, '0000001', NULL, NULL, NULL, NULL, NULL, NULL, '1666517499759_288020.jpg', 80000.00, NULL, NULL, NULL, 0, '2022-09-28 14:43:26', '2022-12-12 18:30:00');
INSERT INTO `employee` VALUES ('0000004', 'Manager', '1', '2000-10-10', NULL, 0, 'ldthang2201@gmail.com', '$2b$12$G3DVMLIjLTfc7ep3t7BnmutTbheR9.K8y9LgqquXdzi7T3T5GcaRa', '000001', -5, '2000-10-10', '2121212121', NULL, NULL, 'Tester', 1, '0000001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 85000.00, NULL, NULL, NULL, 0, '2022-09-28 17:50:26', '2022-12-12 18:30:00');
INSERT INTO `employee` VALUES ('0000005', 'Hao', 'Duc (Manager)', '2000-10-10', NULL, 2, 'haond@gmail.com', '$2b$12$SXTyIOpmrMmP3jfBwdTcneW69dFVJ6EiY4ZzBHyoN3dLG6Ilj1.4i', '000002', -5, '2022-09-28', NULL, NULL, NULL, NULL, 1, '0000001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 90000.00, NULL, NULL, NULL, 0, '2022-10-23 16:28:34', '2022-12-12 18:30:00');
INSERT INTO `employee` VALUES ('0000006', 'an', 'dinh', '2020-08-19', 'thanh 3 phu tho', 0, 'anga@gmail.com', '$2b$12$iNqzQEEoyKk4K7cUkeZbde.JULT3QLPkV1aCKIbec72saJZZqVGAK', '000001', -5, '2022-11-19', '0123456789', NULL, NULL, NULL, 0, '0000001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-11-19 12:14:35', '2022-12-12 18:30:00');
INSERT INTO `employee` VALUES ('0000007', 'aaaaa', 'bbbbbbbb', '2022-11-29', 'fdsafdsa', 0, 'aaa@gmail.com', '$2b$12$c0laiCNpPOMpAPLVBCaQ/eS/wh5.cEbm3Y.RNV8YH2gI8KE/6hZ06', '000001', -5, '2022-11-29', NULL, NULL, NULL, NULL, 0, '0000001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-11-29 20:10:30', '2022-12-12 18:30:00');
INSERT INTO `employee` VALUES ('0000008', 'aaaa', 'bbbb', '2022-11-29', NULL, 0, 'aaaa@gmail.com', '$2b$12$U4fydVoTXrZQv./c/U/E8.ddMgRyPc1cAXdryx9Rlq49DiwpR7eH.', '000001', -5, '2022-11-29', NULL, NULL, NULL, NULL, 0, '0000001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-11-29 20:13:29', '2022-12-12 18:30:00');
INSERT INTO `employee` VALUES ('0000009', 'adam', 'da den', '2022-11-29', NULL, 0, 'xenic63755@xegge.com', '$2b$12$lNCNIep9OfAK8.IP8TL0K.jZSZwPfCpRFsDjefHKCj0xcrRdZhAlq', '000003', 0, '2022-11-29', NULL, NULL, NULL, NULL, 0, '0000005', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2022-11-29 20:25:01', '2022-11-29 20:50:48');
INSERT INTO `employee` VALUES ('0000010', 'haizzz', 'haaa', '2022-11-29', NULL, 0, 'temptemp@gmail.com', '123', '000001', -1, '2022-11-29', NULL, NULL, NULL, NULL, 0, '0000001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-11-29 20:31:24', '2022-12-12 18:30:00');
INSERT INTO `employee` VALUES ('0000011', 'black', 'adam', '2022-12-14', NULL, 0, 'yojecih489@edinel.com', '$2b$12$Sq.JZccE7mbiIsgovrFpj.Q7zvYgqRHCgRHk8aECv.WljDFk4AH7G', '000003', -6, '2022-12-04', NULL, NULL, NULL, NULL, 0, '0000005', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-12-04 16:38:09', '2022-12-12 18:30:00');
INSERT INTO `employee` VALUES ('0000012', 'superman', 'man', '2022-12-05', NULL, 0, 'jfdsioj@gmail.com', '$2b$12$MQAKknx3HxuLSGzRgWdXbuKM0PWIi6obt50ZmHP0xtI752MznRvZe', '000003', -5, '2022-12-05', NULL, NULL, NULL, NULL, 0, '0000005', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-12-05 18:40:09', '2022-12-12 18:30:00');
INSERT INTO `employee` VALUES ('0000013', 'Nguyen Van', 'A', '2000-01-10', 'aa Thu Duc, HCM', 0, 'thangg123@gmail.com', '$2b$12$LhI1iu6O519S3ltJcTQZ9OrGARgiXPy/iJm.yKSWUwsYOMvfeZGHG', '000002', -4, '2022-12-06', 'xxxxxxxxx', 'NodeJS', NULL, NULL, 0, '0000004', 'Nguyen Van B', 0, 'xxxxxxxxx', 'aa Thu Duc, HCM', NULL, 'father and son', NULL, 100000.00, 'ACB', 'xxxxxxx', NULL, 0, '2022-12-06 22:06:45', '2022-12-12 18:30:00');
INSERT INTO `employee` VALUES ('0000014', 'Thang Import', 'Test', '2000-03-15', 'Thu Do Ha Noi', 0, 'nguyenvanaa123ss@gmail.com', '$2b$12$ewWGYFOwCkOhqtcC.AiNQeClSxRsLh0y7IC9ioLK0aV7io/M94Umi', '000002', -4, '2022-12-06', '0125469935', 'NodeJS', NULL, NULL, 0, '0000004', 'Nguyen Van B', 0, 'xxxxxxxxx', 'aa Thu Duc, HCM', NULL, 'father and son', NULL, 100000.00, 'ACB', 'xxxxxxx', NULL, 0, '2022-12-06 22:06:45', '2022-12-12 18:30:00');

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
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of group
-- ----------------------------
INSERT INTO `group` VALUES ('000001', 'DEG', 'Enterprise Development', '0000001', '2022-09-17 17:07:58', '2022-09-17 17:07:58', '2022-12-13 08:39:47');
INSERT INTO `group` VALUES ('000002', 'SALE', 'Sale Group', '0000004', '2022-10-31 07:00:00', '2022-10-16 15:49:12', '2022-12-13 08:40:22');
INSERT INTO `group` VALUES ('000003', 'UDG', 'Unity Development', '0000005', '2022-11-30 07:00:00', '2022-11-03 20:41:58', '2022-12-13 08:41:37');
INSERT INTO `group` VALUES ('000004', 'BOSS', 'Manager Group COE', '0000003', '2022-12-01 07:00:00', '2022-12-10 16:47:55', '2022-12-10 16:47:55');
INSERT INTO `group` VALUES ('000005', 'AIG', ' Artificial Intelligence Group', '0000014', '2022-12-13 07:00:00', '2022-12-13 08:43:37', '2022-12-13 08:43:37');

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
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of holiday
-- ----------------------------
INSERT INTO `holiday` VALUES (1, '2022-09-29', 'Nghi le hang nam', '2022-09-24 16:43:09', '2022-09-24 16:43:09');
INSERT INTO `holiday` VALUES (2, '2022-09-27', 'Team Building', '2022-09-28 20:54:50', '2022-10-25 20:01:59');
INSERT INTO `holiday` VALUES (3, '2022-09-02', 'Quoc Khanh Viet Nam', '2022-09-28 20:59:17', '2022-10-25 20:02:14');
INSERT INTO `holiday` VALUES (5, '2022-10-28', '777777', '2022-09-28 20:59:29', '2022-10-29 18:18:54');
INSERT INTO `holiday` VALUES (6, '2023-01-01', 'Tet Nguyen Dan', '2022-09-28 20:59:43', '2022-10-25 20:02:30');
INSERT INTO `holiday` VALUES (10, '2023-01-24', 'Tet Am Lich', '2022-12-05 19:59:08', '2022-12-05 19:59:08');
INSERT INTO `holiday` VALUES (11, '2023-01-26', 'Tet Am Lich', '2022-12-05 20:00:09', '2022-12-05 20:00:09');
INSERT INTO `holiday` VALUES (13, '2023-01-27', 'Tet Am Lich', '2022-12-05 20:00:48', '2022-12-05 20:00:48');
INSERT INTO `holiday` VALUES (14, '2023-01-25', 'Tet Am Lich', '2022-12-05 20:00:59', '2022-12-05 20:00:59');

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
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of keyvalue
-- ----------------------------
INSERT INTO `keyvalue` VALUES ('increase_paid_leave_month', '1', 'Số ngày nghỉ có lương hàng tháng', '2022-12-03 15:27:26', '2022-12-03 18:07:43');
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
) ENGINE = InnoDB AUTO_INCREMENT = 44 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
INSERT INTO `leave` VALUES (23, '0000002', 0, '2022-10-26 08:00:00', '2022-10-26 17:00:00', 'Hôm nay cảm thấy mệt', 1, '2022-10-25 20:13:44', '2022-10-28 15:54:19');
INSERT INTO `leave` VALUES (24, '0000002', 0, '2022-10-28 08:30:00', '2022-10-28 17:30:00', 'Private issue', 0, '2022-10-25 21:02:21', '2022-10-25 21:02:21');
INSERT INTO `leave` VALUES (37, '0000001', 0, '2022-11-18 06:24:00', '2022-11-18 13:24:00', 'I\'m going to hospital!', 0, '2022-11-12 17:25:25', '2022-11-12 17:25:25');
INSERT INTO `leave` VALUES (38, '0000001', 0, '2022-11-18 06:24:00', '2022-11-18 13:24:00', 'I\'m going to hospital!', 1, '2022-11-12 17:26:16', '2022-12-11 12:04:21');
INSERT INTO `leave` VALUES (40, '0000001', 1, '2022-11-21 10:33:00', '2022-11-21 15:33:00', 'I late please', 1, '2022-11-20 15:33:43', '2022-11-20 15:34:07');
INSERT INTO `leave` VALUES (41, '0000001', 0, '2022-12-12 08:00:00', '2022-12-12 10:00:00', 'qua bên xã làm giấy tờ', 0, '2022-12-11 09:39:07', '2022-12-11 09:39:07');
INSERT INTO `leave` VALUES (43, '0000003', 1, '2022-12-14 10:30:00', '2022-12-14 12:30:00', '123', 0, '2022-12-12 18:39:35', '2022-12-12 18:39:35');

-- ----------------------------
-- Table structure for monthlyreport
-- ----------------------------
DROP TABLE IF EXISTS `monthlyreport`;
CREATE TABLE `monthlyreport`  (
  `employee_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `month` int NOT NULL,
  `year` int NOT NULL,
  `work_total_hours` decimal(10, 2) NULL DEFAULT NULL COMMENT 'Tổng giờ làm - tính theo giờ',
  `work_total_days` int NULL DEFAULT NULL COMMENT 'Số ngày làm trong tháng',
  `annual_holiday` decimal(10, 2) NULL DEFAULT NULL COMMENT 'Số ngày nghỉ còn lại trong tháng đó',
  `overtime_payment_total` decimal(10, 2) NULL DEFAULT NULL COMMENT 'Tổng tiền lương OT được approve ',
  `salary_basic` decimal(12, 2) NULL DEFAULT NULL COMMENT 'Tổng tiền lương cơ bản trong tháng',
  `salary_total` decimal(12, 2) NULL DEFAULT NULL COMMENT 'Tổng tiền lương được nhận',
  `salary_hour` decimal(12, 2) NULL DEFAULT NULL,
  `transport_support` decimal(10, 2) NULL DEFAULT NULL COMMENT 'Hỗ trợ di chuyển',
  `house_support` decimal(10, 2) NULL DEFAULT NULL COMMENT 'Hỗ trợ thuê nhà',
  `internet_support` decimal(10, 2) NULL DEFAULT NULL COMMENT 'Hỗ trợ internet',
  `phone_support` decimal(10, 2) NULL DEFAULT NULL COMMENT 'Hỗ trợ tiền điện thoại',
  `lunch_support` decimal(10, 2) NULL DEFAULT NULL COMMENT 'Hỗ trợ ăn trưa',
  `insurance` decimal(10, 2) NULL DEFAULT NULL COMMENT 'Tiền đóng bảo hiểm',
  `tax` decimal(10, 2) NULL DEFAULT NULL COMMENT 'Tiền trừ thuế',
  `bonus_reward` decimal(10, 2) NULL DEFAULT 0.00,
  `create_at` datetime NOT NULL DEFAULT current_timestamp,
  `update_at` datetime NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`employee_id`, `month`, `year`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of monthlyreport
-- ----------------------------
INSERT INTO `monthlyreport` VALUES ('0000001', 9, 2022, 10.52, 6, 3.23, 9000000.00, 4800000.00, 18340000.00, NULL, 700000.00, 3500000.00, 200000.00, 400000.00, 700000.00, 480000.00, 480000.00, 0.00, '2022-10-29 08:23:01', '2022-11-20 17:17:17');
INSERT INTO `monthlyreport` VALUES ('0000001', 10, 2022, 8.67, 10, 4.39, 638000.00, 8000000.00, 11538000.00, 100000.00, 1000000.00, 2500000.00, 200000.00, 100000.00, 700000.00, 800000.00, 800000.00, 0.00, '2022-11-20 17:48:13', '2022-11-01 00:01:00');
INSERT INTO `monthlyreport` VALUES ('0000001', 11, 2022, 7.13, 3, 4.39, 1000000.00, 2400000.00, 7420000.00, 100000.00, 1000000.00, 2500000.00, 200000.00, 100000.00, 700000.00, 240000.00, 240000.00, 100000.00, '2022-12-01 00:01:00', '2022-12-13 21:35:34');
INSERT INTO `monthlyreport` VALUES ('0000002', 9, 2022, 0.00, 4, 8.43, 0.00, 2560000.00, 7548000.00, NULL, 700000.00, 3500000.00, 200000.00, 400000.00, 700000.00, 256000.00, 256000.00, 0.00, '2022-10-29 08:23:01', '2022-11-20 17:17:17');
INSERT INTO `monthlyreport` VALUES ('0000002', 10, 2022, 181.23, 11, 11.13, 1080000.00, 7040000.00, 11212000.00, 80000.00, 1000000.00, 2500000.00, 200000.00, 100000.00, 700000.00, 704000.00, 704000.00, 0.00, '2022-11-20 17:48:13', '2022-11-01 00:01:00');
INSERT INTO `monthlyreport` VALUES ('0000002', 11, 2022, 15.53, 5, 11.13, 0.00, 3200000.00, 7060000.00, 80000.00, 1000000.00, 2500000.00, 200000.00, 100000.00, 700000.00, 320000.00, 320000.00, 0.00, '2022-12-01 00:01:00', '2022-12-01 00:01:00');
INSERT INTO `monthlyreport` VALUES ('0000003', 9, 2022, 7.17, 4, 529.02, 0.00, 2560000.00, 7548000.00, NULL, 700000.00, 3500000.00, 200000.00, 400000.00, 700000.00, 256000.00, 256000.00, 0.00, '2022-10-29 08:23:01', '2022-11-20 17:17:17');
INSERT INTO `monthlyreport` VALUES ('0000003', 10, 2022, 171.52, 10, 5.02, 600000.00, 6400000.00, 10220000.00, 80000.00, 1000000.00, 2500000.00, 200000.00, 100000.00, 700000.00, 640000.00, 640000.00, 0.00, '2022-11-20 17:48:13', '2022-11-01 00:01:00');
INSERT INTO `monthlyreport` VALUES ('0000003', 11, 2022, 0.00, 3, 5.02, 0.00, 1920000.00, 6036000.00, 80000.00, 1000000.00, 2500000.00, 200000.00, 100000.00, 700000.00, 192000.00, 192000.00, 0.00, '2022-12-01 00:01:00', '2022-12-01 00:01:00');
INSERT INTO `monthlyreport` VALUES ('0000004', 9, 2022, 0.00, 4, -11.00, 0.00, 0.00, 5500000.00, NULL, 700000.00, 3500000.00, 200000.00, 400000.00, 700000.00, 0.00, 0.00, 0.00, '2022-10-29 08:23:01', '2022-11-20 17:17:17');
INSERT INTO `monthlyreport` VALUES ('0000004', 10, 2022, 0.00, 6, -4.00, 0.00, 0.00, 4500000.00, 85000.00, 1000000.00, 2500000.00, 200000.00, 100000.00, 700000.00, 0.00, 0.00, 0.00, '2022-11-20 17:48:13', '2022-11-01 00:01:00');
INSERT INTO `monthlyreport` VALUES ('0000004', 11, 2022, 0.00, 1, -4.00, 0.00, 0.00, 4500000.00, 85000.00, 1000000.00, 2500000.00, 200000.00, 100000.00, 700000.00, 0.00, 0.00, 0.00, '2022-12-01 00:01:00', '2022-12-01 00:01:00');
INSERT INTO `monthlyreport` VALUES ('0000005', 9, 2022, 0.00, 0, -3.00, 0.00, 0.00, 5500000.00, NULL, 700000.00, 3500000.00, 200000.00, 400000.00, 700000.00, 0.00, 0.00, 0.00, '2022-10-29 08:23:01', '2022-11-20 17:17:17');
INSERT INTO `monthlyreport` VALUES ('0000005', 10, 2022, 0.00, 2, -4.00, 0.00, 0.00, 4500000.00, 90000.00, 1000000.00, 2500000.00, 200000.00, 100000.00, 700000.00, 0.00, 0.00, 0.00, '2022-11-20 17:48:13', '2022-11-01 00:01:00');
INSERT INTO `monthlyreport` VALUES ('0000005', 11, 2022, 0.00, 1, -4.00, 0.00, 0.00, 4500000.00, 90000.00, 1000000.00, 2500000.00, 200000.00, 100000.00, 700000.00, 0.00, 0.00, 0.00, '2022-12-01 00:01:00', '2022-12-01 00:01:00');
INSERT INTO `monthlyreport` VALUES ('0000006', 9, 2022, 0.00, 0, 0.00, 0.00, 0.00, 5500000.00, NULL, 700000.00, 3500000.00, 200000.00, 400000.00, 700000.00, 0.00, 0.00, 0.00, '2022-11-20 17:17:17', '2022-11-20 17:17:17');
INSERT INTO `monthlyreport` VALUES ('0000006', 10, 2022, 0.00, 0, -4.00, 0.00, 0.00, 4500000.00, 0.00, 1000000.00, 2500000.00, 200000.00, 100000.00, 700000.00, 0.00, 0.00, 0.00, '2022-11-20 17:48:13', '2022-11-01 00:01:00');
INSERT INTO `monthlyreport` VALUES ('0000006', 11, 2022, 0.00, 0, -4.00, 0.00, 0.00, 4500000.00, 0.00, 1000000.00, 2500000.00, 200000.00, 100000.00, 700000.00, 0.00, 0.00, 0.00, '2022-12-01 00:01:00', '2022-12-01 00:01:00');
INSERT INTO `monthlyreport` VALUES ('0000007', 9, 2022, 0.00, 0, 0.00, 0.00, 0.00, 5500000.00, NULL, 700000.00, 3500000.00, 200000.00, 400000.00, 700000.00, 0.00, 0.00, 0.00, '2022-11-20 17:17:17', '2022-11-20 17:17:17');
INSERT INTO `monthlyreport` VALUES ('0000007', 10, 2022, 0.00, 0, -4.00, 0.00, 0.00, 4500000.00, 0.00, 1000000.00, 2500000.00, 200000.00, 100000.00, 700000.00, 0.00, 0.00, 0.00, '2022-11-20 17:48:13', '2022-11-01 00:01:00');
INSERT INTO `monthlyreport` VALUES ('0000007', 11, 2022, 0.00, 0, -4.00, 0.00, 0.00, 4500000.00, 0.00, 1000000.00, 2500000.00, 200000.00, 100000.00, 700000.00, 0.00, 0.00, 0.00, '2022-12-01 00:01:00', '2022-12-01 00:01:00');
INSERT INTO `monthlyreport` VALUES ('0000008', 9, 2022, 0.00, 0, 0.00, 0.00, 0.00, 5500000.00, NULL, 700000.00, 3500000.00, 200000.00, 400000.00, 700000.00, 0.00, 0.00, 0.00, '2022-11-20 17:17:17', '2022-11-20 17:17:17');
INSERT INTO `monthlyreport` VALUES ('0000008', 10, 2022, 0.00, 0, -4.00, 0.00, 0.00, 4500000.00, 0.00, 1000000.00, 2500000.00, 200000.00, 100000.00, 700000.00, 0.00, 0.00, 0.00, '2022-11-20 17:48:13', '2022-11-01 00:01:00');
INSERT INTO `monthlyreport` VALUES ('0000008', 11, 2022, 0.00, 0, -4.00, 0.00, 0.00, 4500000.00, 0.00, 1000000.00, 2500000.00, 200000.00, 100000.00, 700000.00, 0.00, 0.00, 0.00, '2022-12-01 00:01:00', '2022-12-01 00:01:00');
INSERT INTO `monthlyreport` VALUES ('0000009', 9, 2022, 0.00, 0, 0.00, 0.00, 0.00, 5500000.00, NULL, 700000.00, 3500000.00, 200000.00, 400000.00, 700000.00, 0.00, 0.00, 0.00, '2022-11-20 17:17:17', '2022-11-20 17:17:17');
INSERT INTO `monthlyreport` VALUES ('0000009', 10, 2022, 0.00, 0, 0.00, 0.00, 0.00, 5500000.00, NULL, 700000.00, 3500000.00, 200000.00, 400000.00, 700000.00, 0.00, 0.00, 0.00, '2022-11-20 17:48:13', '2022-11-20 17:48:13');
INSERT INTO `monthlyreport` VALUES ('0000010', 9, 2022, 0.00, 0, 0.00, 0.00, 0.00, 5500000.00, NULL, 700000.00, 3500000.00, 200000.00, 400000.00, 700000.00, 0.00, 0.00, 0.00, '2022-11-20 17:17:17', '2022-11-20 17:17:17');
INSERT INTO `monthlyreport` VALUES ('0000010', 10, 2022, 0.00, 0, 0.00, 0.00, 0.00, 4500000.00, 0.00, 1000000.00, 2500000.00, 200000.00, 100000.00, 700000.00, 0.00, 0.00, 0.00, '2022-11-20 17:48:13', '2022-11-01 00:01:00');
INSERT INTO `monthlyreport` VALUES ('0000010', 11, 2022, 0.00, 0, 0.00, 0.00, 0.00, 4500000.00, 0.00, 1000000.00, 2500000.00, 200000.00, 100000.00, 700000.00, 0.00, 0.00, 0.00, '2022-12-01 00:01:00', '2022-12-01 00:01:00');
INSERT INTO `monthlyreport` VALUES ('0000011', 9, 2022, 0.00, 0, 0.00, 0.00, 0.00, 5500000.00, NULL, 700000.00, 3500000.00, 200000.00, 400000.00, 700000.00, 0.00, 0.00, 0.00, '2022-11-20 17:17:17', '2022-11-20 17:17:17');
INSERT INTO `monthlyreport` VALUES ('0000011', 10, 2022, 0.00, 0, -5.00, 0.00, 0.00, 4500000.00, 0.00, 1000000.00, 2500000.00, 200000.00, 100000.00, 700000.00, 0.00, 0.00, 0.00, '2022-11-20 17:48:13', '2022-11-01 00:01:00');
INSERT INTO `monthlyreport` VALUES ('0000011', 11, 2022, 0.00, 0, -5.00, 0.00, 0.00, 4500000.00, 0.00, 1000000.00, 2500000.00, 200000.00, 100000.00, 700000.00, 0.00, 0.00, 0.00, '2022-12-01 00:01:00', '2022-12-01 00:01:00');
INSERT INTO `monthlyreport` VALUES ('0000012', 10, 2022, 0.00, 0, -4.00, 0.00, 0.00, 4500000.00, 0.00, 1000000.00, 2500000.00, 200000.00, 100000.00, 700000.00, 0.00, 0.00, 0.00, '2022-11-01 00:01:00', '2022-11-01 00:01:00');
INSERT INTO `monthlyreport` VALUES ('0000012', 11, 2022, 0.00, 0, -4.00, 0.00, 0.00, 4500000.00, 0.00, 1000000.00, 2500000.00, 200000.00, 100000.00, 700000.00, 0.00, 0.00, 0.00, '2022-12-01 00:01:00', '2022-12-01 00:01:00');
INSERT INTO `monthlyreport` VALUES ('0000013', 9, 2022, 0.00, 0, 0.00, 0.00, 0.00, 5500000.00, NULL, 700000.00, 3500000.00, 200000.00, 400000.00, 700000.00, 0.00, 0.00, 0.00, '2022-11-20 17:17:17', '2022-11-20 17:17:17');
INSERT INTO `monthlyreport` VALUES ('0000013', 10, 2022, 0.00, 0, -3.00, 0.00, 0.00, 4500000.00, 100000.00, 1000000.00, 2500000.00, 200000.00, 100000.00, 700000.00, 0.00, 0.00, 0.00, '2022-11-20 17:48:13', '2022-11-01 00:01:00');
INSERT INTO `monthlyreport` VALUES ('0000013', 11, 2022, 0.00, 0, -3.00, 0.00, 0.00, 4500000.00, 100000.00, 1000000.00, 2500000.00, 200000.00, 100000.00, 700000.00, 0.00, 0.00, 0.00, '2022-12-01 00:01:00', '2022-12-01 00:01:00');
INSERT INTO `monthlyreport` VALUES ('0000014', 10, 2022, 0.00, 0, -3.00, 0.00, 0.00, 4500000.00, 100000.00, 1000000.00, 2500000.00, 200000.00, 100000.00, 700000.00, 0.00, 0.00, 0.00, '2022-11-01 00:01:00', '2022-11-01 00:01:00');
INSERT INTO `monthlyreport` VALUES ('0000014', 11, 2022, 0.00, 0, -3.00, 0.00, 0.00, 4500000.00, 100000.00, 1000000.00, 2500000.00, 200000.00, 100000.00, 700000.00, 0.00, 0.00, 0.00, '2022-12-01 00:01:00', '2022-12-01 00:01:00');

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
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of overtime
-- ----------------------------
INSERT INTO `overtime` VALUES (1, '0000001', '0001', '2022-09-27 00:10:10', '2022-09-27 10:10:10', 'hahahahaha', 1, 900000.00, '2022-09-24 17:44:10', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (3, '0000001', '0001', '2022-10-01 08:00:00', '2022-10-01 17:00:00', 'lam them', 2, 0.00, '2022-10-01 18:44:38', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (5, '0000001', '0001', '2022-10-02 05:19:00', '2022-10-02 17:19:00', '42425454', 2, 108000.00, '2022-10-02 17:19:22', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (6, '0000001', '0002', '2022-10-02 05:19:00', '2022-10-02 17:19:00', '42425454', 0, 100000.00, '2022-10-02 17:19:27', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (7, '0000001', '0002', '2022-10-02 05:19:00', '2022-10-02 17:19:00', '42425454', 1, 100000.00, '2022-10-02 17:19:45', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (9, '0000001', '0001', '2022-10-02 12:02:00', '2022-10-04 12:02:00', '123123', 1, 438000.00, '2022-10-02 23:02:18', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (10, '0000003', '0001', '2022-10-03 10:28:00', '2022-10-05 10:28:00', '123', 2, 280000.00, '2022-10-08 09:28:59', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (13, '0000001', '0001', '2022-10-09 01:36:00', '2022-10-09 13:36:00', '123', 2, 108000.00, '2022-10-09 12:37:07', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (14, '0000002', '0001', '2022-10-22 08:00:00', '2022-10-22 17:00:00', 'gfdgdsgfsdgfdsrererere', 1, 810000.00, '2022-10-22 16:01:06', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (17, '0000002', '0002', '2022-10-09 18:00:00', '2022-10-09 21:00:00', '123123', 1, 270000.00, '2022-10-23 17:00:44', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (18, '0000003', '0001', '2022-10-24 18:18:00', '2022-10-24 19:18:00', '123123213', 1, 600000.00, '2022-10-23 17:18:48', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (20, '0000002', '0002', '2022-10-24 20:05:00', '2022-10-24 21:18:00', 'Fix bug', 2, 730000.00, '2022-10-25 20:12:18', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (21, '0000001', '0002', '2022-10-19 22:10:00', '2022-10-19 23:10:00', 'Test xuong hang\nabcdsezxcasd', 1, 100000.00, '2022-11-03 22:10:41', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (22, '0000003', '0001', '2022-11-10 04:26:00', '2022-11-10 18:26:00', 'Chay tien do', 1, 168000.00, '2022-11-04 15:27:05', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (23, '0000001', '0001', '2022-11-29 18:00:00', '2022-11-29 20:00:00', 'Register project feature', 0, 200000.00, '2022-11-27 09:58:43', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (24, '0000001', '0002', '2022-11-28 20:20:00', '2022-11-28 23:30:00', '123', 0, 316666.67, '2022-11-27 11:27:24', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (25, '0000001', '0002', '2022-11-27 18:02:00', '2022-11-27 20:02:00', '114144141', 0, 300000.00, '2022-11-27 18:02:49', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (26, '0000002', '0002', '2022-11-27 18:03:00', '2022-11-27 20:03:00', '444444', 0, 240000.00, '2022-11-27 18:03:43', '0000-00-00 00:00:00');
INSERT INTO `overtime` VALUES (27, '0000002', '0003', '2022-12-05 18:35:00', '2022-12-05 21:35:00', 'Done process excel', 0, 240000.00, '2022-12-06 18:35:01', '0000-00-00 00:00:00');

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
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of overtimepayment
-- ----------------------------
INSERT INTO `overtimepayment` VALUES (1, 2.0, 1.0, 1.5, 2.5, '2022-09-24 17:17:19', '2022-12-03 18:08:44');

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
  `start_date` date NULL DEFAULT current_timestamp,
  `end_date` date NULL DEFAULT current_timestamp,
  `create_at` datetime NOT NULL DEFAULT current_timestamp,
  `update_at` datetime NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES ('0001', 'HRMM', 'UTE', '0000002', '2022-09-24 17:53:44', '2022-10-02', '2022-12-02', '2022-09-24 17:53:44', '2022-12-02 13:51:20');
INSERT INTO `project` VALUES ('0002', 'ABC', 'ADT', '0000003', '2022-09-29 15:44:56', '2022-10-02', '2022-12-02', '2022-09-29 15:44:56', '2022-12-02 13:51:22');
INSERT INTO `project` VALUES ('0003', 'GiGiX', 'AnDT', '0000001', '2022-10-10 00:00:00', '2022-10-02', '2022-12-02', '2022-11-19 08:42:54', '2022-12-13 08:45:11');
INSERT INTO `project` VALUES ('0004', 'NikoKaru', 'ElonMusk', '0000003', '2022-11-27 07:00:00', '2022-10-02', '2022-12-02', '2022-11-27 11:38:50', '2022-12-13 08:45:45');
INSERT INTO `project` VALUES ('0005', 'CarAI', 'Toyota', '0000006', '2022-12-03 07:00:00', '2022-12-03', '2022-12-03', '2022-12-03 12:11:30', '2022-12-13 08:46:08');
INSERT INTO `project` VALUES ('0006', 'ColorWalk', 'UTE', '0000002', '2022-12-05 07:00:00', '2022-12-05', '2022-12-05', '2022-12-05 20:30:37', '2022-12-13 08:47:12');

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
) ENGINE = InnoDB AUTO_INCREMENT = 64 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
INSERT INTO `reportreceiver` VALUES (58, 13, '0000001', '2022-10-25 20:35:57', '2022-10-25 20:35:57');
INSERT INTO `reportreceiver` VALUES (59, 14, '0000002', '2022-11-03 22:12:00', '2022-11-03 22:12:00');
INSERT INTO `reportreceiver` VALUES (60, 15, '0000004', '2022-11-04 15:28:07', '2022-11-04 15:28:07');
INSERT INTO `reportreceiver` VALUES (61, 16, '0000001', '2022-11-19 16:51:15', '2022-11-19 16:51:15');
INSERT INTO `reportreceiver` VALUES (62, 17, '0000001', '2022-11-19 16:52:10', '2022-11-19 16:52:10');
INSERT INTO `reportreceiver` VALUES (63, 17, '0000002', '2022-11-19 16:52:10', '2022-11-19 16:52:10');

-- ----------------------------
-- Table structure for task
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task`  (
  `task_id` int NOT NULL AUTO_INCREMENT,
  `task_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `project_id` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `parent_task_id` int NULL DEFAULT NULL,
  `task_number` int NULL DEFAULT NULL,
  `task_description` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `employee_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `assignee_id` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `priority` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `category_id` int NULL DEFAULT NULL,
  `start_date` date NULL DEFAULT NULL,
  `end_date` date NULL DEFAULT NULL,
  `estimated_hours` float NULL DEFAULT 0,
  `actual_hours` float NULL DEFAULT 0,
  `create_at` datetime NULL DEFAULT current_timestamp,
  `update_at` datetime NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`task_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of task
-- ----------------------------
INSERT INTO `task` VALUES (1, 'Test task update Test task update Test task update Test task update Test task update', '0001', NULL, 1, '<h2>Update Test tast content headaer</h2></br><p>task description</p', '0000001', '0000003', '0', '2', 1, '2022-11-01', '2022-11-27', 0, NULL, '2022-11-05 14:11:24', '2022-12-03 09:00:58');
INSERT INTO `task` VALUES (2, 'Test after update', '0001', 1, 2, '<ul><li>baka sau khi update content</li></ul>', '0000001', '0000002', '0', '2', 3, '2022-11-12', '2022-11-16', 8, 4, '2022-11-05 14:17:55', '2022-12-03 15:38:55');
INSERT INTO `task` VALUES (3, 'task kho', '0001', 6, 3, '<p>some task</p>', '0000001', '0000005', '0', '0', 3, '2022-11-10', '2022-11-10', 0, NULL, '2022-11-05 18:44:24', '2022-12-15 08:43:22');
INSERT INTO `task` VALUES (4, 'task kho', '0001', 1, 4, '<p>some task</p><p><img src=\"data:image/png;base64,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\"></p><p>text duoi anh</p>', '0000001', '0000001', '3', '1', 3, '2022-11-05', '2022-11-09', 0, NULL, '2022-11-05 18:47:15', '2022-12-03 15:39:02');
INSERT INTO `task` VALUES (5, 'Add New Task 002', '0002', NULL, 1, '<p>123123123</p><p><br></p><p><br></p>', '0000001', '0000001', '3', '0', 1, '2022-11-19', '2022-11-19', 0, NULL, '2022-11-19 12:34:29', '2022-12-02 09:17:01');
INSERT INTO `task` VALUES (6, 'New Task add', '0001', NULL, 5, '<p>This is task description \"\"\"\"\"</p><pre class=\"ql-syntax\" spellcheck=\"false\">scs;\nconsole.log(\"a\"\n);\n</pre><p><strong class=\"ql-size-large\"><u>This is underline﻿</u></strong></p>', '0000001', '0000001', '0', '1', 1, '2022-11-19', '2022-11-19', 0, NULL, '2022-11-19 15:13:46', '2022-11-19 16:26:39');
INSERT INTO `task` VALUES (7, '123', '0003', NULL, 1, '<p>123</p>', '0000001', '0000001', '0', '1', 1, '2022-12-08', '2022-12-08', 0, NULL, '2022-11-29 20:30:55', '2022-12-02 13:14:38');
INSERT INTO `task` VALUES (8, '11111111', '0004', NULL, 1, '<h2>Test tast content headaer</h2></br><p>task description</p', '0000001', '0000001', '0', '1', 1, '2022-11-29', '2022-11-29', 0, NULL, '2022-11-29 20:34:17', '2022-12-02 09:16:13');
INSERT INTO `task` VALUES (9, 'task 9', '0002', NULL, 2, '<h2>Test tast content headaer</h2><p><br></p><p>task description</p>', '0000001', '0000001', '0', '1', 1, '2022-11-29', '2022-11-29', 0, NULL, '2022-11-29 20:37:11', '2022-12-02 09:16:17');
INSERT INTO `task` VALUES (10, 'task 1', '0002', 9, 3, '<h2>Test tast content headaer</h2><p><br></p><p>task description</p>', '0000001', '0000001', '0', '1', 1, '2022-11-29', '2022-11-29', 0, NULL, '2022-11-29 20:37:51', '2022-12-02 09:16:43');
INSERT INTO `task` VALUES (11, 'Add New task to test', '0001', NULL, 6, '<p>This is description</p>', '0000001', '0000002', '0', '1', 1, '2022-12-01', '2022-12-01', 0, NULL, '2022-12-01 16:19:33', '2022-12-01 16:19:33');
INSERT INTO `task` VALUES (27, 'fdsa', '0005', NULL, 1, '<p>fdsa</p>', '0000001', '0000006', '0', '1', 1, '2022-12-03', '2022-12-03', 0, NULL, '2022-12-03 12:16:26', '2022-12-03 12:16:26');
INSERT INTO `task` VALUES (28, 'dsadsa', '0005', NULL, 2, '<p>sdfds</p>', '0000001', '0000006', '0', '1', 3, '2022-12-03', '2022-12-03', 0, NULL, '2022-12-03 12:20:36', '2022-12-03 12:20:36');
INSERT INTO `task` VALUES (31, 'fix review', '0001', NULL, 7, '<p>something wrong in abc screen i need to fix</p>', '0000002', '0000002', '0', '1', 3, '2022-12-11', '2022-12-11', 0, NULL, '2022-12-11 10:58:32', '2022-12-11 11:19:21');
INSERT INTO `task` VALUES (32, 'test', '0005', NULL, 3, '<p>123</p>', '0000003', '0000003', '3', '1', 1, '2022-12-11', '2022-12-11', 2, 3, '2022-12-11 11:38:09', '2022-12-11 11:38:22');

-- ----------------------------
-- Table structure for taskattachment
-- ----------------------------
DROP TABLE IF EXISTS `taskattachment`;
CREATE TABLE `taskattachment`  (
  `attachment_id` int NOT NULL AUTO_INCREMENT,
  `task_id` int NOT NULL,
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_at` datetime NULL DEFAULT current_timestamp,
  `update_at` datetime NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`attachment_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of taskattachment
-- ----------------------------
INSERT INTO `taskattachment` VALUES (5, 1, '1668317097341\\PlanHCI.txt', '2022-11-13 12:24:57', '2022-11-13 12:24:57');
INSERT INTO `taskattachment` VALUES (6, 1, '1668317097344\\tổng quát.txt', '2022-11-13 12:24:57', '2022-11-13 12:24:57');
INSERT INTO `taskattachment` VALUES (7, 3, '1668319748716\\activate deactivate conda.png', '2022-11-13 13:09:08', '2022-11-13 13:09:08');
INSERT INTO `taskattachment` VALUES (8, 3, '1668319748935\\cac buoc.txt', '2022-11-13 13:09:08', '2022-11-13 13:09:08');
INSERT INTO `taskattachment` VALUES (9, 3, '1668323313848\\cac buoc - Copy.txt', '2022-11-13 14:08:34', '2022-11-13 14:08:34');
INSERT INTO `taskattachment` VALUES (10, 3, '1668323313851\\activate deactivate conda - Copy.png', '2022-11-13 14:08:34', '2022-11-13 14:08:34');
INSERT INTO `taskattachment` VALUES (35, 2, '1668329422006\\cac buoc - Copy.txt', '2022-11-13 15:50:22', '2022-11-13 15:50:22');
INSERT INTO `taskattachment` VALUES (36, 2, '1668329422007\\cac buoc.txt', '2022-11-13 15:50:22', '2022-11-13 15:50:22');
INSERT INTO `taskattachment` VALUES (37, 6, '1668849767019\\script.sql', '2022-11-19 16:22:47', '2022-11-19 16:22:47');
INSERT INTO `taskattachment` VALUES (41, 31, '1670732942370\\attachment.docx', '2022-12-11 11:29:02', '2022-12-11 11:29:02');

-- ----------------------------
-- Table structure for taskcomment
-- ----------------------------
DROP TABLE IF EXISTS `taskcomment`;
CREATE TABLE `taskcomment`  (
  `taskcomment_id` int NOT NULL AUTO_INCREMENT,
  `task_id` int NOT NULL,
  `employee_id` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `is_edit` tinyint NULL DEFAULT 1,
  `create_at` datetime NULL DEFAULT current_timestamp,
  `update_at` datetime NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`taskcomment_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 123 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of taskcomment
-- ----------------------------
INSERT INTO `taskcomment` VALUES (1, 0, 'sd', 'sdsaczx', 1, '2022-11-05 09:43:49', '2022-11-05 09:45:05');
INSERT INTO `taskcomment` VALUES (5, 1, '0000001', '<p>Title changed</p></br><p>Content changed</p></br><p>Priority changed: Normal → In Progress</p></br><p>Duration change: 2022-11-05 → 2022-11-05</p></br>', 0, '2022-11-05 14:25:53', '2022-11-05 14:25:53');
INSERT INTO `taskcomment` VALUES (6, 1, '0000001', '<p>Duration change: 2022-11-05 → 2022-11-05</p></br>', 0, '2022-11-05 14:26:49', '2022-11-05 14:26:49');
INSERT INTO `taskcomment` VALUES (7, 1, '0000001', '<p>Duration change: 2022-11-05 → 2022-11-05</p></br>', 0, '2022-11-05 14:28:22', '2022-11-05 14:28:22');
INSERT INTO `taskcomment` VALUES (8, 1, '0000001', '<p>Assignee changed</p></br><p>Duration change: 2022-11-05 → 2022-11-05</p></br>', 0, '2022-11-05 14:28:46', '2022-11-05 14:28:46');
INSERT INTO `taskcomment` VALUES (9, 1, '0000001', '<p>Assignee changed</p></br><p>Duration change: 2022-11-05 → 2022-11-05</p></br>', 0, '2022-11-05 14:30:06', '2022-11-05 14:30:06');
INSERT INTO `taskcomment` VALUES (10, 1, '0000001', '<p>Assignee changed</p></br>', 0, '2022-11-05 14:30:28', '2022-11-05 14:30:28');
INSERT INTO `taskcomment` VALUES (11, 1, '0000001', '<p>Assignee changed</p></br><p>Duration change: 2022-10-10 → 2022-11-05</p></br>', 0, '2022-11-05 14:32:09', '2022-11-05 14:32:09');
INSERT INTO `taskcomment` VALUES (14, 4, '0000003', '<p>Status changed: Open → In Progress</p></br>', 0, '2022-11-05 19:02:21', '2022-11-05 19:02:21');
INSERT INTO `taskcomment` VALUES (15, 3, '0000003', '<p>Status changed: Open → Resolved</p></br>', 0, '2022-11-05 19:02:45', '2022-11-05 19:02:45');
INSERT INTO `taskcomment` VALUES (16, 2, '0000001', '<p>Status changed: Open → In Progress</p></br>', 0, '2022-11-06 09:45:24', '2022-11-06 09:45:24');
INSERT INTO `taskcomment` VALUES (17, 2, '0000001', '<p>Status changed: In Progress → Resolved</p></br>', 0, '2022-11-06 09:45:27', '2022-11-06 09:45:27');
INSERT INTO `taskcomment` VALUES (18, 2, '0000002', '<p>Status changed: Resolved → In Progress</p></br>', 0, '2022-11-06 10:10:53', '2022-11-06 10:10:53');
INSERT INTO `taskcomment` VALUES (19, 3, '0000002', '<p>Status changed: Resolved → Closed</p></br>', 0, '2022-11-06 10:10:57', '2022-11-06 10:10:57');
INSERT INTO `taskcomment` VALUES (20, 1, '0000002', '<p>Status changed: Closed → Resolved</p></br>', 0, '2022-11-06 10:10:58', '2022-11-06 10:10:58');
INSERT INTO `taskcomment` VALUES (21, 2, '0000003', '<p>Priority changed: Normal → undefined</p></br><p>Estimated hours changed: 0 → undefined</p></br><p>Estimated hours changed: 0.00 → NaN</p></br>', 0, '2022-11-06 13:08:46', '2022-11-06 13:08:46');
INSERT INTO `taskcomment` VALUES (22, 2, '0000003', '<p>Status changed: In Progress → Open</p></br>', 0, '2022-11-06 13:09:43', '2022-11-06 13:09:43');
INSERT INTO `taskcomment` VALUES (23, 4, '0000003', '<p>Status changed: In Progress → Open</p></br>', 0, '2022-11-06 13:09:59', '2022-11-06 13:09:59');
INSERT INTO `taskcomment` VALUES (24, 1, '0000001', '<p>Status changed: Resolved → Open</p></br>', 0, '2022-11-06 16:08:22', '2022-11-06 16:08:22');
INSERT INTO `taskcomment` VALUES (25, 3, '0000001', '<p>Status changed: Closed → Open</p></br>', 0, '2022-11-06 16:08:23', '2022-11-06 16:08:23');
INSERT INTO `taskcomment` VALUES (26, 2, '0000001', '<p>Status changed: Open → In Progress</p></br>', 0, '2022-11-06 16:15:10', '2022-11-06 16:15:10');
INSERT INTO `taskcomment` VALUES (27, 4, '0000001', '<p>Status changed: Open → In Progress</p></br>', 0, '2022-11-06 16:18:52', '2022-11-06 16:18:52');
INSERT INTO `taskcomment` VALUES (29, 2, '0000001', '<p>Duration change: 2022-11-12 → 2022-11-13</p></br>', 0, '2022-11-12 09:46:40', '2022-11-12 09:46:40');
INSERT INTO `taskcomment` VALUES (30, 2, '0000001', '<p>Duration change: 2022-11-15 → 2022-11-16</p></br>', 0, '2022-11-12 09:47:45', '2022-11-12 09:47:45');
INSERT INTO `taskcomment` VALUES (31, 2, '0000001', '<p>Status changed: In Progress → Resolved</p></br>', 0, '2022-11-12 09:52:22', '2022-11-12 09:52:22');
INSERT INTO `taskcomment` VALUES (32, 2, '0000001', '<p>Duration change: 2022-11-17 → 2022-11-18</p></br>', 0, '2022-11-12 09:53:06', '2022-11-12 09:53:06');
INSERT INTO `taskcomment` VALUES (33, 2, '0000001', '<p>Status changed: Resolved → Open</p></br><p>Duration change: 2022-11-01 → 2022-11-01</p></br>', 0, '2022-11-12 09:56:20', '2022-11-12 09:56:20');
INSERT INTO `taskcomment` VALUES (34, 2, '0000001', '<p>Assignee changed</p></br>', 0, '2022-11-12 10:01:55', '2022-11-12 10:01:55');
INSERT INTO `taskcomment` VALUES (36, 2, '0000001', '<p>Assignee changed</p></br><p>Status changed: Open → Closed</p></br><p>Duration change: 2022-11-12 → 2022-11-12</p></br>', 0, '2022-11-12 10:05:28', '2022-11-12 10:05:28');
INSERT INTO `taskcomment` VALUES (38, 2, '0000001', '<p>Assignee changed</p></br>', 0, '2022-11-12 10:37:51', '2022-11-12 10:37:51');
INSERT INTO `taskcomment` VALUES (43, 4, '0000001', '<p>Assignee changed: Anonymous → Anonymous</p></br>', 0, '2022-11-12 11:45:56', '2022-11-12 11:45:56');
INSERT INTO `taskcomment` VALUES (44, 4, '0000001', '<p>Assignee changed: Anonymous → Anonymous</p></br>', 0, '2022-11-12 11:47:02', '2022-11-12 11:47:02');
INSERT INTO `taskcomment` VALUES (45, 4, '0000001', '<p>Assignee changed: Anonymous → Anonymous</p></br>', 0, '2022-11-12 11:48:11', '2022-11-12 11:48:11');
INSERT INTO `taskcomment` VALUES (46, 1, '0000001', '<p>Assignee changed: Anonymous → Anonymous</p></br><p>Duration change: 2022-10-10 → 2022-11-05</p></br>', 0, '2022-11-12 11:51:18', '2022-11-12 11:51:18');
INSERT INTO `taskcomment` VALUES (47, 1, '0000001', '<p>Assignee changed: Anonymous → Anonymous</p></br>', 0, '2022-11-12 11:51:56', '2022-11-12 11:51:56');
INSERT INTO `taskcomment` VALUES (48, 1, '0000001', '<p>Assignee changed: Le Duc Thang → Duy Wjbu</p></br>', 0, '2022-11-12 11:52:11', '2022-11-12 11:52:11');
INSERT INTO `taskcomment` VALUES (49, 1, '0000001', '<p>Assignee changed: Le Duc Thang → Duy Wjbu</p></br>', 0, '2022-11-12 11:52:21', '2022-11-12 11:52:21');
INSERT INTO `taskcomment` VALUES (50, 1, '0000001', '<p>Assignee changed: Le Duc Thang → Duy Wjbu</p></br>', 0, '2022-11-12 11:52:28', '2022-11-12 11:52:28');
INSERT INTO `taskcomment` VALUES (51, 1, '0000001', '<p>Assignee changed: Duy Wjbu → Duy Wjbu</p></br>', 0, '2022-11-12 11:53:41', '2022-11-12 11:53:41');
INSERT INTO `taskcomment` VALUES (52, 4, '0000001', '<p>Assignee changed: Hao Duc → An Dinh Tuan</p></br>', 0, '2022-11-12 11:55:29', '2022-11-12 11:55:29');
INSERT INTO `taskcomment` VALUES (53, 4, '0000001', '<p>Assignee changed: An Dinh Tuan → Le Duc Thang</p></br>', 0, '2022-11-12 11:59:56', '2022-11-12 11:59:56');
INSERT INTO `taskcomment` VALUES (60, 2, '0000001', '<p>test</p>', 1, '2022-11-12 15:24:55', '2022-11-12 15:24:55');
INSERT INTO `taskcomment` VALUES (61, 2, '0000001', '<p>Content changed</p></br>', 0, '2022-11-12 18:01:01', '2022-11-12 18:01:01');
INSERT INTO `taskcomment` VALUES (62, 2, '0000001', '<p>Title changed</p></br>', 0, '2022-11-12 18:02:31', '2022-11-12 18:02:31');
INSERT INTO `taskcomment` VALUES (63, 2, '0000001', '<p>Content changed</p></br>', 0, '2022-11-12 18:03:01', '2022-11-12 18:03:01');
INSERT INTO `taskcomment` VALUES (64, 2, '0000001', '<p>Status changed: Closed → Open</p></br>', 0, '2022-11-12 18:03:21', '2022-11-12 18:03:21');
INSERT INTO `taskcomment` VALUES (65, 2, '0000001', '<p>Assignee changed: Thang Le Duc → Duy Wjbu</p></br>', 0, '2022-11-12 18:03:34', '2022-11-12 18:03:34');
INSERT INTO `taskcomment` VALUES (66, 2, '0000001', '<p>Priority changed: Normal → Resolved</p></br>', 0, '2022-11-12 18:03:52', '2022-11-12 18:03:52');
INSERT INTO `taskcomment` VALUES (67, 2, '0000001', '<p>Category changed</p></br>', 0, '2022-11-12 18:04:08', '2022-11-12 18:04:08');
INSERT INTO `taskcomment` VALUES (68, 2, '0000001', '<p>Category changed</p></br>', 0, '2022-11-12 18:04:21', '2022-11-12 18:04:21');
INSERT INTO `taskcomment` VALUES (69, 2, '0000001', '<p>Duration change: 2022-11-30 → 2022-11-30</p></br>', 0, '2022-11-12 18:04:38', '2022-11-12 18:04:38');
INSERT INTO `taskcomment` VALUES (70, 2, '0000001', '<p>Estimated hours changed: 0 → 8</p></br><p>Estimated hours changed: 0.00 → 4.00</p></br>', 0, '2022-11-12 18:05:03', '2022-11-12 18:05:03');
INSERT INTO `taskcomment` VALUES (71, 3, '0000001', '<p>Status changed: Open → Closed</p></br>', 0, '2022-11-13 10:27:01', '2022-11-13 10:27:01');
INSERT INTO `taskcomment` VALUES (72, 3, '0000001', '<p>Status changed: Closed → Resolved</p></br>', 0, '2022-11-13 10:27:04', '2022-11-13 10:27:04');
INSERT INTO `taskcomment` VALUES (73, 2, '0000001', '<p>Assignee changed: Duy Wjbu → An Dinh Tuan</p></br>', 0, '2022-11-13 15:26:16', '2022-11-13 15:26:16');
INSERT INTO `taskcomment` VALUES (74, 5, '0000001', '<p>Status changed: Open → In Progress</p></br>', 0, '2022-11-19 12:46:45', '2022-11-19 12:46:45');
INSERT INTO `taskcomment` VALUES (75, 4, '0000001', '<p>Status changed: In Progress → Resolved</p></br>', 0, '2022-11-19 15:05:39', '2022-11-19 15:05:39');
INSERT INTO `taskcomment` VALUES (76, 6, '0000001', '<p>Content changed</p></br>', 0, '2022-11-19 16:14:12', '2022-11-19 16:14:12');
INSERT INTO `taskcomment` VALUES (77, 6, '0000001', '<p>Content changed</p></br>', 0, '2022-11-19 16:16:06', '2022-11-19 16:16:06');
INSERT INTO `taskcomment` VALUES (78, 6, '0000001', '<p>Content changed</p></br>', 0, '2022-11-19 16:16:15', '2022-11-19 16:16:15');
INSERT INTO `taskcomment` VALUES (79, 6, '0000001', '<p>Content changed</p></br>', 0, '2022-11-19 16:19:37', '2022-11-19 16:19:37');
INSERT INTO `taskcomment` VALUES (80, 6, '0000001', '<p>Content changed</p></br>', 0, '2022-11-19 16:21:49', '2022-11-19 16:21:49');
INSERT INTO `taskcomment` VALUES (81, 6, '0000001', '<p>Content changed</p></br>', 0, '2022-11-19 16:24:18', '2022-11-19 16:24:18');
INSERT INTO `taskcomment` VALUES (82, 6, '0000001', '<p>Content changed</p></br>', 0, '2022-11-19 16:24:24', '2022-11-19 16:24:24');
INSERT INTO `taskcomment` VALUES (83, 6, '0000001', '<p>Content changed</p></br>', 0, '2022-11-19 16:24:34', '2022-11-19 16:24:34');
INSERT INTO `taskcomment` VALUES (84, 6, '0000001', '<p>Content changed</p></br>', 0, '2022-11-19 16:24:53', '2022-11-19 16:24:53');
INSERT INTO `taskcomment` VALUES (85, 6, '0000001', '<p>Content changed</p></br>', 0, '2022-11-19 16:25:28', '2022-11-19 16:25:28');
INSERT INTO `taskcomment` VALUES (86, 6, '0000001', '<p>Content changed</p></br>', 0, '2022-11-19 16:26:40', '2022-11-19 16:26:40');
INSERT INTO `taskcomment` VALUES (87, 5, '0000001', '<p>Content changed</p></br>', 0, '2022-11-19 17:07:52', '2022-11-19 17:07:52');
INSERT INTO `taskcomment` VALUES (88, 5, '0000001', '<p>Content changed</p></br>', 0, '2022-11-19 17:15:09', '2022-11-19 17:15:09');
INSERT INTO `taskcomment` VALUES (89, 4, '0000001', '<p>This is an comment</p><p><strong>I closed this task!</strong></p>', 1, '2022-11-19 17:21:05', '2022-11-19 17:21:05');
INSERT INTO `taskcomment` VALUES (90, 4, '0000001', '<p>Status changed: Resolved → Closed</p></br>', 0, '2022-11-19 17:21:05', '2022-11-19 17:21:05');
INSERT INTO `taskcomment` VALUES (92, 3, '0000001', '<p>Laslkdjsoqwe</p>', 1, '2022-11-20 18:19:47', '2022-11-20 18:19:47');
INSERT INTO `taskcomment` VALUES (93, 3, '0000001', '<p>Assignee changed: Duy Wjbu → Hao Duc</p></br>', 0, '2022-11-20 18:19:47', '2022-11-20 18:19:47');
INSERT INTO `taskcomment` VALUES (94, 10, '0000001', '<p>Title changed</p></br><p>Content changed</p></br>', 0, '2022-12-01 15:53:33', '2022-12-01 15:53:33');
INSERT INTO `taskcomment` VALUES (95, 9, '0000001', '<p>Title changed</p></br><p>Content changed</p></br>', 0, '2022-12-01 15:53:42', '2022-12-01 15:53:42');
INSERT INTO `taskcomment` VALUES (96, 7, '0000001', '<p>Duration change: 2022-12-01 → 2022-11-30</p></br>', 0, '2022-12-01 15:56:23', '2022-12-01 15:56:23');
INSERT INTO `taskcomment` VALUES (97, 7, '0000001', '<p>Duration change: 2022-11-29 → 2022-11-30</p></br>', 0, '2022-12-01 15:57:35', '2022-12-01 15:57:35');
INSERT INTO `taskcomment` VALUES (98, 7, '0000001', '<p>Duration change: 2022-12-01 → 2022-11-28</p></br>', 0, '2022-12-01 15:57:45', '2022-12-01 15:57:45');
INSERT INTO `taskcomment` VALUES (99, 7, '0000001', '<p>Duration change: 2022-12-02 → 2022-11-28</p></br>', 0, '2022-12-01 16:02:41', '2022-12-01 16:02:41');
INSERT INTO `taskcomment` VALUES (100, 7, '0000001', '<p>Duration change: 2022-12-01 → 2022-11-28</p></br>', 0, '2022-12-01 16:04:07', '2022-12-01 16:04:07');
INSERT INTO `taskcomment` VALUES (101, 7, '0000001', '<p>Duration change: 2022-12-02 → 2022-12-02</p></br>', 0, '2022-12-01 16:04:58', '2022-12-01 16:04:58');
INSERT INTO `taskcomment` VALUES (102, 5, '0000001', '<p>Status changed: In Progress → Closed</p></br>', 0, '2022-12-02 09:17:01', '2022-12-02 09:17:01');
INSERT INTO `taskcomment` VALUES (103, 7, '0000001', '<p>Duration change: 2022-12-05 → 2022-12-05</p></br>', 0, '2022-12-02 13:13:41', '2022-12-02 13:13:41');
INSERT INTO `taskcomment` VALUES (104, 7, '0000001', '<p>Duration change: 2022-12-05 → 2022-12-07</p></br>', 0, '2022-12-02 13:13:47', '2022-12-02 13:13:47');
INSERT INTO `taskcomment` VALUES (105, 7, '0000001', '<p>Duration change: 2022-12-07 → 2022-12-07</p></br>', 0, '2022-12-02 13:13:56', '2022-12-02 13:13:56');
INSERT INTO `taskcomment` VALUES (106, 7, '0000001', '<p>Duration change: 2022-12-08 → 2022-12-08</p></br>', 0, '2022-12-02 13:14:05', '2022-12-02 13:14:05');
INSERT INTO `taskcomment` VALUES (107, 7, '0000001', '<p>Duration change: 2022-12-06 → 2022-12-08</p></br>', 0, '2022-12-02 13:14:12', '2022-12-02 13:14:12');
INSERT INTO `taskcomment` VALUES (108, 7, '0000001', '<p>Duration change: 2022-12-08 → 2022-12-08</p></br>', 0, '2022-12-02 13:14:38', '2022-12-02 13:14:38');
INSERT INTO `taskcomment` VALUES (109, 1, '0000001', '<p>Duration change: 2022-11-07 → 2022-12-03</p></br>', 0, '2022-12-03 09:00:43', '2022-12-03 09:00:43');
INSERT INTO `taskcomment` VALUES (110, 1, '0000001', '<p>Duration change: 2022-11-01 → 2022-11-27</p></br>', 0, '2022-12-03 09:00:58', '2022-12-03 09:00:58');
INSERT INTO `taskcomment` VALUES (111, 3, '0000001', '<p>Duration change: 2022-11-10 → 2022-11-10</p></br>', 0, '2022-12-03 09:01:10', '2022-12-03 09:01:10');
INSERT INTO `taskcomment` VALUES (113, 2, '0000001', '<p>Duration change: 2022-11-12 → 2022-11-12</p></br>', 0, '2022-12-03 15:38:45', '2022-12-03 15:38:45');
INSERT INTO `taskcomment` VALUES (114, 2, '0000001', '<p>Duration change: 2022-11-12 → 2022-11-16</p></br>', 0, '2022-12-03 15:38:55', '2022-12-03 15:38:55');
INSERT INTO `taskcomment` VALUES (115, 4, '0000001', '<p>Duration change: 2022-11-05 → 2022-11-09</p></br>', 0, '2022-12-03 15:39:02', '2022-12-03 15:39:02');
INSERT INTO `taskcomment` VALUES (116, 3, '0000001', '<p>Status changed: Resolved → In Progress</p></br>', 0, '2022-12-10 11:14:59', '2022-12-10 11:14:59');
INSERT INTO `taskcomment` VALUES (117, 3, '0000001', '<p>Status changed: In Progress → Open</p></br>', 0, '2022-12-10 11:15:01', '2022-12-10 11:15:01');
INSERT INTO `taskcomment` VALUES (118, 31, '0000002', '<p>Content changed</p></br>', 0, '2022-12-11 11:19:21', '2022-12-11 11:19:21');
INSERT INTO `taskcomment` VALUES (119, 31, '0000002', '<p>i fixed it</p>', 1, '2022-12-11 11:22:55', '2022-12-11 11:22:55');
INSERT INTO `taskcomment` VALUES (120, 32, '0000003', '<p>Status changed: Open → Closed</p></br>', 0, '2022-12-11 11:38:22', '2022-12-11 11:38:22');
INSERT INTO `taskcomment` VALUES (121, 3, '0000002', '<p>Content changed</p></br><p>Parent task changed: null → 1</p></br>', 0, '2022-12-15 08:47:22', '2022-12-15 08:47:22');
INSERT INTO `taskcomment` VALUES (122, 3, '0000002', '<p>Parent task changed: 1 → 6</p></br>', 0, '2022-12-15 08:43:22', '2022-12-15 08:43:22');

-- ----------------------------
-- Table structure for workfromhome
-- ----------------------------
DROP TABLE IF EXISTS `workfromhome`;
CREATE TABLE `workfromhome`  (
  `employee_id` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `wfh_date` date NOT NULL,
  `wfh_title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `wfh_description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `wfh_start_time` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `wfh_end_time` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT 0,
  `create_at` datetime NOT NULL DEFAULT current_timestamp,
  `update_at` datetime NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`employee_id`, `wfh_date`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of workfromhome
-- ----------------------------
INSERT INTO `workfromhome` VALUES ('0000001', '2022-10-29', 'test WFH', NULL, '12:00', '15:00', 1, '2022-10-28 15:11:08', '2022-10-28 16:39:03');
INSERT INTO `workfromhome` VALUES ('0000001', '2022-10-31', 'tesssssst', 'fdsfdsfds', '15:00', '15:01', 0, '2022-10-28 16:54:52', '2022-10-29 16:35:59');
INSERT INTO `workfromhome` VALUES ('0000001', '2022-11-08', 'fdsafdas', 'fdsafdasfas', '01:04', '16:20', 1, '2022-10-28 16:51:02', '2022-10-28 16:51:23');
INSERT INTO `workfromhome` VALUES ('0000001', '2022-11-09', 'fdsafdas', 'fdsafdasfas', '01:04', '16:20', 0, '2022-10-28 15:24:53', '2022-10-29 17:07:21');
INSERT INTO `workfromhome` VALUES ('0000001', '2022-11-10', 'fdsafdas', 'fdsafdasfas', '01:04', '16:20', 0, '2022-10-28 15:24:53', '2022-10-29 17:07:19');
INSERT INTO `workfromhome` VALUES ('0000001', '2022-11-11', 'fgdgfsd', 'fdsfdsafdsafdsa', '00:15', '16:19', 0, '2022-10-28 15:26:01', '2022-10-29 17:07:16');
INSERT INTO `workfromhome` VALUES ('0000001', '2022-12-07', 'Bị ho', 'Em bị ho ạ!', '08:30', '17:35', 1, '2022-12-06 18:46:20', '2022-12-10 16:11:50');
INSERT INTO `workfromhome` VALUES ('0000001', '2022-12-08', 'Chăm mẹ ốm', NULL, '08:30', '17:30', 1, '2022-12-06 18:41:57', '2022-12-10 16:11:50');
INSERT INTO `workfromhome` VALUES ('0000001', '2022-12-14', 'Chăm mẹ ốm', NULL, '08:30', '17:30', 1, '2022-12-06 18:41:57', '2022-12-10 16:11:50');
INSERT INTO `workfromhome` VALUES ('0000001', '2022-12-16', 'Đi khám bệnh buổi chiều', 'Em khám bệnh buổi chiều, nên buổi sáng xin phép WFH!', '08:30', '12:30', 1, '2022-12-06 18:48:08', '2022-12-10 16:11:50');
INSERT INTO `workfromhome` VALUES ('0000001', '2022-12-20', 'Chăm mẹ ốm', NULL, '08:30', '17:30', 1, '2022-12-06 18:41:57', '2022-12-10 16:11:50');
INSERT INTO `workfromhome` VALUES ('0000001', '2023-11-10', 'fdsdsfdsf', 'dsadsadsa', '00:59', '17:25', 0, '2022-10-28 15:11:08', '2022-10-29 17:07:17');
INSERT INTO `workfromhome` VALUES ('0000002', '2022-12-12', 'Xin làm việc tại nhà', 'bị ốm nặng không thể lên công ty', '08:00', '17:00', 1, '2022-12-11 10:31:28', '2022-12-11 11:53:37');
INSERT INTO `workfromhome` VALUES ('0000002', '2022-12-13', 'Xin làm việc tại nhà', 'bị ốm nặng không thể lên công ty', '08:00', '17:00', 1, '2022-12-11 10:31:28', '2022-12-13 21:18:36');
INSERT INTO `workfromhome` VALUES ('0000002', '2023-01-02', 'toi muon nghi nhieu hon', 'thich thi nghi', '08:00', '17:00', 1, '2022-10-29 14:54:34', '2022-10-29 16:47:46');
INSERT INTO `workfromhome` VALUES ('0000002', '2023-01-05', 'toi muon nghi nhieu hon', 'thich thi nghi', '08:00', '17:00', 0, '2022-10-29 14:54:34', '2022-10-29 17:07:07');
INSERT INTO `workfromhome` VALUES ('0000002', '2023-01-06', 'toi muon nghi nhieu hon', 'thich thi nghi', '08:00', '17:00', 1, '2022-10-29 14:54:34', '2022-12-10 16:11:50');
INSERT INTO `workfromhome` VALUES ('0000002', '2023-01-10', 'toi muon nghi nhieu hon', 'thich thi nghi', '08:00', '17:00', 1, '2022-10-29 14:54:34', '2022-12-10 16:11:50');
INSERT INTO `workfromhome` VALUES ('0000002', '2023-01-11', 'toi muon nghi nhieu hon', 'thich thi nghi', '08:00', '17:00', 1, '2022-10-29 14:54:34', '2022-12-10 16:11:50');
INSERT INTO `workfromhome` VALUES ('0000002', '2023-01-12', 'toi muon nghi nhieu hon', 'thich thi nghi', '08:00', '17:00', 1, '2022-10-29 14:54:34', '2022-12-10 16:11:50');
INSERT INTO `workfromhome` VALUES ('0000002', '2023-01-13', 'toi muon nghi nhieu hon', 'thich thi nghi', '08:00', '17:00', 1, '2022-10-29 14:54:34', '2022-12-10 16:11:50');
INSERT INTO `workfromhome` VALUES ('0000003', '2022-12-15', '123', '123', '13:05', '21:05', 1, '2022-12-12 22:44:32', '2022-12-13 21:27:05');
INSERT INTO `workfromhome` VALUES ('0000003', '2022-12-20', '123', '123', '13:05', '21:05', 0, '2022-12-12 22:44:32', '2022-12-12 22:44:32');

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
) ENGINE = InnoDB AUTO_INCREMENT = 610 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
INSERT INTO `workhistory` VALUES (370, '0000002', 4, '2022-10-25 19:50:06', 'Update annual holiday by manager - Reset your annual holiday, total: -120000 mins ', '2022-10-25 19:50:06', '2022-10-25 19:50:06');
INSERT INTO `workhistory` VALUES (371, '0000001', 3, '2022-10-25 20:33:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 5.021 to 4.021', '2022-10-25 20:33:00', '2022-10-25 20:33:00');
INSERT INTO `workhistory` VALUES (372, '0000002', 3, '2022-10-25 20:33:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 10.410 to 9.410', '2022-10-25 20:33:00', '2022-10-25 20:33:00');
INSERT INTO `workhistory` VALUES (373, '0000003', 3, '2022-10-25 20:33:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 532.017 to 531.017', '2022-10-25 20:33:00', '2022-10-25 20:33:00');
INSERT INTO `workhistory` VALUES (374, '0000004', 3, '2022-10-25 20:33:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -8.000 to -9.000', '2022-10-25 20:33:00', '2022-10-25 20:33:00');
INSERT INTO `workhistory` VALUES (375, '0000005', 3, '2022-10-25 20:33:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 0.000 to -1.000', '2022-10-25 20:33:00', '2022-10-25 20:33:00');
INSERT INTO `workhistory` VALUES (376, '0000002', 4, '2022-10-21 00:00:00', 'Update by manager:  You forgot checkin, duration: 480 mins ', '2022-10-25 20:44:21', '2022-10-25 20:44:21');
INSERT INTO `workhistory` VALUES (377, '0000001', 3, '2022-10-26 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 4.021 to 3.021', '2022-10-26 18:30:00', '2022-10-26 18:30:00');
INSERT INTO `workhistory` VALUES (378, '0000002', 3, '2022-10-26 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 10.410 to 9.410', '2022-10-26 18:30:00', '2022-10-26 18:30:00');
INSERT INTO `workhistory` VALUES (379, '0000003', 3, '2022-10-26 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 531.017 to 530.017', '2022-10-26 18:30:00', '2022-10-26 18:30:00');
INSERT INTO `workhistory` VALUES (380, '0000004', 3, '2022-10-26 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -9.000 to -10.000', '2022-10-26 18:30:00', '2022-10-26 18:30:00');
INSERT INTO `workhistory` VALUES (381, '0000005', 3, '2022-10-26 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -1.000 to -2.000', '2022-10-26 18:30:00', '2022-10-26 18:30:00');
INSERT INTO `workhistory` VALUES (382, '0000001', 0, '2022-10-29 17:51:55', 'Check in at 2022-10-29, 05:51:55 pm', '2022-10-29 17:51:55', '2022-10-29 17:51:55');
INSERT INTO `workhistory` VALUES (383, '0000001', 1, '2022-10-29 17:52:17', 'Check out at 2022-10-29, 05:52:17 pm', '2022-10-29 17:52:17', '2022-10-29 17:52:17');
INSERT INTO `workhistory` VALUES (384, '0000001', 0, '2022-10-29 17:53:14', 'Check in at 2022-10-29, 05:53:14 pm', '2022-10-29 17:53:14', '2022-10-29 17:53:14');
INSERT INTO `workhistory` VALUES (385, '0000001', 1, '2022-10-29 17:54:02', 'Check out at 2022-10-29, 05:54:02 pm', '2022-10-29 17:54:02', '2022-10-29 17:54:02');
INSERT INTO `workhistory` VALUES (386, '0000001', 0, '2022-10-29 17:57:53', 'Check in at 2022-10-29, 05:57:53 pm', '2022-10-29 17:57:53', '2022-10-29 17:57:53');
INSERT INTO `workhistory` VALUES (387, '0000001', 1, '2022-10-29 18:03:06', 'Check out at 2022-10-29, 06:03:06 pm', '2022-10-29 18:03:06', '2022-10-29 18:03:06');
INSERT INTO `workhistory` VALUES (388, '0000001', 0, '2022-10-29 18:03:23', 'Check in at 2022-10-29, 06:03:23 pm', '2022-10-29 18:03:23', '2022-10-29 18:03:23');
INSERT INTO `workhistory` VALUES (389, '0000001', 1, '2022-10-29 18:03:51', 'Check out at 2022-10-29, 06:03:51 pm', '2022-10-29 18:03:51', '2022-10-29 18:03:51');
INSERT INTO `workhistory` VALUES (390, '0000001', 0, '2022-10-29 18:10:59', 'Check in at 2022-10-29, 06:10:59 pm', '2022-10-29 18:10:59', '2022-10-29 18:10:59');
INSERT INTO `workhistory` VALUES (391, '0000001', 1, '2022-10-29 18:15:51', 'Check out at 2022-10-29, 06:15:51 pm', '2022-10-29 18:15:51', '2022-10-29 18:15:51');
INSERT INTO `workhistory` VALUES (392, '0000001', 0, '2022-10-29 18:17:33', 'Check in at 2022-10-29, 06:17:33 pm', '2022-10-29 18:17:33', '2022-10-29 18:17:33');
INSERT INTO `workhistory` VALUES (393, '0000001', 1, '2022-10-29 18:18:03', 'Check out at 2022-10-29, 06:18:03 pm', '2022-10-29 18:18:03', '2022-10-29 18:18:03');
INSERT INTO `workhistory` VALUES (394, '0000003', 0, '2022-10-30 16:02:53', 'Check in at 2022-10-30, 04:02:53 pm', '2022-10-30 16:02:53', '2022-10-30 16:02:53');
INSERT INTO `workhistory` VALUES (395, '0000002', 0, '2022-11-04 15:15:53', 'Check in at 2022-11-04, 03:15:53 pm', '2022-11-04 15:15:53', '2022-11-04 15:15:53');
INSERT INTO `workhistory` VALUES (396, '0000003', 0, '2022-11-04 15:26:24', 'Check in at 2022-11-04, 03:26:24 pm', '2022-11-04 15:26:24', '2022-11-04 15:26:24');
INSERT INTO `workhistory` VALUES (397, '0000003', 1, '2022-11-04 15:26:35', 'Check out at 2022-11-04, 03:26:35 pm', '2022-11-04 15:26:35', '2022-11-04 15:26:35');
INSERT INTO `workhistory` VALUES (398, '0000001', 0, '2022-11-09 16:52:32', 'Check in at 2022-11-09, 04:52:32 pm', '2022-11-09 16:52:32', '2022-11-09 16:52:32');
INSERT INTO `workhistory` VALUES (399, '0000001', 1, '2022-11-09 16:52:34', 'Check out at 2022-11-09, 04:52:34 pm', '2022-11-09 16:52:34', '2022-11-09 16:52:34');
INSERT INTO `workhistory` VALUES (400, '0000001', 0, '2022-11-09 16:52:37', 'Check in at 2022-11-09, 04:52:37 pm', '2022-11-09 16:52:37', '2022-11-09 16:52:37');
INSERT INTO `workhistory` VALUES (401, '0000001', 1, '2022-11-09 16:52:38', 'Check out at 2022-11-09, 04:52:38 pm', '2022-11-09 16:52:38', '2022-11-09 16:52:38');
INSERT INTO `workhistory` VALUES (402, '0000001', 4, '2022-11-09 17:15:59', 'Update annual holiday by manager - thich thi cho, total: 180 mins ', '2022-11-09 17:15:59', '2022-11-09 17:15:59');
INSERT INTO `workhistory` VALUES (403, '0000001', 4, '2022-11-08 00:00:00', 'Update by manager:  vdsgdsfs, duration: 400 mins ', '2022-11-09 17:16:45', '2022-11-09 17:16:45');
INSERT INTO `workhistory` VALUES (404, '0000001', 3, '2022-11-09 18:30:00', 'AUTO DETECTED - Worked not enough 8 hours - duration: 480 mins', '2022-11-09 18:30:00', '2022-11-09 18:30:00');
INSERT INTO `workhistory` VALUES (405, '0000002', 3, '2022-11-09 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 9.410 to 8.410', '2022-11-09 18:30:00', '2022-11-09 18:30:00');
INSERT INTO `workhistory` VALUES (406, '0000003', 3, '2022-11-09 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 530.017 to 529.017', '2022-11-09 18:30:00', '2022-11-09 18:30:00');
INSERT INTO `workhistory` VALUES (407, '0000004', 3, '2022-11-09 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -10.000 to -11.000', '2022-11-09 18:30:00', '2022-11-09 18:30:00');
INSERT INTO `workhistory` VALUES (408, '0000005', 3, '2022-11-09 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -2.000 to -3.000', '2022-11-09 18:30:00', '2022-11-09 18:30:00');
INSERT INTO `workhistory` VALUES (409, '0000002', 4, '2022-11-11 00:00:00', 'Update by Admin:  Tot lam em, duration: 2 mins ', '2022-11-12 13:59:01', '2022-11-12 13:59:01');
INSERT INTO `workhistory` VALUES (410, '0000002', 4, '2022-11-12 13:59:15', 'Update annual holiday by manager - Ngu qa, total: 2 mins ', '2022-11-12 13:59:15', '2022-11-12 13:59:15');
INSERT INTO `workhistory` VALUES (411, '0000003', 4, '2022-11-12 14:00:33', 'Update annual holiday by manager - 22, total: 2 mins ', '2022-11-12 14:00:33', '2022-11-12 14:00:33');
INSERT INTO `workhistory` VALUES (412, '0000002', 4, '2022-11-12 14:03:03', 'Update annual holiday by manager - tesst, total: 2 mins ', '2022-11-12 14:03:03', '2022-11-12 14:03:03');
INSERT INTO `workhistory` VALUES (413, '0000002', 4, '2022-11-12 14:03:37', 'Update annual holiday by manager - 123, total: 2 mins ', '2022-11-12 14:03:37', '2022-11-12 14:03:37');
INSERT INTO `workhistory` VALUES (414, '0000001', 4, '2022-11-12 14:04:05', 'Update annual holiday by manager - 123, total: 1 mins ', '2022-11-12 14:04:05', '2022-11-12 14:04:05');
INSERT INTO `workhistory` VALUES (415, '0000002', 4, '2022-11-25 17:03:41', 'Update annual holiday by manager - thich thi cho, total: 960 mins ', '2022-11-25 17:03:41', '2022-11-25 17:03:41');
INSERT INTO `workhistory` VALUES (416, '0000002', 4, '2022-11-24 00:00:00', 'Update by Admin:  hom do quen cehckin, duration: 480 mins ', '2022-11-25 17:32:55', '2022-11-25 17:32:55');
INSERT INTO `workhistory` VALUES (417, '0000001', 0, '2022-11-26 16:18:56', 'Check in at 2022-11-26, 04:18:56 pm', '2022-11-26 16:18:56', '2022-11-26 16:18:56');
INSERT INTO `workhistory` VALUES (418, '0000001', 1, '2022-11-26 16:47:24', 'Check out at 2022-11-26, 04:47:24 pm', '2022-11-26 16:47:24', '2022-11-26 16:47:24');
INSERT INTO `workhistory` VALUES (419, '0000001', 0, '2022-11-26 16:48:34', 'Check in at 2022-11-26, 04:48:34 pm', '2022-11-26 16:48:34', '2022-11-26 16:48:34');
INSERT INTO `workhistory` VALUES (420, '0000001', 1, '2022-11-26 16:48:46', 'Check out at 2022-11-26, 04:48:46 pm', '2022-11-26 16:48:46', '2022-11-26 16:48:46');
INSERT INTO `workhistory` VALUES (421, '0000003', 0, '2022-11-26 17:23:56', 'Check in at 2022-11-26, 05:23:56 pm', '2022-11-26 17:23:56', '2022-11-26 17:23:56');
INSERT INTO `workhistory` VALUES (422, '0000001', 4, '2022-12-01 02:00:00', 'Increase paid leave monthly --> Auto increased by system - from 3.23 to 4.23', '2022-12-01 02:00:00', '2022-12-06 18:39:18');
INSERT INTO `workhistory` VALUES (423, '0000002', 2, '2022-12-01 02:00:00', 'Increase paid leave monthly --> Auto increased by system - from 11.42 to 12.42', '2022-12-01 02:00:00', '2022-12-06 18:38:20');
INSERT INTO `workhistory` VALUES (424, '0000003', 2, '2022-12-01 02:00:00', 'Increase paid leave monthly --> Auto increased by system - from 529.02 to 530.02', '2022-12-01 02:00:00', '2022-12-06 18:38:23');
INSERT INTO `workhistory` VALUES (425, '0000004', 2, '2022-12-01 02:00:00', 'Increase paid leave monthly --> Auto increased by system - from -11 to 1', '2022-12-01 02:00:00', '2022-12-06 18:38:24');
INSERT INTO `workhistory` VALUES (426, '0000005', 2, '2022-12-01 02:00:00', 'Increase paid leave monthly --> Auto increased by system - from -3 to 1', '2022-12-01 02:00:00', '2022-12-06 18:38:24');
INSERT INTO `workhistory` VALUES (427, '0000006', 2, '2022-12-01 02:00:00', 'Increase paid leave monthly --> Auto increased by system - from 0 to 1', '2022-12-01 02:00:00', '2022-12-06 18:38:26');
INSERT INTO `workhistory` VALUES (428, '0000007', 2, '2022-12-01 02:00:00', 'Increase paid leave monthly --> Auto increased by system - from 0 to 1', '2022-12-01 02:00:00', '2022-12-06 18:38:27');
INSERT INTO `workhistory` VALUES (429, '0000008', 2, '2022-12-01 02:00:00', 'Increase paid leave monthly --> Auto increased by system - from 0 to 1', '2022-12-01 02:00:00', '2022-12-06 18:38:28');
INSERT INTO `workhistory` VALUES (430, '0000001', 0, '2022-12-05 08:37:18', 'Check in at 2022-12-05, 08:37:18 am', '2022-12-05 08:37:18', '2022-12-05 08:37:18');
INSERT INTO `workhistory` VALUES (431, '0000002', 0, '2022-12-05 08:37:47', 'Check in at 2022-12-05, 08:37:47 am', '2022-12-05 08:37:47', '2022-12-05 08:37:47');
INSERT INTO `workhistory` VALUES (432, '0000002', 1, '2022-12-05 18:29:26', 'Check out at 2022-12-05, 08:38:37 am', '2022-12-05 18:29:26', '2022-12-05 18:29:26');
INSERT INTO `workhistory` VALUES (433, '0000001', 2, '2022-12-05 18:30:00', 'CHECK OUT - Auto check out by BOT', '2022-12-05 18:30:00', '2022-12-05 18:30:00');
INSERT INTO `workhistory` VALUES (434, '0000001', 3, '2022-12-05 18:30:00', 'AUTO DETECTED - Worked not enough 8 hours - duration: 7 mins', '2022-12-05 18:30:00', '2022-12-05 18:30:00');
INSERT INTO `workhistory` VALUES (435, '0000002', 3, '2022-12-05 18:30:00', 'AUTO DETECTED - Worked not enough 8 hours - duration: 479 mins', '2022-12-05 18:30:00', '2022-12-05 18:30:00');
INSERT INTO `workhistory` VALUES (436, '0000003', 3, '2022-12-05 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 530.021 to 529.021', '2022-12-05 18:30:00', '2022-12-05 18:30:00');
INSERT INTO `workhistory` VALUES (437, '0000004', 3, '2022-12-05 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 1.000 to 0.000', '2022-12-05 18:30:00', '2022-12-05 18:30:00');
INSERT INTO `workhistory` VALUES (438, '0000005', 3, '2022-12-05 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 1.000 to 0.000', '2022-12-05 18:30:00', '2022-12-05 18:30:00');
INSERT INTO `workhistory` VALUES (439, '0000006', 3, '2022-12-05 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 1.000 to 0.000', '2022-12-05 18:30:00', '2022-12-05 18:30:00');
INSERT INTO `workhistory` VALUES (440, '0000007', 3, '2022-12-05 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 1.000 to 0.000', '2022-12-05 18:30:00', '2022-12-05 18:30:00');
INSERT INTO `workhistory` VALUES (441, '0000008', 3, '2022-12-05 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 1.000 to 0.000', '2022-12-05 18:30:00', '2022-12-05 18:30:00');
INSERT INTO `workhistory` VALUES (442, '0000011', 3, '2022-12-05 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 0.000 to -1.000', '2022-12-05 18:30:00', '2022-12-05 18:30:00');
INSERT INTO `workhistory` VALUES (443, '0000001', 0, '2022-12-06 08:25:37', 'Check in at 2022-12-06, 08:25:37 am', '2022-12-06 08:25:37', '2022-12-06 08:25:37');
INSERT INTO `workhistory` VALUES (444, '0000002', 0, '2022-12-06 08:25:59', 'Check in at 2022-12-06, 08:25:59 am', '2022-12-06 08:25:59', '2022-12-06 08:25:59');
INSERT INTO `workhistory` VALUES (445, '0000001', 2, '2022-12-06 18:30:00', 'CHECK OUT - Auto check out by BOT', '2022-12-06 18:30:00', '2022-12-06 18:30:00');
INSERT INTO `workhistory` VALUES (447, '0000002', 2, '2022-12-06 18:30:00', 'CHECK OUT - Auto check out by BOT', '2022-12-06 18:30:00', '2022-12-06 18:30:00');
INSERT INTO `workhistory` VALUES (448, '0000002', 3, '2022-12-06 18:30:00', 'AUTO DETECTED - Worked not enough 8 hours - duration: 1 mins', '2022-12-06 18:30:00', '2022-12-06 18:30:00');
INSERT INTO `workhistory` VALUES (449, '0000003', 3, '2022-12-06 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 529.021 to 528.021', '2022-12-06 18:30:00', '2022-12-06 18:30:00');
INSERT INTO `workhistory` VALUES (450, '0000004', 3, '2022-12-06 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 0.000 to -1.000', '2022-12-06 18:30:00', '2022-12-06 18:30:00');
INSERT INTO `workhistory` VALUES (451, '0000005', 3, '2022-12-06 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 0.000 to -1.000', '2022-12-06 18:30:00', '2022-12-06 18:30:00');
INSERT INTO `workhistory` VALUES (452, '0000006', 3, '2022-12-06 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 0.000 to -1.000', '2022-12-06 18:30:00', '2022-12-06 18:30:00');
INSERT INTO `workhistory` VALUES (453, '0000007', 3, '2022-12-06 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 0.000 to -1.000', '2022-12-06 18:30:00', '2022-12-06 18:30:00');
INSERT INTO `workhistory` VALUES (454, '0000008', 3, '2022-12-06 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 0.000 to -1.000', '2022-12-06 18:30:00', '2022-12-06 18:30:00');
INSERT INTO `workhistory` VALUES (455, '0000011', 3, '2022-12-06 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -1.000 to -2.000', '2022-12-06 18:30:00', '2022-12-06 18:30:00');
INSERT INTO `workhistory` VALUES (456, '0000012', 3, '2022-12-06 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 0.000 to -1.000', '2022-12-06 18:30:00', '2022-12-06 18:30:00');
INSERT INTO `workhistory` VALUES (457, '0000001', 0, '2022-12-07 08:25:45', 'Check in at 2022-12-07, 08:25:45 am', '2022-12-07 08:25:45', '2022-12-07 08:25:45');
INSERT INTO `workhistory` VALUES (458, '0000002', 0, '2022-12-07 08:27:20', 'Check in at 2022-12-07, 08:27:20 am', '2022-12-07 08:27:20', '2022-12-07 08:27:20');
INSERT INTO `workhistory` VALUES (459, '0000002', 1, '2022-12-07 12:28:35', 'Check out at 2022-12-07, 12:28:35 pm', '2022-12-07 12:28:35', '2022-12-07 12:28:35');
INSERT INTO `workhistory` VALUES (460, '0000002', 0, '2022-12-07 13:32:35', 'Check in at 2022-12-07, 01:32:35 pm', '2022-12-07 13:32:35', '2022-12-07 13:32:35');
INSERT INTO `workhistory` VALUES (461, '0000001', 2, '2022-12-07 18:30:00', 'CHECK OUT - Auto check out by BOT', '2022-12-07 18:30:00', '2022-12-07 18:30:00');
INSERT INTO `workhistory` VALUES (463, '0000002', 2, '2022-12-07 18:30:00', 'CHECK OUT - Auto check out by BOT', '2022-12-07 18:30:00', '2022-12-07 18:30:00');
INSERT INTO `workhistory` VALUES (464, '0000002', 3, '2022-12-07 18:30:00', 'AUTO DETECTED - Worked not enough 8 hours - duration: 32 mins', '2022-12-07 18:30:00', '2022-12-07 18:30:00');
INSERT INTO `workhistory` VALUES (465, '0000003', 3, '2022-12-07 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 528.021 to 527.021', '2022-12-07 18:30:00', '2022-12-07 18:30:00');
INSERT INTO `workhistory` VALUES (466, '0000004', 3, '2022-12-07 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -1.000 to -2.000', '2022-12-07 18:30:00', '2022-12-07 18:30:00');
INSERT INTO `workhistory` VALUES (467, '0000005', 3, '2022-12-07 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -1.000 to -2.000', '2022-12-07 18:30:00', '2022-12-07 18:30:00');
INSERT INTO `workhistory` VALUES (468, '0000006', 3, '2022-12-07 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -1.000 to -2.000', '2022-12-07 18:30:00', '2022-12-07 18:30:00');
INSERT INTO `workhistory` VALUES (469, '0000007', 3, '2022-12-07 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -1.000 to -2.000', '2022-12-07 18:30:00', '2022-12-07 18:30:00');
INSERT INTO `workhistory` VALUES (470, '0000008', 3, '2022-12-07 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -1.000 to -2.000', '2022-12-07 18:30:00', '2022-12-07 18:30:00');
INSERT INTO `workhistory` VALUES (471, '0000011', 3, '2022-12-07 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -2.000 to -3.000', '2022-12-07 18:30:00', '2022-12-07 18:30:00');
INSERT INTO `workhistory` VALUES (472, '0000012', 3, '2022-12-07 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -1.000 to -2.000', '2022-12-07 18:30:00', '2022-12-07 18:30:00');
INSERT INTO `workhistory` VALUES (473, '0000013', 3, '2022-12-07 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 0.000 to -1.000', '2022-12-07 18:30:00', '2022-12-07 18:30:00');
INSERT INTO `workhistory` VALUES (474, '0000014', 3, '2022-12-07 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 0.000 to -1.000', '2022-12-07 18:30:00', '2022-12-07 18:30:00');
INSERT INTO `workhistory` VALUES (551, '0000001', 0, '2022-12-08 08:55:47', 'Check in at 2022-12-08, 08:55:47 am', '2022-12-08 08:55:47', '2022-12-08 08:55:47');
INSERT INTO `workhistory` VALUES (552, '0000002', 0, '2022-12-08 08:56:00', 'Check in at 2022-12-08, 08:56:00 am', '2022-12-08 08:56:00', '2022-12-08 08:56:00');
INSERT INTO `workhistory` VALUES (553, '0000001', 2, '2022-12-08 18:30:00', 'CHECK OUT - Auto check out by BOT', '2022-12-08 18:30:00', '2022-12-08 18:30:00');
INSERT INTO `workhistory` VALUES (554, '0000001', 3, '2022-12-08 18:30:00', 'AUTO DETECTED - Worked not enough 8 hours - duration: 26 mins', '2022-12-08 18:30:00', '2022-12-08 18:30:00');
INSERT INTO `workhistory` VALUES (555, '0000002', 2, '2022-12-08 18:30:00', 'CHECK OUT - Auto check out by BOT', '2022-12-08 18:30:00', '2022-12-08 18:30:00');
INSERT INTO `workhistory` VALUES (556, '0000002', 3, '2022-12-08 18:30:00', 'AUTO DETECTED - Worked not enough 8 hours - duration: 26 mins', '2022-12-08 18:30:00', '2022-12-08 18:30:00');
INSERT INTO `workhistory` VALUES (557, '0000003', 3, '2022-12-08 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 527.021 to 526.021', '2022-12-08 18:30:00', '2022-12-08 18:30:00');
INSERT INTO `workhistory` VALUES (558, '0000004', 3, '2022-12-08 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -2.000 to -3.000', '2022-12-08 18:30:00', '2022-12-08 18:30:00');
INSERT INTO `workhistory` VALUES (559, '0000005', 3, '2022-12-08 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -2.000 to -3.000', '2022-12-08 18:30:00', '2022-12-08 18:30:00');
INSERT INTO `workhistory` VALUES (560, '0000006', 3, '2022-12-08 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -2.000 to -3.000', '2022-12-08 18:30:00', '2022-12-08 18:30:00');
INSERT INTO `workhistory` VALUES (561, '0000007', 3, '2022-12-08 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -2.000 to -3.000', '2022-12-08 18:30:00', '2022-12-08 18:30:00');
INSERT INTO `workhistory` VALUES (562, '0000008', 3, '2022-12-08 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -2.000 to -3.000', '2022-12-08 18:30:00', '2022-12-08 18:30:00');
INSERT INTO `workhistory` VALUES (563, '0000011', 3, '2022-12-08 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -3.000 to -4.000', '2022-12-08 18:30:00', '2022-12-08 18:30:00');
INSERT INTO `workhistory` VALUES (564, '0000012', 3, '2022-12-08 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -2.000 to -3.000', '2022-12-08 18:30:00', '2022-12-08 18:30:00');
INSERT INTO `workhistory` VALUES (565, '0000013', 3, '2022-12-08 18:30:01', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -1.000 to -2.000', '2022-12-08 18:30:01', '2022-12-08 18:30:01');
INSERT INTO `workhistory` VALUES (566, '0000014', 3, '2022-12-08 18:30:01', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -1.000 to -2.000', '2022-12-08 18:30:01', '2022-12-08 18:30:01');
INSERT INTO `workhistory` VALUES (567, '0000002', 0, '2022-12-09 09:54:32', 'Check in at 2022-12-09, 09:54:32 am', '2022-12-09 09:54:32', '2022-12-09 09:54:32');
INSERT INTO `workhistory` VALUES (568, '0000001', 0, '2022-12-09 09:54:47', 'Check in at 2022-12-09, 09:54:47 am', '2022-12-09 09:54:47', '2022-12-09 09:54:47');
INSERT INTO `workhistory` VALUES (569, '0000001', 2, '2022-12-09 18:30:00', 'CHECK OUT - Auto check out by BOT', '2022-12-09 18:30:00', '2022-12-09 18:30:00');
INSERT INTO `workhistory` VALUES (570, '0000001', 3, '2022-12-09 18:30:00', 'AUTO DETECTED - Worked not enough 8 hours - duration: 85 mins', '2022-12-09 18:30:00', '2022-12-09 18:30:00');
INSERT INTO `workhistory` VALUES (571, '0000002', 2, '2022-12-09 18:30:00', 'CHECK OUT - Auto check out by BOT', '2022-12-09 18:30:00', '2022-12-09 18:30:00');
INSERT INTO `workhistory` VALUES (572, '0000002', 3, '2022-12-09 18:30:00', 'AUTO DETECTED - Worked not enough 8 hours - duration: 85 mins', '2022-12-09 18:30:00', '2022-12-09 18:30:00');
INSERT INTO `workhistory` VALUES (573, '0000003', 3, '2022-12-09 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 526.021 to 525.021', '2022-12-09 18:30:00', '2022-12-09 18:30:00');
INSERT INTO `workhistory` VALUES (574, '0000004', 3, '2022-12-09 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -3.000 to -4.000', '2022-12-09 18:30:00', '2022-12-09 18:30:00');
INSERT INTO `workhistory` VALUES (575, '0000005', 3, '2022-12-09 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -3.000 to -4.000', '2022-12-09 18:30:00', '2022-12-09 18:30:00');
INSERT INTO `workhistory` VALUES (576, '0000006', 3, '2022-12-09 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -3.000 to -4.000', '2022-12-09 18:30:00', '2022-12-09 18:30:00');
INSERT INTO `workhistory` VALUES (577, '0000007', 3, '2022-12-09 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -3.000 to -4.000', '2022-12-09 18:30:00', '2022-12-09 18:30:00');
INSERT INTO `workhistory` VALUES (578, '0000008', 3, '2022-12-09 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -3.000 to -4.000', '2022-12-09 18:30:00', '2022-12-09 18:30:00');
INSERT INTO `workhistory` VALUES (579, '0000011', 3, '2022-12-09 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -4.000 to -5.000', '2022-12-09 18:30:00', '2022-12-09 18:30:00');
INSERT INTO `workhistory` VALUES (580, '0000012', 3, '2022-12-09 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -3.000 to -4.000', '2022-12-09 18:30:00', '2022-12-09 18:30:00');
INSERT INTO `workhistory` VALUES (581, '0000013', 3, '2022-12-09 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -2.000 to -3.000', '2022-12-09 18:30:00', '2022-12-09 18:30:00');
INSERT INTO `workhistory` VALUES (582, '0000014', 3, '2022-12-09 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -2.000 to -3.000', '2022-12-09 18:30:00', '2022-12-09 18:30:00');
INSERT INTO `workhistory` VALUES (583, '0000003', 4, '2022-12-10 16:16:41', 'Update annual holiday by ADMIN - Bug Add Holiday, total: -249600 mins ', '2022-12-10 16:16:41', '2022-12-10 16:16:41');
INSERT INTO `workhistory` VALUES (584, '0000001', 4, '2022-12-09 00:00:00', 'Update by manager:  Forgot check in, duration: 85 mins ', '2022-12-10 17:19:37', '2022-12-10 17:19:37');
INSERT INTO `workhistory` VALUES (585, '0000001', 4, '2022-12-10 17:20:20', 'Update annual holiday by manager - Update holiday, total: 100 mins ', '2022-12-10 17:20:20', '2022-12-10 17:20:20');
INSERT INTO `workhistory` VALUES (586, '0000001', 4, '2022-12-10 00:00:00', 'Update by manager:  thêm giờ làm, duration: 10 mins ', '2022-12-11 12:21:52', '2022-12-11 12:21:52');
INSERT INTO `workhistory` VALUES (587, '0000001', 4, '2022-12-09 00:00:00', 'Update by manager:  fdsafdsa, duration: 9 mins ', '2022-12-11 12:23:35', '2022-12-11 12:23:35');
INSERT INTO `workhistory` VALUES (588, '0000001', 4, '2022-12-09 00:00:00', 'Update by manager:  dư thời gian, duration: -9 mins ', '2022-12-11 12:24:43', '2022-12-11 12:24:43');
INSERT INTO `workhistory` VALUES (589, '0000001', 0, '2022-12-12 08:36:22', 'Check in at 2022-12-12, 08:36:22 am', '2022-12-12 08:36:22', '2022-12-12 08:36:22');
INSERT INTO `workhistory` VALUES (590, '0000001', 1, '2022-12-12 09:08:30', 'Check out at 2022-12-12, 09:08:30 am', '2022-12-12 09:08:30', '2022-12-12 09:08:30');
INSERT INTO `workhistory` VALUES (591, '0000001', 0, '2022-12-12 09:08:50', 'Check in at 2022-12-12, 09:08:50 am', '2022-12-12 09:08:50', '2022-12-12 09:08:50');
INSERT INTO `workhistory` VALUES (592, '0000001', 1, '2022-12-12 09:13:53', 'Check out at 2022-12-12, 09:13:53 am', '2022-12-12 09:13:53', '2022-12-12 09:13:53');
INSERT INTO `workhistory` VALUES (593, '0000001', 0, '2022-12-12 09:14:12', 'Check in at 2022-12-12, 09:14:12 am', '2022-12-12 09:14:12', '2022-12-12 09:14:12');
INSERT INTO `workhistory` VALUES (594, '0000002', 0, '2022-12-12 09:20:37', 'Check in at 2022-12-12, 09:20:37 am', '2022-12-12 09:20:37', '2022-12-12 09:20:37');
INSERT INTO `workhistory` VALUES (595, '0000001', 2, '2022-12-12 18:30:00', 'CHECK OUT - Auto check out by BOT', '2022-12-12 18:30:00', '2022-12-12 18:30:00');
INSERT INTO `workhistory` VALUES (596, '0000001', 3, '2022-12-12 18:30:00', 'AUTO DETECTED - Worked not enough 8 hours - duration: 7 mins', '2022-12-12 18:30:00', '2022-12-12 18:30:00');
INSERT INTO `workhistory` VALUES (597, '0000002', 2, '2022-12-12 18:30:00', 'CHECK OUT - Auto check out by BOT', '2022-12-12 18:30:00', '2022-12-12 18:30:00');
INSERT INTO `workhistory` VALUES (598, '0000002', 3, '2022-12-12 18:30:00', 'AUTO DETECTED - Worked not enough 8 hours - duration: 51 mins', '2022-12-12 18:30:00', '2022-12-12 18:30:00');
INSERT INTO `workhistory` VALUES (599, '0000003', 3, '2022-12-12 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 5.021 to 4.021', '2022-12-12 18:30:00', '2022-12-12 18:30:00');
INSERT INTO `workhistory` VALUES (600, '0000004', 3, '2022-12-12 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -4.000 to -5.000', '2022-12-12 18:30:00', '2022-12-12 18:30:00');
INSERT INTO `workhistory` VALUES (601, '0000005', 3, '2022-12-12 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -4.000 to -5.000', '2022-12-12 18:30:00', '2022-12-12 18:30:00');
INSERT INTO `workhistory` VALUES (602, '0000006', 3, '2022-12-12 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -4.000 to -5.000', '2022-12-12 18:30:00', '2022-12-12 18:30:00');
INSERT INTO `workhistory` VALUES (603, '0000007', 3, '2022-12-12 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -4.000 to -5.000', '2022-12-12 18:30:00', '2022-12-12 18:30:00');
INSERT INTO `workhistory` VALUES (604, '0000008', 3, '2022-12-12 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -4.000 to -5.000', '2022-12-12 18:30:00', '2022-12-12 18:30:00');
INSERT INTO `workhistory` VALUES (605, '0000010', 3, '2022-12-12 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from 0.000 to -1.000', '2022-12-12 18:30:00', '2022-12-12 18:30:00');
INSERT INTO `workhistory` VALUES (606, '0000011', 3, '2022-12-12 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -5.000 to -6.000', '2022-12-12 18:30:00', '2022-12-12 18:30:00');
INSERT INTO `workhistory` VALUES (607, '0000012', 3, '2022-12-12 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -4.000 to -5.000', '2022-12-12 18:30:00', '2022-12-12 18:30:00');
INSERT INTO `workhistory` VALUES (608, '0000013', 3, '2022-12-12 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -3.000 to -4.000', '2022-12-12 18:30:00', '2022-12-12 18:30:00');
INSERT INTO `workhistory` VALUES (609, '0000014', 3, '2022-12-12 18:30:00', 'AUTO DETECTED - You didn\'t come to work, your annual holiday is from -3.000 to -4.000', '2022-12-12 18:30:00', '2022-12-12 18:30:00');

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
  PRIMARY KEY (`worklog_id`) USING BTREE,
  INDEX `employee_id`(`employee_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 258 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
INSERT INTO `worklog` VALUES (163, '0000001', 1, '2022-10-25', 0.0, 1, '2022-10-25 20:33:00', '2022-10-25 20:33:00');
INSERT INTO `worklog` VALUES (164, '0000002', 1, '2022-10-25', 0.0, 1, '2022-10-25 20:33:00', '2022-10-25 20:33:00');
INSERT INTO `worklog` VALUES (165, '0000003', 1, '2022-10-25', 0.0, 1, '2022-10-25 20:33:00', '2022-10-25 20:33:00');
INSERT INTO `worklog` VALUES (166, '0000004', 1, '2022-10-25', 0.0, 1, '2022-10-25 20:33:00', '2022-10-25 20:33:00');
INSERT INTO `worklog` VALUES (167, '0000005', 1, '2022-10-25', 0.0, 1, '2022-10-25 20:33:00', '2022-10-25 20:33:00');
INSERT INTO `worklog` VALUES (168, '0000002', 1, '2022-10-21', 480.0, 0, '2022-10-25 20:44:21', '2022-10-25 20:44:21');
INSERT INTO `worklog` VALUES (169, '0000001', 1, '2022-10-26', 0.0, 1, '2022-10-26 18:30:00', '2022-10-26 18:30:00');
INSERT INTO `worklog` VALUES (170, '0000002', 1, '2022-10-26', 0.0, 1, '2022-10-26 18:30:00', '2022-10-26 18:30:00');
INSERT INTO `worklog` VALUES (171, '0000003', 1, '2022-10-26', 0.0, 1, '2022-10-26 18:30:00', '2022-10-26 18:30:00');
INSERT INTO `worklog` VALUES (172, '0000004', 1, '2022-10-26', 0.0, 1, '2022-10-26 18:30:00', '2022-10-26 18:30:00');
INSERT INTO `worklog` VALUES (173, '0000005', 1, '2022-10-26', 0.0, 1, '2022-10-26 18:30:00', '2022-10-26 18:30:00');
INSERT INTO `worklog` VALUES (174, '0000001', 1, '2022-10-29', 12.0, 0, '2022-10-29 17:51:55', '2022-10-29 18:18:03');
INSERT INTO `worklog` VALUES (175, '0000003', 0, '2022-10-30', 0.0, 0, '2022-10-30 16:02:53', '2022-10-30 16:02:53');
INSERT INTO `worklog` VALUES (176, '0000002', 0, '2022-11-04', 0.0, 0, '2022-11-04 15:15:53', '2022-11-04 15:15:53');
INSERT INTO `worklog` VALUES (177, '0000003', 1, '2022-11-04', 0.0, 0, '2022-11-04 15:26:24', '2022-11-04 15:26:35');
INSERT INTO `worklog` VALUES (178, '0000001', 1, '2022-11-09', 0.0, 0, '2022-11-09 16:52:32', '2022-11-09 16:52:38');
INSERT INTO `worklog` VALUES (179, '0000001', 1, '2022-11-08', 400.0, 0, '2022-11-09 17:16:45', '2022-11-09 17:16:45');
INSERT INTO `worklog` VALUES (180, '0000002', 1, '2022-11-09', 0.0, 1, '2022-11-09 18:30:00', '2022-11-09 18:30:00');
INSERT INTO `worklog` VALUES (181, '0000003', 1, '2022-11-09', 0.0, 1, '2022-11-09 18:30:00', '2022-11-09 18:30:00');
INSERT INTO `worklog` VALUES (182, '0000004', 1, '2022-11-09', 0.0, 1, '2022-11-09 18:30:00', '2022-11-09 18:30:00');
INSERT INTO `worklog` VALUES (183, '0000005', 1, '2022-11-09', 0.0, 1, '2022-11-09 18:30:00', '2022-11-09 18:30:00');
INSERT INTO `worklog` VALUES (184, '0000002', 1, '2022-11-11', 2.0, 0, '2022-11-12 13:59:01', '2022-11-12 13:59:01');
INSERT INTO `worklog` VALUES (185, '0000002', 1, '2022-11-20', 450.0, 0, '2022-11-20 15:28:08', '2022-11-20 15:28:08');
INSERT INTO `worklog` VALUES (186, '0000002', 1, '2022-11-24', 480.0, 0, '2022-11-25 17:32:55', '2022-11-25 17:32:55');
INSERT INTO `worklog` VALUES (187, '0000001', 1, '2022-11-26', 28.0, 0, '2022-11-26 16:18:56', '2022-11-26 16:48:46');
INSERT INTO `worklog` VALUES (188, '0000003', 0, '2022-11-26', 0.0, 0, '2022-11-26 17:23:56', '2022-11-26 17:23:56');
INSERT INTO `worklog` VALUES (189, '0000001', 1, '2022-12-05', 473.0, 0, '2022-12-05 08:37:18', '2022-12-05 18:30:00');
INSERT INTO `worklog` VALUES (190, '0000002', 1, '2022-12-05', 1.0, 0, '2022-12-05 08:37:47', '2022-12-05 18:29:26');
INSERT INTO `worklog` VALUES (191, '0000003', 1, '2022-12-05', 0.0, 0, '2022-12-05 18:30:00', '2022-12-05 19:28:45');
INSERT INTO `worklog` VALUES (192, '0000004', 1, '2022-12-05', 0.0, 0, '2022-12-05 18:30:00', '2022-12-05 19:28:47');
INSERT INTO `worklog` VALUES (193, '0000005', 1, '2022-12-05', 0.0, 0, '2022-12-05 18:30:00', '2022-12-05 19:28:48');
INSERT INTO `worklog` VALUES (194, '0000006', 1, '2022-12-05', 0.0, 1, '2022-12-05 18:30:00', '2022-12-05 18:30:00');
INSERT INTO `worklog` VALUES (195, '0000007', 1, '2022-12-05', 0.0, 1, '2022-12-05 18:30:00', '2022-12-05 18:30:00');
INSERT INTO `worklog` VALUES (196, '0000008', 1, '2022-12-05', 0.0, 1, '2022-12-05 18:30:00', '2022-12-05 18:30:00');
INSERT INTO `worklog` VALUES (197, '0000011', 1, '2022-12-05', 0.0, 0, '2022-12-05 18:30:00', '2022-12-05 19:28:50');
INSERT INTO `worklog` VALUES (198, '0000001', 1, '2022-12-06', 479.0, 0, '2022-12-06 08:25:37', '2022-12-06 18:30:00');
INSERT INTO `worklog` VALUES (199, '0000002', 1, '2022-12-06', 479.0, 0, '2022-12-06 08:25:59', '2022-12-06 18:30:00');
INSERT INTO `worklog` VALUES (200, '0000003', 1, '2022-12-06', 0.0, 1, '2022-12-06 18:30:00', '2022-12-06 18:30:00');
INSERT INTO `worklog` VALUES (201, '0000004', 1, '2022-12-06', 0.0, 1, '2022-12-06 18:30:00', '2022-12-06 18:30:00');
INSERT INTO `worklog` VALUES (202, '0000005', 1, '2022-12-06', 0.0, 1, '2022-12-06 18:30:00', '2022-12-06 18:30:00');
INSERT INTO `worklog` VALUES (203, '0000006', 1, '2022-12-06', 0.0, 1, '2022-12-06 18:30:00', '2022-12-06 18:30:00');
INSERT INTO `worklog` VALUES (204, '0000007', 1, '2022-12-06', 0.0, 1, '2022-12-06 18:30:00', '2022-12-06 18:30:00');
INSERT INTO `worklog` VALUES (205, '0000008', 1, '2022-12-06', 0.0, 1, '2022-12-06 18:30:00', '2022-12-06 18:30:00');
INSERT INTO `worklog` VALUES (206, '0000011', 1, '2022-12-06', 0.0, 1, '2022-12-06 18:30:00', '2022-12-06 18:30:00');
INSERT INTO `worklog` VALUES (207, '0000012', 1, '2022-12-06', 0.0, 1, '2022-12-06 18:30:00', '2022-12-06 18:30:00');
INSERT INTO `worklog` VALUES (208, '0000001', 1, '2022-12-07', 480.0, 0, '2022-12-07 08:25:45', '2022-12-10 11:56:30');
INSERT INTO `worklog` VALUES (209, '0000002', 1, '2022-12-07', 448.0, 0, '2022-12-07 08:27:20', '2022-12-07 18:30:00');
INSERT INTO `worklog` VALUES (210, '0000003', 1, '2022-12-07', 0.0, 1, '2022-12-07 18:30:00', '2022-12-07 18:30:00');
INSERT INTO `worklog` VALUES (211, '0000004', 1, '2022-12-07', 0.0, 1, '2022-12-07 18:30:00', '2022-12-07 18:30:00');
INSERT INTO `worklog` VALUES (212, '0000005', 1, '2022-12-07', 0.0, 1, '2022-12-07 18:30:00', '2022-12-07 18:30:00');
INSERT INTO `worklog` VALUES (213, '0000006', 1, '2022-12-07', 0.0, 1, '2022-12-07 18:30:00', '2022-12-07 18:30:00');
INSERT INTO `worklog` VALUES (214, '0000007', 1, '2022-12-07', 0.0, 1, '2022-12-07 18:30:00', '2022-12-07 18:30:00');
INSERT INTO `worklog` VALUES (215, '0000008', 1, '2022-12-07', 0.0, 1, '2022-12-07 18:30:00', '2022-12-07 18:30:00');
INSERT INTO `worklog` VALUES (216, '0000011', 1, '2022-12-07', 0.0, 1, '2022-12-07 18:30:00', '2022-12-07 18:30:00');
INSERT INTO `worklog` VALUES (217, '0000012', 1, '2022-12-07', 0.0, 1, '2022-12-07 18:30:00', '2022-12-07 18:30:00');
INSERT INTO `worklog` VALUES (218, '0000013', 1, '2022-12-07', 0.0, 1, '2022-12-07 18:30:00', '2022-12-07 18:30:00');
INSERT INTO `worklog` VALUES (219, '0000014', 1, '2022-12-07', 0.0, 1, '2022-12-07 18:30:00', '2022-12-07 18:30:00');
INSERT INTO `worklog` VALUES (220, '0000001', 1, '2022-12-08', 454.0, 0, '2022-12-08 08:55:47', '2022-12-08 18:30:00');
INSERT INTO `worklog` VALUES (221, '0000002', 1, '2022-12-08', 454.0, 0, '2022-12-08 08:56:00', '2022-12-08 18:30:00');
INSERT INTO `worklog` VALUES (222, '0000003', 1, '2022-12-08', 0.0, 1, '2022-12-08 18:30:00', '2022-12-08 18:30:00');
INSERT INTO `worklog` VALUES (223, '0000004', 1, '2022-12-08', 0.0, 1, '2022-12-08 18:30:00', '2022-12-08 18:30:00');
INSERT INTO `worklog` VALUES (224, '0000005', 1, '2022-12-08', 0.0, 1, '2022-12-08 18:30:00', '2022-12-08 18:30:00');
INSERT INTO `worklog` VALUES (225, '0000006', 1, '2022-12-08', 0.0, 1, '2022-12-08 18:30:00', '2022-12-08 18:30:00');
INSERT INTO `worklog` VALUES (226, '0000007', 1, '2022-12-08', 0.0, 1, '2022-12-08 18:30:00', '2022-12-08 18:30:00');
INSERT INTO `worklog` VALUES (227, '0000008', 1, '2022-12-08', 0.0, 1, '2022-12-08 18:30:00', '2022-12-08 18:30:00');
INSERT INTO `worklog` VALUES (228, '0000011', 1, '2022-12-08', 0.0, 1, '2022-12-08 18:30:00', '2022-12-08 18:30:00');
INSERT INTO `worklog` VALUES (229, '0000012', 1, '2022-12-08', 0.0, 1, '2022-12-08 18:30:00', '2022-12-08 18:30:00');
INSERT INTO `worklog` VALUES (230, '0000013', 1, '2022-12-08', 0.0, 1, '2022-12-08 18:30:01', '2022-12-08 18:30:01');
INSERT INTO `worklog` VALUES (231, '0000014', 1, '2022-12-08', 0.0, 1, '2022-12-08 18:30:01', '2022-12-08 18:30:01');
INSERT INTO `worklog` VALUES (232, '0000002', 1, '2022-12-09', 395.0, 0, '2022-12-09 09:54:32', '2022-12-09 18:30:00');
INSERT INTO `worklog` VALUES (233, '0000001', 1, '2022-12-09', 480.0, 0, '2022-12-09 09:54:47', '2022-12-11 12:24:43');
INSERT INTO `worklog` VALUES (234, '0000003', 1, '2022-12-09', 0.0, 1, '2022-12-09 18:30:00', '2022-12-09 18:30:00');
INSERT INTO `worklog` VALUES (235, '0000004', 1, '2022-12-09', 0.0, 1, '2022-12-09 18:30:00', '2022-12-09 18:30:00');
INSERT INTO `worklog` VALUES (236, '0000005', 1, '2022-12-09', 0.0, 1, '2022-12-09 18:30:00', '2022-12-09 18:30:00');
INSERT INTO `worklog` VALUES (237, '0000006', 1, '2022-12-09', 0.0, 1, '2022-12-09 18:30:00', '2022-12-09 18:30:00');
INSERT INTO `worklog` VALUES (238, '0000007', 1, '2022-12-09', 0.0, 1, '2022-12-09 18:30:00', '2022-12-09 18:30:00');
INSERT INTO `worklog` VALUES (239, '0000008', 1, '2022-12-09', 0.0, 1, '2022-12-09 18:30:00', '2022-12-09 18:30:00');
INSERT INTO `worklog` VALUES (240, '0000011', 1, '2022-12-09', 0.0, 1, '2022-12-09 18:30:00', '2022-12-09 18:30:00');
INSERT INTO `worklog` VALUES (241, '0000012', 1, '2022-12-09', 0.0, 1, '2022-12-09 18:30:00', '2022-12-09 18:30:00');
INSERT INTO `worklog` VALUES (242, '0000013', 1, '2022-12-09', 0.0, 1, '2022-12-09 18:30:00', '2022-12-09 18:30:00');
INSERT INTO `worklog` VALUES (243, '0000014', 1, '2022-12-09', 0.0, 1, '2022-12-09 18:30:00', '2022-12-09 18:30:00');
INSERT INTO `worklog` VALUES (244, '0000001', 1, '2022-12-10', 10.0, 0, '2022-12-11 12:21:52', '2022-12-11 12:21:52');
INSERT INTO `worklog` VALUES (245, '0000001', 1, '2022-12-12', 473.0, 0, '2022-12-12 08:36:22', '2022-12-12 18:30:00');
INSERT INTO `worklog` VALUES (246, '0000002', 1, '2022-12-12', 429.0, 0, '2022-12-12 09:20:37', '2022-12-12 18:30:00');
INSERT INTO `worklog` VALUES (247, '0000003', 1, '2022-12-12', 0.0, 1, '2022-12-12 18:30:00', '2022-12-12 18:30:00');
INSERT INTO `worklog` VALUES (248, '0000004', 1, '2022-12-12', 0.0, 1, '2022-12-12 18:30:00', '2022-12-12 18:30:00');
INSERT INTO `worklog` VALUES (249, '0000005', 1, '2022-12-12', 0.0, 1, '2022-12-12 18:30:00', '2022-12-12 18:30:00');
INSERT INTO `worklog` VALUES (250, '0000006', 1, '2022-12-12', 0.0, 1, '2022-12-12 18:30:00', '2022-12-12 18:30:00');
INSERT INTO `worklog` VALUES (251, '0000007', 1, '2022-12-12', 0.0, 1, '2022-12-12 18:30:00', '2022-12-12 18:30:00');
INSERT INTO `worklog` VALUES (252, '0000008', 1, '2022-12-12', 0.0, 1, '2022-12-12 18:30:00', '2022-12-12 18:30:00');
INSERT INTO `worklog` VALUES (253, '0000010', 1, '2022-12-12', 0.0, 1, '2022-12-12 18:30:00', '2022-12-12 18:30:00');
INSERT INTO `worklog` VALUES (254, '0000011', 1, '2022-12-12', 0.0, 1, '2022-12-12 18:30:00', '2022-12-12 18:30:00');
INSERT INTO `worklog` VALUES (255, '0000012', 1, '2022-12-12', 0.0, 1, '2022-12-12 18:30:00', '2022-12-12 18:30:00');
INSERT INTO `worklog` VALUES (256, '0000013', 1, '2022-12-12', 0.0, 1, '2022-12-12 18:30:00', '2022-12-12 18:30:00');
INSERT INTO `worklog` VALUES (257, '0000014', 1, '2022-12-12', 0.0, 1, '2022-12-12 18:30:00', '2022-12-12 18:30:00');

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
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of worktime
-- ----------------------------
INSERT INTO `worktime` VALUES (1, 8, 0, 17, 0, 12, 0, 13, 0, '2022-09-18', '2022-09-18 15:41:37', '2022-09-26 22:10:09');
INSERT INTO `worktime` VALUES (2, 8, 30, 17, 30, 12, 0, 13, 0, '2022-11-15', '2022-09-18 16:57:39', '2022-09-26 22:10:10');
INSERT INTO `worktime` VALUES (5, 8, 0, 17, 0, 11, 30, 12, 30, '2022-12-31', '2022-12-11 14:06:30', '2022-12-11 14:06:30');

SET FOREIGN_KEY_CHECKS = 1;
