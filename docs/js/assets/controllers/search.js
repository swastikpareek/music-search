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
        if ($evt.type === 'click') {
          $evt.preventDefault();
          LocalStorage.deleteLocalStorage();
        } else {
          if ($evt.which === 13) {
            LocalStorage.deleteLocalStorage();
          }
        }
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
      $scope.hideRecentSearchModalifEmpty = function() {
        if ($scope.recentSearches.length === 0) {
          $scope.hideRecentSearchModal();
        }
      };
      $scope.getSearchResultsOfSearch = function($evt, text) {
        $scope.search.query = text;
        if ($evt.type === 'click') {
          $evt.preventDefault();
          $scope.getSearchResults();
          $scope.hideRecentSearchModal();
        } else {
          $scope.getSearchResultsOnEnter($evt);
        }
      };
    }]);
}());
