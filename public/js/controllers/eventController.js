// eventController ==============================

function eventController($scope, $http, eventService, friendService, $location, recetteService, $rootScope, userService, userFactory) {

    $('body').css('background-image', 'none').css('background-image', 'url("./assets/backhome.jpg")');

    $rootScope.$on('userFactoryUpdate', function() {
        $scope.nbEvents = 0;
        $scope.nbInvit = 0;
        $scope.invit = {};
        $scope.dataFriends = {};
        $scope.eventsInvit = [];
        $scope.form = 1;
        $scope.creform = 1;
        $scope.showRecette = 'entree';
        if (userFactory.user.events) {
            $scope.events = userFactory.user.events;
            for (var i = 0; i < $scope.events.length; i++) {
              var newDate = new Date();
              var date = new Date($scope.events[i].crEdateForm);
              if ($scope.events[i].userId != $rootScope.userId) {
                  $scope.nbInvit++;
                  $scope.eventsInvit.push($scope.events[i]);
              }
              if ($scope.events[i].userId == $rootScope.userId && date >= newDate) {
                $scope.nbEvents++;
              }
            }
            $scope.events = userFactory.user.events;
        }

        $scope.required = true;

        $(function() {
            $('#search').on('keyup', function() {
                var pattern = $(this).val();
                $('.searchable-container .items').hide();
                $('.searchable-container .items').filter(function() {
                    return $(this).text().match(new RegExp(pattern, 'i'));
                }).show();
            });
        });

        $scope.update = function(event) {
            eventService.update(event._id, event).then(function(res) {
            });
        }
        $scope.delete = function(event) {
            eventService.delete(event._id).then(function(res) {
            });
        }

        $scope.formatDate = function(date) {
            var eventDate = new Date(date);
            var day = 0;
            var month = 0;
            if (eventDate.getDate() < 10) {
              day = '0'+eventDate.getDate();
            }else {
              day = eventDate.getDate();
            }
            if (eventDate.getMonth() + 1 < 10) {
              month = '0'+ (eventDate.getMonth() + 1);
            }else {
              month = eventDate.getMonth() + 1;
            }
            return day + ' / ' + month + ' / ' + eventDate.getFullYear();
        }
        $scope.dateFilter = function (elem){
          var newDate = new Date();
          var date = new Date(elem.crEdateForm);
          if (date >= newDate) {
            console.log('ee');
            return true;
          }else {
            return false;
          }
        }

        $scope.friendhistory = function(id) {
          if ($rootScope.userId != id) {
              $location.path('/friendhistory/' + id);
          }
        }
    });

}
