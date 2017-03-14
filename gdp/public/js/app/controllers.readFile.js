(function(){
   'use strict';

    angular
        .module('app')
        .controller('ReadFileController', ReadFileController);

        ReadFileController.$inject = ['$scope', '$http', 'WorkerService', 'serviceNameImportFile', 'serviceVmObject'];

        function ReadFileController($scope, $http, WorkerService, serviceNameImportFile, serviceVmObject){

            var readfile = this;

            readfile.readContent = function (fileContent, vm) {

                //Воркер занимающийся распарсириванием csv-файла
                var workerPromiseNotes = WorkerService.createAngularWorker(['input', 'output', '$http', 
                    function (input, output, $http) {

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

                        //Передаём данные возвращаемые воркером обратно во frontend         
                        output.notify( {data:data} );            
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

                                $scope.InsertTextFromFile(response.data);
                                $scope.notify('success','Файл "' + serviceNameImportFile.get() + '" успешно импортирован!');
                                serviceVmObject.set(vm);
                        }
                    );

            };
            
    }

})();