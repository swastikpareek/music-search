/**
 * Js file containing definition for content-card directive
 */

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
        controller: 'contentCardCtrl',
      };
    }])
    .controller('contentCardCtrl', ['$scope', function($scope) {
      // Simple function for getting label
      $scope.getLabel = function(type) {
        if (type === 'album') {
          return 'Tracks';
        } else if (type === 'artist') {
          return 'Albums';
        }
      };
      // Open modal function to emit open-modal event;
      $scope.openModal = function(modalId, obj) {
        var element = document.getElementById(modalId);
        var event = new CustomEvent('open-modal', {
          'detail': obj
        });
        element.dispatchEvent(event);
      };
    }]);

}());
