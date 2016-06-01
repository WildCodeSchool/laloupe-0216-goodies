function mainController($scope, $rootScope, $http,recetteService) {
	$('body').css('background-image', 'none').css('background-image','url("./assets/backhome.jpg")');
	$scope.showRecette = 'entree';

	$('.slide').on(function(){
		$('.flex-caption1').fadeToggle("1000");
		$('.flex-caption2').fadeToggle("1000");
		$('.flex-caption3').fadeToggle("1000");
		
	});

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
