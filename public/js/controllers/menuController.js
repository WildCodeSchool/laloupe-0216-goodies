function menuController($scope, menuService) {
  $scope.showRecette = 'entree';
  $('body').css('background-image', 'none');
  $scope.i = 0;
  $scope.y = 0;
    $scope.add = function(type){
      var datas = {};
      datas.img = $scope.imageStrings[0];
      datas.titre = $scope.titre;
      datas.description = $scope.description;
      datas.preparation = $scope.preparation0 + " Heure(s)   " + $scope.preparation1 + " Minute(s)";
      datas.cuisson = $scope.cuisson0 + " Heure(s)   " + $scope.cuisson1 + " Minute(s)";
      datas.cuisson = $scope.cuisson;
      datas.ingredient = $scope.ingredient;
      datas.recette = $scope.recette;
      datas.type = type;
      menuService.create(datas).then(function(res) {
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

  $scope.update = function(menu) {
    menu.service.update(menu._id, menu).then(function(res) {
      load();
    });
  }

  $scope.delete = function(menu) {
      menu.service.delete(menu._id, menu).then(function(res) {
        load();
      });
    },
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
}

  /*==================  Fin Fonction bouton Recette  ===================== */
