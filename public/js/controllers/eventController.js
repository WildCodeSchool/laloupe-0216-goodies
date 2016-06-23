// eventController ==============================

function eventController($scope, $http, eventService, friendService, $location, recetteService, $rootScope, userService, userFactory) {
    $('body').css('background-image', 'none').css('background-image', 'url("./assets/dessertbg.png")');

    $rootScope.$on('userFactoryUpdate', function() {
        $scope.nbEvents = 0;
        $scope.nbInvit = 0;
        $scope.invit = {};
        $scope.dataFriends = {};
        $scope.form = 1;
        $scope.creform = 1;
        $scope.showRecette = 'entree';
        console.log('yeah');
        console.log(userFactory.user);
        // for (var i = 0; i < userFactory.user.notifications.length; i++) {
        //     if (userFactory.user.notifications[i].events) {
        //         $scope.nbInvit += 1;
        //         $scope.invit['events' + i] = userFactory.user.notifications[i].events;
        //     }
        // }
        if (userFactory.user.events) {
            $scope.events = userFactory.user.events;
            $scope.nbEvents = $scope.events.length;
        }
        $scope.events = userFactory.user.events;


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
            return eventDate.getDate() + ' / ' + (eventDate.getMonth() + 1) + ' / ' + eventDate.getFullYear();
        }
    });

}
