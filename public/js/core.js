var bookTradingApp = angular.module('bookTrading', ['ngRoute']);

bookTradingApp.controller('MainController', ['$rootScope', '$scope', '$http', '$location', function($rootScope, $scope, $http, $location){
  $scope.books = [
    { name: 'Master HTML/CSS/Javascript', completed: true },
    { name: 'Learn AngularJS', completed: false },
    { name: 'Build NodeJS backend', completed: false },
    { name: 'Get started with ExpressJS', completed: false },
    { name: 'Setup MongoDB database', completed: false },
    { name: 'Be awesome!', completed: false },
  ]

  $rootScope.userId = 0;

  $scope.signup = function() {
    if ($scope.formData.email != undefined
        && $scope.formData.password != undefined) {
      $scope.loading = true;

      $http.post('/api/signup', $scope.formData)

      .then(function successCallback(response) {
          if (response.data.status == "success"){
            $rootScope.userId = response.data.user._id;

            $location.path( "/books" );
          }          
        }, function errorCallback(response) {
          // TODO: THink in something to handle the signup error
        });
    }
  }

  $scope.login = function() {
    if ($scope.formData.email != undefined
        && $scope.formData.password != undefined) {
      $scope.loading = true;

      $http.post('/api/signup', $scope.formData)

      .then(function successCallback(response) {
          if (response.data.status == "success"){
            $rootScope.userId = response.data.user._id;

            //$location.path( "/books" );
          }          
        }, function errorCallback(response) {
          // TODO: THink in something to handle the signup error
        });
    }
  }
}]);

bookTradingApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'books.html',
      controller: 'MainController'
    })
    .when('/books', {
      templateUrl: 'books.html',
      controller: 'MainController'
    })
    .when('/book', {
      templateUrl: 'book.html',
      controller: 'MainController'
    })
    .when('/signup', {
      templateUrl: 'signup.html',
      controller: 'MainController'
    })
    .when('/login', {
      templateUrl: 'login.html',
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