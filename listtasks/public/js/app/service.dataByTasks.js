(function(){
   'use strict';

    angular
        .module('service.dataByTasks',[])
        .factory('serviceDataByTasks', serviceDataByTasks);

        function serviceDataByTasks($http) {
            
            return {
                name: 'Tasks Service',
                add: function (tasknameNew, priorityNewId, tagNewID, statusNewId) {

                    return $http.post('addData.php',{tasknameNew:tasknameNew, priorityNewId:priorityNewId, tagNewID:tagNewID, statusNewId:statusNewId});   
                        
                },
                delete: function (taskId) {
                    
                    //return $http.post('deleteData.php',{id:taskId});
                    
                },
                edit: function (content) {

                    return $http.post('editData.php',{id:content.uuid,task_name:content.task_name,priority_id:content.priority_id,tags_id:content.tags_id,status_id:content.status_id});
                        
                },
                get: function () {
                      return $http.get('getData.php').then(function(response){
                        return response.data;
                      });
                }

            };
            
        }
        
})();