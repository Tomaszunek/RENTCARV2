angular.module('ugmanage').controller("loginUserController", ['$scope', '$location', '$routeParams', '$http', '$rootScope', function($scope, $location, $routeParams, $http, $rootScope){

  if($rootScope.authenticated == true){
    $location.path('/');
  }

  $scope.massage = "";

  $scope.login = function(){
    var data = {
      'username' : $scope.user.username,
      'password' : $scope.user.password
    }
    $http.post('/api/login', data)
      .then(function successCallback(response) {
        if(response.data == 'isUnactive'){
          $location.path('/unActiveAcc');
        }
        else if(response.data == 'firstLogin'){
          $rootScope.authenticated = true;
          $location.path('/firstLogin');
        }
        else if(response.data == 'nextLogin'){
          $rootScope.authenticated = true;
          $location.path('/');
        }
        else if(response.data == 'IncorrectMailPass'){
          $scope.massage = "Incorrect mail or password";
        }
        //$location.path('/profile');
      }, function errorCallback(response) {
        $scope.massage = "Incorrect mail or password";
      });
    }
}]);
