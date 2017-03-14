(function(){
   'use strict';
   
    angular
        .module('app')
        .component( 'compFormEdit', {
            bindings   : {
                info: '=info'
            },
            templateUrl: 'js/app/templates/edit/componentInputEdit.html'
        });
})();