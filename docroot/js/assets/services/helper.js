(function() {
  'use strict';

  angular.module('musicSearch.services.helper', [])
    .service('Helper', [function() {
      var context = this;
      // Function for shuffling data
      context.shuffleArray = function(d1, d2) {
        var loop1 = Math.min(d1.length, d2.length);
        var loop2 = Math.max(d1.length, d2.length) - loop1;
        var shuffledArray = [];
        var i;
        for (i = 0; i < loop1; i++) {
          shuffledArray.push(d1[i]);
          shuffledArray.push(d2[i]);
        }
        for (i = 0; i < loop2; i++) {
          if (d1.length > d2.length) {
            shuffledArray.push(d1[i + loop1]);
          } else {
            shuffledArray.push(d2[i + loop1]);
          }
        }
        return shuffledArray;
      };
    }]);
}());
