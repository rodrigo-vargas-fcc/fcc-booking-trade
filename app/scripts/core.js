'use strict';

angular
  .module('bookTrading', [
        'ngRoute',
        'ngCookies',
        'ui.rvg.angular'
        ]
      )
  .factory('UserService', function($cookies) {
    var userInfo;

    return {
      getCurrentUserInfo : function(){
        if (!userInfo)
        {
          userInfo = JSON.parse($cookies.get('userInfo'));
        }

        return userInfo;
      },
      setCurrentUserInfo : function(value){
        userInfo = value;

        var expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 60);
        $cookies.put('userInfo', JSON.stringify(userInfo), {'expires' : expirationDate });
      },
      clearCurrentUserInfo: function() {
        userInfo = null;
        $cookies.remove('userInfo');
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
    .when('/settings', {
      templateUrl: 'views/settings/index.html',
      controller: 'SettingsCtrl'
    });

  $locationProvider.html5Mode(true);
});