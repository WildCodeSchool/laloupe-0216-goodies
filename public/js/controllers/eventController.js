
// eventController ==============================

function eventController($scope, $http, eventService, friendService, $location, recetteService) {
	$('body').css('background-image', 'none').css('background-image','url("./assets/floor-1.jpg")');
	$scope.dataFriends = {};
	$scope.form = 1;
	$scope.creform = 1;
	$scope.showRecette = 'entree';

	$scope.required = true;

	function showMoreDesc(id) {
      $('#' + id).toggle(400)
}
	// checkbox autocomplete (at home)
	$scope.adress = function () {
		if (angular.element($('#crEhomeCheckbox')).is(':checked') == true) { // lorsque la checkbox est coché
			angular.element($('#crEnumberForm')).val('18');
			angular.element($('#crEwayForm')).val('rue de la gare');
			angular.element($('#crEcityForm')).val('La Loupe');
			angular.element($('#crEpostalcodeForm')).val('28240');
			angular.element($('#crEcountryForm')).val('France');
		}
		else {
			angular.element($('#crEnumberForm')).val('');
			angular.element($('#crEwayForm')).val('');
			angular.element($('#crEcityForm')).val('');
			angular.element($('#crEpostalcodeForm')).val('');
			angular.element($('#crEcountryForm')).val('');
		}
	}

	function load(){
		eventService.get().then(function(res){
			$scope.events = res.data;
		});
		recetteService.get().then(function(res){
			$scope.recettes = res.data;
		});
	};



// =================== Charge tous les Amis dans friends =============

	function loadFriends(){
		friendService.get().then(function(res){
			$scope.friends = res.data;
		});
	};
// =================== END tous les Amis dans friends =============

	// button ( select menu )
	$(function() {
	    $('#affiche').click(function() {
	      $('.itemApp').show('slow', function(){
	      	 $('.itemMain').show('slow', function(){
		      	$('.itemDessert').show('slow')
	      	})
	      });
	    });
	    $('.itemApp').click(function() {
	      $('.itemMain').hide('slow', function hideNextOne() {
	        $('.itemDessert').hide('slow');
	      });
	    });
	    $('.itemMain').click(function() {
	      $('.itemApp').hide('slow', function hideNextOne() {
	        $('.itemDessert').hide('slow');
	      });
	    });
	    $('.itemDessert').click(function() {
	      $('.itemApp').hide('slow', function hideNextOne() {
	        $('.itemMain').hide('slow');
	      });
	    });
	});



	$(function() {
    $('#search').on('keyup', function() {
        var pattern = $(this).val();
        $('.searchable-container .items').hide();
        $('.searchable-container .items').filter(function() {
            return $(this).text().match(new RegExp(pattern, 'i'));
        }).show();
    });
});


	$scope.add = function(){
		$scope.form = 1;
		var data = {};
		data.crEnameForm = $scope.crEnameForm;
		data.crEdateForm = $scope.crEdateForm;
		data.crEtimeForm = $scope.crEtimeForm;
		data.crEnumberForm = $scope.crEnumberForm;
		data.crEwayForm = $scope.crEwayForm;
		data.crEcityForm = $scope.crEcityForm;
		data.crEpostalcodeForm = $scope.crEpostalcodeForm;
		data.crEcountryForm = $scope.crEcountryForm;


		eventService.create(data).then(function(res){
			load();
		});
		$scope.crEnameForm = "";
		$scope.crEdateForm = "";
		$scope.crEtimeForm = "";
		$scope.crEnumberForm = "";
		$scope.crEwayForm = "";
		$scope.crEcityForm = "";
		$scope.crEpostalcodeForm = "";
		$scope.crEcountryForm = "";
		$location.path('/events');
	}
	$scope.update = function(event){
		eventService.update(event._id, event).then(function(res){
			load();
		});
	}
	$scope.delete = function(event){
		eventService.delete(event._id).then(function(res){
			load();
		});
	}

// ========================= Ajout des amis dans la BD ==============

$scope.addFriends = function(){
	friendService.create($scope.dataFriends).then(function(res){
		load();
		$scope.dataFriends.friendfirstname = "";
		$scope.dataFriends.friendlastname = "";
		$scope.dataFriends.friendmail = "";
	});
	loadFriends()
}


// ===================  END Ajout des amis dans la BD =============


	load();
	loadFriends();

}
