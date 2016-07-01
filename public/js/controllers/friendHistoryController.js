
function friendHistoryController($scope, $routeParams, userFactory, $location, userService) {
    function load() {
        userService.findOne($routeParams.id).then(function(res){
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

    $scope.friendhistory = function (id){
      $location.path('/friendhistory/'+id);
    }
    $scope.formatDate = function(date) {
        var eventDate = new Date(date);
        return eventDate.getDate() + ' / ' + (eventDate.getMonth() + 1) + ' / ' + eventDate.getFullYear();
    }
}
