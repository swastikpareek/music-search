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
        setTimeout(function() {
          element[0].classList.add('loaded');
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
