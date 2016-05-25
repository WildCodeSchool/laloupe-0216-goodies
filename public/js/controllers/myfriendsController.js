function myfriendsController(userService, friendService, $scope, $rootScope) {
    userService.get().then(function(res){
      $scope.users = res.data;
    });
    $scope.test = function (id){
      console.log(id);
    };
    $scope.addNewFriend = function() {
      var datas = {};
      datas.userName = $scope.userName;
      datas.userId = $rootScope.userId;
      datas.friendId = $scope.friendId;

      friendService.create(datas).then(function(res) {
      });
      console.log($scope.userName.user_id);
      $scope.newFriend = "";
    };
}
