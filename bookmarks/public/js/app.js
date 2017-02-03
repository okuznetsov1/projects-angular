(function(){

    var app = angular.module('bookmarksLibrary', ['lumx']);

    app.controller('BookmarkController', ['$scope', '$http', '$log', function($scope, $http, $log) {

        $scope.bookmarkslist = [];
        $http.get('/anguler-tasks-bookmarks/getBookmarkData.php')
            .then(function(response) {

                $scope.bookmarkslist = response.data;

            },
            function(err) {

            });
        
        $scope.addBookmark = function() {

            $http.post('/anguler-tasks-bookmarks/addBookmarkData.php',{url:$scope.newUrl,description:$scope.newDescription,completed:'false'})
                .then(function(response) {

//                    console.log(response.data[0].id);

                    $scope.bookmarkslist.push({
                            id: response.data[0].id,
                            url: response.data[0].url,
                            description: response.data[0].description,
                            completed: response.data[0].completed
                    });

                })
                .error(function(err){
                    $log.error(err);
                });
            
        };

	$scope.deleteBookmark = function (bookmark) {

            if (''+bookmark.completed === "true"){        

                $http.post('/anguler-tasks-bookmarks/deleteBookmarkData.php',{id:bookmark.id})
                    .then(function(response) {
//                    console.log(response);
                        $scope.bookmarkslist.splice($scope.bookmarkslist.indexOf(bookmark), 1);

                    })
                    .error(function(err){
                        $log.error(err);
                    });

            }   
            
	};

	$scope.editBookmarkUrl = function (bookmark) {
            
            $http.post('/anguler-tasks-bookmarks/editBookmarkData.php',{id:bookmark.id,url:bookmark.url})
                .then(function(response) {
                    console.log(response.data);
                })
                .error(function(err){
                    $log.error(err);
                });
            
	};
        
	$scope.editBookmarkDescription = function (bookmark) {
            
            $http.post('/anguler-tasks-bookmarks/editBookmarkData.php',{id:bookmark.id,description:bookmark.description})
                .then(function(response) {
                    console.log(response.data);
                })
                .error(function(err){
                    $log.error(err);
                });
            
	};
        
	$scope.markAll = function (completed) {

		$scope.bookmarkslist.forEach(function (bookmark) {
                    
                    bookmark.completed = completed;
                    
		});
                
	};                
        
    }]);

  
})();