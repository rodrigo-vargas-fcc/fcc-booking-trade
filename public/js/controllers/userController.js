bookTradingApp.controller('UserController', ['$scope', '$routeParams', '$http','$location', 'UserService', function($scope, $routeParams, $http, $location, UserService){
  var userId = $routeParams.userId;

  var currentToken = UserService.getToken();

  if (currentToken == "")
  {
    $location.path('/login');
    return;
  }

  var headers = {
    'Authorization': currentToken,
    'Accept': 'application/json;odata=verbose'
  };

  $http({
      method: 'GET',
      'url': '/api/user',
      headers : headers,
      params : { userId : userId }
  })
  .then(function successCallback(response) {
      if (response.data.success == true){
        $scope.user = response.data.user;
      }
    }, function errorCallback(response) {
      // TODO: THink in something to handle the signup error
    }
  );

  $scope.proposeTrade = function(bookId){
    alert('trade proposed');
  }
}]);
