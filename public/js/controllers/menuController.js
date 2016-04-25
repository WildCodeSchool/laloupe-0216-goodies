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
    if (n == 'entree'){
      $('body').css('background-image', 'none').css('background-image','url("./assets/back.jpg")');
      $('#entree').removeClass( "btn btn-warning btn-block" ).addClass( "btn btn-info btn-block" );
      $('#plat').removeClass( "btn btn-info btn-block" ).addClass( "btn btn-warning btn-block" );
      $('#dessert').removeClass( "btn btn-info btn-block" ).addClass( "btn btn-warning btn-block" );

    }
    if (n == 'plat'){
      $('body').css('background-image', 'none').css('background-image','url("./assets/pasta.jpg")');
      $('#plat').removeClass( "btn btn-warning btn-block" ).addClass( "btn btn-info btn-block" );
      $('#dessert').removeClass( "btn btn-info btn-block" ).addClass( "btn btn-warning btn-block" );
      $('#entree').removeClass( "btn btn-info btn-block" ).addClass( "btn btn-warning btn-block" );
    }
    if (n == 'dessert'){
      $('body').css('background-image', 'none').css('background-image','url("./assets/dessertmenu.jpg")');
      $('#dessert').removeClass( "btn btn-warning btn-block" ).addClass( "btn btn-info btn-block" );
      $('#plat').removeClass( "btn btn-info btn-block" ).addClass( "btn btn-warning btn-block" );
      $('#entree').removeClass( "btn btn-info btn-block" ).addClass( "btn btn-warning btn-block" );
      $('div.menu').css('color', 'none').css('color','white');
      $('h2.menu').css('color', 'none').css('color','white');

    }
  }

}
