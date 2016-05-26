createEventController

// eventController ==============================

function createEventController($scope, $http, eventService, friendService, $location, recetteService) {
	$('body').css('background-image', 'none').css('background-image','url("./assets/floor-1.jpg")');
	$scope.dataFriends = {};
	$scope.form = 1;
	$scope.creform = 1;
	$scope.required = true;

	// checkbox autocomplete (at home)
	$scope.adress = function () {
		if (angular.element($('#crEhomeCheckbox')).is(':checked') == true) { // lorsque la checkbox est coché
			angular.element($('#crEnumberForm')).val('18');
			angular.element($('#crEwayForm')).val('rue de la gare');
			angular.element($('#crEcityForm')).val('La Loupe');
			angular.element($('#crEpostalcodeForm')).val('28240');
			angular.element($('#crEcountryForm')).val('France');
			$scope.crEnumberForm = '18';
			$scope.crEwayForm = 'rue de la gare';
			$scope.crEcityForm = 'La Loupe';
			$scope.crEpostalcodeForm = '28240';
			$scope.crEcountryForm = 'France';
		}
		else {
			angular.element($('#crEnumberForm')).val('');
			angular.element($('#crEwayForm')).val('');
			angular.element($('#crEcityForm')).val('');
			angular.element($('#crEpostalcodeForm')).val('');
			angular.element($('#crEcountryForm')).val('');
			$scope.crEnumberForm = '';
			$scope.crEwayForm = '';
			$scope.crEcityForm = '';
			$scope.crEpostalcodeForm = '';
			$scope.crEcountryForm = '';
		}
	}

  // =================== Charge tous les Amis dans friends =============

	function load(){
		eventService.get().then(function(res){
			$scope.events = res.data;
		});
    friendService.get().then(function(res){
			$scope.friends = res.data;
		});
    recetteService.get().then(function(res){
			$scope.recettes = res.data;
		});

	};

// =================== END tous les Amis dans friends =============

// =================== Ajout recettes à un évènement =============
$scope.tabRecetteEvent = [];
$scope.addRecette = function (idRecette,index) {
	if ($scope.tabRecetteEvent.indexOf(idRecette) == -1){
	$scope.tabRecetteEvent.push(idRecette);
	console.log($scope.tabRecetteEvent);
	$('#gly'+index).addClass('gly-checked');
	}
	else
	{
	$scope.tabRecetteEvent.splice($scope.tabRecetteEvent.indexOf(idRecette),1);
	console.log($scope.tabRecetteEvent);
	$('#gly'+index).removeClass('gly-checked');
	}
}

// =================== END Ajout recettes à un évènement =============


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
		data.tabRecetteEvent = $scope.tabRecetteEvent;
		data.tabFriendEvent = $scope.tabFriendEvent;

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
		$scope.tabRecetteEvent = [];
		$scope.tabFriendEvent = [];
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


// ===================  END Ajout des amis dans la BD =============

// ===================  Ajout amis event =============
	$scope.tabFriendEvent = [];
	$scope.addFriendEvent = function (id){
		if ($scope.tabFriendEvent.indexOf(id) == -1){
			$scope.tabFriendEvent.push(id)
			console.log($scope.tabFriendEvent);
		}
		else {
			$scope.tabFriendEvent.splice($scope.tabFriendEvent.indexOf(id),1)
			console.log($scope.tabFriendEvent);

		}
	}

// ===================  END Ajout des amis dans la BD =============

	load();
}