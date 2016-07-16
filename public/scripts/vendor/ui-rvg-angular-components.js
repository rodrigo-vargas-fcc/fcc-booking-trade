angular.module('ui.rvg.angular', [])
.directive('rvgtypeahead', [ '$http', function($http) {
  return {
    restrict: 'E',
    require : 'ngModel',
    scope: {
      jsonUrl: '@jsonUrl',
      results: '@results',
      query: '@query',
      ngModel: '=ngModel'
    },
    link: function(scope, elem, attrs, ngModel) {
      scope.selectItem = function(itemId) {
        console.log(itemId);
//        ngModelController.$render = itemId;
        //scope.$apply(function() {
          scope.ngMOdel = itemId;
        //});
      }

      scope.$watch("query", function(query) {
        $http({
          method : 'GET',
          url    : 'https://www.googleapis.com/books/v1/volumes',
          params : { q : query }
        })
        .then(
          function successCallback(response) {
            scope.results = response.data.items;
          },
          function errorCallback(response) {
            // TODO: THink in something to handle the signup error
          }
        );
      });
    },
    templateUrl: 'type-ahead-template.html'
  };
}]);