'use strict';

angular.module('bookTrading')
.controller('UserLogoutCtrl', function($location, UserService){
  UserService.clearCurrentUserInfo();

  $location.path('/');
});
