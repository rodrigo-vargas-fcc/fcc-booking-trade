typeAhead.controller('TypeAheadController', function($scope, DataService) { // DI in action
  DataService.get('states.json').then(function(data) {
    $scope.items = data;
  });
  $scope.name = ''; // This will hold the selected item
  $scope.onItemSelected = function() { // this gets executed when an item is selected
    console.log('selected=' + $scope.name);
  };
});