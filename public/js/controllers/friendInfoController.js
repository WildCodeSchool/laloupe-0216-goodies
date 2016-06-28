function friendInfoController(userService, $scope,$rootScope, userFactory) {
  function load() {
    userService.get().then(function(res) {
      $scope.users = res.data;
      $scope.friends = userFactory.user.friends;
      $scope.userId = $rootScope.userId;
      console.log($scope.friends);
    });
  }
  load();


}
