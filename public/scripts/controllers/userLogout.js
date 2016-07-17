'use strict';

angular.module('bookTrading')
.controller('UserLogoutCtrl', function($location, UserService){
  UserService.clearToken();

  $location.path('/');
});
