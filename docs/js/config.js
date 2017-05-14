/**
 * Basic config files which dependency injects other JS components
 * like Constants , Services , Directives and Controllers.
 */


(function() {

  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('musicSearch', [
    'musicSearch.constants',
    'musicSearch.services.helper',
    'musicSearch.services.search',
    'musicSearch.directive.contentCard',
    'musicSearch.directive.modalBox',
    'musicSearch.controller.main',
    'musicSearch.controller.result',
  ]);

}());
