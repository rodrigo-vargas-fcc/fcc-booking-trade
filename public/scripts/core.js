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
      },
      clearToken: function() {
        token = '';
        $cookies.remove('token');
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
    .when('/my-books', {
      templateUrl: 'views/books/my-books.html',
      controller: 'MyBooksCtrl'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'UserCtrl'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'UserCtrl'
    })
    .when('/logout', {
      controller: 'UserLogoutCtrl',
      templateUrl: 'views/logout.html',
    })
    .when('/users/:userId', {
      templateUrl: 'views/users/user.html',
      controller: 'UserCtrl'
    });

  $locationProvider.html5Mode(true);
});