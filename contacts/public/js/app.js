(function(){

    var app = angular.module('contactList', ['lumx','ngSanitize', 'ngCsv']);

    app.directive('onReadFile', function ($parse) {
            return {
                    restrict: 'A',
                    scope: false,
                    link: function(scope, element, attrs) {
                    var fn = $parse(attrs.onReadFile);

                            element.on('change', function(onChangeEvent) {
                                    var reader = new FileReader();

                                    reader.onload = function(onLoadEvent) {
                                            scope.$apply(function() {
                                                    fn(scope, {$fileContent:onLoadEvent.target.result});
                                            });
                                    };

                                    reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
                            });
                    }
            };
    });

    app.directive('ngFiles', ['$parse', function ($parse) {

                function fn_link(scope, element, attrs) {
                    var onChange = $parse(attrs.ngFiles);
                    element.on('change', function (event) {
                        onChange(scope, { $files: event.target.files });
                    });
                };

                return {
                    link: fn_link
                }
    }]);


    app.controller('ReadFileController', function ($scope) {
        $scope.readContent = function($fileContent){
            $scope.content = $fileContent;

            var Items = $scope.parseCSV($scope.content);

            angular.forEach(Items, function (value, key) {
                $scope.importContacts(value[1], value[2], value[3], value[4], value[5], value[6], value[7]);
            });

        };
    });
  
    app.controller('UploadFileController', function ($scope, $http) {

        var formdata = new FormData();

        $scope.getTheFiles = function ($files) {
            angular.forEach($files, function (value, key) {
                formdata.append(key, value);
            });
        };

        $scope.uploadFiles = function () {

            var request = {
                method: 'POST',
                url: 'upload.php',
                data: formdata,
                headers: {
                    'Content-Type': undefined
                }
            };

            // SEND THE FILES.
            $http(request)
                .then(function (d) {
                    console.log(d);
                })                
                .catch(function(e) {
                    console.log(e);
                });

            var Url = "files/import.csv";
            $http.get(Url).then(function(response){       
                var Items = $scope.parseCSV(response.data);
                angular.forEach(Items, function (value, key) {
                    $scope.importContacts(value[1], value[2], value[3], value[4], value[5], value[6], value[7]);
                });
            });  
        }

    });

    app.controller('MainController', ['$scope', 'LxNotificationService', '$http', '$log', function($scope, LxNotificationService, $http, $log) {

        $scope.getArray = [];
        $scope.contactslist = [];

        $http.get('/anguler-tasks-contacts/getContactData.php')
            .then(function(response) {

                $scope.contactslist = response.data;
        
                $scope.filename = "contacts.csv";
                $scope.separator = ','; 
                $scope.decimalSeparator = '.';
                
                $scope.getArray = response.data;
                $scope.getHeader = function () {
                //    return ["family","Имя","Отчество","Адрес","Телефон","Сайт","Примечание"]
                };
                
            },
            function(err) {
                console.log(err);
            });
           

        $scope.addContact = function() {

            $http.post('/anguler-tasks-contacts/addContactData.php',{last_name:$scope.newLastName, name:$scope.newName, patronymic_name:$scope.newPatronymicName, address:$scope.newAddress, telephone:$scope.newTelephone, url:$scope.newUrl, description:$scope.newDescription, completed:'false'})
                .then(function(response) {

                    $scope.notify('success','Контакт успешно добавлен!');

                    $scope.contactslist.push({
                            id: response.data[0].id,
                            last_name: response.data[0].last_name,
                            name: response.data[0].name,
                            patronymic_name: response.data[0].patronymic_name,
                            address: response.data[0].address,
                            telephone: response.data[0].telephone,
                            url: response.data[0].url,
                            description: response.data[0].description,
                            completed: response.data[0].completed
                    });

                })
                .catch(function(e) {
                    $scope.notify('error','Ошибка при добавлении контакта!');
                    console.log(e);
                });

        };
        
        $scope.importContacts = function(LastName, Name, PatronymicName, Address, Telephone, Url, Description) {

            $http.post('/anguler-tasks-contacts/addContactData.php',{last_name:LastName, name:Name, patronymic_name:PatronymicName, address:Address, telephone:Telephone, url:Url, description:Description, completed:'false'})
                .then(function(response) {

                    $scope.notify('success','Контакт успешно импортирован!');

                    $scope.contactslist.push({
                            id: response.data[0].id,
                            last_name: response.data[0].last_name,
                            name: response.data[0].name,
                            patronymic_name: response.data[0].patronymic_name,
                            address: response.data[0].address,
                            telephone: response.data[0].telephone,
                            url: response.data[0].url,
                            description: response.data[0].description,
                            completed: response.data[0].completed
                    });

                })
                .catch(function(e) {
                    $scope.notify('error','Ошибка при импортировании контакта!');
                    console.log(e);
                });

        };

	$scope.deleteContact = function (contact) {

            if (''+contact.completed === "true"){          

                $http.post('/anguler-tasks-contacts/deleteContactData.php',{id:contact.id})
                    .then(function(response) {
                        
                        $scope.notify('success','Контакт успешно удален!');
            
                        $scope.contactslist.splice($scope.contactslist.indexOf(contact), 1);

                    })
                    .catch(function(e) {
                        $scope.notify('warning','Ошибка при удалении контакта!');
                        console.log(e);
                    });

            } 
            else{
                 $scope.notify('error','Удаляемая строка не отмечена чекбоксом!');                
            }
            
	};

	$scope.editContactLastName = function (contact) {
            
            $http.post('/anguler-tasks-contacts/editContactData.php',{id:contact.id,last_name:contact.last_name})
                .then(function(response) {
                    console.log(response.data);
                    $scope.notify('success','Контакт успешно отредактирован!');
                })
                .catch(function(e) {
                    $scope.notify('error','Ошибка при редактировании контакта!');
                    console.log(e);
                });
            
	};

	$scope.editContactName = function (contact) {
            
            $http.post('/anguler-tasks-contacts/editContactData.php',{id:contact.id,name:contact.name})
                .then(function(response) {
                    console.log(response.data);
                    $scope.notify('success','Контакт успешно отредактирован!');
                })
                .catch(function(e) {
                    $scope.notify('error','Ошибка при редактировании контакта!');
                    console.log(e);
                });
            
	};

	$scope.editContactPatronymicName = function (contact) {
            
            $http.post('/anguler-tasks-contacts/editContactData.php',{id:contact.id,patronymic_name:contact.patronymic_name})
                .then(function(response) {
                    console.log(response.data);
                    $scope.notify('success','Контакт успешно отредактирован!');
                })
                .catch(function(e) {
                    $scope.notify('error','Ошибка при редактировании контакта!');
                    console.log(e);
                });
            
	};
        
	$scope.editContactAddress = function (contact) {
            
            $http.post('/anguler-tasks-contacts/editContactData.php',{id:contact.id,address:contact.address})
                .then(function(response) {
                    console.log(response.data);
                    $scope.notify('success','Контакт успешно отредактирован!');
                })
                .catch(function(e) {
                    $scope.notify('error','Ошибка при редактировании контакта!');
                    console.log(e);
                });
            
	};
        
	$scope.editContactTelephone = function (contact) {
            
            $http.post('/anguler-tasks-contacts/editContactData.php',{id:contact.id,telephone:contact.telephone})
                .then(function(response) {
                    console.log(response.data);
                    $scope.notify('success','Контакт успешно отредактирован!');
                })
                .catch(function(e) {
                    $scope.notify('error','Ошибка при редактировании контакта!');
                    console.log(e);
                });
            
	};

	$scope.editContactUrl = function (contact) {
            
            $http.post('/anguler-tasks-contacts/editContactData.php',{id:contact.id,url:contact.url})
                .then(function(response) {
                    console.log(response.data);
                    $scope.notify('success','Контакт успешно отредактирован!');
                })
                .catch(function(e) {
                    $scope.notify('error','Ошибка при редактировании контакта!');
                    console.log(e);
                });
            
	};
        
	$scope.editContactDescription = function (contact) {
            
            $http.post('/anguler-tasks-contacts/editContactData.php',{id:contact.id,description:contact.description})
                .then(function(response) {
                    console.log(response.data);
                    $scope.notify('success','Контакт успешно отредактирован!');
                })
                .catch(function(e) {
                    $scope.notify('error','Ошибка при редактировании контакта!');
                    console.log(e);
                });
            
	};
        
	$scope.markAll = function (completed) {

		$scope.contactslist.forEach(function (contact) {
                    contact.completed = completed;
		});
                
	};
    
        $scope.parseCSV = function(csv, reviver) {
            reviver = reviver || function(r, c, v) { return v; };
            var chars = csv.split(''), c = 0, cc = chars.length, start, end, table = [], row;
            while (c < cc) {
                table.push(row = []);
                while (c < cc && '\r' !== chars[c] && '\n' !== chars[c]) {
                    start = end = c;
                    if ('"' === chars[c]){
                        start = end = ++c;
                        while (c < cc) {
                            if ('"' === chars[c]) {
                                if ('"' !== chars[c+1]) { break; }
                                else { chars[++c] = ''; } // unescape ""
                            }
                            end = ++c;
                        }
                        if ('"' === chars[c]) { ++c; }
                        while (c < cc && '\r' !== chars[c] && '\n' !== chars[c] && ',' !== chars[c]) { ++c; }
                    } else {
                        while (c < cc && '\r' !== chars[c] && '\n' !== chars[c] && ',' !== chars[c]) { end = ++c; }
                    }
                    row.push(reviver(table.length-1, row.length, chars.slice(start, end).join('')));
                    if (',' === chars[c]) { ++c; }
                }
                if ('\r' === chars[c]) { ++c; }
                if ('\n' === chars[c]) { ++c; }
            }
            return table;
        };
        
        $scope.notify = function(type,text)
        {
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
                LxNotificationService.info(text);
            }
            else if (type === 'success')
            {
                LxNotificationService.success(text);
            }
            else if (type === 'warning')
            {
                LxNotificationService.warning(text);
            }
            else if (type === 'error')
            {
                LxNotificationService.error(text);
            }
        };
        
    }]);

  
})();