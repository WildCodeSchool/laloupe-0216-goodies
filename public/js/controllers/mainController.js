function mainController($scope, $rootScope, $http,recetteService) {
	$('body').css('background-image', 'none');
	$scope.showRecette = 'entree';
	function load() {
		recetteService.get().then(function (res) {
			$scope.recettes = res.data;
		});
	}
	load();

	$scope.menuShow = function (n) {
		angular.element($('#'+$scope.showRecette)).removeClass( "boutonActive" );
    angular.element($('#'+n)).addClass( "boutonActive" );
    $scope.showRecette = n;
  }
}
