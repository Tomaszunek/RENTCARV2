angular.module('ugmanage').controller("registerUserController", ['$scope', '$location', '$routeParams', '$http', '$rootScope', function($scope, $location, $routeParams, $http, $rootScope){

  if($rootScope.authenticated == true){
    $location.path('/');
  }

  $scope.register = function() {
    var data = {
      'username' : $scope.user.username,
      'password' : $scope.user.password,
      'email' : $scope.user.email,
      'phone' : $scope.user.phoneNumber,
    }
    $http.post('/api/register/', data)
      .then(function successCallback(response) {
        $location.path('/succRegister');
      }, function errorCallback(response) {
        $location.path('/register');
      });
    }
}]);
