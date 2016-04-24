function dessertController($scope, dessertService) {
  $scope.i = 0;
  // ADD PROFILE
  $scope.add = function() {
    var datas = {};
    datas.imgEntre = $scope.imageEntre;
    datas.titreEntre = $scope.titreEntre;
    datas.descriptionEntre = $scope.descriptionEntre;
    datas.recetteEntre = $scope.recetteEntre;

    datas.imgPlat = $scope.imagePlat;
    datas.titrePlat = $scope.titrePlat;
    datas.descriptionPlat = $scope.descriptionPlat;
    datas.recettePlat = $scope.recettePlat;

    datas.imgDessert = $scope.imageStrings[0];
    datas.titreDessert = $scope.titreDessert;
    datas.descriptionDessert = $scope.descriptionDessert;
    datas.recetteDessert = $scope.recetteDessert;
    dessertService.create(datas).then(function(res) {
      load();
    });
    $scope.imgEntre = "";
    $scope.titreEntre = "";
    $scope.descriptionEntre = "";
    $scope.recetteEntre = "";

    $scope.imgPlat = "";
    $scope.titrePlat = "";
    $scope.descriptionPlat = "";
    $scope.recettePlat = "";

    $scope.imgDessert = "";
    $scope.titreDessert = "";
    $scope.descriptionDessert = "";
    $scope.recetteDessert = "";
  };

  $scope.valid = function(){
    if($scope.i == 0){
      $scope.imageEntre = $scope.imageStrings[0];
    }
    if($scope.i == 1){
      $scope.imagePlat = $scope.imageStrings[0];
    }
    $scope.i ++;
  }
  //  ------------   FLOW   -----------
  $scope.imageStrings = [];
  $scope.processFiles = function(files) {
    angular.forEach(files, function(flowFile, i) {
      var fileReader = new FileReader();
      fileReader.onload = function(event) {
        var uri = event.target.result;
        console.log($scope.imageStrings[i]);
        $scope.imageStrings[i] = uri;
      };
      fileReader.readAsDataURL(flowFile.file);
    });
  };
}
