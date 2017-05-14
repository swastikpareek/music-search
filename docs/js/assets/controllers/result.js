/**
 * Js file containing definition of results controller
 */

(function() {

  'use strict';

  angular.module('musicSearch.controller.result', [])
    .controller('resultCtrl', ['$scope', 'Helper', 'Search', function($scope, Helper, Search) {
    // $scope.openModal = function(modalId, entityId) {
    //   var element = document.getElementById(modalId);
    //   var event = new CustomEvent('open-modal', {
    //     'id': entityId
    //   });
    //   document.getElementById(modalId).setAttribute('data-for-id', entityId);
    //   element.dispatchEvent(event);
    // };
    }]);
}());
