(function(){
   'use strict';
   
    angular
        .module('app')
        .controller('MainController',MainController);

        MainController.$inject = ['$filter', '$scope', 'LxNotificationService', 'LxDialogService'];

        function MainController ($filter, $scope, LxNotificationService, LxDialogService){

            var vm = this;
            vm.dataTableThead = '';
            vm.dataTableTbody = '';
            vm.notesContent = '';

            //Диалоговые окна
            vm.dialogIdEdit = 'dialog-edit';
            vm.dialogIdAdd = 'dialog-add';
            vm.dialogIdDelete = 'dialog-delete';
            vm.dialogIdCharts = 'dialog-charts';
            vm.openDialogEdit = openDialogEdit;
            vm.openDialogAdd = openDialogAdd;
            vm.openDialogDelete = openDialogDelete;
            vm.openDialogCharts = openDialogCharts;
            
            vm.exportToCSV = function () {
                alasql("SELECT * INTO CSV('file.csv',{headers:false,separator:','}) FROM ?",[vm.notesContent]);
            };

            vm.exportToXLS = function () {
                alasql("SELECT * INTO XLSX('file.xls',{headers:false}) FROM ?",[vm.notesContent]);
            };

            vm.exportToPdf = function () {

                html2canvas(document.getElementById('lolo'), {
                     onrendered: function (canvas) {

                         var data = canvas.toDataURL();
                         
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
                angular.forEach(vm.dataTableThead, function (value, key) {
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

                    angular.forEach(vm.notesContent, function (value, key) {

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

            vm.exportToPdfText = function () {

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

            vm.exportToPNG = function () {

                html2canvas(document.getElementById('lolo'), {
                    onrendered: function (canvas) {
                        canvas.toBlob(function(blob) {
                            saveAs(blob, "file.png");
                        });
                    }
                });
            };

            $scope.InsertTextFromFile = function(content){

                vm.notesContent = content;

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
                vm.dataTableThead = eval('[' + dataTableThead + ']');

                vm.advancedDataTableThead = angular.copy(vm.dataTableThead);
                vm.advancedDataTableThead.unshift(
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
                            dataTableTbody += vm.dataTableThead[index].name + ': ' + isInt(element) + ', ';
                        }
                    });
                    if(key !== 0){
                        dataTableTbody = dataTableTbody.substring(0, dataTableTbody.length - 2); 
                        dataTableTbody +='},';
                    }
                });
                dataTableTbody = dataTableTbody.substring(0, dataTableTbody.length - 1);
                vm.dataTableTbody = eval('[' + dataTableTbody + ']');

            };

            function isInt(value) {
                if ( !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10)) ){
                    return parseInt(value, 10);
                }
                else{
                    return '"' + value + '"';
                }
            }

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

            function openDialogAdd(){

                LxDialogService.open(vm.dialogIdAdd);

                vm.fields = [];

                //$scope.fields = [
                //    {name: "image", dataType: "text", isMultiValue: false, value: ''},
                //    {name: "dessert", dataType: "text", isMultiValue: false, value: ''},
                //    {name: "calories", dataType: "text", isMultiValue: false, value: 0},
                //    {name: "fat", dataType: "text", isMultiValue: false, value: 0},
                //    {name: "comments", dataType: "text", isMultiValue: false, value: ''}
                //];

                var arrNameFields = getNameFieldFromScopeVariable();
                angular.forEach(arrNameFields, function (element, key) {
                        vm.fields.push({name: element, dataType: "text", isMultiValue: false, value: ''});
                });

                vm.documentData = {};

                vm.getFieldTemplateUrl = function(field) {
                    return 'js/app/templates/add/' + field.dataType + '.html';
                };
            }

            function openDialogEdit(){

                LxDialogService.open(vm.dialogIdEdit);

                vm.fields = [];

                //$scope.fields = [
                //    {name: "image", dataType: "text", isMultiValue: false, value: ''},
                //    {name: "dessert", dataType: "text", isMultiValue: false, value: ''},
                //    {name: "calories", dataType: "text", isMultiValue: false, value: 0},
                //    {name: "fat", dataType: "text", isMultiValue: false, value: 0},
                //    {name: "comments", dataType: "text", isMultiValue: false, value: ''}
                //];

                var arrNameFields = getNameFieldFromScopeVariable();
                angular.forEach(arrNameFields, function (element, key) {
                        vm.fields.push({name: element, dataType: "text", isMultiValue: false, value: eval('vm.selectedRows[0].' + element)});
                });

                vm.documentData = {};

                vm.getFieldTemplateUrl2 = function(field) {
                    return 'js/app/templates/edit/' + field.dataType + '.html';
                };
            }


            function openDialogDelete(){
                LxDialogService.open(vm.dialogIdDelete);
            }

            function openDialogCharts(){

                var chart1 = {};
                chart1.type = "google.charts.Bar";
                chart1.displayed = false;

                //chart1.data2 = {
                //  "cols": [{
                //    id: "year",
                //    label: "Год",
                //    type: "string"
                //  }, {
                //    id: "1",
                //    label: "Luxembourg",
                //    type: "number"
                //  }, {
                //    id: "2",
                //    label: "Switzerland",
                //    type: "number"
                //  }],
                //  "rows": [{
                //    c: [{
                //      v: "2015"
                //    }, {
                //      v: 101994,
                //      f: "101994"
                //    }, {
                //      v: 80603,
                //      f: "80603"
                //    }]
                //  }]
                //};

                //Cобираем объект со строками из datatable которые нужно вывести в диаграмму
                var dataCharts = {
                    cols: [
                        {id: "year",label: " ",type: "string"}
                    ],
                    rows: [
                        {c: [{v: " "}]}
                    ],
                };

                angular.forEach(vm.selectedRows, function (element, index) {
                        dataCharts.cols.push( {id: element.Rank,label: element.Country,type: "string"} );
                        dataCharts.rows[0].c.push({v : element.US$, f : '"'+element.US$+'"'})
                });

                chart1.data = dataCharts;

                chart1.options = {
                  "bars": 'vertical', //"bars": 'horizontal',
                  "title": "GDP per capita",
                  "isStacked": "true",
                  "fill": 20,
                  "displayExactValues": true,
                  "vAxis": {
                    "title": "US$",
                    "gridlines": {
                      "count": 10
                    }
                  },
                  "hAxis": {
                    "title": "GDP on years"
                  }
                };
                $scope.myChart = chart1;            


                LxDialogService.open(vm.dialogIdCharts);

            }

            vm.dialogYesDelete = function(){

                var access = 0;
                angular.forEach(vm.selectedRows, function (element, key) {
                    angular.forEach(vm.dataTableTbody, function (element2, key2) {
                        if( element === element2 ){
                            vm.dataTableTbody.splice(vm.dataTableTbody.indexOf(element2), 1);
                            access = 1;
                        }
                    });
                });
                if(access){
                    $scope.notify('success','Данные успешно удалены!');
                    //строки удалили, соответственно очищаем массив с выделенными в data-table строками
                    vm.selectedRows.splice(0,vm.selectedRows.length);
                    //После удаления держим в актуальности содержимое массива vm.notesContent
                    clearData();
                }
            }

            vm.editDialogField = function(){

                var arrNameFields = getNameFieldFromScopeVariable();
                angular.forEach(arrNameFields, function (element, key) {
                        eval("vm.selectedRows[0]." + element + "=" + "document.querySelector(\"input[id$='" + element + "']\").value");
                });

                $scope.notify('success','Данные успешно изменены!');

                //После редактирования новой строки держим в актуальности содержимое массива vm.notesContent
                clearData();
            }

            vm.addDialogField = function(){

                var arrNameFields = [];
                var str = '';

                arrNameFields = getNameFieldFromScopeVariable();

                for (var i = 0, len = arrNameFields.length; i < len; i++) {
                        str += arrNameFields[i] + ": \"" +  eval("document.querySelector(\"input[id$=\'" + arrNameFields[i] + "New" + "']\").value") + '\",';
                }
                str = '{' + str.substring(0, str.length - 1) + '}';

                vm.dataTableTbody = vm.dataTableTbody.concat( eval('[' + str + ']') );

                $scope.notify('success','Данные успешно добавлены!');

                //После добавления новой строки держим в актуальности содержимое массива vm.notesContent
                clearData();
            }

           //После добавления новой строки держим в актуальности содержимое массива vm.notesContent
           var clearData = function () {

                var tb = [];
                angular.forEach(vm.dataTableTbody, function (element, key) {
                    if (typeof element.$$hashKey !== "undefined"){
                        delete element.$$hashKey;
                    }
                    tb.push(Object.values(element));
                });

                var th = [getNameFieldFromScopeVariable()];
                vm.notesContent = th.concat( tb );
            }

            var getNameFieldFromScopeVariable = function () {

                var data = [];
                angular.forEach(vm.dataTableThead, function (element, key) {
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

        }

})();