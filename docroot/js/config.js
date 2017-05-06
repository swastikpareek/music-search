(function() {
  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('musicSearch', [
    'musicSearch.constants',
    'musicSearch.services.helper',
    'musicSearch.services.search',
    'musicSearch.directive.contentCard',
    'musicSearch.main',
  ]);
}());
