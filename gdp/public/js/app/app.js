(function(){
   'use strict';
   
    angular
        .module('app', ['lumx', 'lumx.data-table', 'lumx.dialog', 'googlechart', 'ngSanitize', 'FredrikSandell.worker-pool']);

    angular
        .module('app')
        .run(function (WorkerService) {
            //WorkerService.setAngularUrl('../bower_components/angular/angular.js');
            WorkerService.setAngularUrl('https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js');
            //WorkerService.addDependency(serviceName, moduleName, url);
        });
        
})();