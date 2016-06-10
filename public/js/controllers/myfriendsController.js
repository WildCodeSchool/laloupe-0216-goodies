function myfriendsController(userService, friendService, $scope, $rootScope) {

    $scope.userId = $rootScope.userId;

    function load(){
      userService.get().then(function(res){
        $scope.users = res.data;
      });
      friendService.get().then(function(res){
        $scope.friends = res.data;
        console.log('fffff');
        console.log($scope.friends);
      });
    }
    load();
    $scope.addNewFriend = function(userName) {
      var datas = {};
      var user = userName.split(' ');

      userService.findByNameSurname(user[1],user[0]).then(function(res){ // ===== Récupération de l'ID du Friend
    	    datas.friendId = res.data.id;
          console.log(datas.friendId);
          console.log(res.data.id);
          datas.img = res.data.img;

          if ($rootScope.userId != datas.friendId && $scope.friends.map(function (e)
          {if(e.nom == user[1] && e.prenom == user[0] && e.userId == $rootScope.userId)
            return true;}).indexOf(true) == -1){
            datas.nom = user[1];
            datas.prenom = user[0];
            datas.userId = $rootScope.userId;
            friendService.create(datas).then(function(res) {
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
