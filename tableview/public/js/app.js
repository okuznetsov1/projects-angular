(function(){

    var app = angular
            .module('notes', ['lumx', 'lumx.data-table', 'lumx.dialog', 'ngSanitize', 'FredrikSandell.worker-pool'])
            .run(function (WorkerService) {
                //WorkerService.setAngularUrl('../bower_components/angular/angular.js');
                WorkerService.setAngularUrl('https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js');
                //WorkerService.addDependency(serviceName, moduleName, url);
            });

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

                                    if( onChangeEvent.target.files[0].type === 'application/vnd.ms-excel' && onChangeEvent.target.files[0].name.lastIndexOf('.csv')!== -1 ){
                                        reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
                                        scope.getNameImportFile(onChangeEvent.target.files[0].name);
                                    }
                                    else{
                                        scope.clearNotesContent();
                                    }
                            });
                    }
            };
    });

    app.controller('ReadFileController', ['$scope', '$http', 'WorkerService', function ($scope, $http, WorkerService) {
    
        $scope.readContent = function (fileContent) {
                            
            //Воркер занимающийся распарсириванием csv-файла
            var workerPromiseNotes = WorkerService.createAngularWorker(['input', 'output', '$http', 
                function (input, output, $http) {
                    //Передаём данные возвращаемые воркером обратно во frontend
                    //console.log(input.content);
                    
                    function parseCSV(csv, reviver) {

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

                    //Вызываем переданную функцию parseCSV в воркере
                    var data = parseCSV(input.content);
                    
                    output.notify(data);            
                }
            ]);

            workerPromiseNotes
                .then(function success(angularWorker) {

                    var param = { 
                        content: fileContent
                    };

                    return angularWorker.run(param);
                }, 
                function error(reason) {
                    console.log('callback error');
                    console.log(reason);
                    //for some reason the worker failed to initialize
                    //not all browsers support the HTML5 tech that is required, see below.
                }).then(function success(result) {
                    console.log('success');
                    console.log(result);
                    //handle result
                    }, function error(reason) {
                        //handle error
                        console.log('error');
                        console.log(reason);
                    }, function notify(response) {
                        
                            $scope.InsertTextFromFile(response);
                            $scope.notify('success','Файл "' + $scope.fileName + '" успешно импортирован!');
                            
                    }
                );

        };
        
    }]);
  
    app.controller('MainController', ['$filter', '$scope', 'WorkerService', 'LxNotificationService', 'LxDialogService', '$http', '$log', function($filter, $scope, WorkerService, LxNotificationService, LxDialogService, $http, $log) {

        $scope.notesContent = '';
        $scope.fileName = '';

        $scope.clearNotesContent = function (){
            $scope.notesContent = '';
            $scope.notify('error','Разрешено загружать только текстовые файлы формата "CSV"');
        }; 
        
        $scope.getNameImportFile = function (filename){
            $scope.fileName = filename;
        };        
        

        $scope.exportToCSV = function () {
            alasql("SELECT * INTO CSV('file.csv',{headers:false,separator:','}) FROM ?",[$scope.notesContent]);
        };
        
        $scope.exportToXLS = function () {
            alasql("SELECT * INTO XLSX('file.xls',{headers:false}) FROM ?",[$scope.notesContent]);
        };
        
        $scope.exportToPdf = function () {

            html2canvas(document.getElementById('lolo'), {
                 onrendered: function (canvas) {
                     //console.log(canvas);
                     var data = canvas.toDataURL()
                     var docDefinition = {
                        content: [{
                            image: data,
                            width: 550,
                        }],
                        // a string or { width: number, height: number }
                        pageSize: 'A4',
                        // by default we use portrait, you can change it to landscape if you wish
                        pageOrientation: 'portrait',
                        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
                        pageMargins: [ 40, 20, 20, 20 ]
                     };
                     pdfMake.createPdf(docDefinition).download("file.pdf");
                 }
             });
         };

        var getHeader = function () {
            var header = [];
            angular.forEach($scope.dataTableThead, function (value, key) {
                    header.push(value.name);
            });
            // return ["id","Фамилия","Имя","Отчество","Адрес","Телефон","Сайт","Примечание","Статус"]
            return header;
        };
        
        var getHeaderPdfText = function () {
            var data = [];
            var h = getHeader();
            angular.forEach(h, function (value, key) {
                    data.push({text:value,bold:true,fontSize:14,alignment:"center"});
            });
            // return [{text:h[0],bold:true,fontSize:14,alignment:'center'},{text:h[1],bold:true,fontSize:14,alignment:'center'},{text:h[2],bold:true,fontSize:14,alignment:'center'},{text:h[3],bold:true,fontSize:14,alignment:'center'},{text:h[4],bold:true,fontSize:14,alignment:'center'},{text:h[5],bold:true,fontSize:14,alignment:'center'},{text:h[6],bold:true,fontSize:14,alignment:'center'},{text:h[7],bold:true,fontSize:14,alignment:'center'},{text:h[8],bold:true,fontSize:14,alignment:'center'}]
            return data;
        };
        
        var getHeaderPdfTextNumber = function () {
            var data = [];
            var numberCollsOnLetter = 7;
            var h = getHeader();
            angular.forEach(h, function (value, key) {
                    console.log(key);
                    if(key < h.length - 1 && h.length > numberCollsOnLetter ){
                        data.push('auto');
                    }
                    else{
                        data.push('*');                        
                    }
            });
            // ['auto','auto','auto','auto','auto','auto','auto','auto','*']
            return data;
        };
                
        var parseModel = function (header) {

                var data = [];
                var str = '';
                
                if(header === 'getHeaderPdfText'){
                    data.push(getHeaderPdfText());
                }
                else{
                    data.push(getHeader());
                }
                
                angular.forEach($scope.notesContent, function (value, key) {

                    if(key !== 0){
                        str = JSON.stringify(value);
                        str = str.replace(/("[a-zA-Z_$$]*":)/g,'');
                        str = str.replace(/(,"object:[0-9]{1,}")/g,'');
                        str = str.replace(/(,false)/g,'');
                        str = str.replace(/(,true)/g,'');
                        str = str.replace(/(^{)/,'[');
                        str = str.replace(/(}$)/,']');
                        //console.log(eval(str)); 
                        data.push(eval(str));
                    }
                });
                
                return data;
        };
        
        $scope.exportToPdfText = function () {
            
            // var data = [
            //        ["id","Фамилия","Имя","Отчество","Адрес","Телефон","Сайт","Примечание","Статус"], 
            //        [1,"Иванов","Иван","Иванович","ул. Иванова, д.1, кв.11","8-111-11111-1111","http://google.com","тестовое описание №1","false"], 
            //        [2,"Петров","Петр","Петрович","ул. Петрова, д.1, кв.11","8-111-111-1112","http://url-2","тестовое описание №2","false"]
            //];

            var data = parseModel('getHeaderPdfText');

            var docInfo = {

                    info: {
                            title:'Тестовый документ PDF',
                            author:'Oleg Kuznetsov',
                            subject:'Theme',
                            keywords:'Ключевые слова'
                    },

                    pageSize:'A4',
                    pageOrientation:'landscape',//'portrait'
                    pageMargins:[20,20,20,20],

                    header: function(currentPage, pageCount) { 
                                return {
                                    text:currentPage.toString() + ' из ' + pageCount, 
                                    alignment:'right', 
                                    fontSize:10, 
                                    margin: [ 0, 5, 5, 20 ]
                                };
                    },

                    footer:[
                            {
                                    text:'2016',
                                    alignment:'center',//left  right
                            }
                    ],

                    content: [

                            {
                                    text:'Импортированные данные',
                                    style:'header'
                                    //pageBreak:'before'
                            },

                            {
                                table:{
                                        //widths:['*','auto','auto','auto','auto','auto','auto',150,'*'],
                                        widths:getHeaderPdfTextNumber(),
                                        body:data,
                                        headerRows:1
                                },
                                layout: {
                                        fillColor: function (i, node) { return (i % 2 === 0) ?  '#F0F0F0' : null; }
                                }
                            }
                            
                    ],
                    styles: {
                            header: {
                                    fontSize:16,
                                    bold:true,
                                    alignment:'center',
                                    margin: [ 10, 20, 0, 20 ]
                            }
                    }
            };
            
            pdfMake.createPdf(docInfo).download("file.pdf");

         };
        
        $scope.exportToPNG = function () {
            
            html2canvas(document.getElementById('lolo'), {
                onrendered: function (canvas) {
                    canvas.toBlob(function(blob) {
                        saveAs(blob, "file.png");
                    });
                }
            });
        };

        $scope.InsertTextFromFile = function(content){

            $scope.notesContent = content;

            //Выявляем и собираем первую строку с названиями колонок в datatable
            var dataTableThead = '';
            angular.forEach(content, function (value, key) {
                angular.forEach(value, function (element, index) {
                    if(key === 0){
                        dataTableThead += '{ name: "' + element + '", ' + 'label: "' + element + '", ' + 'sortable: true },';
                    }
                });
                
            });
            
            dataTableThead = dataTableThead.substring(0, dataTableThead.length - 1);
            $scope.dataTableThead = eval('[' + dataTableThead + ']');

            $scope.advancedDataTableThead = angular.copy($scope.dataTableThead);
            $scope.advancedDataTableThead.unshift(
            {
                name: 'image',
                format: function(row)
                {
                    return '<img src="' + row.image + '" width="40" height="40" class="img-round">';
                }
            });

            //Выявляем и собираем все остальные строки, которые будут строками в tableview
            var dataTableTbody = '';
            angular.forEach(content, function (value, key) {
                if(key !== 0){
                    dataTableTbody += '{';
                }
                angular.forEach(value, function (element, index) {
                    //выявляем первую строку с названиями колонок в datatable
                    if(key !== 0){
                        dataTableTbody += $scope.dataTableThead[index].name + ': "' + element + '", ';
                    }
                });
                if(key !== 0){
                    dataTableTbody = dataTableTbody.substring(0, dataTableTbody.length - 2); 
                    dataTableTbody +='},';
                }
            });
            dataTableTbody = dataTableTbody.substring(0, dataTableTbody.length - 1);
            $scope.dataTableTbody = eval('[' + dataTableTbody + ']');

        }

        $scope.$on('lx-data-table__selected', updateActions);
        $scope.$on('lx-data-table__unselected', updateActions);
        $scope.$on('lx-data-table__sorted', updateSort);

        function updateActions(_event, _dataTableId, _selectedRows){
            if (_dataTableId === 'lolo') {
                $scope.selectedRows = _selectedRows;
            }
        }

        function updateSort(_event, _dataTableId, _column){
            $scope.dataTableTbody = $filter('orderBy')($scope.dataTableTbody, _column.name, _column.sort === 'desc' ? true : false);
        }

        //Диалоговые окна
        $scope.dialogIdEdit = 'dialog-edit';
        $scope.dialogIdAdd = 'dialog-add';
        $scope.dialogIdDelete = 'dialog-delete';
        $scope.openDialogEdit = openDialogEdit;
        $scope.openDialogAdd = openDialogAdd;
        $scope.openDialogDelete = openDialogDelete;

        function openDialogAdd(){
            
            LxDialogService.open($scope.dialogIdAdd);

            $scope.fields = [];

            //$scope.fields = [
            //    {name: "image", dataType: "text", isMultiValue: false, value: ''},
            //    {name: "dessert", dataType: "text", isMultiValue: false, value: ''},
            //    {name: "calories", dataType: "text", isMultiValue: false, value: 0},
            //    {name: "fat", dataType: "text", isMultiValue: false, value: 0},
            //    {name: "comments", dataType: "text", isMultiValue: false, value: ''}
            //];
            
            var arrNameFields = getNameFieldFromScopeVariable();
            angular.forEach(arrNameFields, function (element, key) {
                    $scope.fields.push({name: element, dataType: "text", isMultiValue: false, value: ''});
            });

            $scope.documentData = {};
            
            $scope.getFieldTemplateUrl = function(field) {
                return 'js/templates/add/' + field.dataType + '.html';
            };
        }

        function openDialogEdit(){
            
            LxDialogService.open($scope.dialogIdEdit);

            $scope.fields = [];

            //$scope.fields = [
            //    {name: "image", dataType: "text", isMultiValue: false, value: ''},
            //    {name: "dessert", dataType: "text", isMultiValue: false, value: ''},
            //    {name: "calories", dataType: "text", isMultiValue: false, value: 0},
            //    {name: "fat", dataType: "text", isMultiValue: false, value: 0},
            //    {name: "comments", dataType: "text", isMultiValue: false, value: ''}
            //];

            var arrNameFields = getNameFieldFromScopeVariable();
            angular.forEach(arrNameFields, function (element, key) {
                    $scope.fields.push({name: element, dataType: "text", isMultiValue: false, value: eval('$scope.selectedRows[0].' + element)});
            });

            $scope.documentData = {};
            
            $scope.getFieldTemplateUrl2 = function(field) {
                return 'js/templates/edit/' + field.dataType + '.html';
            };
        }


        function openDialogDelete(){
            LxDialogService.open($scope.dialogIdDelete);
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
                //После удаления держим в актуальности содержимое массива $scope.notesContent
                clearData();
            }
        }

        $scope.editDialogField = function(){

            var arrNameFields = getNameFieldFromScopeVariable();
            angular.forEach(arrNameFields, function (element, key) {
                    eval("$scope.selectedRows[0]." + element + "=" + "document.querySelector(\"input[id$='" + element + "']\").value");
            });

            //После редактирования новой строки держим в актуальности содержимое массива $scope.notesContent
            clearData();
        }

        $scope.addDialogField = function(){

            var arrNameFields = [];
            var str = '';

            arrNameFields = getNameFieldFromScopeVariable();

            for (var i = 0, len = arrNameFields.length; i < len; i++) {
                    str += arrNameFields[i] + ": \"" +  eval("document.querySelector(\"input[id$=\'" + arrNameFields[i] + "New" + "']\").value") + '\",';
            }
            str = '{' + str.substring(0, str.length - 1) + '}';

            $scope.dataTableTbody = $scope.dataTableTbody.concat( eval('[' + str + ']') );

            //После добавления новой строки держим в актуальности содержимое массива $scope.notesContent
            clearData();
        }

       //После добавления новой строки держим в актуальности содержимое массива $scope.notesContent
       var clearData = function () {

            var tb = [];
            //удаляем из объекта поле $$hashKey и lxDataTableSelected, при условии, что оно имеется
            angular.forEach($scope.dataTableTbody, function (element, key) {
                if (typeof element.$$hashKey !== "undefined"){
                    delete element.$$hashKey;
                }
                tb.push(Object.values(element));
            });

            //собираем новый массив содержащий уже не объеты а массивы
            var th = [getNameFieldFromScopeVariable()];
            $scope.notesContent = th.concat( tb );
        }

        var getNameFieldFromScopeVariable = function () {
            
            var data = [];
            angular.forEach($scope.dataTableThead, function (element, key) {
                data.push(element.name);
            });

            return data;
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