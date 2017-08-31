angular.module('ugmanage').controller("mainController", ['$scope', '$location', '$routeParams', '$http', '$rootScope', function($scope, $location, $routeParams, $http, $rootScope){
  var slideIndex = 0;
  carousel();

  function carousel() {
      var i;
      var x = document.getElementsByClassName("mainSlides");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > x.length) {slideIndex = 1}
      x[slideIndex-1].style.display = "grid";
      setTimeout(carousel, 4000);
  }
}]);
