
function friendHistoryController($scope, $routeParams, userFactory, $location) {
    function load() {
        $scope.events = userFactory.user.events;
        $scope.history = [];
        for (var j = 0; j < userFactory.user.friends.length; j++) {
          if (userFactory.user.friends[j]._id == $routeParams.id) {
              $scope.user = userFactory.user.friends[j];
          }
        }
        for (var i = 0; i < $scope.events.length; i++) {
            for (var j = 0; j < $scope.events[i].tabFriendEvent.length; j++) {
              if ($scope.events[i].tabFriendEvent[j] == $routeParams.id) {
                  $scope.history.push($scope.events[i]);
              }
            }
        }
    }
    load();
    $scope.info = function(id,option) {
      var name = '';
      var prenom = '';
      var image = '';
      for (var j = 0; j < userFactory.user.friends.length; j++) {
        if (userFactory.user.friends[j]._id == id) {
            name = userFactory.user.friends[j].name;
            prenom = userFactory.user.friends[j].prenom;
            if (userFactory.user.friends[j].img) {
              image = userFactory.user.friends[j].img;
            }else {
              image = './assets/user-default.png';
            }
        }
      }
      return option == 'nom' ? name : option == 'prenom' ? prenom : image;
    }
    $scope.friendhistory = function (id){
      $location.path('/friendhistory/'+id);
    }
}
