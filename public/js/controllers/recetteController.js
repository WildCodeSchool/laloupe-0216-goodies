function recetteController($scope, recetteService) {
  $scope.showRecette = 'entree';
  $('body').css('background-image', 'none').css('background-image','url("./assets/back.jpg")');

  /*===================  Fonction bouton Recette  ========================= */

  $scope.bouton = function (n){
    angular.element($('#'+$scope.showRecette)).removeClass( "btn-info" ).addClass( "btn-warning" );
    angular.element($('#'+n)).removeClass( "btn-warning" ).addClass( "btn-info" );
    $scope.showRecette = n;
  }

  $scope.menuShow = function (n) {
    $scope.bouton(n);
    if (n == 'entree'){
      $('body').css('background-image', 'none').css('background-image','url("./assets/back.jpg")');
    }
    if (n == 'plat'){
      $('body').css('background-image', 'none').css('background-image','url("./assets/pasta.jpg")');
    }
    if (n == 'dessert'){
      $('body').css('background-image', 'none').css('background-image','url("./assets/dessertmenu.jpg")');
    }
  }

  /*==================  Fin Fonction bouton Recette  ===================== */

  $scope.i = 0;
  $scope.y = 0;
    $scope.add = function(type) {
      var datas = {};
      datas.img = $scope.imageStrings[0];
      datas.titre = $scope.titre;
      datas.description = $scope.description;
      datas.preparation = $scope.preparation0 + " Heure(s)   " + $scope.preparation1 + " Minute(s)";
      datas.cuisson = $scope.cuisson0 + " Heure(s)   " + $scope.cuisson1 + " Minute(s)";
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
      $scope.i ++;
    };

  $scope.update = function(recette) {
    recette.service.update(recette._id, recette).then(function(res) {
      load();
    });
  }

  $scope.delete = function(recette) {
      recette.service.delete(recette._id, recette).then(function(res) {
        load();
      });
    },
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
  $scope.cancel = function(image) {
    image.cancel();
    $scope.y = 0;
  }
}
