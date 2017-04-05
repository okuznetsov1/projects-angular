(function(){
   'use strict';
   
    angular
        .module('app')
        .controller('MainController',MainController);

        MainController.$inject = ['$filter', '$scope', 'LxNotificationService', 'LxDialogService', 'serviceDataByTasks', 'serviceDataByOptions'];

        function MainController ($filter, $scope, LxNotificationService, LxDialogService, serviceDataByTasks, serviceDataByOptions){

            var vm = this;
            vm.dataTableThead = [];
            vm.dataTableTbody = [];

            //Диалоговые окна
            vm.dialogIdEdit = 'dialog-edit';
            vm.dialogIdAdd = 'dialog-add';
            vm.dialogIdDelete = 'dialog-delete';
            vm.openDialogEdit = openDialogEdit;
            vm.openDialogAdd = openDialogAdd;
            vm.openDialogDelete = openDialogDelete;
            
            serviceDataByTasks
                .get()
                .then(function(data) {

                    //собираем первую строку с названиями колонок в datatable
                    vm.dataTableThead = [
                    {
                        name: 'task_name',
                        label: 'Название',
                        sortable: true,
                    },
                    {
                        name: 'priority_name',
                        label: 'Приоритет',
                        sortable: true,
                        sort: 'asc'
                    },
                    {
                        name: 'tags_name',
                        label: 'Теги'
                    },
                    {
                        name: 'status_name',
                        label: 'Статус',
                        sortable: true,
                    }];

                    vm.advancedDataTableThead = angular.copy(vm.dataTableThead);
                    vm.advancedDataTableThead.unshift(
                    {
                        name: 'image',
                        format: function(row)
                        {
                            return '<img src="' + row.image + '" width="40" height="40" class="img-round">';
                        }
                    });

                    vm.dataTableTbody = data;

                    //в datatable вместо отображения содержимого объекта со сво-ми id и name тегов выводим строку с перечисленными тегами через запятую
                    var s;
                    var arrayTags = [];
                    //Собираем массив содержащий tag.name для его отображения в datatable
                    angular.forEach(vm.dataTableTbody, function (element) {
                        s = '';
                        angular.forEach(element.tags_id, function (tag) {
                            s += tag.tag_name + ', ';
                        });
                        s = s.substring(0, s.length - 2);
                        arrayTags.push(s);
                    });
                    angular.forEach(vm.dataTableTbody, function (element, key) {
                        element.tags_name = arrayTags[key];
                    });

                    $scope.$on('lx-data-table__selected', updateActions);
                    $scope.$on('lx-data-table__unselected', updateActions);
                    $scope.$on('lx-data-table__sorted', updateSort);

                    function updateActions(_event, _dataTableId, _selectedRows){
                        if (_dataTableId === 'lolo') {
                            vm.selectedRows = _selectedRows;
                        }
                    }

                    function updateSort(_event, _dataTableId, _column){
                        vm.dataTableTbody = $filter('orderBy')(vm.dataTableTbody, _column.name, _column.sort === 'desc' ? true : false);
                    }

                    orderByTasks();

                })
                .catch(function(error) {
                    console.log(error);
                });
        
            function openDialogAdd(){

                LxDialogService.open(vm.dialogIdAdd);

                vm.tasknameNew = '';
                vm.priorityNew = '';
                vm.selectModelNew = {
                    tag: []
                };
                vm.statusNew = '';

                try {
                
                    serviceDataByOptions
                        .getPriority()
                        .then(function(data) {
                            //vm.choices = [{id:'0c4dc671-b202-44a2-bf15-d94773cc1ccd',name:'Низкий'}];
                            vm.choices = data;   
                        })
                        .then(function() {
                            serviceDataByOptions
                                .getTag()
                                .then(function(data) { 
                                    vm.choicesTag = data;
                                })
                        })
                        .then(function() {
                            serviceDataByOptions
                                .getStatus()
                                .then(function(data) { 
                                    vm.choicesStatus = data;
                                })
                        })
                        .catch(function(error) {
                            throw new Error('Произошла ошибка в serviceDataByOptions. Возникли проблемы с получением данных из БД! ' + error);
                        });

                } catch(error) {
                    vm.notify('error',error.message);
                    console.log(error);
                }

            }

            function openDialogEdit(){

                LxDialogService.open(vm.dialogIdEdit);

                vm.taskname = vm.selectedRows[0].task_name;

                serviceDataByOptions
                    .getPriority()
                    .then(function(data) {
                        //vm.choices = [{id:'0c4dc671-b202-44a2-bf15-d94773cc1ccd',name:'Низкий'}];
                        vm.choices = data;
                        vm.priority = {id:vm.selectedRows[0].priority_id,name:vm.selectedRows[0].priority_name};
                    })
                    .catch(function(error) {
                        console.log(error);
                    });

                serviceDataByOptions
                    .getTag()
                    .then(function(data) { 
                        vm.choicesTag = data;

                        var strTags = vm.selectedRows[0].tags_name.replace(/,\s/g,',');
                        var arrayTags = strTags.split(',');

                        //Собираем для объекта vm.selectModel - все теги относящиеся к задаче, для того чтобы отобразить их в Select-e
                        var arraySelectedTagName = [];
                        var keepGoing = true;
                        angular.forEach(arrayTags, function (tag) {
                                angular.forEach(vm.choicesTag, function (element) {
                                    if(keepGoing) {
                                        if(angular.equals(tag, element.name)){
                                            arraySelectedTagName.push({id:element.id, name:element.name});
                                            keepGoing = false;
                                        }
                                    }
                                });
                                keepGoing = true;
                        });

                        vm.selectModel = {
                            tag: arraySelectedTagName
                        };

                    })
                    .catch(function(error) {
                        console.log(error);
                    });

                serviceDataByOptions
                    .getStatus()
                    .then(function(data) { 
                        vm.choicesStatus = data;
                        vm.status = {id:vm.selectedRows[0].status_id,name:vm.selectedRows[0].status_name};
                    })
                    .catch(function(error) {
                        console.log(error);
                    });

            }

            function openDialogDelete(){
                LxDialogService.open(vm.dialogIdDelete);
            }

            vm.deleteDialog = function(){

                var arrayTasksId = [];
                angular.forEach(vm.selectedRows, function (element) {
                        arrayTasksId.push(element.uuid);
                });

                serviceDataByTasks
                    .delete(arrayTasksId)
                    .then(function() {

                        //Убираем удаленные задачи из vm.dataTableTbody, т.е. из datatable
                        var access = 0;
                        angular.forEach(vm.selectedRows, function (element) {
                            angular.forEach(vm.dataTableTbody, function (element2) {
                                if( element === element2 ){
                                    vm.dataTableTbody.splice(vm.dataTableTbody.indexOf(element2), 1);
                                    access = 1;
                                }
                            });
                        });
                        if(access){
                            //строки удалили, соответственно очищаем массив с выделенными в data-table строками
                            vm.selectedRows.splice(0,vm.selectedRows.length);
                            vm.notify('success','Данные успешно удалены!');
                        }
                
                    })
                    .catch(function(error) {
                        console.log(error);
                    });

            }
            
            vm.editDialogField = function(){

                vm.selectedRows[0].task_name = vm.taskname;

                vm.selectedRows[0].priority_name = vm.priority.name;
                vm.selectedRows[0].priority_id = vm.priority.id;

                var strTags = '';
                angular.forEach(vm.selectModel.tag, function (element, key) {
                        strTags += element.name + ', ';
                        //console.log(element.name);
                });
                vm.selectedRows[0].tags_name = strTags.substring(0, strTags.length - 2);
                vm.selectedRows[0].tags_id = vm.selectModel.tag;

                vm.selectedRows[0].status_name = vm.status.name;
                vm.selectedRows[0].status_id = vm.status.id;

                serviceDataByTasks
                    .edit(vm.selectedRows[0])
                    .then(function() {
                            vm.notify('success','Данные успешно добавлены!');
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                    
                orderByTasks();
            };
            
            vm.addDialogField = function(){

                var priorityNewId = vm.priorityNew.id;
                var statusNewId = vm.statusNew.id;
                var tagNewID = vm.selectModelNew.tag;

                serviceDataByTasks
                    .add(vm.tasknameNew, priorityNewId, tagNewID, statusNewId)
                    .then(function(response) {

                            vm.dataTableTbody.push({
                                    uuid: response.data[0].id,
                                    task_name: response.data[0].task_name,
                                    priority_id: response.data[0].priority_id,
                                    priority_name: getPriorityNameForDrawTable(response.data[0].priority_id),
                                    status_id: response.data[0].status_id,
                                    status_name: getStatusNameForDrawTable(response.data[0].status_id),
                                    tags_id: response.data[0].tags_id,
                                    tags_name: getTagNameForDrawTable(response.data[0].tags_id)
                            });

                            orderByTasks();

                            vm.notify('success','Данные успешно добавлены!');
                    })
                    .catch(function(error) {
                        console.log(error);
                    });

            };

            //Получаем имена тегов задачи по id тегов
            function getTagNameForDrawTable(tags_id){

                var arrayName = [];
                
                //Собираем массив содержащий tag.name для его отображения в datatable
                angular.forEach(tags_id, function (element) {
                            for (var i in vm.choicesTag) {
                                if(angular.equals(element.id, vm.choicesTag[i].id)){
                                    arrayName.push(vm.choicesTag[i].name);
                                    break;
                                }
                            }
                });
                
                return arrayName.join(', ');
            }
            
            //Получаем имя приоритета задачи по id приоритета
            function getPriorityNameForDrawTable(priority_id){
                var name = '';
                var keepGoing = true;
                //Собираем массив содержащий tag.name для его отображения в datatable
                angular.forEach(vm.choices, function (element) {
                    if(keepGoing) {
                        if(angular.equals(element.id, priority_id)){
                            name = element.name;
                            keepGoing = false;
                        }
                    }
                });             
                return name;
            }
            
            //Получаем имя статуса задачи по id статуса
            function getStatusNameForDrawTable(status_id){
                var name = '';
                var keepGoing = true;
                //Собираем массив содержащий tag.name для его отображения в datatable
                angular.forEach(vm.choicesStatus, function (element) {
                    if(keepGoing) {
                        if(angular.equals(element.id, status_id)){
                            name = element.name;
                            keepGoing = false;
                        }
                    }
                });             
                return name;
            }

            function orderByTasks(){
                vm.dataTableTbody = $filter('orderBy')(vm.dataTableTbody, ["status_name","priority_id","task_name"], false);
            }
            
            vm.notify = function(type,text){
                
                switch(type){
                    case 'simple': 
                                    LxNotificationService.notify(text);
                                    break;
                    case 'sticky': 
                                    LxNotificationService.notify('text', undefined, true);
                                    break;
                    case 'icon': 
                                    LxNotificationService.notify(text, 'android');
                                    break;
                    case 'color': 
                                    LxNotificationService.notify(text, undefined, false, 'grey');
                                    break;
                    case 'info': 
                                    LxNotificationService.info(text);
                                    break;
                    case 'success': 
                                    LxNotificationService.success(text);
                                    break;
                    case 'warning': 
                                    LxNotificationService.warning(text);
                                    break;
                    case 'error': 
                                    LxNotificationService.error(text);
                                    break;
                    default: 
                                    LxNotificationService.notify(text);
                                    break;
                }
                
            };

        }
        
})();