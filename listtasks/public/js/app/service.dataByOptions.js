(function(){
   'use strict';

    angular
        .module('service.dataByOptions',[])
        .factory('serviceDataByOptions', serviceDataByOptions);

        function serviceDataByOptions($http) {
                     
            return {
                name: 'Options Service',
                getPriority: function () {
                      return $http.get('api/get/priorities').then(function(response){
                        return response.data;
                      });
                },
                getTag: function () {
                      return $http.get('api/get/tags').then(function(response){
                        return response.data;
                      });
                },
                getStatus: function () {
                      return $http.get('api/get/statuses').then(function(response){
                        return response.data;
                      });
                }
            };
            
        }
        
})();