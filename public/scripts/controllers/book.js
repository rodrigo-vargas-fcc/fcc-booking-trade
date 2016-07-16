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
          $scope.myBooks = response.data.books;
        
        $scope.loading--;
      },
      function errorCallback(response) {
        alert(response);
        $scope.loading--;
      }
    );
  }

  $scope.addBook = function(){
    $http(
    {
      method: 'POST',
      url: '/api/books/new',
      headers : headers,
      data : { 'name' : $scope.newBook.volumeInfo.title, 
               'image_url' : $scope.newBook.volumeInfo.imageLinks.thumbnail }
    })
    .then(function successCallback(response) {
        $scope.newBook = null;
        $scope.getBooks();
      },
      function errorCallback(response) {
        alert(response);
      }
    );
  }

  $scope.removeBook = function(bookId){
    if (!confirm('Are you sure?'))
      return;

    $scope.loading++;
    $http(
    {
      method: 'POST',
      url: '/api/books/destroy',
      headers : headers,
      data : { 'id' : bookId }
    })
    .then(function successCallback(response) {
        $scope.loading--;
        $scope.getBooks();
      },
      function errorCallback(response) {
        $scope.loading--;
        alert(response);
      }
    );
  }

  $scope.getBooks();
});
