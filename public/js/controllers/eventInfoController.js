function eventInfoController($routeParams, eventService, userService, $scope, $rootScope, notificationService, $location) {
    $("#collapseOne").collapse('show');

    function load() {
        eventService.findOne($routeParams.id).then(function(res) {
            $scope.event = res.data;
        });
    }
    load();
    $scope.friendhistory = function(id) {
        $location.path('/friendhistory/' + id);
    }
    $scope.data = {};
    $scope.refuser = function() {
        $scope.data.userId = $rootScope.userId;
        $scope.data.eventId = $routeParams.id;
        $scope.event.userId = $rootScope.userId;
        notificationService.deleteEvent($scope.data).then(function() {
            $rootScope.$emit('userFactoryUpdate');
            $location.path('/events');
        });
    }


    $scope.accept = function() {
        $scope.data.userId = $rootScope.userId;
        $scope.data.eventId = $routeParams.id;
        $scope.event.userId = $rootScope.userId;
        eventService.create($scope.event).then(function() {
            notificationService.deleteEvent($scope.data).then(function() {
                $rootScope.$emit('userFactoryUpdate');
                $location.path('/events');
            });
        });
    }
}
