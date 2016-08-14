angular
.module('ui.rvg.angular', [])
.directive('rvgtypeahead', function($http) {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/type-ahead.html',

    scope: {
      selectedResult: '=ngModel'
    },

    controller: function($scope){
      if ($scope.selectedResult === undefined) {
        $scope.selectedResult = null;
      }

      $scope.typeSomething = function(){
        if ($scope.inputValue.length > 2)
          $scope.getResults();        
      }

      $scope.getResults = function() {
        $http({
          method : 'GET',
          url    : 'https://www.googleapis.com/books/v1/volumes',
          params : { q : $scope.inputValue }
        })
        .then(
          function successCallback(response) {
            $scope.results = response.data.items;
          },
          function errorCallback(response) {
            console.log(response);
          }
        );
      }

      $scope.setResult = function(result){
        $scope.selectedResult = result;
        $scope.inputValue = "";
        $scope.results = [];
      }
    }
  };
});