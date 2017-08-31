angular.module('ugmanage').controller("editProfileCtrl", ['$scope', '$location', '$routeParams', '$http', '$rootScope', function($scope, $location, $routeParams, $http, $rootScope){

  if($rootScope.authenticated == false){
    $location.path('/login');
  }

  $scope.user = {};
  $scope.massage = "";

  var userDetId;

  $http.get('/api/getUsers/')
    .then(function successCallback(response) {
      var userDet = response.data.userDetails;
      userDetId = userDet.id;

      $scope.user.firstName = userDet.firstName;
      $scope.user.lastName  = userDet.lastName;
      $scope.user.cityLive  = userDet.cityLive;
      $scope.user.address   = userDet.address;

    }, function errorCallback(response) {
    });


    $scope.editProfileDet = function(){
      var data = {
        firstName : $scope.user.firstName,
        lastName : $scope.user.lastName,
        cityLive : $scope.user.cityLive,
        address : $scope.user.address
      }
      $http.post('/api/updateUserDetails/' + userDetId, data)
        .then(function successCallback(response) {
          $location.path('/profile');
        }, function errorCallback(response) {
          $location.path('/profile');
        });
      }

}]);
