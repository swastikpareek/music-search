/**
 * Js file containing definition of results controller
 */

(function() {

  'use strict';

  angular.module('musicSearch.controller.search', [])
    .controller('searchCtrl', ['$scope', 'LocalStorage', function($scope, LocalStorage) {
      $scope.setRecentSearches = function() {
        $scope.recentSearches = LocalStorage.getLocalStorage().slice().reverse();
      };
      $scope.$on('load-complete', function(event, args) {
        $scope.setRecentSearches();
      });
      $scope.deleteRecentSearches = function($evt) {
        $evt.preventDefault();
        LocalStorage.deleteLocalStorage();
        $scope.setRecentSearches();
        $scope.hideRecentSearchModal();
      };
      $scope.getSearchResultsOnEnter = function($evt) {
        $scope.hideRecentSearchModal();
        if ($evt.which === 13) {
          $evt.preventDefault();
          $scope.getSearchResults();
        }
      };
      $scope.showRecentSearchModal = function() {
        if ($scope.recentSearches.length > 0) {
          $scope.showRecentSearch = true;
        }
      };
      $scope.hideRecentSearchModal = function() {
        $scope.showRecentSearch = false;
      };
      $scope.getSearchResultsOfSearch = function($evt, text) {
        $scope.search.query = text;
        $evt.preventDefault();
        $scope.getSearchResults();
      };
    }]);
}());
