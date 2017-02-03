-- ----------------------------
-- Table structure for `contacts_list`
-- ----------------------------
DROP TABLE IF EXISTS `contacts_list`;
CREATE TABLE `contacts_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `last_name` char(128) DEFAULT NULL,
  `name` char(128) DEFAULT NULL,
  `patronymic_name` char(255) DEFAULT NULL,
  `address` char(255) DEFAULT NULL,
  `telephone` char(16) DEFAULT NULL,
  `url` text,
  `description` text,
  `completed` enum('true','false') DEFAULT 'false',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
