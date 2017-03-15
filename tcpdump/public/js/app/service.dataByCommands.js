(function(){
   'use strict';

    angular
        .module('service.dataByCommands',[])
        .factory('serviceDataByCommands', serviceDataByCommands);

        function serviceDataByCommands($http) {
            
            return {
                name: 'Commands Service',
                add: function (vm) {

                    return $http.post('addData.php',{genCommand:vm.newGenerationCommand, description:vm.newDescription}); 
 
                },
                delete: function (vm, tcpdump) {
                    
                    return $http.post('deleteData.php',{id:tcpdump.id});
                    
                },
                edit: function (vm, tcpdump, name) {

                        if(name === 'command'){
                            return $http.post('editData.php',{id:tcpdump.id,command:tcpdump.command});
                        }
                        else if(name === 'description'){
                            return $http.post('editData.php',{id:tcpdump.id,description:tcpdump.description});
                        }
                        
                },
                get: function () {
                        return $http.get('getData.php');
                }

            }
            
        }
        
})();