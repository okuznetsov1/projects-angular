-- ----------------------------
-- Table structure for `listtasks`
-- ----------------------------
DROP TABLE IF EXISTS `listtasks`;
CREATE TABLE `listtasks` (
  `id` char(128) NOT NULL,
  `task_name` text,
  `priority_id` char(128) DEFAULT NULL,
  `status_id` char(128) DEFAULT NULL,
  `completed` enum('true','false') DEFAULT 'false',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of listtasks
-- ----------------------------
INSERT INTO `listtasks` VALUES ('18cf6603-b819-4a99-ab43-ac30aa5401cd', 'Тестовая задача №3', '0c4dc671-b202-44a2-bf15-d94773cc1ccd', 'ec1ba83d-ff70-4c1e-82e1-04713e50af88', 'false');
INSERT INTO `listtasks` VALUES ('218ccc60-b7b8-4960-bd9e-a1525dc5bbae', 'Тестовая задача №2', 'bdc26b60-0c93-46ad-8743-ce015ef92ce8', '5aa88228-f0ee-4a37-a8ac-b0375f4058bd', 'false');
INSERT INTO `listtasks` VALUES ('54c54b5a-23cb-46b2-8386-189d0419aa4e', '&quot;Тестовая задача №4&quot;', '0c4dc671-b202-44a2-bf15-d94773cc1ccd', 'ec1ba83d-ff70-4c1e-82e1-04713e50af88', 'false');
INSERT INTO `listtasks` VALUES ('9f433490-32c8-4be5-87f8-9a29d4b7a25b', 'Тестовая задача №1', 'c1a0bbef-d9f7-4c59-b989-b64016d2f72e', '5aa88228-f0ee-4a37-a8ac-b0375f4058bd', 'false');

-- ----------------------------
-- Table structure for `listtasks_priority`
-- ----------------------------
DROP TABLE IF EXISTS `listtasks_priority`;
CREATE TABLE `listtasks_priority` (
  `id` char(128) NOT NULL,
  `priority_name` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of listtasks_priority
-- ----------------------------
INSERT INTO `listtasks_priority` VALUES ('0c4dc671-b202-44a2-bf15-d94773cc1ccd', 'Высокий');
INSERT INTO `listtasks_priority` VALUES ('bdc26b60-0c93-46ad-8743-ce015ef92ce8', 'Средний');
INSERT INTO `listtasks_priority` VALUES ('c1a0bbef-d9f7-4c59-b989-b64016d2f72e', 'Низкий');

-- ----------------------------
-- Table structure for `listtasks_status`
-- ----------------------------
DROP TABLE IF EXISTS `listtasks_status`;
CREATE TABLE `listtasks_status` (
  `id` char(128) NOT NULL,
  `status_name` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of listtasks_status
-- ----------------------------
INSERT INTO `listtasks_status` VALUES ('5aa88228-f0ee-4a37-a8ac-b0375f4058bd', 'Завершена');
INSERT INTO `listtasks_status` VALUES ('ec1ba83d-ff70-4c1e-82e1-04713e50af88', 'В работе');

-- ----------------------------
-- Table structure for `listtasks_tags`
-- ----------------------------
DROP TABLE IF EXISTS `listtasks_tags`;
CREATE TABLE `listtasks_tags` (
  `id` char(128) NOT NULL,
  `listtasks_id` char(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`,`listtasks_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of listtasks_tags
-- ----------------------------
INSERT INTO `listtasks_tags` VALUES ('44b81c7b-e223-4559-be69-1c5796abee78', '54c54b5a-23cb-46b2-8386-189d0419aa4e');
INSERT INTO `listtasks_tags` VALUES ('44b81c7b-e223-4559-be69-1c5796abee78', '9f433490-32c8-4be5-87f8-9a29d4b7a25b');
INSERT INTO `listtasks_tags` VALUES ('9abaf87d-b7f1-42c2-bbb6-fa41b092591a', '18cf6603-b819-4a99-ab43-ac30aa5401cd');
INSERT INTO `listtasks_tags` VALUES ('9abaf87d-b7f1-42c2-bbb6-fa41b092591a', '218ccc60-b7b8-4960-bd9e-a1525dc5bbae');
INSERT INTO `listtasks_tags` VALUES ('d523f1f9-da60-410b-a932-018c08a45b07', '9f433490-32c8-4be5-87f8-9a29d4b7a25b');
INSERT INTO `listtasks_tags` VALUES ('s523f1f9-da60-410b-a932-018c08a45b03', '18cf6603-b819-4a99-ab43-ac30aa5401cd');
INSERT INTO `listtasks_tags` VALUES ('s523f1f9-da60-410b-a932-018c08a45b03', '54c54b5a-23cb-46b2-8386-189d0419aa4e');
INSERT INTO `listtasks_tags` VALUES ('s523f1f9-da60-410b-a932-018c08a45b03', '9f433490-32c8-4be5-87f8-9a29d4b7a25b');

-- ----------------------------
-- Table structure for `listtasks_tags_name`
-- ----------------------------
DROP TABLE IF EXISTS `listtasks_tags_name`;
CREATE TABLE `listtasks_tags_name` (
  `id` char(128) NOT NULL,
  `tag_name` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of listtasks_tags_name
-- ----------------------------
INSERT INTO `listtasks_tags_name` VALUES ('34b81c7b-e223-4559-be69-1c5796abee79', 'Тег 4');
INSERT INTO `listtasks_tags_name` VALUES ('44b81c7b-e223-4559-be69-1c5796abee78', 'Тег 1');
INSERT INTO `listtasks_tags_name` VALUES ('9abaf87d-b7f1-42c2-bbb6-fa41b092591a', 'Тег 2');
INSERT INTO `listtasks_tags_name` VALUES ('d523f1f9-da60-410b-a932-018c08a45b07', 'Тег 3');
INSERT INTO `listtasks_tags_name` VALUES ('s523f1f9-da60-410b-a932-018c08a45b03', 'Тег 5');
