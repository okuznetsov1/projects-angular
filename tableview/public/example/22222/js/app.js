(function(){

    var app = angular
            .module('notes', ['lumx', 'lumx.data-table', 'lumx.dialog', 'ngSanitize']);

    app.controller('MainController', ['$scope', '$filter', 'LxDialogService', '$http', '$log', function($scope, $filter, LxDialogService, $http, $log) {

        $scope.notesContent = '';

        $scope.dataTableThead = [
        {
            name: 'id',
            label: 'Id',
            sortable: false
        },
        {
            name: 'image',
            label: 'Image',
            sortable: false
        },
        {
            name: 'dessert',
            label: 'Dessert',
            sortable: true
        },
        {
            name: 'calories',
            label: 'Calories',
            sortable: true
        },
        {
            name: 'fat',
            label: 'Fat (g)',
            sortable: true,
            sort: 'asc'
        },
        {
            name: 'comments',
            label: 'Comments',
            icon: 'comment-text',
            sortable: false
        }];
        $scope.advancedDataTableThead = angular.copy($scope.dataTableThead);
        $scope.advancedDataTableThead.unshift(
        {
            name: 'image',
            format: function(row)
            {
                return '<img src="' + row.image + '" width="40" height="40" class="img-round">';
            }
        });
        $scope.dataTableTbody = [
        {
            id: 11,
            image: '/images/placeholder/1-square.jpg',
            dessert: 'Frozen yogurt',
            calories: 159,
            fat: 6.0,
            comments: 'Lorem ipsum'
        },
        {
            id: 12,
            image: '/images/placeholder/2-square.jpg',
            dessert: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            comments: 'Lorem ipsum'
        },
        {
            id: 13,
            image: '/images/placeholder/3-square.jpg',
            dessert: 'Eclair',
            calories: 262,
            fat: 16.0,
            comments: 'Lorem ipsum'
        }];        
        
        
        $scope.$on('lx-data-table__selected', updateActions);
        $scope.$on('lx-data-table__unselected', updateActions);
        $scope.$on('lx-data-table__sorted', updateSort);

        ////////////

        function updateActions(_event, _dataTableId, _selectedRows)
        {
            if (_dataTableId === 'lolo') {
                $scope.selectedRows = _selectedRows;
                console.log($scope.selectedRows);
            }
        }

        function updateSort(_event, _dataTableId, _column)
        {
            $scope.dataTableTbody = $filter('orderBy')($scope.dataTableTbody, _column.name, _column.sort === 'desc' ? true : false);
        }

        $scope.addPerson = addPerson;
        $scope.dialogIdEdit = 'dialog-edit';
        $scope.dialogIdAdd = 'dialog-add';
        $scope.dialogIdDelete = 'dialog-delete';
        $scope.openDialogEdit = openDialogEdit;
        $scope.openDialogAdd = openDialogAdd;
        $scope.openDialogDelete = openDialogDelete;

        $scope.people = [
        {
            name: 'Adam',
            email: 'adam@email.com',
            age: 10
        },
        {
            name: 'Amalie',
            email: 'amalie@email.com',
            age: 12
        },
        {
            name: 'Wladimir',
            email: 'wladimir@email.com',
            age: 30
        },
        {
            name: 'Samantha',
            email: 'samantha@email.com',
            age: 31
        },
        {
            name: 'Estefanía',
            email: 'estefanía@email.com',
            age: 16
        },
        {
            name: 'Natasha',
            email: 'natasha@email.com',
            age: 54
        },
        {
            name: 'Nicole',
            email: 'nicole@email.com',
            age: 43
        },
        {
            name: 'Adrian',
            email: 'adrian@email.com',
            age: 21
        }];

        $scope.$on('lx-dialog__open-start', function(_event, _dialogId)
        {
            if ($scope.dialogIdEdit === _dialogId)
            {
//                LxNotificationService.notify('Open start');
//                alert('Open start');
                console.log('Open start' + ' ### ' + $scope.dialogIdEdit + ' ### ' + _event);
                console.log(_event);
            }
        });

        $scope.$on('lx-dialog__open-end', function(_event, _dialogId)
        {
            if ($scope.dialogIdEdit === _dialogId)
            {
//                LxNotificationService.notify('Open end');
//                alert('Open end');
                console.log('Open end' + ' ### ' + $scope.dialogIdEdit + ' ### ' + _event);
                console.log(_event);
            }
        });

        $scope.$on('lx-dialog__close-start', function(_event, _dialogId)
        {
            if ($scope.dialogIdEdit === _dialogId)
            {
//                LxNotificationService.notify('Close start');
//                alert('Close start');
                console.log('Close start' + ' ### ' + $scope.dialogIdEdit + ' ### ' + _event);
                console.log(_event);
            }
        });

        $scope.$on('lx-dialog__close-end', function(_event, _dialogId)
        {
            if ($scope.dialogIdEdit === _dialogId)
            {
//                LxNotificationService.notify('Close end');
//                alert('Изменения успешно сохранены!');
                console.log('Close end' + ' ### ' + $scope.dialogIdEdit + ' ### ' + _event);
                console.log(_event);
            }
        });

        $scope.$on('lx-dialog__scroll-end', function(_event, _dialogId)
        {
            if ($scope.dialogIdEdit === _dialogId)
            {
//                LxNotificationService.notify('Scroll end');
//                alert('Scroll end');
                console.log('Scroll end' + ' ### ' + $scope.dialogIdEdit + ' ### ' + _event);
                console.log(_event);
            }
        });

        ////////////

        function addPerson()
        {
            $scope.people.push(
            {
                name: 'Lorem',
                email: 'lorem@email.com',
                age: 99
            });
        }
        
        function openDialogAdd()
        {
            
//var container = document.getElementById("dialog-add");
//console.log('dialog-add');
//console.log(container);
//var textImageNew = document.createElement('input');
//textImageNew.setAttribute('type', 'text');
//textImageNew.setAttribute('id', 'imageNew2');
//textImageNew.setAttribute('name', 'imageNew2');
//container.appendChild(textImageNew);

//var curFieldNameId = 0;
//curFieldNameId++;
// var div = document.createElement("div");
// // Добавляем HTML-контент с пом. свойства innerHTML
// div.innerHTML = "<nobr><input name=\"name[" + curFieldNameId + "]\" type=\"text\" style=\"width:300px;\" /> <select size=\"1\" name=\"type[" + curFieldNameId + "]\" style=\"width:150px;\"><option value=\"text\">Текстовое поле</option><option value=\"int\">Целое число</option><option value=\"float\">Число-цена</option></select> <a style=\"color:red;\" onclick=\"return deleteField(this)\" href=\"#\">[—]</a> <input name=\"url[" + curFieldNameId + "]\" type=\"text\" style=\"width:300px;\" /> <a style=\"color:green;\" onclick=\"return addField()\" href=\"#\">[+]</a></nobr>";
// // Добавляем новый узел в конец списка полей
// document.getElementById("dialog-add").appendChild(div);

// var div = document.createElement("div");
// // Добавляем HTML-контент с пом. свойства innerHTML
// div.innerHTML = '<nobr><lx-dialog-header><div class="toolbar bgc-primary pl++"><span class="toolbar__label tc-white fs-title">Добавление</span><div class="toolbar__right"><lx-button lx-size="l" lx-color="white" lx-type="icon" lx-dialog-close><i class="mdi mdi-close"></i></lx-button></div></div></lx-dialog-header><lx-dialog-content><div id="listAddElements" class="p++"><lx-text-field lx-label="add new image"><input id="imageNew" name="imageNew" type="text" ng-model="imageNew"></lx-text-field><lx-text-field lx-label="add new dessert"><input id="dessertNew" name="dessertNew" type="text" ng-model="dessertNew"></lx-text-field><lx-text-field lx-label="add new calories"><input id="caloriesNew" name="caloriesNew" type="text" ng-model="caloriesNew"></lx-text-field><lx-text-field lx-label="add new fat"><input id="fatNew" name="fatNew" type="text" ng-model="fatNew"></lx-text-field><lx-text-field lx-label="add new comments"><input id="commentsNew" name="commentsNew" type="text" ng-model="commentsNew"></lx-text-field></div><div class="p++"><lx-button id="button-add" class="bgc-indigo-500" lx-size="xs" lx-type="raised" ng-click="addDialogField()">Добавить</lx-button></div></lx-dialog-content><lx-dialog-footer></lx-dialog-footer></nobr>';
// // Добавляем новый узел в конец списка полей
// document.getElementById("dialog-add").appendChild(div);


            LxDialogService.open($scope.dialogIdAdd);


$scope.fields = [];

var arrNameFields = getNameFieldFromScopeVariable($scope.dataTableTbody[0]);
angular.forEach(arrNameFields, function (element, key) {
//    if(key !== 0){
        $scope.fields.push({name: element, dataType: "text", isMultiValue: false, value: ''});
//    }  
});

//$scope.fields = [
//    {name: "image", dataType: "text", isMultiValue: false, value: ''},
//    {name: "dessert", dataType: "text", isMultiValue: false, value: ''},
//    {name: "calories", dataType: "text", isMultiValue: false, value: 0},
//    {name: "fat", dataType: "text", isMultiValue: false, value: 0},
//    {name: "comments", dataType: "text", isMultiValue: false, value: ''}
//];
//console.log($scope.fields);

$scope.documentData = {};
$scope.getFieldTemplateUrl = function(field) {
    return 'js/templates/add/' + field.dataType + '.html';
};


//document.querySelector("div[id$='dialog-add']").innerHTML = '<lx-dialog-header><div class="toolbar bgc-primary pl++"><span class="toolbar__label tc-white fs-title">Добавление</span><div class="toolbar__right"><lx-button lx-size="l" lx-color="white" lx-type="icon" lx-dialog-close><i class="mdi mdi-close"></i></lx-button></div></div></lx-dialog-header><lx-dialog-content><div id="listAddElements" class="p++"><lx-text-field lx-label="add new image"><input id="imageNew" name="imageNew" type="text" ng-model="imageNew"></lx-text-field><lx-text-field lx-label="add new dessert"><input id="dessertNew" name="dessertNew" type="text" ng-model="dessertNew"></lx-text-field><lx-text-field lx-label="add new calories"><input id="caloriesNew" name="caloriesNew" type="text" ng-model="caloriesNew"></lx-text-field><lx-text-field lx-label="add new fat"><input id="fatNew" name="fatNew" type="text" ng-model="fatNew"></lx-text-field><lx-text-field lx-label="add new comments"><input id="commentsNew" name="commentsNew" type="text" ng-model="commentsNew"></lx-text-field></div><div class="p++"><lx-button id="button-add" class="bgc-indigo-500" lx-size="xs" lx-type="raised" ng-click="addDialogField()">Добавить</lx-button></div></lx-dialog-content><lx-dialog-footer></lx-dialog-footer>';


        }
        
        function openDialogEdit()
        {
            LxDialogService.open($scope.dialogIdEdit);



$scope.fields = [];

var arrNameFields = getNameFieldFromScopeVariable($scope.dataTableTbody[0]);
angular.forEach(arrNameFields, function (element, key) {
//    if(key !== 0){
        $scope.fields.push({name: element, dataType: "text", isMultiValue: false, value: eval('$scope.selectedRows[0].' + element)});
//    }  
});

//$scope.fields = [
    //    {name: "image", dataType: "text", isMultiValue: false, value: ''},
    //    {name: "dessert", dataType: "text", isMultiValue: false, value: ''},
    //    {name: "calories", dataType: "text", isMultiValue: false, value: 0},
    //    {name: "fat", dataType: "text", isMultiValue: false, value: 0},
    //    {name: "comments", dataType: "text", isMultiValue: false, value: ''}
    //];
    //console.log($scope.fields);

$scope.documentData = {};
$scope.getFieldTemplateUrl2 = function(field) {
    return 'js/templates/edit/' + field.dataType + '.html';
};

        }
        
        
        function openDialogDelete()
        {
            LxDialogService.open($scope.dialogIdDelete);
        }

        $scope.dialogOk = function(){
            console.log($scope.dessert + ' = ' + $scope.selectedRows[0].dessert);
            //alert('OK');
        }
        
        $scope.dialogYesDelete = function(){

            var access = 0;
            angular.forEach($scope.selectedRows, function (element, key) {
                angular.forEach($scope.dataTableTbody, function (element2, key2) {
                if( element === element2 ){
                    $scope.dataTableTbody.splice($scope.dataTableTbody.indexOf(element2), 1);
                    access = 1;
                }
                });
            });
            if(access){
             //строки удалили, соответственно очищаем массив с выделенными в data-table строками
             $scope.selectedRows.splice(0,$scope.selectedRows.length);
            }
        }
        
        $scope.editDialogField = function(){
////            console.log( $( "input[name$='dessert']" ).val() + ' ### ' + $scope.dessert + ' = ' + $scope.selectedRows[0].dessert);
////            $scope.dessert = document.querySelector("input[id$='dessert']").value;
////            $scope.selectedRows[0].dessert = $scope.dessert;
//            $scope.selectedRows[0].dessert = document.querySelector("input[id$='dessert']").value;


var arrNameFields = getNameFieldFromScopeVariable($scope.dataTableTbody[0]);
angular.forEach(arrNameFields, function (element, key) {
//    if(key !== 0){
        eval("$scope.selectedRows[0]." + element + "=" + "document.querySelector(\"input[id$='" + element + "']\").value");
//    }  
});
            
            
            
        }
        
        $scope.addDialogField = function(){
//            $scope.dessert = document.querySelector("input[id$='dessertNew']").value;
//            $scope.selectedRows[0].dessert = $scope.dessert;

            var arrNameFields = [];
            var str = '';
            
            arrNameFields = getNameFieldFromScopeVariable($scope.dataTableTbody[0]);

            for (var i = 0, len = arrNameFields.length; i < len; i++) {
//                if(i === 0){
//                    str += arrNameFields[i] + ': ' + ($scope.dataTableTbody[$scope.dataTableTbody.length-1].id + 1) + ',';
//                }
//                else{
                    str += arrNameFields[i] + ": \"" +  eval("document.querySelector(\"input[id$=\'" + arrNameFields[i] + "New" + "']\").value") + '\",';
//                }
            }
            str = '{' + str.substring(0, str.length - 1) + '}';
            
            $scope.dataTableTbody = $scope.dataTableTbody.concat( eval('[' + str + ']') );

            console.log($scope.dataTableTbody);
            
//                $scope.dataTableTbody.push({
//                    id: 15,
//                    image: document.querySelector("input[id$='imageNew']").value,
//                    dessert: document.querySelector("input[id$='dessertNew']").value,
//                    calories: document.querySelector("input[id$='caloriesNew']").value,
//                    fat: document.querySelector("input[id$='fatNew']").value,
//                    comments: document.querySelector("input[id$='commentsNew']").value
//                });
                
//            });

//                $scope.dataTableTbody.push({
//                    id: 15,
//                    image: '/images/placeholder/2-square.jpg',
//                    dessert: document.querySelector("input[id$='dessertNew']").value,
//                    calories: 237,
//                    fat: 9.0,
//                    comments: 'Lorem ipsum'
//                });
                
        }
        
        var getNameFieldFromScopeVariable = function (obj) {

                var data = [];
                var keepGoing = true;
                
                angular.forEach(obj, function (value, key) {
                    if(keepGoing) {
                        if( key === '$$hashKey' ){
                            keepGoing = false;
                        }
                        else{
                            data.push(key);
                        }
                    }
                });
                //console.log(data);
                return data;
        };

    }]);
  
})();