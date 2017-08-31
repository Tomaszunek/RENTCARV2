angular.module('ugmanage').controller("carListCtrl", ['$scope', '$location', '$routeParams', '$http', '$rootScope', function($scope, $location, $routeParams, $http, $rootScope){
  $scope.cars = {};
  $scope.allCars = {};
  $scope.brands = {};
  $scope.priceCategories = {};
  $scope.carTypes = {};

  $scope.finder = "";

  $http.get('/cars/getAllCars')
    .then(function successCallback(response) {
      $scope.cars = response.data;
      $scope.allCars = response.data;
    }, function errorCallback(response) {
      console.log(response);
  });

  $http.get('/cars/carFinderTables')
    .then(function successCallback(response) {

      $scope.brands = response.data.brands;
      $scope.priceCategories = response.data.priceCategory;
      $scope.carTypes = response.data.type;

    }, function errorCallback(response) {
      console.log(response);
  });

  $scope.changeFinder = function(){
    var foundCars = new Array();
    var secondCars = new Array();
    var thirdCar = new Array();
    var forthCar = new Array();
    if($scope.finder.carBrand != undefined){
      for(var car in $scope.allCars){
        if($scope.allCars[car].CarBrand.carBrand == $scope.finder.carBrand.carBrand)
        {
          foundCars.push($scope.allCars[car]);
        }
      }
    } else {
      foundCars = $scope.allCars;
    }

    if($scope.finder.priceCategoryName != undefined){
      for(var car in foundCars){
        if(foundCars[car].CarPriceCategory.priceCategoryName == $scope.finder.priceCategoryName.priceCategoryName)
        {
          secondCars.push(foundCars[car]);
        }
      }
    } else {
      secondCars = foundCars;
    }

    if($scope.finder.carType != undefined){
      for(var car in secondCars){
        if(secondCars[car].CarType.typeName == $scope.finder.carType.typeName)
        {
          thirdCar.push(secondCars[car]);
        }
      }
    } else {
      thirdCar = secondCars;
    }

    if($scope.finder.countPerson == 0){
      forthCar = thirdCar;
    }
    else {
      for(var car in thirdCar){
        if(thirdCar[car].countPerson == $scope.finder.countPerson)
        {
          forthCar.push(thirdCar[car]);
        }
      }
    }
    $scope.cars = forthCar;
  }
}]);
