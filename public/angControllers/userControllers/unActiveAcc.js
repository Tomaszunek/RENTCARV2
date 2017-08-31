angular.module('ugmanage').controller("unActiveAcc", ['$scope', '$location', '$routeParams', '$http', '$rootScope', function($scope, $location, $routeParams, $http, $rootScope){

  if($rootScope.authenticated == true){
    $location.path('/');
  }

}]);
