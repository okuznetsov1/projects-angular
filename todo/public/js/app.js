(function(){

    var app = angular.module('todoList', ['lumx']);

    app.controller('TodoController', ['$scope', '$http', '$log', function($scope, $http, $log) {

        $scope.todoslist = [];
        $http.get('/anguler-tasks-todo/getTodoData.php')
            .then(function(response) {
                $scope.todoslist = response.data;
            },
            function(err) {

            });
        
        $scope.addTodo = function() {

            $http.post('/anguler-tasks-todo/addTodoData.php',{description:$scope.newTodo,completed:'false'})
                .then(function(response) {

//                    console.log(response.data[0].id);
                    $scope.todoslist.push({
                            id: response.data[0].id,
                            description: response.data[0].description,
                            completed: response.data[0].completed
                    });

                })
                .error(function(err){
                    $log.error(err);
                });
            
        };

	$scope.deleteTodo = function (todo) {

            if (''+todo.completed === "true"){
//                $log.info(todo.id);            
                $http.post('/anguler-tasks-todo/deleteTodoData.php',{id:todo.id})
                    .then(function(response) {
                        $scope.todoslist.splice($scope.todoslist.indexOf(todo), 1);

                    })
                    .error(function(err){
                        $log.error(err);
                    });

            }   
            
	};

	$scope.editTodo = function (todo) {
            
            $http.post('/anguler-tasks-todo/editTodoData.php',{id:todo.id,description:todo.description})
                .then(function(response) {
                    console.log(response.data);
                })
                .error(function(err){
                    $log.error(err);
                });
            

	};
        
	$scope.markAll = function (completed) {

		$scope.todoslist.forEach(function (todo) {
                    
                    todo.completed = completed;
                    
		});
                
	};                
        
    }]);

  
})();