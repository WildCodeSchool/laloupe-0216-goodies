
// allRecipesController

function allRecipesController($scope, $rootScope, $http, recetteService) {
	$('body').css('background-image', 'none');

	$scope.test = function(){
		$scope.presentation = false;
		$scope.searchRecipesText.titre = 'Trouver une Recette';
    };

	function load() {
		recetteService.get().then(function(res){
			$scope.recettes = res.data;
		});
	}
	load();

}