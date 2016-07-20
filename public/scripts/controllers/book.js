'use strict';

angular.module('bookTrading')
.controller('BookCtrl', function($scope, $http, $location, UserService){
  var currentUser = UserService.getCurrentUserInfo();

  $scope.loading = 0;

  if (!currentUser)
  {
    $location.path('/login');
    return;
  }

  var headers = {
    'Authorization': currentUser.token,
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

  $scope.proposeTrade = function(bookId){
    $scope.loading++;
    $http({
      method: 'POST',
      'url': '/api/trades/propose',
      headers : headers,
      data : { bookId : bookId }
    })
    .then(
      function successCallback(response) {
        if (response.data.success == true)
          $scope.books = response.data.books;
        
        $scope.loading--;
        $scope.getBooks();
      },
      function errorCallback(response) {
        alert(response.data);
        $scope.loading--;
      }
    );
  }

  $scope.getBooks();
});
