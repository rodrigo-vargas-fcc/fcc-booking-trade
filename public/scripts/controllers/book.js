'use strict';

angular.module('bookTrading')
.controller('BookCtrl', function($scope, $http, $location, UserService){
  var currentToken = UserService.getToken();

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
    $http({
      method: 'GET',
      'url': '/api/books',
      headers : headers
    })
    .then(
      function successCallback(response) {
        if (response.data.success == true){
          $scope.books = response.data.books;
        }          
      },
      function errorCallback(response) {
        alert(response);
      }
    );
  }

  $scope.addBook = function(){
    $http(
    {
      method: 'POST',
      url: '/api/books/new',
      headers : headers
    })
    .then(function successCallback(response) {
        if (response.data.success == true){
          $location.path('/my-books');
        }
      },
      function errorCallback(response) {
        alert(response);
      }
    );
  }

  $scope.getBooks();
});
