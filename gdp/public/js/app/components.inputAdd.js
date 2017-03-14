(function(){
   'use strict';
   
    angular
        .module('app')
        .component( 'compFormAdd', {
            bindings   : {
                info: '=info'
            },
            templateUrl: 'js/app/templates/add/componentInputAdd.html'
        });
        
})();