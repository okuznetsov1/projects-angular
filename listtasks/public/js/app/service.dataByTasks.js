(function(){
   'use strict';

    angular
        .module('service.dataByTasks',[])
        .factory('serviceDataByTasks', serviceDataByTasks);

        function serviceDataByTasks($http) {
            
            return {
                name: 'Tasks Service',
                add: function (tasknameNew, priorityNewId, tagNewID, statusNewId) {

                    return $http.post('api/add/addTask.php',{tasknameNew:tasknameNew, priorityNewId:priorityNewId, tagNewID:tagNewID, statusNewId:statusNewId});   
                    //return $http.post('api/add/task/',{tasknameNew:tasknameNew, priorityNewId:priorityNewId, tagNewID:tagNewID, statusNewId:statusNewId});   
                        
                },
                delete: function (arrayTasksId) {
                    
                    return $http.post('api/delete/tasks/',{arrayTasksId:arrayTasksId});
                    
                },
                edit: function (content) {

                    return $http.post('api/edit/task/',{id:content.uuid,task_name:content.task_name,priority_id:content.priority_id,tags_id:content.tags_id,status_id:content.status_id});
                        
                },
                get: function () {
                      return $http.get('api/get/tasks').then(function(response){
                        return response.data;
                      });
                }

            };
            
        }
        
})();