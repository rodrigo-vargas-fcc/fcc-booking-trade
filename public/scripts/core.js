'use strict';

angular
  .module('bookTrading', [
        'ngRoute',
        'ngCookies',
        'ui.rvg.angular'
        ]
      )
  .factory('UserService', function($cookies) {
    var token = '';

    return {
      getToken: function () {
        if (token == '')
          token = $cookies.get('token');

        return token;
      },
      setToken: function(value) {
        token = value;
        var expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 60);
        $cookies.put('token', token, {'expires' : expirationDate });
      }
    };
  })
  .config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl'
    })
    .when('/books', {
      templateUrl: 'views/books/books.html',
      controller: 'BookCtrl'
    })
    .when('/book', {
      templateUrl: 'views/books/book.html',
      controller: 'BookCtrl'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'UserCtrl'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'UserCtrl'
    })
    .when('/my-books', {
      templateUrl: 'views/books/my-books.html',
      controller: 'BookCtrl'
    })
    .when('/books/new', {
      templateUrl: 'views/books/new.html',
      controller: 'BookCtrl'
    })
    .when('/users/:userId', {
      templateUrl: 'views/users/user.html',
      controller: 'UserCtrl'
    });

  $locationProvider.html5Mode(true);
});