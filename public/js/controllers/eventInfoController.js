function eventInfoController($routeParams, eventService, userService, $scope, $rootScope, notificationService, $location) {
    $("#collapseOne").collapse('show');
    $rootScope.$on('userFactoryUpdate', function() {
        function load() {
            eventService.findOne($routeParams.id).then(function(res) {
                $scope.event = res.data;
            });
        }
        load();
        $scope.friendhistory = function(id) {
            $location.path('/friendhistory/' + id);
        }
        $scope.refuser = function() {

        }
        $scope.accept = function() {
            $scope.data = {};
            $scope.data.userId = $rootScope.userId;
            $scope.data.eventId = $routeParams.id;
            $scope.event.userId = $rootScope.userId;
            eventService.create($scope.event).then(function() {
                notificationService.deleteEvent($scope.data).then(function() {
                    userService.findOne($rootScope.userId).then(function(res) {
                        userFactory.user = res.data;
                        console.log('================= dfddff ==============');
                        console.log(userFactory.user);
                        $rootScope.$emit('userFactoryUpdate');
                        $location.path('/events');
                    });
                });
            });
        }
    });
}
