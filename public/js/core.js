//var bookTradingApp = angular.module('bookTrading', ['ngRoute']);

bookTradingApp.factory('UserService', function() {
  var token = '';

  return {
    getToken: function () {
      return token;
    },
    setToken: function(value) {
      token = value;
    }
  };
});

bookTradingApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'books.html',
      controller: 'MainController'
    })
    .when('/books', {
      templateUrl: 'books.html',
      controller: 'BookController'
    })
    .when('/book', {
      templateUrl: 'book.html',
      controller: 'BookController'
    })
    .when('/signup', {
      templateUrl: 'templates/signup.html',
      controller: 'MainController'
    })
    .when('/login', {
      templateUrl: 'templates/login.html',
      controller: 'MainController'
    })
    .when('/my-books', {
      templateUrl: 'my-books.html',
      controller: 'MainController'
    })
    .when('/books/new', {
      templateUrl: 'templates/books/new.html',
      controller: 'MainController'
    });

  $locationProvider.html5Mode(true);
});