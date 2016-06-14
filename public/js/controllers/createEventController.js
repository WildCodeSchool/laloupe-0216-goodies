//createEventController ======================>

function createEventController($scope, $http, eventService, friendService, $location, recetteService, $rootScope, userService) {
	load();
	$('body').css('background-image', 'none').css('background-image','url("./assets/floor-1.jpg")');
	$scope.dataFriends = {};
	$scope.form = 1;
	$scope.creform = 1;
	$scope.required = true;

	// checkbox autocomplete (at home)
	$scope.adress = function () {
		if (angular.element($('#crEhomeCheckbox')).is(':checked') == true) { // lorsque la checkbox est coché
			angular.element($('#crEnumberForm')).val($scope.user.adresse.num);
			angular.element($('#crEwayForm')).val($scope.user.adresse.rue);
			angular.element($('#crEcityForm')).val($scope.user.adresse.ville);
			angular.element($('#crEpostalcodeForm')).val($scope.user.adresse.cp);
			angular.element($('#crEcountryForm')).val($scope.user.adresse.pays);
			$scope.crEnumberForm = $scope.user.adresse.num;
			$scope.crEwayForm = $scope.user.adresse.rue;
			$scope.crEcityForm = $scope.user.adresse.ville;
			$scope.crEpostalcodeForm = $scope.user.adresse.cp;
			$scope.crEcountryForm = $scope.user.adresse.pays;
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
	};

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
		userService.findOne($rootScope.userId).then(function (res) {
			$scope.user = res.data;
		});

	};

// =================== END tous les Amis dans friends =============

// =================== Ajout recettes à un évènement =============
$scope.tabRecetteEvent = [];
$scope.addRecette = function (idRecette,index) {
	if ($scope.tabRecetteEvent.indexOf(idRecette) == -1){
	$scope.tabRecetteEvent.push(idRecette);
	$('#gly'+index).addClass('gly-checked');
	}
	else
	{
	$scope.tabRecetteEvent.splice($scope.tabRecetteEvent.indexOf(idRecette),1);
	$('#gly'+index).removeClass('gly-checked');
	}
};

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
		data.userId = $rootScope.userId;
		data.position = $scope.position;
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
	};
	$scope.update = function(event){
		eventService.update(event._id, event).then(function(res){
			load();
		});
	};
	$scope.delete = function(event){
		eventService.delete(event._id).then(function(res){
			load();
		});
	}

// ========================= Ajout des amis dans la BD ==============

$scope.addFriends = function(){
		$scope.dataFriends.userId = $rootScope.userId;
		console.log($scope.dataFriends.userId);
		userService.findOne($scope.dataFriends.friendmail).then(function(res){
				console.log(res.data);
				if(res.data != null){
					console.log('ffffff');
					$scope.dataFriends.prenom = res.data.prenom;
					$scope.dataFriends.nom = res.data.name;
					$scope.dataFriends.img = res.data.img;
					friendService.create($scope.dataFriends).then(function(res){
					load();
					$scope.dataFriends.img = "";
					$scope.dataFriends.prenom = "";
					$scope.dataFriends.nom = "";
					$scope.dataFriends.friendmail = "";
				});
			}
				else {
					friendService.create($scope.dataFriends).then(function(res){
					load();
					$scope.dataFriends.prenom = "";
					$scope.dataFriends.nom = "";
					$scope.dataFriends.friendmail = "";
					});
				}
			});
	load();
};


// ===================  END Ajout des amis dans la BD =============

// ===================  Ajout amis event =============
	$scope.tabFriendEvent = [];
	$scope.addFriendEvent = function (id){
		if ($scope.tabFriendEvent.indexOf(id) == -1){
			$scope.tabFriendEvent.push(id)
		}
		else {
			$scope.tabFriendEvent.splice($scope.tabFriendEvent.indexOf(id),1)
		}
	}

// ===================  END Ajout des amis dans la BD =============

$scope.geoloc = function (){
		address = $scope.crEnumberForm+' '+$scope.crEwayForm+' '+$scope.crEpostalcodeForm+' '+$scope.crEcityForm;
		$scope.creform += 1;
		$http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyAOq8Pa8bDZCg5wbgRmcqkoP8JibZt5j1M').then(function(res) {
			$scope.position = [res.data.results[0].geometry.location.lat,res.data.results[0].geometry.location.lng];
		})
	}
}
