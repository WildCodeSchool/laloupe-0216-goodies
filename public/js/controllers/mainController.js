function mainController($scope, $rootScope, $http,recetteService) {
	$('body').css('background-image', 'none').css('background-image','url("./assets/backhome.jpg")');
	$scope.showRecette = 'entree';

	$scope.menuShow = function (n) {
		angular.element($('#'+$scope.showRecette)).removeClass( "boutonActive" );
    angular.element($('#'+n)).addClass( "boutonActive" );
    $scope.showRecette = n;
  };
}
