(function() {
  'use strict';

  angular.module('musicSearch.directive.modalBox', [])
    .directive('modalBox', ['Search', function(Search) {
      return {
        restrict: 'EA',
        transclude: true,
        scope: {},
        templateUrl: 'html/directive-templates/modal-box.html',
        link: function($scope, element, attr) {
          // Event Listener for open-modal event
          element[0].addEventListener('open-modal', function($evt) {
            // Upading the state to loaded
            $scope.modalState = 'loaded';
            // Removing keydown Listener on open (to enable esc close logic)
            document.addEventListener('keydown', keyDownListener, true);
            // Initiating open Modal Logic
            $scope.openModalLogic($evt);
          });

          // Event for close Modal event
          element[0].addEventListener('close-modal', function($evt) {
            // Upading the state to hidden
            $scope.modalState = 'hidden';
            // Removing keydown Listener on open (to enable esc close logic)
            document.removeEventListener('keydown', keyDownListener, true);
            // Callint Close Modal Logic
            $scope.closeModalLogic($evt);
          });

          // Definition for keydown Listener
          var keyDownListener = function($evt) {
            if (!($evt.ctrlKey || $evt.metaKey)) {
              if ($evt.which === 27) {
                $scope.closeModal();
                if (!$scope.$$phase) {
                  $scope.$apply();
                }
              }
            }
          };

          // Close Modal to dispatch Close Event
          $scope.closeModal = function() {
            var event = new CustomEvent('close-modal', {});
            element[0].dispatchEvent(event);
          };

        },
        controller: 'modalCtrl',
      };
    }])
    .controller('modalCtrl', ['$scope', 'Search', function($scope, Search) {
      $scope.loadingItem = false;
      $scope.contents = {};
      // Business logic for Open Modal
      $scope.openModalLogic = function($evt, loadmore, URL) {
        $scope.loadingItem = true;
        // Stopping flow of background body
        document.body.style.overflow = 'hidden';
        // Passing on event data to the modal view
        $scope.contents = $evt.detail;
        $scope.contents.items = [];
        if ($evt.detail.type === 'artist') {
          getAlbums($evt);
        } else if ($evt.detail.type === 'album') {
          getTracks($evt);
        }
      };
      $scope.getTrackTime = function(ms) {
        var s = Math.ceil(ms / 1000);
        var sec = s % 60;
        sec = sec < 10 ? '0' + sec : sec;
        var min = Math.floor(s / 60);
        return min + ':' + sec;
      };
      // Business logic for Close Modal
      $scope.closeModalLogic = function($evt) {
        // Starting flow of outside body
        document.body.style.overflow = 'visible';
      };
      var getAlbums = function($evt, loadmore, URL) {
        Search.Albums($evt.detail.id, loadmore, URL).then(function(data) {
            $scope.contents.items = $scope.contents.items.concat(data.items);
            // if more content to load do another request with new URL
            if (data.next !== null) {
              getAlbums($evt, true, data.next);
            } else {
              //All Data Loaded;
              $scope.loadingItem = false;
              angular.forEach($scope.contents.items, function(value, key) {
                // Get release date of all artists asynchronously.
                Search.Album(value.href).then(function(data) {
                    $scope.contents.items[key].release_day = data.release_date.split('-')[0];
                  })
                  .catch(function(err) {
                    console.log(err);
                  });
              });
            }
          })
          .catch(function(err) {
            console.log(err);
            $scope.loadingItem = false;
          });
      };
      var getTracks = function($evt, loadmore, URL) {
        Search.Tracks($evt.detail.id, loadmore, URL).then(function(data) {
            $scope.contents.items = $scope.contents.items.concat(data.items);
            // if more content to load do another request with new URL
            if (data.next !== null) {
              getTracks($evt, true, data.next);
            } else {
              //All Data Loaded;
              $scope.loadingItem = false;
            }

          })
          .catch(function(err) {
            console.log(err);
            $scope.loadingItem = false;
          });
      };
    }]);

}());
