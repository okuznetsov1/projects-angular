(function(){
   'use strict';

    angular
        .module('service.dataByOptions',[])
        .factory('serviceDataByOptions', serviceDataByOptions);

        function serviceDataByOptions($http) {
                     
            return {
                name: 'Options Service',
                getPriority: function () {
                      return $http.get('getPriorities.php').then(function(response){
                        return response.data;
                      });
                },
                getTag: function () {
                      return $http.get('getTags.php').then(function(response){
                        return response.data;
                      });
                },
                getStatus: function () {
                      return $http.get('getStatuses.php').then(function(response){
                        return response.data;
                      });
                }
            };
            
        }
        
})();