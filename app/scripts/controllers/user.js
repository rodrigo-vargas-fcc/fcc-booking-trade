'use strict';

angular.module('bookTrading')
.controller('UserCtrl', function($scope, $http, UserService, $location){
  $scope.currentUser = UserService.getCurrentUserInfo();

  if ($scope.currentUser)
      $location.path('/books');

  $scope.signup = function(isValid) {
    $scope.submitted = true;
    $scope.userForm.email.$setValidity("alreadyUsed", true);

    if (!isValid)
      return;

    if ($scope.formData.email != undefined
        && $scope.formData.password != undefined) {
      $scope.loading = true;

      $http.post('/api/signup', $scope.formData)

      .then(function successCallback(response) {
          if (response.data.success == true){
            UserService.setCurrentUserInfo(response.data.user);

            $location.path("/books");
          }
          else
          {
            $scope.userForm.email.$setValidity("alreadyUsed", false);
          }
        }, function errorCallback(response) {
          alert(response.data);
        });
    }
  }

  $scope.login = function(isValid) {
    $scope.submitted = true;
    $scope.userForm.password.$setValidity("invalidCombination", false);

    if (!isValid)
      return;

    $http.post('/api/login', $scope.formData)
    .then(function successCallback(response) {
        if (response.data.success == true){
          UserService.setCurrentUserInfo(response.data.user);

          $location.path("/books");
        }
        else
        {
          $scope.userForm.password.$setValidity("invalidCombination", true);
        }
      }, function errorCallback(response) {
        alert(response.data);
      });    
  }
});