function myfriendsController(userService, friendService, $scope, $rootScope) {

    $scope.userId = $rootScope.userId;

    function load(){
      userService.get().then(function(res){
        $scope.users = res.data;
      });
      friendService.get().then(function(res){
        $scope.friends = res.data;
      });
    }
    load();
    $scope.addNewFriend = function(userName) {
      var datas = {};
      var user = userName.split(' ');

      userService.findByNameSurname(user[1],user[0]).then(function(res){ // ===== Récupération de l'ID du Friend
    	    datas.friendId = "575060465a96bb5c31b368df";
          datas.img = res.data.img;

          if ($rootScope.userId != $scope.userFriendId && $scope.friends.map(function (e)
          {if(e.nom == user[1] && e.prenom == user[0] && e.userId == $rootScope.userId)
            return true;}).indexOf(true) == -1){

            datas.nom = user[1];
            datas.prenom = user[0];
            datas.userId = $rootScope.userId;
            userService.createFriend(datas).then(function(res) {
              load();
            });
          }
  		});
      $scope.newFriend = "";
    };
    $scope.removeFriend = function(friend){
      friendService.delete(friend._id).then(function(res){
        load();
      });
    };

}
