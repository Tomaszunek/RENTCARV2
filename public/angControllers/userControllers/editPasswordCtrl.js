angular.module('ugmanage').controller("editPasswordCtrl", ['$scope', '$location', '$routeParams', '$http', '$rootScope', function($scope, $location, $routeParams, $http, $rootScope){

  if($rootScope.authenticated == false){
    $location.path('/login');
  }

  $scope.errors = " ";
  $scope.user = {};

  $scope.changePassword = function(){
  if($scope.user.newPassword1 == $scope.user.newPassword2){
    $scope.errors = ""
    $http.get('/api/getUserDetails/')
      .then(function successCallback(response) {
        usernameP = response.data.username;
        $http.get('/api/checkRightPassowds/' + usernameP + '/' + $scope.user.oldPassword)
          .then(function successCallback(response) {
            if(response.data == "theSamePassword"){
              data = {password : $scope.user.newPassword1}
              $http.post('/api/editPassword/' + usernameP, data)
                .then(function successCallback(response) {
                  $scope.errors = response.data;
                }, function errorCallback(response) {
                  $scope.errors = "Something goes wrong."
                });
            }
            else if(response.data == "otherPasswords"){
              $scope.errors = "You type bad old password."
            }

          }, function errorCallback(response) {
            $scope.errors = "Something goes wrong."
          });
      }, function errorCallback(response) {
        $scope.errors = "Something goes wrong."
      });
  } else {
    $scope.errors = "Passwords aren't the same! :("
  }
  }
}]);
