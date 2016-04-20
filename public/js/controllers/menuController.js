function dessertController($scope, menuService) {


  // ADD PROFILE
  $scope.add = function() {
    var datas = {};

    dessertService.create(datas).then(function(res) {
      load();
    });
  };
  
}
