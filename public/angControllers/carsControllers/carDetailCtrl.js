angular.module('ugmanage').controller("carDetailCtrl", ['$scope', '$location', '$routeParams', '$http', '$rootScope', function($scope, $location, $routeParams, $http, $rootScope){
  $scope.allRegionNames = {};
  $scope.insurments = {};
  $scope.regionSizes = {};
  $scope.regionNames = {};

  $scope.formValid = true;

  $scope.rent = {};
  $scope.price = {};
  $scope.hidden = {};
  $scope.price.finalPrice = 0;

  var carPrice = 0;

  var idCar = $routeParams.carId;
  $scope.car = {};
  $http.get('/cars/getCar/' + idCar)
    .then(function successCallback(response) {
      $scope.car = response.data;
    }, function errorCallback(response) {
  });

  $http.get('/cars/rentCarFormTables')
    .then(function successCallback(response) {
      $scope.allRegionNames = response.data.regionName;

      $scope.insurments = response.data.insurment;
      $scope.regionSizes = response.data.regionSize;
      $scope.regionNames = $scope.allRegionNames.slice(0,5);

      $scope.rent.insurment = $scope.insurments[0];
      $scope.rent.regionSize = $scope.regionSizes[0];
      $scope.rent.regionName = $scope.regionNames[0];

      var today = new Date();
      $scope.rent.startServ = today;
      $scope.rent.endServ = today;

      $scope.price.insurancePrice = $scope.insurments[0].insurancePrice;
      $scope.price.regionPrice =  $scope.regionSizes[0].regionPrice;
      $scope.price.dateCommant = "The service will last 1 day.";
      $scope.hidden = {
        carPrice : $scope.car.CarPriceCategory.pricePerDay,
        insurment : $scope.insurments[0].insurancePrice,
        regionPrice : $scope.regionSizes[0].regionPrice,
        countDay    : 1
      }

      calculatePrice();
    }, function errorCallback(response) {
      console.log(response);
  });

  $scope.rentCar = function(){
    var data = {
      idCar     : idCar,
      insurment : $scope.rent.insurment.id,
      regionSize : $scope.rent.regionSize.id,
      regionName : $scope.rent.regionName.id,
      startServ  : $scope.rent.startServ,
      endServ    : $scope.rent.endServ,
      price      : $scope.price.finalPrice
    }
    $http.post('/cars/makeRentCar/', data)
      .then(function successCallback(response) {
        $location.path('/');
      }, function errorCallback(response) {
        $location.path('/');
      });
    }

    $scope.insurmentChange = function(){
      var selectIns = document.getElementById("insurment");
      var strIns = selectIns.options[selectIns.selectedIndex].value;
      $scope.price.insurancePrice = $scope.insurments[strIns - 1].insurancePrice;
      $scope.hidden.insurment = $scope.insurments[strIns - 1].insurancePrice;
      calculatePrice();
    }

    $scope.regionChange = function(){
      var selectRegS = document.getElementById("regionSize");
      var strRegS = selectRegS.options[selectRegS.selectedIndex].value;
      $scope.price.regionPrice = $scope.regionSizes[strRegS - 1].regionPrice;
      $scope.hidden.regionPrice = $scope.regionSizes[strRegS - 1].regionPrice;

      if(strRegS - 1 == 0){
        $scope.regionNames = $scope.allRegionNames.slice(0,5);
        $scope.rent.regionName = $scope.regionNames[0];
      }
      if(strRegS - 1 == 1){
        $scope.regionNames = $scope.allRegionNames.slice(5,9);
        $scope.rent.regionName = $scope.regionNames[0];
      }

      if(strRegS - 1 == 2){
        $scope.regionNames = $scope.allRegionNames.slice(9,10);
        $scope.rent.regionName = $scope.regionNames[0];
      }

      calculatePrice();
    }

    $scope.dateChange = function(){
      var startSer = document.getElementById("startServ").value;
      var endSer = document.getElementById("endServ").value;
      var today = new Date();
      var stDate = new Date(startSer);
      var enDate = new Date(endSer);

      var servLeng = Math.floor((enDate - stDate)/(24*60*60*1000)+1);
      var endToday = Math.floor((enDate - today)/(24*60*60*1000)+1);
      var staToday = Math.floor((stDate - today)/(24*60*60*1000)+1);

      if(servLeng <= 0){
        $scope.price.dateCommant = "Please choose first date before second";
        $scope.formValid = false;
      }
      else if(endToday < 0){
        $scope.price.dateCommant = "Please choose second date in future";
        $scope.formValid = false;
      }
      else if(staToday < 0){
        $scope.price.dateCommant = "Please choose first date in future";
        $scope.formValid = false;
      } else {
        $scope.price.dateCommant = "The service will last " + servLeng  + " day.";
        $scope.formValid = true;
          $scope.hidden.countDay = servLeng;
      }
      calculatePrice();
    }

    function calculatePrice(){
      //console.log($scope.hidden.countDay + "*" + ($scope.hidden.regionPrice + "+" + $scope.hidden.carPrice) + "+" +  $scope.hidden.insurment);
      $scope.price.finalPrice = $scope.hidden.countDay * ($scope.hidden.regionPrice + $scope.hidden.carPrice) + $scope.hidden.insurment;
    }
}]);
