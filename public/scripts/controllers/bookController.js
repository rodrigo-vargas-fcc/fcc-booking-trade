'use strict';

angular.module('bookTrading')
.controller('BookController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService){
  var currentToken = UserService.getToken();

  if (currentToken == "")
  {
    //$location.path('/login');
    //return;
  }

  $scope.$watch('test', function(value, oldValue){
    console.log(value);
  });

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
        // TODO: THink in something to handle the signup error
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
        // TODO: THink in something to handle the signup error
      }
    );
  }

  $scope.getBooks();
}]);
