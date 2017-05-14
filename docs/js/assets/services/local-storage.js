(function() {
  'use strict';
  angular.module('musicSearch.services.localStorage', [])
    .service('LocalStorage', [function() {
      var context = this;
      // function for gettin recent History
      context.getLocalStorage = function() {
        var items = localStorage.getItem('musicSearch.recentSearch');
        if (items === null) {
          return [];
        } else {
          return JSON.parse(items);
        }
      };
      // function for deleting history
      context.deleteLocalStorage = function() {
        delete localStorage['musicSearch.recentSearch'];
      };
      // function for updating history
      context.updateLocalStorage = function(data) {
        var items = [];
        var limit = 5;
        var storage = localStorage.getItem('musicSearch.recentSearch');
        if (storage) {
          items = JSON.parse(storage);
        }
        // if list is empty
        if (items.length === 0) {
          items.push(data);
        }
        // If Element Exists
        if (items.indexOf(data) === -1) {
          items.push(data);
        } else {
          items.splice(items.indexOf(data), 1);
          items.push(data);
        }
        // Splice the list if filled
        if (items.length > limit) {
          // remove the last index;
          items.splice(0, 1);
        }
        localStorage.setItem('musicSearch.recentSearch', JSON.stringify(items));
      };
    }]);
}());
