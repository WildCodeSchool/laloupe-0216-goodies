function menuController($scope, menuService) {
  $scope.showRecette = 'entree';
  $('body').css('background-image', 'none').css('background-image','url("./assets/back.jpg")');

  // ADD PROFILE
  $scope.add = function() {
    var datas = {};

    menuService.create(datas).then(function(res) {
      load();
    });
  };

  /*===================  Fonction bouton Recette  ========================= */

  $scope.bouton = function (n){
    angular.element($('#'+$scope.showRecette)).removeClass( "btn-info" ).addClass( "btn-warning" );
    angular.element($('#'+n)).removeClass( "btn-warning" ).addClass( "btn-info" );
    $scope.showRecette = n;
  }
  $scope.boutonAjout = function (recette){
    $scope.recetteTitle = recette;
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
