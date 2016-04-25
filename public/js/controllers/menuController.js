function menuController($scope, menuService) {
  $scope.showRecette = 'entree';
  $('body').css('background-image', 'none');



  // ADD PROFILE
  $scope.add = function() {
    var datas = {};

    menuService.create(datas).then(function(res) {
      load();
    });
  };

  $scope.menuShow = function (n) {
    $scope.showRecette = n;
  }

}
