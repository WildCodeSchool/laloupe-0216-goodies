
// allRecipesController

function allRecipesController($scope, $rootScope, $http, recetteService) {
	$('body').css('background-image', 'none').css('background-color', '#f1f1f1');
	$scope.moreVote = 0;
	$scope.lessVote = 0;
	$scope.seeRecipe=1;

	// Scroll pour le bouton commentaire -->
	$(document).ready(function() {
		$('.js-scrollTo').on('click', function() { // Au clic sur un élément
			var page = $(this).attr('href'); // Page cible
			var speed = 750; // Durée de l'animation (en ms)
			$('html, body').animate( { scrollTop: $(page).offset().top - 200 }, speed ); // Go
			return false;
		});
	});

	// Bouton de vote -->
	$scope.plus = function(id,vote){
		vote += 1;
		recetteService.update(id,{moreVote: vote}).then(function(){		
			$scope.clickRecipe.moreVote = vote;
		});
	}
	$scope.moins = function(id,vote){
		vote += 1;
		recetteService.update(id,{lessVote: vote}).then(function(){
			$scope.clickRecipe.lessVote = vote;
		});
	}


	$scope.id = function(recette){
		$scope.clickRecipe = recette;
		$scope.seeRecipe=2;
	}

	// Ferme l'affichage de la recette et retourne aux miniatures -->
	$scope.close = function(){
		$scope.seeRecipe=1;
	}

	function load() {
		recetteService.get().then(function(res){
			$scope.recettes = res.data;
		});
	}
	load();

}