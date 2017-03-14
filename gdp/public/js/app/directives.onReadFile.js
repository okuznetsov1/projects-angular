(function(){
   'use strict';
   
    angular
        .module('app')
        .directive('onReadFile', readFile);

        function readFile($parse, serviceNameImportFile, serviceVmObject){

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
                                            //scope.getNameImportFile(onChangeEvent.target.files[0].name);
                                            serviceNameImportFile.set(onChangeEvent.target.files[0].name);
                                        }
                                        else{
                                            var vm = serviceVmObject.get();
                                            vm.notesContent = '';
                                            scope.notify('error','Разрешено загружать только текстовые файлы формата "CSV"');
                                        }
                                });
                        }
                };
        };

})();