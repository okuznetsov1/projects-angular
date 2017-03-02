(function(){

    var app = angular
            .module('notes', ['lumx', 'ngSanitize', 'FredrikSandell.worker-pool'])
            .run(function (WorkerService) {
                //WorkerService.setAngularUrl('../bower_components/angular/angular.js');
                //WorkerService.setAngularUrl('http://www.girlswantgames.com/anguler-tasks-contacts/js/angular.min.js');
                WorkerService.setAngularUrl('https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js');
                //WorkerService.addDependency(serviceName, moduleName, url);
            })
            .filter('to_trusted', ['$sce', function($sce){
                return function(text) {
                    return $sce.trustAsHtml(text);
                };
            }]);

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
                                    
                                    if( onChangeEvent.target.files[0].type === 'text/plain' ){
                                        reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
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
                    output.notify(input.content);            
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

                            //console.log('response:');
                            //console.log(response);

                            $scope.InsertTextFromFile(response);

                            $scope.notify('success','Успешно загружен');

                    }
                );

        };
        
    }]);
  
    app.controller('MainController', ['$scope', 'WorkerService', 'LxNotificationService', '$http', '$log', function($scope, WorkerService, LxNotificationService, $http, $log) {

        $scope.notesContent = '';

        $scope.clearNotesContent = function (){
            $scope.notesContent = '';
            $scope.notify('error','Разрешено загружать только текстовые файлы (.TXT)');
        };

        $scope.exportToCSV = function () {
            
            var data = parseModel();

            alasql("SELECT * INTO CSV('notes.csv',{headers:false,separator:','}) FROM ?",[data]);

        };
        
        $scope.exportToXLS = function () {

            var data = parseModel();

            alasql("SELECT * INTO XLSX('contacts.xls',{headers:false}) FROM ?",[data]);

        };
        
        var parseModel = function () {

            var data = [];
            var content = '';
            
            content = $scope.notesContent;
            content = content.split('<br>');

            angular.forEach(content, function (value, key) {
                data.push(eval('[' + JSON.stringify(value) + ']'));
            });
            //console.log(data);
                
            return data;
        };
        
        $scope.exportToPdf = function () {

            //console.log('export to PDF');
            html2canvas(document.getElementById('div-content'), {
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
                     pdfMake.createPdf(docDefinition).download("notes.pdf");
//                     pdfMake.createPdf(docDefinition).open();
                 }
             });
         };
                
        var parseModelPdfText = function (header) {

                var data = [];
                var str = '';
                
                if(header === 'getHeaderPdfText'){
                    data.push(getHeaderPdfText());
                }
                else{
                    data.push(getHeader());
                }
                
                angular.forEach($scope.notesContent, function (value, key) {
                    str = JSON.stringify(value);
                    str = str.replace(/("[a-zA-Z_$$]*":)/g,'');
                    str = str.replace(/(,"object:[0-9]{1,}")/g,'');
                    str = str.replace(/(^{)/,'[');
                    str = str.replace(/(}$)/,']');
                    //console.log(eval("("+str+")"));
                    data.push(eval(str));
                });
                //console.log(data);
                
                return data;
        };
        
        $scope.exportToPdfText = function () {

            var data = parseModel();
            
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
                                    text:'Содержимое файла:',
                                    style:'header'
                                    //pageBreak:'before'
                            },

                            {
                                table:{
                                        widths:['*'],
                                        body:data
                                },
                                layout: 'noBorders'
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
            
             pdfMake.createPdf(docInfo).download("notes.pdf");

         };        
        
        $scope.exportToPNG = function () {

            html2canvas(document.getElementById('div-content'), {
                onrendered: function (canvas) {
                    canvas.toBlob(function(blob) {
                        saveAs(blob, "notes.png");
                    });
                }
            });
        };

        $scope.InsertTextFromFile = function(content){
            content = content.replace(/\r/g, '');
            $scope.notesContent = content.replace(/\n/g, '<br>');
        }
        
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