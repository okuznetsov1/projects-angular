-- ----------------------------
-- Table structure for `bookmarks_library`
-- ----------------------------
DROP TABLE IF EXISTS `bookmarks_library`;
CREATE TABLE `bookmarks_library` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` text,
  `description` text,
  `completed` enum('true','false') DEFAULT 'false',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
