angular.module('ugmanage').controller("forgotPasswordCtrl", ['$scope', '$location', '$routeParams', '$http', '$rootScope', function($scope, $location, $routeParams, $http, $rootScope){

  if($rootScope.authenticated == true){
    $location.path('/');
  }

$scope.resetPassword = function(){
  var userEmail = $scope.user.email;
  $http.post('/api/resetPassword/' +  userEmail + '/')
    .then(function successCallback(response) {
      $location.path('/login');
    }, function errorCallback(response) {
      $location.path('/login');
    });
  }
}]);
