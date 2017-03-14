(function(){
   'use strict';

    angular
        .module('app')
        .service('serviceVmObject', serviceVmObject);

        function serviceVmObject() {

            var _vm = '';
            return {
                set: function (vm) {
                    _vm = vm;
                },
                get: function () {
                    return _vm;
                }
            }
            
        }
        
})();