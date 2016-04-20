function menuController($scope, menuService) {
  $scope.showRecette = 'entree';




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

  $scope.ajout = function (){
    $scope.ajoutRecette = !$scope.ajoutRecette;
  }
}
