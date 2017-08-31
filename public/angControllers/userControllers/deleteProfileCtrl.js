angular.module('ugmanage').controller("deleteProfileCtrl", ['$scope', '$location', '$routeParams', '$http', '$rootScope', function($scope, $location, $routeParams, $http, $rootScope){
  if($rootScope.authenticated == false){
    $location.path('/login');
  }

  $scope.deleteAcc = function(){
    var userId;
    $http.get('/api/getUsers/')
      .then(function successCallback(response) {
        userId = response.data.user.id;
        $http.delete('/api/deleteAcc/' +  userId)
          .then(function successCallback(response) {
            $location.path('/');
          }, function errorCallback(response) {
            $location.path('/');
          });
      }
      , function errorCallback(response) {
        $scope.errors = "Something goes wrong.";
      });

    }


}]);
