
-- ----------------------------
-- Table structure for `tcpdump`
-- ----------------------------
DROP TABLE IF EXISTS `tcpdump`;
CREATE TABLE `tcpdump` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `command` text,
  `description` text,
  `completed` enum('true','false') DEFAULT 'false',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;



-- ----------------------------
-- Table structure for `tcpdump_options`
-- ----------------------------
DROP TABLE IF EXISTS `tcpdump_options`;
CREATE TABLE `tcpdump_options` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_sections` int(11) DEFAULT NULL,
  `name` char(16) DEFAULT NULL,
  `name_full` char(32) DEFAULT NULL,
  `description` text,
  `status` enum('true','false') DEFAULT 'false',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tcpdump_options
-- ----------------------------
INSERT INTO `tcpdump_options` VALUES ('1', '1', '-D', '', 'Список интерфейсов', 'false');
INSERT INTO `tcpdump_options` VALUES ('2', '1', '-n', null, 'Отображает IP-адрес вместо имени хоста.', 'false');
INSERT INTO `tcpdump_options` VALUES ('3', '1', '-s', null, 'Размер пакета. По умолчанию только 96 байт. Если задать -s0 то размер будет не ограничен (cледует использовать для сниффинга данных)', 'false');
INSERT INTO `tcpdump_options` VALUES ('4', '1', '-S', null, 'Позволяет не обрабатывать абсолютные порядковые номера (initial sequence number — ISN) в относительные.', 'false');
INSERT INTO `tcpdump_options` VALUES ('5', '1', '-i', null, 'Указываем интерфейс для работы', 'false');
INSERT INTO `tcpdump_options` VALUES ('6', '1', '-w', null, 'Запись вывода в файл', 'false');
INSERT INTO `tcpdump_options` VALUES ('7', '1', '-q', null, 'Более сокращенный вывод чем по умолчанию', 'false');
INSERT INTO `tcpdump_options` VALUES ('8', '1', '-v', null, 'Вывод подробной информации (TTL; ID; общая длина заголовка, а также его параметры; производит проверку контрольных сумм IP и ICMP-заголовков)', 'false');
INSERT INTO `tcpdump_options` VALUES ('9', '1', '-vv', null, 'Вывод ещё более полной информации, в основном касается NFS и SMB.', 'false');
INSERT INTO `tcpdump_options` VALUES ('10', '1', '-vvv', null, 'Вывод максимально подробной информации.', 'false');
INSERT INTO `tcpdump_options` VALUES ('11', '1', '-A', null, 'Выводить содержимое пакета в текст (ASCII)', 'false');
INSERT INTO `tcpdump_options` VALUES ('12', '1', '-X', null, 'Вывод в 16 ричном и текстовомя (ASCII) значение (со второй X выводит и пакеты канального уровня(arp))', 'false');
INSERT INTO `tcpdump_options` VALUES ('13', '1', '-x', null, 'Делает распечатку пакета в шестнадцатеричной системе, полезно для более детального анализа пакета. Количество отображаемых данных зависит от параметра -s', 'false');
INSERT INTO `tcpdump_options` VALUES ('14', '1', '-xx', null, 'Тоже, что и предыдущий параметр, но включает в себя заголовок канального уровня', 'false');
INSERT INTO `tcpdump_options` VALUES ('15', '1', '-XX', null, 'Тоже, что и предыдущий параметр, но включает заголовок канального уровня.', 'false');
INSERT INTO `tcpdump_options` VALUES ('16', '1', '-t', null, 'Не отображает метку времени в каждой строке.', 'false');
INSERT INTO `tcpdump_options` VALUES ('17', '1', '-tt', null, 'Отображает неформатированную метку времени в каждой строке', 'false');
INSERT INTO `tcpdump_options` VALUES ('18', '1', '-tttt', null, 'Показывает время вместе с датой', 'false');
INSERT INTO `tcpdump_options` VALUES ('19', '1', '-c', null, 'Колличество пакетов после которого програма завершает работу', 'false');
INSERT INTO `tcpdump_options` VALUES ('20', '1', '-p', null, 'Выключить promiscous mode который позволяет слушать пакеты не адресованные этой карте.', 'false');
INSERT INTO `tcpdump_options` VALUES ('21', '1', '-nn', null, 'Не резолвить ip и портОтображает номер порта вместо используемого им протокола', 'false');
INSERT INTO `tcpdump_options` VALUES ('22', '1', '-r', null, 'Этот параметр позволяет tcpdump прочесть трафик из файла, если он был предварительно сохранен параметром -w', 'false');
