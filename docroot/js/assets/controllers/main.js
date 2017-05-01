(function() {

  'use strict';

  angular.module('musicSearch.main', [])
  .controller('mainCtrl', ['$scope', '$location', 'Constants', function($scope, $location, Constants) {
    console.log('Hello from Controller');
    $scope.controllerReady = true;
    $scope.helloText = 'We gonna fill this place with fire';
  }]);
}());
