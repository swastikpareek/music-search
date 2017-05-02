(function() {

  'use strict';

  angular.module('musicSearch.main', [])
  .controller('mainCtrl', ['$scope', '$location', 'Search', function($scope, $location, Search) {
    $scope.controllerReady = true;
    // $scope variables initialistion
    $scope.search = {
      'query' : '',
    };
    $scope.results = [];
    $scope.screenState = 'initial';
    var timeout;

    var limit = 20;
    var offset = 0;

    // Function for starting query;
    var initSearch = function(query) {
      if (query.length === 0){
        $scope.screenState = 'initial';
      } else{
        $scope.screenState = 'loading';
        Search.fetchResults(query, limit, offset).then(function(data) {
          $scope.screenState = 'results';
          generateResults(data);
        })
        .catch(function(err) {
          $scope.screenState = 'error';
          console.log(err);
        });
      }
    };

    var generateResults = function(data){
      if(data.albums.total + data.artists.total === 0){
        $scope.screenState = 'no-results';
      } else{
        $scope.results = shuffleArray(data.albums.items, data.artists.items);
        console.log($scope.results);
      }
    };

    var shuffleArray = function(d1 , d2){
      var loop1 = Math.min(d1.length , d2.length);
      var loop2 = Math.max(d1.length , d2.length) - loop1;
      var shuffledArray = [];
      var i;
      for(i=0; i < loop1; i++) {
        shuffledArray.push(d1[i]);
        shuffledArray.push(d2[i]);
      }
      for(i = loop1; i < loop2; i++) {
        if(d1.length > d2.length){
          shuffledArray.push(d1[i]);
        }
        else{
          shuffledArray.push(d2[i]);
        }
      }
      return shuffledArray;
    };

    $scope.getSearchResults = function($evt) {
      initSearch($scope.search.query);
    };

    $scope.getLabel = function(type){
      if(type === 'album'){
        return 'Albums';
      }
      else if(type === 'artist'){
        return 'Tracks';
      }
    }
  }]);
}());
