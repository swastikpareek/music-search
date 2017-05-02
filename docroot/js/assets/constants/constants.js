(function() {
  'use strict';

  angular.module('musicSearch.constants', [])
    .constant("Constants", {
      "APIURL" : "https://api.spotify.com/",
      "Search" : "v1/search"
    });
}());
