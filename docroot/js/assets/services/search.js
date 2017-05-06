/**
 * Js file containing definition of Search Service
 * Mainly contains HTTP calls to server
 */


(function() {
  'use strict';

  angular.module('musicSearch.services.search', [])
    .service('Search', ['$http', '$location', '$q', 'Constants', function($http, $location, $q, Constants) {
      var context = this;
      context.fetchResults = function(str, limit, offset) {
        // Creating promise
        var deferred = $q.defer();
        // as limit needs to halfed as both artist and albums are coming
        limit = limit / 2;
        var query = 'q=' + encodeURIComponent(str) + '&type=album,artist' + '&limit=' + limit + '&offset=' + offset;
        var URL = Constants.APIURL + Constants.Search + '?' + query;
        $http.get(URL)
          .success(function(data, status, headers, config) {
            // 200 Ok state
            deferred.resolve(data);
          })
          .error(function(data, status, header, config) {
            // 5** ** state
            deferred.reject(data);
          });
        // Returning the promise after completion.
        return deferred.promise;
      };
    }]);

}());
