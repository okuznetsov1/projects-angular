(function(){
   'use strict';

    angular
        .module('service.dataByOptions',[])
        .factory('serviceDataByOptions', serviceDataByOptions);

        function serviceDataByOptions($http) {
                     
            return {
                name: 'Options Service',
                set: function (data) {

                },
                get: function () {
                        return $http.get('getOptions.php');
                }

            }
            
        }
        
})();