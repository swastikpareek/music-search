/**
 * Js file containing JS constants decleration used site wide
 */

(function() {
  'use strict';

  angular.module('musicSearch.constants', [])
    .constant("Constants", {
      "APIURL": "https://api.spotify.com/",
      "Search": "v1/search"
    });
}());
