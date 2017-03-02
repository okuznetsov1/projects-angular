(function(){

    var app = angular
            .module('notes', ['lumx', 'lumx.data-table', 'lumx.dialog', 'ngSanitize']);

    app.controller('MainController', ['$scope', '$filter', 'LxDialogService', '$http', '$log', function($scope, $filter, LxDialogService, $http, $log) {

        $scope.notesContent = '';

        $scope.dataTableThead = [
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
            comments: 'Lorem ipsum',
            lxDataTableDisabled: true
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
        
        $scope.editCell = function (){
            $scope.openDialog();
            console.log($scope.selectedRows);
            console.log($scope.selectedRows[0].dessert);
            $scope.dessert = $scope.selectedRows[0].dessert;      
        }
        
        $scope.deleteRow = function (){

            $scope.openDialogDelete();

        }
        
        $scope.addRow = function (){

                $scope.openDialogAdd();
                
//                $scope.dataTableTbody.push({
//                    id: 15,
//                    image: '/images/placeholder/2-square.jpg',
//                    dessert: 'TEST',
//                    calories: 237,
//                    fat: 9.0,
//                    comments: 'Lorem ipsum'
//                });
                                            
        }


        $scope.addPerson = addPerson;
        $scope.dialogId = 'dialog-edit';
        $scope.dialogIdAdd = 'dialog-add';
        $scope.dialogIdDelete = 'dialog-delete';
        $scope.openDialog = openDialog;
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
            if ($scope.dialogId === _dialogId)
            {
//                LxNotificationService.notify('Open start');
//                alert('Open start');
                console.log('Open start' + ' ### ' + $scope.dialogId + ' ### ' + _event);
                console.log(_event);
            }
        });

        $scope.$on('lx-dialog__open-end', function(_event, _dialogId)
        {
            if ($scope.dialogId === _dialogId)
            {
//                LxNotificationService.notify('Open end');
//                alert('Open end');
                console.log('Open end' + ' ### ' + $scope.dialogId + ' ### ' + _event);
                console.log(_event);
            }
        });

        $scope.$on('lx-dialog__close-start', function(_event, _dialogId)
        {
            if ($scope.dialogId === _dialogId)
            {
//                LxNotificationService.notify('Close start');
//                alert('Close start');
                console.log('Close start' + ' ### ' + $scope.dialogId + ' ### ' + _event);
                console.log(_event);
            }
        });

        $scope.$on('lx-dialog__close-end', function(_event, _dialogId)
        {
            if ($scope.dialogId === _dialogId)
            {
//                LxNotificationService.notify('Close end');
//                alert('Изменения успешно сохранены!');
                console.log('Close end' + ' ### ' + $scope.dialogId + ' ### ' + _event);
                console.log(_event);
            }
        });

        $scope.$on('lx-dialog__scroll-end', function(_event, _dialogId)
        {
            if ($scope.dialogId === _dialogId)
            {
//                LxNotificationService.notify('Scroll end');
//                alert('Scroll end');
                console.log('Scroll end' + ' ### ' + $scope.dialogId + ' ### ' + _event);
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

        function openDialog()
        {
            LxDialogService.open($scope.dialogId);
        }
        
        function openDialogAdd()
        {
            LxDialogService.open($scope.dialogIdAdd);
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
            console.log( $( "input[name$='dessert']" ).val() + ' ### ' + $scope.dessert + ' = ' + $scope.selectedRows[0].dessert);
            $scope.dessert = document.querySelector("input[id$='dessert']").value;
            $scope.selectedRows[0].dessert = $scope.dessert;
        }
        
        $scope.addDialogField = function(){
//            console.log( $( "input[id$='dessertNew']" ).val() + ' ### ' + $scope.dessertNew + ' = ' + $scope.selectedRows[0].dessert);
//            $scope.dessert = document.querySelector("input[id$='dessertNew']").value;
//            $scope.selectedRows[0].dessert = $scope.dessert;

                $scope.dataTableTbody.push({
                    id: 15,
                    image: document.querySelector("input[id$='imageNew']").value,
                    dessert: document.querySelector("input[id$='dessertNew']").value,
                    calories: document.querySelector("input[id$='caloriesNew']").value,
                    fat: document.querySelector("input[id$='fatNew']").value,
                    comments: document.querySelector("input[id$='commentsNew']").value
                });
                
        }

    }]);
  
})();