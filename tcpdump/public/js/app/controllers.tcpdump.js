(function(){
   'use strict';
   
    angular
        .module('app')
        .controller('TcpdumpController',TcpdumpController);

    TcpdumpController.$inject = ['LxNotificationService', 'serviceDataByCommands', 'serviceDataByOptions'];
        
    function TcpdumpController (LxNotificationService, serviceDataByCommands, serviceDataByOptions) {

        var vm = this;

        vm.cClass = 0;
        vm.cNumberPackages = 0;
        vm.cNumberPackagesByte = 0;
        vm.newGenerationCommand = '';
        vm.newNumberPackages = '';
        vm.newNumberPackagesByte = '';
        vm.newNetInterface = '';
        vm.newFilters = '';
        vm.newDescription = '';
        vm.parametrs = '';
        vm.selectModel = { selectParametrsNotSections: [] };
        vm.tcpdumplists = [];

		vm.markAll = function (completed) {
			vm.tcpdumplists.forEach(function (tcpdump) {
						tcpdump.completed = completed;
			});
		};
            
        function sizeOf(obj) {
            return Object.keys(obj).length;
        };

        //Получаем данные по ранее сгенерированным и сохранённым командам в базе данных
        serviceDataByCommands
            .get()
            .then(function(response) {
                vm.tcpdumplists = response.data;
            })
            .catch(function(error) {
                console.log(error);
            });  

        
        //Получаем данные по всем опциям ранее сохраненным в базе данных для формирования селекта
        serviceDataByOptions
            .get()
            .then(function(response) {
                vm.selectSections = response.data;
            })
            .catch(function(error) {
                console.log(error);
            });  
            
        vm.addCommand = function() {
            serviceDataByCommands
                    .add(vm)
                    .then(function(response) {

                        vm.notify('success','Команда "' + response.data[0].command + '" успешно сохранена!');

                        vm.tcpdumplists.push({
                                id: response.data[0].id,
                                command: response.data[0].command,
                                description: response.data[0].description,
                                completed: response.data[0].completed
                        });

                    })
                    .catch(function(error) {
                        console.log(error);
                    });        
        };

		vm.deleteCommand = function (tcpdump) {

            if (''+tcpdump.completed === "true"){

                serviceDataByCommands
                        .delete(vm,tcpdump)
                        .then(function(response) {
                            vm.notify('success','Команда "' + tcpdump.command + '" успешно удалена!');
                            vm.tcpdumplists.splice(vm.tcpdumplists.indexOf(tcpdump), 1);
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
            }
            else{
                vm.notify('error','Нельзя удалить команду "' + tcpdump.command + '", не отмечена галочкой!');
            }

		};

		vm.editCommand = function (tcpdump) {
            serviceDataByCommands
                    .edit(vm, tcpdump, 'command')
                    .then(function() {
                            vm.notify('success','Команда "' + tcpdump.command + '" успешно изменена!');
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
		};
        
		vm.editDescription = function (tcpdump) {
            serviceDataByCommands
                    .edit(vm, tcpdump, 'description')
                    .then(function() {
                        //console.log(response.data);
                        vm.notify('success','Команда "' + tcpdump.description + '" успешно изменена!');
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
		};
        
		vm.runGenerate = function () {

            vm.showGen = '';
            
            if( sizeOf(vm.selectModel.selectParametrsNotSections) ){
                
                vm.newGenerationCommand = 'tcpdump';

                for (var item in vm.selectModel.selectParametrsNotSections) {

                    if(vm.selectModel.selectParametrsNotSections[item]['name'] === '-i'){
                        vm.newGenerationCommand += ' ' + vm.selectModel.selectParametrsNotSections[item]['name'] + ' ' + vm.newNetInterface;
                    }
                    else if(vm.selectModel.selectParametrsNotSections[item]['name'] === '-c'){
                        vm.newGenerationCommand += ' ' + vm.selectModel.selectParametrsNotSections[item]['name'] + ' ' + vm.newNumberPackages;
                    }
                    else if(vm.selectModel.selectParametrsNotSections[item]['name'] === '-s'){
                        vm.newGenerationCommand += ' ' + vm.selectModel.selectParametrsNotSections[item]['name'] + ' ' + vm.newNumberPackagesByte;
                    }
                    else{
                        vm.newGenerationCommand += ' ' + vm.selectModel.selectParametrsNotSections[item]['name'];
                    }

                }
            
                vm.newGenerationCommand += ' ' + vm.newFilters;
                vm.notify('success','Команда ' + vm.newGenerationCommand + 'успешно сгенерированна');
                vm.showGen = 'success';
            }
		};
        
		vm.check = function () {

            if(sizeOf(vm.selectModel.selectParametrsNotSections)){

                for (var item in vm.selectModel.selectParametrsNotSections) {

                        if(vm.cClass == 0 && vm.selectModel.selectParametrsNotSections[item]['name'] === '-i'){
                            vm.cClass = 1;
                        }
                        if(vm.cNumberPackages == 0 && vm.selectModel.selectParametrsNotSections[item]['name'] === '-c'){
                            vm.cNumberPackages = 2;
                        }
                        if(vm.cNumberPackagesByte == 0 && vm.selectModel.selectParametrsNotSections[item]['name'] === '-s'){
                            vm.cNumberPackagesByte = 3;
                        }
                        if(vm.selectModel.selectParametrsNotSections[item]['name'] !== '-D'){
                            vm.showFilters = 'success';
                        } 
                }
                vm.showButtonGen = 'success';
            }
            else{
                vm.cClass = 0;    
                vm.cNumberPackages = 0;    
                vm.cNumberPackagesByte = 0;  
                vm.showGen = '';
                vm.showFilters = '';
                vm.showButtonGen = '';
                vm.newFilters = '';
                vm.newDescription = '';
            }

		};
        
        vm.notify = function(type,text){
            
            if (type === 'simple')
            {
                LxNotificationService.notify('Lorem Ipsum');
            }
            else if (type === 'sticky')
            {
                LxNotificationService.notify('Lorem Ipsum', undefined, true);
            }
            else if (type === 'icon')
            {
                LxNotificationService.notify('Lorem Ipsum', 'android');
            }
            else if (type === 'color')
            {
                LxNotificationService.notify('Lorem Ipsum', undefined, false, 'grey');
            }
            else if (type === 'info')
            {
                LxNotificationService.info('Lorem Ipsum');
            }
            else if (type === 'success')
            {
                LxNotificationService.success(text);
            }
            else if (type === 'warning')
            {
                LxNotificationService.warning('Lorem Ipsum');
            }
            else if (type === 'error')
            {
                LxNotificationService.error(text);
            }
        };

    };
   
})();