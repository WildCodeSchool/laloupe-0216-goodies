function myfriendsController(userService, friendService, $scope, $rootScope, connectService) {
    function load(){
      userService.get().then(function(res){
        $scope.users = res.data;
      });
      friendService.get().then(function(res){
        $scope.friends = res.data;
      });
    }
    load()
    $scope.addNewFriend = function(userName) {
      var datas = {};
      var user = userName.split(' ');
      connectService.connect({name: user[0],prenom: user[1]}).then(function(res){
  	    $scope.userFriendId = res.data.id;
        if ($rootScope.userId != $scope.userFriendId){
        datas.nom = user[0];
        datas.prenom = user[1];
        datas.userId = $rootScope.userId;
        datas.friendId = $scope.userFriendId;

        friendService.create(datas).then(function(res) {
        });
        }
  		})

      $scope.newFriend = "";
    };
}
