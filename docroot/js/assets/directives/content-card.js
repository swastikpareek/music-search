(function() {
  'use strict';

  angular.module('musicSearch.directive.contentCard', [])
    .directive('contentCard', [function() {
      return {
        scope: {
          object: "=",
        },
        restrict: 'AE',
        replace: 'true',
        templateUrl: 'html/directive-templates/content-card.html',
        link: function(scope, element, attributes) {
          // using set time out for making sure that class gets added
          // after the DOM is ready to create animation
          setTimeout(function() {
            element[0].classList.add('animated');
          }, 0);
        },
        controller: function($scope) {
          // Simple function for getting label
          $scope.getLabel = function(type) {
            if (type === 'album') {
              return 'Albums';
            } else if (type === 'artist') {
              return 'Tracks';
            }
          };
        }
      };
    }]);

}());
