
-- ----------------------------
-- Table structure for `wget`
-- ----------------------------
DROP TABLE IF EXISTS `wget`;
CREATE TABLE `wget` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `command` text,
  `description` text,
  `completed` enum('true','false') DEFAULT 'false',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;



-- ----------------------------
-- Table structure for `wget_options`
-- ----------------------------
DROP TABLE IF EXISTS `wget_options`;
CREATE TABLE `wget_options` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_sections` int(11) DEFAULT NULL,
  `name` char(16) DEFAULT NULL,
  `name_full` char(32) DEFAULT NULL,
  `description` text,
  `status` enum('true','false') DEFAULT 'true',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wget_options
-- ----------------------------
INSERT INTO `wget_options` VALUES ('1', '1', 'V', '--version', 'Отобразить версию Wget', 'true');
INSERT INTO `wget_options` VALUES ('2', '1', 'h', '--help', 'После запуска перейти в фоновый режим', 'true');
INSERT INTO `wget_options` VALUES ('3', '1', 'b', '--background', 'Перейти в фоновый режим после запуска. Если файл для сообщений не указан параметром -o, он записывается в wget-log', 'true');
INSERT INTO `wget_options` VALUES ('4', '1', 'e', '--execute=КОМАНДА', 'Выполнить команду в стиле `.wgetrc\'', 'true');
INSERT INTO `wget_options` VALUES ('5', '2', 'o', '--output-file=ФАЙЛ', 'Записывать сообщения в ФАЙЛ.', 'false');
INSERT INTO `wget_options` VALUES ('6', '2', 'a', '--append-output=ФАЙЛ', 'Дописывать сообщения в конец ФАЙЛА', 'false');
INSERT INTO `wget_options` VALUES ('7', '2', 'd', '--debug', 'Отображать сообщения отладки - разная информация, важная для разработчиков Wget', 'true');
INSERT INTO `wget_options` VALUES ('8', '2', 'q', '--quiet', 'Выключить сообщения Wget', 'true');
INSERT INTO `wget_options` VALUES ('9', '2', 'v', '--verbose', 'Включить подробные сообщения, со всеми доступными данными. По умолчанию включено', 'true');
INSERT INTO `wget_options` VALUES ('10', '2', 'nv', '--non-verbose', 'Не подробные сообщения (чтобы выключить сообщения см. -q). Сообщения об ошибках и основная \r\nинформация будут отображаться', 'true');
INSERT INTO `wget_options` VALUES ('11', '2', 'i', '--input-file=file', 'Прочитать URL из file. В этом случае указывать URL в командной строке не требуется. Если URL \r\nуказаны и в командной строке и в file, сначала будут загружены URL из командной строки. file \r\nне обязательно должен иметь формат HTML (но ничего страшного, если это так) -- URL просто \r\nдолжны быть указаны в нём.\r\nЕсли вы укажите --force-html, файл будет прочтён как html. В этом случае могут возникнуть \r\nпроблемы с относительными ссылками. Это можно предотвратить добавлением в него \r\n\"<base href=\"url\">\" или вводом в командной строке --base=url.', 'true');
INSERT INTO `wget_options` VALUES ('12', '2', 'F', '--force-html', 'При чтении URL из файла, включает чтение файла как HTML. Чтобы предотвратить ошибкам, если \r\nфайл HTML является локальным, добавьте \"<base href=\"url\">\" в файл или введите параметр \r\nкомандной строки --base.', 'true');
INSERT INTO `wget_options` VALUES ('13', '2', 'B', '--base=URL', 'При чтении URL из файла (-F), определяет URL, добавляемый к относительным адресам файла, указанного параметром -i.', 'false');
INSERT INTO `wget_options` VALUES ('14', '3', 't', '--tries=ЧИСЛО, --retry-connrefus', 'Установить ЧИСЛО повторных попыток (0 без ограничения). Если retry-connrefused - повторять, даже если в подключении отказано.', 'false');
INSERT INTO `wget_options` VALUES ('15', '3', 'O', '--output-document=ФАЙЛ', 'Записывать документы в ФАЙЛ', 'true');
INSERT INTO `wget_options` VALUES ('16', '3', 'nc', '--no-clobber', 'Если при загрузке сайта связь оборвалась, то укажите этот параметр для продолжения загрузки с места прерывания связи.\r\n\r\nПри запуске Wget без параметров -N, -nc, или -r загрузка одного и того же файла в одну папку приведет к созданию копии файла с именем file.1. Если существует файл и с таким именем, третья копия будет называться file.2 и т.д. При параметре -nc будут выводиться предупреждения об этом.\r\n\r\nПри запуске Wget с параметром -r, но без -N или -nc, новая загрузка сайта приведет к замене уже загруженных файлов. При указании параметра -nc загрузка продолжится с места обрыва и загруженные файлы не будут загружаться заново (если только они не изменились).\r\n\r\nПри запуске Wget с параметром -N, с или без -r, файл будет загружен только если он новее уже существующего, или если размер его не совпадает с имеющейся копией (см. Сравнение по дате). -nc не комбинируется с -N.\r\n\r\nПри указанном параметре -nc файлы с расширениями .html или (вот это просто ужасно) .htm с локальных дисков будут загружаться, как будто бы из интернет. ', 'true');
INSERT INTO `wget_options` VALUES ('17', '3', 'c', '--continue,  --progress=ТИП', 'Возобновление загрузки файла. Используется, если загрузка файла была прервана.', 'false');
INSERT INTO `wget_options` VALUES ('18', '3', 'N', ' --timestamping, --no-use-server', 'Включить сравнение по дате. не загружать повторно файлы, только если они не новее, чем локальные.', 'false');

-- ----------------------------
-- Table structure for `wget_sections`
-- ----------------------------
DROP TABLE IF EXISTS `wget_sections`;
CREATE TABLE `wget_sections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_section` char(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wget_sections
-- ----------------------------
INSERT INTO `wget_sections` VALUES ('1', 'Запуск');
INSERT INTO `wget_sections` VALUES ('2', 'Журналирование и входной файл');
INSERT INTO `wget_sections` VALUES ('3', 'Загрузка');
INSERT INTO `wget_sections` VALUES ('4', 'Каталоги');
INSERT INTO `wget_sections` VALUES ('5', 'Опции HTTP');
INSERT INTO `wget_sections` VALUES ('6', 'Опции HTTPS (SSL/TLS)');
INSERT INTO `wget_sections` VALUES ('7', 'Опции FTP');
INSERT INTO `wget_sections` VALUES ('8', 'Рекурсивная загрузка');
INSERT INTO `wget_sections` VALUES ('9', 'Разрешения/запреты при рекурсии');
