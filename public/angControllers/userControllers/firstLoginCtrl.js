angular.module('ugmanage').controller("firstLoginCtrl",  ['$scope', '$location', '$routeParams', '$http', '$rootScope', function($scope, $location, $routeParams, $http, $rootScope){

  if($rootScope.authenticated == false){
    $location.path('/login');
  }

  $scope.addUserDetails = function() {
    var data = {
      firstName : $scope.user.firstName,
      lastName  : $scope.user.lastName,
      gender    : $scope.user.gender,
      cityLive  : $scope.user.cityLive,
      address   : $scope.user.address,
      birthDay  : $scope.user.birthDay
    }

    $http.post('/api/userDetails/', data)
      .then(function successCallback(response) {
        $location.path('/');
      }, function errorCallback(response) {
        $location.path('/firstLogin');
      });
    }
}]);
