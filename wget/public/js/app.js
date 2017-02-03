(function(){

    var app = angular.module('wgetApp', ['lumx']);

    app.controller('WgetController', ['$scope', 'LxNotificationService', '$http', '$log', function($scope, LxNotificationService, $http, $log) {

        $scope.wgetslist = [];
        $scope.optionslist = [];
        $scope.parametrs = '';
        $scope.newURL = '';
        $scope.newPathSaveFile = '';
        
        $http.get('/anguler-tasks-wget/getData.php')
            .then(function(response) {
                $scope.wgetslist = response.data;
            },
            function(err) {
            });
        
        $http.get('/anguler-tasks-wget/getOptions.php')
            .then(function(response) {
                $scope.optionslist = response.data;
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
                    LxNotificationService.error('Lorem Ipsum');
                }
            };


//        $scope.selectPeople = [
//        {
//            name: 'Adam',
//            email: 'adam@email.com',
//            age: 10
//        },
//        {
//            name: 'Amalie',
//            email: 'amalie@email.com',
//            age: 12
//        },
//        {
//            name: 'Wladimir',
//            email: 'wladimir@email.com',
//            age: 30
//        },
//        {
//            name: 'Samantha',
//            email: 'samantha@email.com',
//            age: 31
//        },
//        {
//            name: 'Estefanía',
//            email: 'estefanía@email.com',
//            age: 16
//        },
//        {
//            name: 'Natasha',
//            email: 'natasha@email.com',
//            age: 54
//        },
//        {
//            name: 'Nicole',
//            email: 'nicole@email.com',
//            age: 43
//        },
//        {
//            name: 'Adrian',
//            email: 'adrian@email.com',
//            age: 21
//        }];
        $scope.selectSections = {
            '<i class="mdi mdi-tag"></i> <span>Запуск</span>': [
            {
                uid: '1',
                name: '-V',
                name_full: '--version',
                description: 'Отобразить версию Wget'
            },
            {
                uid: '2',
                name: '-h',
                name_full: '--help',
                description: 'После запуска перейти в фоновый режим'

            },
            {
                uid: '3',
                name: '-b',
                name_full: '--background',
                description: 'Перейти в фоновый режим после запуска. Если файл для сообщений не указан параметром -o, он записывается в wget-log'
            }],
            '<i class="mdi mdi-tag"></i> <span>Журналирование и входной файл</span>': [
            {
                uid: '5',
                name: '-o',
                name_full: '--output-file=ФАЙЛ',
                description: 'Записывать сообщения в ФАЙЛ'
            },
            {
                uid: '6',
                name: '-a',
                name_full: '--append-output=ФАЙЛ',
                description: 'Дописывать сообщения в конец ФАЙЛА'
            }],
            '<i class="mdi mdi-tag"></i> <span>Загрузка</span>': [
            {
                uid: '14',
                name: '-t',
                name_full: '--tries=ЧИСЛО, --retry-connrefus',
                description: 'Установить ЧИСЛО повторных попыток (0 без ограничения). Если retry-connrefused - повторять, даже если в подключении отказано.'
            },
            {
                uid: '17',
                name: '-c',
                name_full: '--continue',
                description: 'Возобновление загрузки файла. Используется, если загрузка файла была прервана.'
            },
            {
                uid: '18',
                name: '-N',
                name_full: ' --timestamping, --no-use-server',
                description: 'Включить сравнение по дате. Файл будет загружен только если он новее уже существующего, или если размер его не совпадает с имеющейся копией.'
            }]
        };
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
        $scope.newValueTransformer = function(_newValue) {
            return {
                name: _newValue,
                type: 'Unknown'
            };
        };
        $scope.selectModel = {
//            selectedPerson: undefined,
//            selectedPeople: [$scope.selectPeople[2], $scope.selectPeople[4]],
            selectedParametrsSections: []
//            selectedVegetables: []
        };
            
        $scope.addWgetTask = function() {

            console.log($scope.selectModel.selectedParametrsSections);

            $http.post('/anguler-tasks-wget/addData.php',{url:$scope.newURL, pathSaveFile:$scope.newPathSaveFile, numberAttemptSaveFile:$scope.newNumberAttemptSaveFile, parametrs:$scope.selectModel.selectedParametrsSections, description:$scope.newDescription, completed:'false'})
                .then(function(response) {

                    $scope.notify('success','Команда "' + response.data[0].command + '" успешно сгенерирована!');

                    $scope.wgetslist.push({
                            id: response.data[0].id,
                            command: response.data[0].command,
                            description: response.data[0].description,
                            completed: response.data[0].completed
                    });

                })
                .error(function(err){
                    $log.error(err);
                }); 

        };

	$scope.deleteWgetTask = function (wget) {

            if (''+wget.completed === "true"){
//                $log.info(wget.id);            

                $http.post('/anguler-tasks-wget/deleteData.php',{id:wget.id})
                    .then(function(response) {
                        
                        $scope.notify('success','Команда "' + wget.command + '" успешно удалена!');
            
                        $scope.wgetslist.splice($scope.wgetslist.indexOf(wget), 1);

                    })
                    .error(function(err){
                        $log.error(err);
                    });

            }   
            
	};

	$scope.editWgetLastName = function (wget) {
            
            $http.post('/anguler-tasks-wget/editData.php',{id:wget.id,command:wget.command})
                .then(function(response) {
                    console.log(response.data);
                    $scope.notify('success','Команда "' + wget.command + '" успешно изменена!');
                })
                .error(function(err){
                    $log.error(err);
                });
            
	};
        
	$scope.editWgetDescription = function (wget) {
            
            $http.post('/anguler-tasks-wget/editData.php',{id:wget.id,description:wget.description})
                .then(function(response) {
                    console.log(response.data);
                    $scope.notify('success','Команда "' + wget.command + '" успешно изменена!');
                })
                .error(function(err){
                    $log.error(err);
                });
            
	};
 
	$scope.checkOption = function (wget) {
            
            $log.info('checkOption');

            //+ $scope.newURL;
                
            if (''+wget.status === "true"){
                
                if ($scope.parametrs.indexOf(wget.name) == -1) {
                    $scope.parametrs += '-' + wget.name + ' ';
                }
                                
                $log.info('true');
            }
            else{
                $log.info('false');
                    $scope.parametrs = $scope.parametrs.replace('-' + wget.name + ' ',"");
            }
            
	};
        
	$scope.runCommand = function (wget) {

            $scope.notify('success','Функция запуска "' + wget.command + '" в разработке...');            
            
	};
        
	$scope.markAll = function (completed) {

		$scope.wgetslist.forEach(function (wget) {
                    
                    wget.completed = completed;
                    
		});

	};                

    }]);
  
})();