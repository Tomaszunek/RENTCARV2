var app = angular.module("ugmanage", ['ngRoute']).run(function($rootScope, $http, $location){

  $http.get('/api/getUserDetails/')
    .then(function successCallback(response) {
      if(response.data.username != undefined){
        $rootScope.authenticated = true;
      } else {
        $rootScope.authenticated = false;
      }
    }, function errorCallback(response) {

    });

  $rootScope.signout = function(){
  	$http.get('api/signout');
      $rootScope.authenticated = false;
      $location.path('/');
  }
});


app.config(function($routeProvider){
  $routeProvider
    .when("/",
    {
      templateUrl: "./html/userAuth/main.html",
      controller: "mainController"
    })

    .when("/register",
    {
      templateUrl: './html/userAuth/register.html',
      controller: 'registerUserController'
    })

    .when("/login",
    {
      templateUrl: "./html/userAuth/login.html",
      controller: "loginUserController"
    })

    .when("/profile",
    {
      templateUrl: "./html/userAuth/profile.html",
      controller: "profileController"
    })

    .when("/forgotPassword",
    {
      templateUrl: './html/userAuth/forgotPassword.html',
      controller: 'forgotPasswordCtrl'
    })

    .when("/firstLogin",
    {
      templateUrl: "./html/userAuth/firstLogin.html",
      controller: "firstLoginCtrl"
    })

    .when("/editProfile",
    {
      templateUrl: './html/userAuth/editProfile.html',
      controller: 'editProfileCtrl'
    })

    .when("/logout",
    {
      templateUrl: './html/userAuth/editProfile.html',
      controller: 'editProfileCtrl'
    })

    .when("/deleteAcc",
    {
      templateUrl: './html/userAuth/deleteProfile.html',
      controller: 'deleteProfileCtrl'
    })

    .when("/succRegister",
    {
      templateUrl: './html/userAuth/succRegister.html',
      controller: 'succRegister'
    })

    .when("/unActiveAcc",
    {
      templateUrl: './html/userAuth/unActiveAcc.html',
      controller: 'unActiveAcc'
    })

    .when("/editPassword",
    {
      templateUrl: "./html/userAuth/editPassword.html",
      controller: "editPasswordCtrl"
    })


    //Cars conntrollers
    .when("/carList",
    {
      templateUrl: "./html/carViews/carList.html",
      controller: "carListCtrl"
    })

    .when("/carDetail/:carId",
    {
      templateUrl: "./html/carViews/carDetail.html",
      controller: "carDetailCtrl"
    })

    .when("/orderHistory",
    {
      templateUrl: "./html/carViews/orderHistory.html",
      controller: "orderHistoryCtrl"
    })
});
