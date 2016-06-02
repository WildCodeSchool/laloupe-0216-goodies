function recetteController($scope, recetteService, $rootScope, userService) {
  $scope.showRecette = 'entree';
  $scope.closeBtnTab = [];
  $scope.userId = $rootScope.userId;
  $scope.recetteTab = [];
  $('body').css('background-image', 'none').css('background-image','url("./assets/testbg.jpg")');

  function load() {
    recetteService.get().then(function (res) {
      $scope.recettes = res.data;
    });
  }
  load();

  /*===================  Fonction bouton Recette  ========================= */

  $scope.bouton = function (n){
    angular.element($('#'+$scope.showRecette)).removeClass( "btn-info" ).addClass( "btn-warning" );
    angular.element($('#'+n)).removeClass( "btn-warning" ).addClass( "btn-info" );
    if ($scope.showRecette != n){
    $scope.recetteTab = [];
    }
    $scope.showRecette = n;
  }
  $scope.menuShow = function (n) {
    $scope.bouton(n);
    if (n == 'entree'){
      $('body').css('background-image', 'none').css('background-image','url("./assets/testbg.jpg")');
    }
    if (n == 'plat'){
      $('body').css('background-image', 'none').css('background-image','url("./assets/pasta.jpg")');
    }
    if (n == 'dessert'){
      $('body').css('background-image', 'none').css('background-image','url("./assets/dessertmenu.jpg")');
    }
  }

  /*==================  Fin Fonction bouton Recette  ===================== */


  /*==================  Stockage de l'ID  ===================== */

  $scope.id = function(recette){
    $scope.recetteAffiche = recette;
  }

  /*==================  End Stockage de l'ID  ===================== */

  /*==================  Add first menu  ===================== */

  $scope.pushtab = function (menu){
    $scope.recetteTab.push(menu);
    $scope.recetteAffiche = $scope.recetteTab[0];
  }

  /*==================  end Add first menu  ===================== */

  $scope.i = 0;
  $scope.y = 0;
    $scope.add = function(type) {
      var datas = {};
      datas.userId = $scope.userId;
      datas.img = $scope.imageStrings[0];
      datas.titre = $scope.titre;
      datas.description = $scope.description;
      datas.preparation = 'Temps de preparation: ' + $scope.preparation + ' minutes';
      datas.cuisson = 'Temps de cuisson: ' + $scope.cuisson + ' minutes';
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
