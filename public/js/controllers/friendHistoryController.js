function friendHistoryController($scope, $routeParams, userFactory) {
    function load() {
        $scope.events = userFactory.user.events;
        console.log('reerererer');
        console.log($scope.events);
        $scope.history = [];
        for (var i = 0; i < $scope.events.length; i++) {
            for (var j = 0; j < $scope.events[i].tabFriendEvent.length; j++) {
              if ($scope.events[i].tabFriendEvent == $routeParams.id) {
                  $scope.history.push($scope.events[i]);
              }
            }
        }
        console.log('hist');
        console.log($scope.history);
    }
    load();

}
