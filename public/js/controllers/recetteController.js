function recetteController($scope, $location, recetteService) {
  $('body').css('background-image', 'none').css('background-image','url("./assets/dessert/dessertbg.png")');
  $scope.i = 0;
  $scope.y = 0;
  // ADD PROFILE

  $scope.entree = function(){
    $location.path('/entree');
  },

  $scope.plat = function(){
    $location.path('/plat');
  },

  $scope.dessert = function(){
    $location.path('/dessert');
  },

  $scope.add = function(type) {
    var datas = {};
    datas.img = $scope.imageStrings[0];
    datas.titre = $scope.titre;
    datas.description = $scope.description;
    datas.preparation = $scope.preparation;
    datas.cuisson = $scope.cuisson;
    datas.ingredient = $scope.ingredient;
    datas.recette = $scope.recette;
    datas.type = type;
    recetteService.create(datas).then(function(res) {
      load();
    });
    $scope.img = "";
    $scope.titre = "";
    $scope.description = "";
    $scope.preparation = "";
    $scope.cuisson = "";
    $scope.ingredient = "";
    $scope.recette = "";
    $scope.type = "";
    };

  //  ------------   FLOW   -----------
  $scope.imageStrings = [];
  $scope.processFiles = function(files) {
    angular.forEach(files, function(flowFile, i) {
      var fileReader = new FileReader();
      fileReader.onload = function(event) {
        var uri = event.target.result;
        console.log($scope.imageStrings[i]);
        $scope.imageStrings[i] = uri;
        $scope.y = 1;
      };
      fileReader.readAsDataURL(flowFile.file);
    });
  };
  $scope.cancel = function(image){
    image.cancel();
    $scope.y = 0;
  }
}
