angular.module('ugmanage').controller("profileController", ['$scope', '$location', '$routeParams', '$http', '$rootScope', function($scope, $location, $routeParams, $http, $rootScope){

  if($rootScope.authenticated == false){
    $location.path('/login');
  }

  $scope.user = {};

  var userDetId;

  $http.get('/api/getUsers/')
    .then(function successCallback(response) {

      var userDet = response.data.userDetails;
      var userPhone = response.data.user.phone;
      var lastLogin = response.data.user.last_login;
      userDetId = userDet.id;
      $scope.user.firstName = userDet.firstName;
      $scope.user.lastName  = userDet.lastName;
      $scope.user.cityLive  = userDet.cityLive;
      $scope.user.address   = userDet.address;
      $scope.user.birthDay  = userDet.birthDay;
      $scope.user.phone     = userPhone;
      $scope.user.lastLogin = lastLogin;

    }, function errorCallback(response) {
    });

}]);
