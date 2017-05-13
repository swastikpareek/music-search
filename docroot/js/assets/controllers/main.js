/**
 * Js file containing definition of main controller
 */

(function() {

  'use strict';

  angular.module('musicSearch.controller.main', [])
    .controller('mainCtrl', ['$scope', 'Helper', 'Search', function($scope, Helper, Search) {
      $scope.controllerReady = true;

      $scope.search = {
        'query': '',
        'canLoadMore': false,
        'loading': false
      };
      $scope.screenState = 'initial';

      /** Private member declaration **/
      var timeout;
      var limit = 20;
      var offset = 0;

      // Scope member for getting results on click of search
      $scope.getSearchResults = function() {
        // reset offset
        offset = 0;
        // reset arguments
        $scope.search.canLoadMore = false;
        $scope.screenState = 'results';
        // reset array
        $scope.results = [];
        initSearch($scope.search.query);
      };


      // Scope Member for loading more results
      $scope.loadMoreResults = function() {
        initSearch($scope.search.query);
      };

      /**
       ** Other Private function used
       ** Not used in $scope variable to not make angular scope heavy
       */

      // Function for starting query;
      var initSearch = function(query) {
        if (query.length === 0) {
          $scope.search.canLoadMore = false;
          $scope.screenState = 'initial';
        } else {
          $scope.search.loading = true;
          Search.fetchResults(query, limit, offset).then(function(data) {
              $scope.search.loading = false;
              $scope.screenState = 'results';
              generateResults(data);
            })
            .catch(function(err) {
              $scope.screenState = 'error';
              console.log(err);
              $scope.search.loading = false;
            });
        }
      };

      // Function for genrating results
      var generateResults = function(data) {
        // checking remainni
        var isItemLeftinAlbums = data.albums.next !== null;
        var isItemLeftinArtists = data.artists.next !== null;

        if (data.albums.total + data.artists.total === 0) {
          $scope.screenState = 'no-results';
        } else {
          var res = Helper.shuffleArray(data.albums.items, data.artists.items);
          $scope.results = $scope.results.concat(res);
          $scope.search.canLoadMore = true;
          // if can fetch more items
          if (isItemLeftinAlbums || isItemLeftinArtists) {

            // update the offset
            updateConfig();

            // fetch more data if needed. - to fill up remaining items
            if (res.length < limit) {
              getMoreDataToFill(data, res);
            }
          } else {
            // Reached end of results - hide load more
            $scope.search.canLoadMore = false;
          }
        }
      };

      // updateConfig
      var updateConfig = function() {
        offset += limit / 2;
      };

      // Get more data to fill in case of one array execeding another{}
      var getMoreDataToFill = function(data, arr) {

        var moreData = limit - arr.length;

        // now in this case we are sure that either of the response is empty so we have to pull the remaining
        // data from the single array so we will update the limit var to more data and update the new
        // offset to offset + more Data
        var query = $scope.search.query;
        $scope.search.loading = true;
        Search.fetchResults(query, moreData * 2 /* as it gets halfed */ , offset).then(function(data) {
            var res = Helper.shuffleArray(data.albums.items, data.artists.items);
            $scope.results = $scope.results.concat(res);
            offset += moreData;
            $scope.search.loading = false;
          })
          .catch(function(err) {
            $scope.screenState = 'error';
            $scope.search.loading = false;
            console.log(err);
          });

      };

    }]);
}());
