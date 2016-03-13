var bookTradingApp = angular.module('bookTrading', ['ngRoute']);

bookTradingApp.controller('MainController', ['$scope', function($scope){
  $scope.books = [
    { name: 'Master HTML/CSS/Javascript', completed: true },
    { name: 'Learn AngularJS', completed: false },
    { name: 'Build NodeJS backend', completed: false },
    { name: 'Get started with ExpressJS', completed: false },
    { name: 'Setup MongoDB database', completed: false },
    { name: 'Be awesome!', completed: false },
  ]
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