function myfriendsController(userService, friendService, $scope, $rootScope, userFactory) {
    function load () {
      userService.get().then(function(res){
        $scope.users = res.data;
        $scope.friends = userFactory.user.friends;
        $scope.userId = $rootScope.userId;
      });
    }
    load();
    $scope.addNewFriend = function(userName) {
      var datas = {};
      var user = userName.split(' ');
      userService.findByNameSurname(user[1],user[0]).then(function(res){ // ===== Récupération de l'ID du Friend
    	    datas.friendId = res.data._id;
          datas.userId = $scope.userId;
          var friends = [];
          userFactory.user.friends.forEach(function(e){friends.push(e.name+' '+e.prenom)});
          if ($rootScope.userId != datas.friendId && friends.indexOf(user[1]+' '+user[0]) == -1){

              userService.createFriend(datas).then(function(res) {
                userService.findOne($rootScope.userId).then(function(res){
                  userFactory.user = res.data;
                  $scope.friends = userFactory.user.friends;
                });
              });
          }
  		});
      $scope.newFriend = "";
    };
    $scope.removeFriend = function(friend){
      userService.delete(friend._id).then(function(res){
        userService.findOne($rootScope.userId).then(function(res){
          userFactory.user = res.data;
          $scope.friends = userFactory.user.friends;
        });
      });
    };

}
