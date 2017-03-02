(function(){

var myApp = angular.module('myApp', [ 'data-table' ]);
 

myApp.controller('MyController', function($scope, $http, $timeout) {
  $scope.options = {
    rowHeight: 50,
    footerHeight: 50,
    headerHeight: 50,
    scrollbarV: true,
    emptyMessage: 'Nothing to show...',
    columns: [{
      name: "Name",
      prop: "name",
      width: 300,
      sort: 'asc'
    }, {
      name: "Gender",
      prop: "gender"
    }, {
      name: "Company",
      prop: "company"
    }],
    columnMode: 'force',
    paging: {
      externalPaging: false
    }
  };

  // pass undefined to show a loading message
  $scope.data = undefined;

  $timeout(function() {
    $http.get('https://cdn.rawgit.com/Swimlane/angular-data-table/master/demos/data/100.json').success(function(data) {
      $scope.data = data;
    });
  }, 1000);

});


})();