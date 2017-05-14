/**
 * Js file containing definition of Search Service
 * Mainly contains HTTP calls to server
 */


(function() {
  'use strict';

  angular.module('musicSearch.services.search', [])
    .service('Search', ['$http', '$location', '$q', 'Constants', 'LocalStorage', function($http, $location, $q, Constants, LocalStorage) {
      var context = this;
      // Function for fetching all results with given Query
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
            LocalStorage.updateLocalStorage(str);
          })
          .error(function(data, status, header, config) {
            // 5** ** state
            deferred.reject(data);
          });
        // Returning the promise after completion.
        return deferred.promise;
      };

      // Function for fetching album details of a specific album
      context.Album = function(url) {
        // Creating promise
        var deferred = $q.defer();

        $http.get(url)
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

      // Function for fetching albums list of a specific artist by id
      context.Albums = function(id, loadmore, urlLink) {
        var deferred = $q.defer();
        var offset = 0;
        // Setting limit to 20 to prevent data load
        var limit = 20;
        var URL;
        // If data is still pending (in case items are more than 20)
        if (loadmore) {
          URL = urlLink;
        } else {
          URL = Constants.APIURL + Constants.ArtistById + id + '/albums?offset=' + offset + '&limit=' + limit;
        }

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

      // Function for fetching tracks list of a specific Album by id
      context.Tracks = function(id, loadmore, urlLink) {
        var deferred = $q.defer();
        var offset = 0;
        // Setting limit to 20 to prevent data load
        var limit = 20;
        var URL;

        // If data is still pending (in case items are more than 20)
        if (loadmore) {
          URL = urlLink;
        } else {
          URL = Constants.APIURL + Constants.AlbumById + id + '/tracks?offset=' + offset + '&limit=' + limit;
        }
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
