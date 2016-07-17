'use strict';

angular.module('bookTrading')
.controller('BookCtrl', function($scope, $http, $location, UserService){
  var currentToken = UserService.getToken();
  $scope.loading = 0;

  if (!currentToken)
  {
    $location.path('/login');
    return;
  }

  var headers = {
    'Authorization': currentToken,
    'Accept': 'application/json;odata=verbose'
  };
  
  $scope.getBooks = function(){
    $scope.loading++;
    $http({
      method: 'GET',
      'url': '/api/books',
      headers : headers
    })
    .then(
      function successCallback(response) {
        if (response.data.success == true)
          $scope.books = response.data.books;
        
        $scope.loading--;
      },
      function errorCallback(response) {
        alert(response);
        $scope.loading--;
      }
    );
  }

  $scope.getBooks();
});
