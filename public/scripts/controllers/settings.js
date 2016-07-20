'use strict';

angular.module('bookTrading')
.controller('SettingsCtrl', function($scope, $http, $location, UserService) {
  var currentUser = UserService.getCurrentUserInfo();
  $scope.loading = 0;

  if (!currentUser)
  {
    $location.path('/login');
    return;
  }

  var headers = {
    'Authorization': currentUser.token,
    'Accept': 'application/json;odata=verbose'
  };

  $scope.getUserInfo = function(){
    $scope.loading++;
    $http({
      method: 'GET',
      'url': '/api/users/getCurrent',
      headers : headers
    })
    .then(
      function successCallback(response) {
        if (response.data.success == true)
          $scope.books = response.data.books;

        $scope.loading--;
      },
      function errorCallback(response) {
        alert(response);
        $scope.loading--;
      }
    );
  }

  $scope.updateUser = function(){
    $scope.loading++;
    $http({
      method: 'POST',
      'url': '/api/users/update',
      headers : headers,
      data : { user : $scope.user }
    })
    .then(
      function successCallback(response) {
        if (response.data.success == true)
        {
          var userInfo = UserService.getCurrentUserInfo();
          userInfo.name = response.data.name;
          UserService.setCurrentUserInfo(userInfo);
          $location.path("/books");
        }        
      },
      function errorCallback(response) {
        alert(response.data);
        $scope.loading--;
      }
    );
  }

  $scope.getUserInfo();
});
