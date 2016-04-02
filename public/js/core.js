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
      controller: 'BookController'
    })
    .when('/books', {
      templateUrl: 'templates/books/books.html',
      controller: 'BookController'
    })
    .when('/book', {
      templateUrl: 'templates/books/book.html',
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
      templateUrl: 'templates/books/my-books.html',
      controller: 'BookController'
    })
    .when('/books/new', {
      templateUrl: 'templates/books/new.html',
      controller: 'BookController'
    })
    .when('/users/:userId', {
      templateUrl: 'templates/users/user.html',
      controller: 'UserController'
    });

  $locationProvider.html5Mode(true);
});