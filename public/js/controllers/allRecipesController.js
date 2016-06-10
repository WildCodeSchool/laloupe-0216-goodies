
// allRecipesController

function allRecipesController($scope, $rootScope, $http, recetteService) {
	$('body').css('background-image', 'none');

	$(document).ready(function() {
		$('.js-scrollTo').on('click', function() { // Au clic sur un élément
			var page = $(this).attr('href'); // Page cible
			var speed = 750; // Durée de l'animation (en ms)
			$('html, body').animate( { scrollTop: $(page).offset().top - 170 }, speed ); // Go
			return false;
		});
	});

	$scope.id = function(recette){
		$scope.clickRecipe = recette;
	}

	function load() {
		recetteService.get().then(function(res){
			$scope.recettes = res.data;
		});
	}
	load();

}