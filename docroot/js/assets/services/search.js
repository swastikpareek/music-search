(function() {
  'use strict';

  angular.module('musicSearch.services.search', [])
    .service('Search', ['$http', '$location', '$q', 'Constants', function($http, $location, $q, Constants) {
      var context = this;
      context.fetchResults = function(str, limit, offset){
        var deferred = $q.defer();
        // as limit needs to halfed as both artist and albums are coming
        limit = limit / 2 ;
        var query = 'q=' + encodeURIComponent(str) + '&type=album,artist' + '&limit=' + limit + '&offset=' + offset;
        var URL = Constants.APIURL + Constants.Search + '?' + query;
        $http.get(URL)
          .success(function(data, status, headers, config) {
            deferred.resolve(data);
          })
          .error(function(data, status, header, config) {
            deferred.reject(data);
          });
        return deferred.promise;
      };
    }]);

}());
