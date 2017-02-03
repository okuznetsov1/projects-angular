(function(){

    var app = angular.module('tcpdumpApp', ['lumx']);

    app.controller('TcpdumpController', ['$scope', 'LxNotificationService', '$http', '$log', function($scope, LxNotificationService, $http, $log) {

        $scope.newGenerationCommand = '';
        $scope.tcpdumplists = [];
        $scope.parametrs = '';
        $scope.newNumberPackages = '';
        $scope.newNumberPackagesByte = '';
        $scope.newNetInterface = '';
        $scope.cClass = 0;
        $scope.cNumberPackages = 0;
        $scope.cNumberPackagesByte = 0;
        $scope.newFilters = '';
        
        $http.get('/anguler-tasks-tcpdump2/getData.php')
            .then(function(response) {
                $scope.tcpdumplists = response.data;
            },
            function(err) {
            });
        
        $http.get('/anguler-tasks-tcpdump2/getOptions.php')
            .then(function(response) {
                $scope.selectSections = response.data;
            },
            function(err) {
            });
            
        $scope.notify = function(type,text){
            
                if (type === 'simple')
                {
                    LxNotificationService.notify('Lorem Ipsum');
                }
                else if (type === 'sticky')
                {
                    LxNotificationService.notify('Lorem Ipsum', undefined, true);
                }
                else if (type === 'icon')
                {
                    LxNotificationService.notify('Lorem Ipsum', 'android');
                }
                else if (type === 'color')
                {
                    LxNotificationService.notify('Lorem Ipsum', undefined, false, 'grey');
                }
                else if (type === 'info')
                {
                    LxNotificationService.info('Lorem Ipsum');
                }
                else if (type === 'success')
                {
                    LxNotificationService.success(text);
                }
                else if (type === 'warning')
                {
                    LxNotificationService.warning('Lorem Ipsum');
                }
                else if (type === 'error')
                {
                    LxNotificationService.error(text);
                }
            };

        $scope.newValueTransformer = function(_newValue) {
            return {
                name: _newValue,
                type: 'Unknown'
            };
        };
        $scope.selectModel = {
//            selectedPerson: undefined,
//            selectedPeople: [$scope.selectPeople[2], $scope.selectPeople[4]],
            selectParametrsNotSections: [],
//            selectedParametrsSections: []
//            selectedVegetables: []
        };
            
        $scope.addTcpdumpTask = function() {

            $http.post('/anguler-tasks-tcpdump2/addData.php',{genCommand:$scope.newGenerationCommand, description:$scope.newDescription})
                .then(function(response) {

                    $scope.notify('success','Команда "' + response.data[0].command + '" успешно сгенерирована!');

                    $scope.tcpdumplists.push({
                            id: response.data[0].id,
                            command: response.data[0].command,
                            description: response.data[0].description,
                            completed: response.data[0].completed
                    });

                })
                .catch(function(e) {
                    $log.error(e);
                    //throw e;
                });
        };

	$scope.deleteTcpdumpTask = function (tcpdump) {

            if (''+tcpdump.completed === "true"){
//                $log.info(tcpdump.id);            

                $http.post('/anguler-tasks-tcpdump2/deleteData.php',{id:tcpdump.id})
                    .then(function(response) {
                        
                        $scope.notify('success','Команда "' + tcpdump.command + '" успешно удалена!');
            
                        $scope.tcpdumplists.splice($scope.tcpdumplists.indexOf(tcpdump), 1);

                    })
                    .catch(function(e) {
                        $log.error(e);
                        //throw e;
                    });

            }
            else{
                $scope.notify('error','Нельзя удалить команду "' + tcpdump.command + '", не отмечена чекбоксом!');
            }
            
	};

	$scope.editTcpdumpCommand = function (tcpdump) {
            
            $http.post('/anguler-tasks-tcpdump2/editData.php',{id:tcpdump.id,command:tcpdump.command})
                .then(function(response) {
                    console.log(response.data);
                    $scope.notify('success','Команда "' + tcpdump.command + '" успешно изменена!');
                })
                .catch(function(e) {
                    $log.error(e);
                    //throw e;
                });
            
	};
        
	$scope.editTcpdumpDescription = function (tcpdump) {
            
            $http.post('/anguler-tasks-tcpdump2/editData.php',{id:tcpdump.id,description:tcpdump.description})
                .then(function(response) {
                    console.log(response.data);
                    $scope.notify('success','Команда "' + tcpdump.command + '" успешно изменена!');
                })
                .catch(function(e) {
                    $log.error(e);
                    //throw e;
                });
            
	};
 
        
	$scope.runCommand = function (tcpdump) {

            $scope.notify('success','Функция запуска "' + tcpdump.command + '" в разработке...');            
            
	};
        
	$scope.runGenerate = function () {

            $scope.newGenerationCommand = 'tcpdump';

            for (var item in $scope.selectModel.selectParametrsNotSections) {
                
                if($scope.selectModel.selectParametrsNotSections[item]['name'] === '-i'){
                    $scope.newGenerationCommand += ' ' + $scope.selectModel.selectParametrsNotSections[item]['name'] + ' ' + $scope.newNetInterface;
                }
                else if($scope.selectModel.selectParametrsNotSections[item]['name'] === '-c'){
                    $scope.newGenerationCommand += ' ' + $scope.selectModel.selectParametrsNotSections[item]['name'] + ' ' + $scope.newNumberPackages;
                }
                else if($scope.selectModel.selectParametrsNotSections[item]['name'] === '-s'){
                    $scope.newGenerationCommand += ' ' + $scope.selectModel.selectParametrsNotSections[item]['name'] + ' ' + $scope.newNumberPackagesByte;
                }
                else{
                    $scope.newGenerationCommand += ' ' + $scope.selectModel.selectParametrsNotSections[item]['name'];
                }

            }
            
//            $scope.newGenerationCommand = $scope.selectModel.selectParametrsNotSections[2]['name'];
            $scope.newGenerationCommand += ' ' + $scope.newFilters;

            $scope.notify('success','Команда ' + $scope.newGenerationCommand + 'успешно сгенерированна');            
            
	};
        
        
	$scope.test = function () {

            var len = $scope.sizeOf($scope.selectModel.selectParametrsNotSections);

            if(len > 0){

                for (var item in $scope.selectModel.selectParametrsNotSections) {

                        if($scope.cClass == 0 && $scope.selectModel.selectParametrsNotSections[item]['name'] === '-i'){
                            $scope.cClass = 1;
                        }
                        if($scope.cNumberPackages == 0 && $scope.selectModel.selectParametrsNotSections[item]['name'] === '-c'){
                            $scope.cNumberPackages = 2;
                        }
                        if($scope.cNumberPackagesByte == 0 && $scope.selectModel.selectParametrsNotSections[item]['name'] === '-s'){
                            $scope.cNumberPackagesByte = 3;
                        }

                }

            }
            else{
                $scope.cClass = 0;    
                $scope.cNumberPackages = 0;    
                $scope.cNumberPackagesByte = 0;    
            }

	};


        $scope.sizeOf = function(obj) {
            return Object.keys(obj).length;
        };

	$scope.markAll = function (completed) {

		$scope.tcpdumplists.forEach(function (tcpdump) {
                    
                    tcpdump.completed = completed;
                    
		});

	};

//        $scope.selectNotSections = [
//            {
//                uid: '1',
//                name: '-V',
//                name_full: '--version',
//                description: 'Отобразить версию Wget'
//            },
//            {
//                uid: '2',
//                name: '-h',
//                name_full: '--help',
//                description: 'После запуска перейти в фоновый режим'
//
//            },
//            {
//                uid: '3',
//                name: '-b',
//                name_full: '--background',
//                description: 'Перейти в фоновый режим после запуска. Если файл для сообщений не указан параметром -o, он записывается в wget-log'
//            },
//            {
//                uid: '5',
//                name: '-o',
//                name_full: '--output-file=ФАЙЛ',
//                description: 'Записывать сообщения в ФАЙЛ'
//            },
//            {
//                uid: '6',
//                name: '-a',
//                name_full: '--append-output=ФАЙЛ',
//                description: 'Дописывать сообщения в конец ФАЙЛА'
//            },
//            {
//                uid: '14',
//                name: '-t',
//                name_full: '--tries=ЧИСЛО, --retry-connrefus',
//                description: 'Установить ЧИСЛО повторных попыток (0 без ограничения). Если retry-connrefused - повторять, даже если в подключении отказано.'
//            },
//            {
//                uid: '17',
//                name: '-c',
//                name_full: '--continue',
//                description: 'Возобновление загрузки файла. Используется, если загрузка файла была прервана.'
//            },
//            {
//                uid: '18',
//                name: '-N',
//                name_full: ' --timestamping, --no-use-server',
//                description: 'Включить сравнение по дате. Файл будет загружен только если он новее уже существующего, или если размер его не совпадает с имеющейся копией.'
//            }];
        
//        $scope.selectSections = {
//
//		"\u041a\u043b\u044e\u0447\u0438" : [{
//				"id" : "1",
//				"id_sections" : "1",
//				"name" : "-D",
//				"name_full" : "",
//				"description" : "\u0421\u043f\u0438\u0441\u043e\u043a \u0438\u043d\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u043e\u0432",
//				"status" : "false"
//			}, {
//				"id" : "2",
//				"id_sections" : "1",
//				"name" : "-n",
//				"name_full" : null,
//				"description" : "\u041d\u0435 \u043f\u0440\u0435\u043e\u0431\u0440\u0430\u0437\u043e\u0432\u044b\u0432\u0430\u0442\u044c ip \u0438 \u043f\u043e\u0440\u0442 \u0432 \u0438\u043c\u044f",
//				"status" : "false"
//			}, {
//				"id" : "3",
//				"id_sections" : "1",
//				"name" : "-s",
//				"name_full" : null,
//				"description" : "\u0440\u0430\u0437\u043c\u0435\u0440 \u043f\u0430\u043a\u0435\u0442\u0430. \u041f\u043e \u0443\u043c\u043e\u043b\u0447\u0430\u043d\u0438\u044e \u0442\u043e\u043b\u044c\u043a\u043e 96 \u0431\u0430\u0439\u0442. \u0415\u0441\u043b\u0438 \u0437\u0430\u0434\u0430\u0442\u044c -s0 \u0442\u043e \u0440\u0430\u0437\u043c\u0435\u0440 \u0431\u0443\u0434\u0435\u0442 \u043d\u0435 \u043e\u0433\u0440\u0430\u043d\u0438\u0447\u0435\u043d (\u0421\u043b\u0435\u0434\u0443\u0435\u0442 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c \u0434\u043b\u044f \u0441\u043d\u0438\u0444\u0444\u0438\u043d\u0433\u0430 \u0434\u0430\u043d\u043d\u044b\u0445)",
//				"status" : "false"
//			}, {
//				"id" : "4",
//				"id_sections" : "1",
//				"name" : "-i",
//				"name_full" : null,
//				"description" : "\u0423\u043a\u0430\u0437\u044b\u0432\u0430\u0435\u043c \u0438\u043d\u0442\u0435\u0440\u0444\u0435\u0439\u0441 \u0434\u043b\u044f \u0440\u0430\u0431\u043e\u0442\u044b",
//				"status" : "false"
//			}, {
//				"id" : "5",
//				"id_sections" : "1",
//				"name" : "-w",
//				"name_full" : null,
//				"description" : "\u0417\u0430\u043f\u0438\u0441\u044c \u0432\u044b\u0432\u043e\u0434\u0430 \u0432 \u0444\u0430\u0439\u043b",
//				"status" : "false"
//			}, {
//				"id" : "6",
//				"id_sections" : "1",
//				"name" : "-q",
//				"name_full" : null,
//				"description" : "\u0411\u043e\u043b\u0435\u0435 \u0441\u043e\u043a\u0440\u0430\u0449\u0435\u043d\u043d\u044b\u0439 \u0432\u044b\u0432\u043e\u0434 \u0447\u0435\u043c \u043f\u043e \u0443\u043c\u043e\u043b\u0447\u0430\u043d\u0438\u044e",
//				"status" : "false"
//			}, {
//				"id" : "7",
//				"id_sections" : "1",
//				"name" : "-v",
//				"name_full" : null,
//				"description" : "\u0411\u043e\u043b\u0435\u0435 \u043f\u043e\u0434\u0440\u043e\u0431\u043d\u044b\u0439 \u0432\u044b\u0432\u043e\u0434 (\u0434\u043e 3\u0445 -vvv)",
//				"status" : "false"
//			}, {
//				"id" : "50",
//				"id_sections" : "1",
//				"name" : "-vv",
//				"name_full" : null,
//				"description" : "Вывод ещё более полной информации, в основном касается NFS и SMB.",
//				"status" : "false"
//			}, {
//				"id" : "51",
//				"id_sections" : "1",
//				"name" : "-vvv",
//				"name_full" : null,
//				"description" : "Вывод максимально подробной информации.",
//				"status" : "false"
//			}, {
//				"id" : "8",
//				"id_sections" : "1",
//				"name" : "-A",
//				"name_full" : null,
//				"description" : "\u0412\u044b\u0432\u043e\u0434\u0438\u0442\u044c \u0441\u043e\u0434\u0435\u0440\u0436\u0438\u043c\u043e\u0435 \u043f\u0430\u043a\u0435\u0442\u0430 \u0432 \u0442\u0435\u043a\u0441\u0442 (ASCII)",
//				"status" : "false"
//			}, {
//				"id" : "10",
//				"id_sections" : "1",
//				"name" : "-X",
//				"name_full" : null,
//				"description" : "\u0412\u044b\u0432\u043e\u0434 \u0432 16 \u0440\u0438\u0447\u043d\u043e\u043c \u0438 \u0442\u0435\u043a\u0441\u0442\u043e\u0432\u043e\u043c\u044f (ASCII) \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435 (\u0441\u043e \u0432\u0442\u043e\u0440\u043e\u0439 X \u0432\u044b\u0432\u043e\u0434\u0438\u0442 \u0438 \u043f\u0430\u043a\u0435\u0442\u044b \u043a\u0430\u043d\u0430\u043b\u044c\u043d\u043e\u0433\u043e \u0443\u0440\u043e\u0432\u043d\u044f(arp))",
//				"status" : "false"
//			}, {
//				"id" : "9",
//				"id_sections" : "1",
//				"name" : "-x",
//				"name_full" : null,
//				"description" : "Делает распечатку пакета в шестнадцатеричной системе, полезно для более детального анализа пакета. Количество отображаемых данных зависит от параметра -s",
//				"status" : "false"
//			}, {
//				"id" : "48",
//				"id_sections" : "1",
//				"name" : "-xx",
//				"name_full" : null,
//				"description" : "Тоже, что и предыдущий параметр, но включает в себя заголовок канального уровня",
//				"status" : "false"
//			}, {
//				"id" : "49",
//				"id_sections" : "1",
//				"name" : "-XX",
//				"name_full" : null,
//				"description" : "Тоже, что и предыдущий параметр, но включает заголовок канального уровня.",
//				"status" : "false"
//			}, {
//				"id" : "11",
//				"id_sections" : "1",
//				"name" : "-t",
//				"name_full" : null,
//				"description" : "Не отображает метку времени в каждой строке.",
//				"status" : "false"
//			}, {
//				"id" : "44",
//				"id_sections" : "1",
//				"name" : "-tt",
//				"name_full" : null,
//				"description" : "Отображает неформатированную метку времени в каждой строке.",
//				"status" : "false"
//			}, {
//				"id" : "45",
//				"id_sections" : "1",
//				"name" : "-tttt",
//				"name_full" : null,
//				"description" : "Показывает время вместе с датой",
//				"status" : "false"
//			}, {
//				"id" : "12",
//				"id_sections" : "1",
//				"name" : "-c",
//				"name_full" : null,
//				"description" : "Колличество пакетов после которого програма завершает работу",
//				"status" : "false"
//			}, {
//				"id" : "13",
//				"id_sections" : "1",
//				"name" : "-p",
//				"name_full" : null,
//				"description" : "\u0412\u044b\u043a\u043b\u044e\u0447\u0438\u0442\u044c promiscous mode \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u043f\u043e\u0437\u0432\u043e\u043b\u044f\u0435\u0442 \u0441\u043b\u0443\u0448\u0430\u0442\u044c \u043f\u0430\u043a\u0435\u0442\u044b \u043d\u0435 \u0430\u0434\u0440\u0435\u0441\u043e\u0432\u0430\u043d\u043d\u044b\u0435 \u044d\u0442\u043e\u0439 \u043a\u0430\u0440\u0442\u0435.",
//				"status" : "false"
//			}, {
//				"id" : "46",
//				"id_sections" : "1",
//				"name" : "-n",
//				"name_full" : null,
//				"description" : "Отображает IP-адрес вместо имени хоста.",
//				"status" : "false"
//			}, {
//				"id" : "14",
//				"id_sections" : "1",
//				"name" : "-nn",
//				"name_full" : null,
//				"description" : "Отображает номер порта вместо используемого им протокола",
//				"status" : "false"
//			},{
//				"id" : "47",
//				"id_sections" : "1",
//				"name" : "-r",
//				"name_full" : null,
//				"description" : "Этот параметр позволяет tcpdump прочесть трафик из файла, если он был предварительно сохранен параметром -w",
//				"status" : "false"
//			}
//		],
//		
//		"\u0422\u0438\u043f\u044b" : [{
//				"id" : "15",
//				"id_sections" : "2",
//				"name" : "host",
//				"name_full" : null,
//				"description" : "\u0423\u0437\u0435\u043b (\u0442\u0438\u043f \u043f\u043e \u0443\u043c\u043e\u043b\u0447\u0430\u043d\u0438\u044e, \u0435\u0441\u043b\u0438 \u0442\u0438\u043f \u043d\u0435 \u0437\u0430\u0434\u0430\u043d, \u043f\u0440\u0435\u0434\u043f\u043e\u043b\u0430\u0433\u0430\u0435\u0442\u0441\u044f \u0447\u0442\u043e \u044d\u0442\u043e host)",
//				"status" : "false"
//			}, {
//				"id" : "16",
//				"id_sections" : "2",
//				"name" : "net",
//				"name_full" : null,
//				"description" : "\u0421\u0435\u0442\u044c",
//				"status" : "false"
//			}, {
//				"id" : "17",
//				"id_sections" : "2",
//				"name" : "port",
//				"name_full" : null,
//				"description" : "\u041f\u043e\u0440\u0442",
//				"status" : "false"
//			}, {
//				"id" : "18",
//				"id_sections" : "2",
//				"name" : "portrange",
//				"name_full" : null,
//				"description" : null,
//				"status" : "false"
//			}
//		],
//		
//		"\u041d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435" : [{
//				"id" : "19",
//				"id_sections" : "3",
//				"name" : "src",
//				"name_full" : null,
//				"description" : "\u041d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u043f\u043e \u043e\u0442\u043d\u043e\u0448\u0435\u043d\u0438\u044e \u043a \u043e\u0431\u044a\u0435\u043a\u0442\u0443. \u0412 \u0434\u0430\u043d\u043d\u043e\u043c \u0441\u043b\u0443\u0447\u0430\u0435 \u043e\u0431\u044a\u0435\u043a\u0442 \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u0435\u043b\u0435\u043c",
//				"status" : "false"
//			}, {
//				"id" : "20",
//				"id_sections" : "3",
//				"name" : "dst",
//				"name_full" : null,
//				"description" : "\u041d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u043f\u043e \u043e\u0442\u043d\u043e\u0448\u0435\u043d\u0438\u044e \u043a \u043e\u0431\u044a\u0435\u043a\u0442\u0443. \u0412 \u0434\u0430\u043d\u043d\u043e\u043c \u0441\u043b\u0443\u0447\u0430\u0435 \u043e\u0431\u044a\u0435\u043a\u0442 \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u043f\u043e\u043b\u0443\u0447\u0430\u0442\u0435\u043b\u0435\u043c",
//				"status" : "false"
//			}, {
//				"id" : "40",
//				"id_sections" : "3",
//				"name" : "dst port",
//				"name_full" : null,
//				"description" : "",
//				"status" : "false"
//			}, {
//				"id" : "41",
//				"id_sections" : "3",
//				"name" : "dst host",
//				"name_full" : null,
//				"description" : "",
//				"status" : "false"
//			}, {
//				"id" : "42",
//				"id_sections" : "3",
//				"name" : "src port",
//				"name_full" : null,
//				"description" : "",
//				"status" : "false"
//			}, {
//				"id" : "43",
//				"id_sections" : "3",
//				"name" : "src host",
//				"name_full" : null,
//				"description" : "",
//				"status" : "false"
//			}
//		],
//		
//		"\u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b" : [{
//				"id" : "21",
//				"id_sections" : "4",
//				"name" : "tcp",
//				"name_full" : null,
//				"description" : "\u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b TCP",
//				"status" : "false"
//			}, {
//				"id" : "22",
//				"id_sections" : "4",
//				"name" : "udp",
//				"name_full" : null,
//				"description" : "\u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b UDP",
//				"status" : "false"
//			}, {
//				"id" : "23",
//				"id_sections" : "4",
//				"name" : "ip",
//				"name_full" : null,
//				"description" : "\u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b IPv4",
//				"status" : "false"
//			}, {
//				"id" : "24",
//				"id_sections" : "4",
//				"name" : "icmp",
//				"name_full" : null,
//				"description" : "\u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b \u043c\u0435\u0436\u0441\u0435\u0442\u0435\u0432\u044b\u0445 \u0443\u043f\u0440\u0430\u0432\u043b\u044f\u044e\u0449\u0438\u0445 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0439) \u2014 \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u0432\u0441\u043f\u043e\u043c\u043e\u0433\u0430\u0442\u0435\u043b\u044c\u043d\u044b\u043c \u0441\u0435\u0442\u0435\u0432\u044b\u043c \u043f\u0440\u043e\u0442\u043e\u043a\u043e\u043b\u043e\u043c, \u0432\u043a\u043b\u044e\u0447\u0435\u043d\u043d\u044b\u043c \u0432 \u0441\u0442\u0435\u043a \u043f\u0440\u043e\u0442\u043e\u043a\u043e\u043b\u043e\u0432 TCP\/IP.",
//				"status" : "false"
//			}, {
//				"id" : "25",
//				"id_sections" : "4",
//				"name" : "icmp6",
//				"name_full" : null,
//				"description" : "\u041c\u0435\u0436\u0441\u0435\u0442\u0435\u0432\u043e\u0439 \u043f\u0440\u043e\u0442\u043e\u043a\u043e\u043b \u0443\u043f\u0440\u0430\u0432\u043b\u044f\u044e\u0449\u0438\u0445 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0439 \u0434\u043b\u044f \u043c\u0435\u0436\u0441\u0435\u0442\u0435\u0432\u043e\u0433\u043e \u043f\u0440\u043e\u0442\u043e\u043a\u043e\u043b\u0430 \u0432\u0435\u0440\u0441\u0438\u0438 6 (IPv6).",
//				"status" : "false"
//			}, {
//				"id" : "26",
//				"id_sections" : "4",
//				"name" : "ether",
//				"name_full" : null,
//				"description" : "\u0411\u0430\u0437\u043e\u0432\u0430\u044f \u0441\u0435\u0442\u0435\u0432\u0430\u044f \u0442\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0438\u044f Ethernet, \u043a\u0430\u043a \u043f\u0440\u0430\u0432\u0438\u043b\u043e \u0443\u043a\u0430\u0437\u044b\u0432\u0430\u0435\u0442 \u043d\u0430 \u0442\u043e \u0447\u0442\u043e \u0432 \u0444\u0438\u043b\u044c\u0442\u0440\u0435 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442\u0441\u044f \u0430\u043f\u043f\u0430\u0440\u0430\u0442\u043d\u044b\u0439 MAC \u0430\u0434\u0440\u0435\u0441",
//				"status" : "false"
//			}, {
//				"id" : "27",
//				"id_sections" : "4",
//				"name" : "wlan",
//				"name_full" : null,
//				"description" : "\u0422\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0438\u044f \u043f\u0435\u0440\u0435\u0434\u0430\u0447\u0438 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438 , \u043a\u043e\u0442\u043e\u0440\u0430\u044f \u0434\u043b\u044f \u0441\u0432\u044f\u0437\u0438 \u0438 \u043e\u0431\u043c\u0435\u043d\u0430 \u0434\u0430\u043d\u043d\u044b\u043c\u0438 \u043c\u0435\u0436\u0434\u0443 \u0443\u0437\u043b\u0430\u043c\u0438 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442 \u043d\u0435 \u043a\u0430\u0431\u0435\u043b\u044c\u043d\u044b\u0435 \u0441\u043e\u0435\u0434\u0438\u043d\u0435\u043d\u0438\u044f, \u0430 \u0432\u044b\u0441\u043e\u043a\u043e\u0447\u0430\u0441\u0442\u043e\u0442\u043d\u044b\u0435 \u0440\u0430\u0434\u0438\u043e\u0432\u043e\u043b\u043d\u044b.",
//				"status" : "false"
//			}, {
//				"id" : "28",
//				"id_sections" : "4",
//				"name" : "ip6",
//				"name_full" : null,
//				"description" : "\u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b IPv6",
//				"status" : "false"
//			}, {
//				"id" : "29",
//				"id_sections" : "4",
//				"name" : "arp",
//				"name_full" : null,
//				"description" : "\u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b ARP",
//				"status" : "false"
//			}
//		],
//		
//		"\u041f\u0440\u0438\u043c\u0438\u0442\u0438\u0432\u044b" : [{
//				"id" : "30",
//				"id_sections" : "5",
//				"name" : "and",
//				"name_full" : null,
//				"description" : "\u0421\u0432\u044f\u0437\u043a\u0430 \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u0438\u0445 \u0443\u0441\u043b\u043e\u0432\u0438\u0439 \u043c\u043e\u0436\u0435\u0442 \u043f\u0440\u043e\u0438\u0441\u0445\u043e\u0434\u0438\u0442\u044c \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u043b\u043e\u0433\u0438\u0447\u0435\u0441\u043a\u0438\u0445 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438 \u00ab\u0418\u00bb",
//				"status" : "false"
//			}, {
//				"id" : "31",
//				"id_sections" : "5",
//				"name" : "or",
//				"name_full" : null,
//				"description" : "\u0421\u0432\u044f\u0437\u043a\u0430 \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u0438\u0445 \u0443\u0441\u043b\u043e\u0432\u0438\u0439 \u043c\u043e\u0436\u0435\u0442 \u043f\u0440\u043e\u0438\u0441\u0445\u043e\u0434\u0438\u0442\u044c \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u043b\u043e\u0433\u0438\u0447\u0435\u0441\u043a\u0438\u0445 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438 \u00ab\u0418\u041b\u0418\u00bb",
//				"status" : "false"
//			}, {
//				"id" : "32",
//				"id_sections" : "5",
//				"name" : "not",
//				"name_full" : null,
//				"description" : "\u0421\u0432\u044f\u0437\u043a\u0430 \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u0438\u0445 \u0443\u0441\u043b\u043e\u0432\u0438\u0439 \u043c\u043e\u0436\u0435\u0442 \u043f\u0440\u043e\u0438\u0441\u0445\u043e\u0434\u0438\u0442\u044c \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u043b\u043e\u0433\u0438\u0447\u0435\u0441\u043a\u0438\u0445 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438 \u00ab\u041d\u0415\u00bb",
//				"status" : "false"
//			}
//		]
//                            };

//        $scope.selectVegetables = [
//            {
//                name: 'Broccoli',
//                type: 'Brassica'
//            },
//            {
//                name: 'Cabbage',
//                type: 'Brassica'
//            },
//            {
//                name: 'Carrot',
//                type: 'Umbelliferous'
//            }
//        ];


    }]);
  
})();