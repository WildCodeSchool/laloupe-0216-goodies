
// eventController ==============================

function eventController($scope, $http, eventService, friendService, $location, recetteService, $rootScope, userService) {
	load();

	$scope.geocodeAddress = function (address) {
		$scope.position = [address.position[0],address.position[1]];
  }

	$('body').css('background-image', 'none').css('background-image','url("./assets/dessertbg.png")');
	$scope.nbEvents = 0;
	$scope.nbInvit = 0;
	$scope.dataFriends = {};
	$scope.form = 1;
	$scope.creform = 1;
	$scope.showRecette = 'entree';

	$scope.required = true;
	$scope.showMoreDesc = function (id) {
      $('#' + id).toggle(400)
	}

	// checkbox autocomplete (at home)

	function load(){
		eventService.get().then(function(res){
			$scope.events = res.data;
			var countEvent = 0;
			$scope.events.map(function(e){if(e.userId == $rootScope.userId){countEvent++}});
			$scope.nbEvents = countEvent;
			$scope.nbInvit = $scope.events.length;
		});
		recetteService.get().then(function(res){
			$scope.recettes = res.data;
		});
		friendService.get().then(function(res){
			$scope.friends = res.data;
		});
	};


// =================== END tous les Amis dans friends =============



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
	load()
}

$scope.formatDate = function (date){
	var eventDate = new Date(date);
	return eventDate.getDate()+' / '+(eventDate.getMonth()+1)+' / '+eventDate.getFullYear();
}
// ===================  END Ajout des amis dans la BD =============

}
