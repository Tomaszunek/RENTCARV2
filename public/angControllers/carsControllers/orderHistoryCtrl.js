angular.module('ugmanage').controller("orderHistoryCtrl", ['$scope', '$location', '$routeParams', '$http', '$rootScope', function($scope, $location, $routeParams, $http, $rootScope){
  if($rootScope.authenticated == false){
    $location.path('/login');
  }

  $scope.orders = {};

  $http.get('/cars/orderHistory')
    .then(function successCallback(response) {
      $scope.orders = response.data;
    }, function errorCallback(response) {
  });

}]);
