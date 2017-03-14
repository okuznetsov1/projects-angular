(function(){
   'use strict';

    angular
        .module('app')
        .service('serviceNameImportFile', serviceNameImportFile);

        function serviceNameImportFile() {

            var _name = '';
            return {
                set: function (name) {
                    _name = name;
                },
                get: function () {
                    return _name;
                }
            }

        }
    
})();