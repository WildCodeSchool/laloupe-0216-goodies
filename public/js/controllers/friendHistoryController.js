function friendHistoryController($scope, $routeParams, userFactory, $location, userService) {
    function load() {
        userService.findOne($routeParams.id).then(function(res) {
            $scope.user = res.data;
        });
        $scope.events = userFactory.user.events;
        $scope.history = [];
        for (var j = 0; j < userFactory.user.friends.length; j++) {
            if (userFactory.user.friends[j]._id == $routeParams.id) {
                $scope.user = userFactory.user.friends[j];
            }
        }
        for (var i = 0; i < $scope.events.length; i++) {
            for (var j = 0; j < $scope.events[i].tabFriendEvent.length; j++) {
                if ($scope.events[i].tabFriendEvent[j]._id == $routeParams.id) {
                    $scope.history.push($scope.events[i]);
                }
            }
        }
    }
    load();

    $scope.friendhistory = function(id) {
        if ($rootScope.userId != id) {
            $location.path('/friendhistory/' + id);
        }
    }
    $scope.formatDate = function(date) {
        var eventDate = new Date(date);
        var day = 0;
        var month = 0;
        if (eventDate.getDate() < 10) {
            day = '0' + eventDate.getDate();
        } else {
            day = eventDate.getDate();
        }
        if (eventDate.getMonth() + 1 < 10) {
            month = '0' + (eventDate.getMonth() + 1);
        } else {
            month = eventDate.getMonth() + 1;
        }
        return day + ' / ' + month + ' / ' + eventDate.getFullYear();
    }
}
