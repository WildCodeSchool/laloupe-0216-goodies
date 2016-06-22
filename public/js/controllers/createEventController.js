//createEventController ======================>

function createEventController($scope, $http, eventService, $location, $rootScope, userService, userFactory, notificationService) {
	$('body').css('background-image', 'none').css('background-image','url("./assets/floor-1.jpg")');
	$rootScope.$on('userFactoryUpdate', function () {

	$scope.dataFriends = {};
	$scope.user = {}
	$scope.form = 1;
	$scope.creform = 1;
	$scope.required = true;
	$scope.data = {};

		$scope.user.adresse = userFactory.user.adresse;
		$scope.recettes = userFactory.user.recettes;
		$scope.friends = userFactory.user.friends;
	// checkbox autocomplete (at home)
	$scope.adress = function () {
		if (angular.element($('#crEhomeCheckbox')).is(':checked') == true) { // lorsque la checkbox est coché
			angular.element($('#crEnumberForm')).val($scope.user.adresse.num);
			angular.element($('#crEwayForm')).val($scope.user.adresse.rue);
			angular.element($('#crEcityForm')).val($scope.user.adresse.ville);
			angular.element($('#crEpostalcodeForm')).val($scope.user.adresse.cp);
			angular.element($('#crEcountryForm')).val($scope.user.adresse.pays);
			$scope.data.crEnumberForm = $scope.user.adresse.num;
			$scope.data.crEwayForm = $scope.user.adresse.rue;
			$scope.data.crEcityForm = $scope.user.adresse.ville;
			$scope.data.crEpostalcodeForm = $scope.user.adresse.cp;
			$scope.data.crEcountryForm = $scope.user.adresse.pays;
		}
		else {
			angular.element($('#crEnumberForm')).val('');
			angular.element($('#crEwayForm')).val('');
			angular.element($('#crEcityForm')).val('');
			angular.element($('#crEpostalcodeForm')).val('');
			angular.element($('#crEcountryForm')).val('');
			$scope.data.crEnumberForm = '';
			$scope.data.crEwayForm = '';
			$scope.data.crEcityForm = '';
			$scope.data.crEpostalcodeForm = '';
			$scope.data.crEcountryForm = '';
		}
	}

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

		//================== Ajout d'events ==========

	$scope.add = function(){
		$scope.data.userId = $rootScope.userId;
		$scope.data.position = $scope.position;
		eventService.create($scope.data).then(function(res){ // <------ create event
			console.log(res.data._id);
			userService.findOne($rootScope.userId).then(function(r){
				userFactory.user = r.data;
			});

			//================== addNotifications events ==========
			for ( var i = 0 ; i < $scope.data.tabFriendEvent.length ; i++){
				console.log($scope.data.tabFriendEvent[i]);
				var ev = {
					events:{
						eventUserId: $rootScope.userId,
						userId: $scope.data.tabFriendEvent[i],
						eventUserName: userFactory.user.name,
						eventUserSurname: userFactory.user.prenom,
						name: $scope.data.crEnameForm,
						date: $scope.data.crEdateForm
					}
				};
				notificationService.createEvents(ev).then(function(){});
			}
			$location.path('/events');
		}); // <----- End create event

	}

// ========================= Ajout des amis dans la BD ==============

$scope.addFriends = function(){
		$scope.dataFriends.userId = $rootScope.userId;
		userService.findMail($scope.dataFriends.friendmail).then(function(res){
					$scope.dataFriends.friendId = res.data._id
					userService.createFriend($scope.dataFriends).then(function(){
						userService.findOne($rootScope.userId).then(function(r){
							userFactory.user = r.data;
						});
						$scope.dataFriends = {};
				});
			},function(err){ // ============== si l'ami n'est pas dans la BDD ================
				userService.createFriend($scope.dataFriends).then(function(){
					userService.findOne($rootScope.userId).then(function(res){
						userFactory.user = res.data;
					});
						$scope.dataFriends = {};
				});
			});
};

// ===================  END Ajout des amis dans la BD =============

// ===================  Ajout amis event =============
	$scope.data.tabFriendEvent = [];
	$scope.addFriendEvent = function (id){

		if ($scope.data.tabFriendEvent.indexOf(id) == -1){
			$scope.data.tabFriendEvent.push(id);
		}
		else {
			$scope.data.tabFriendEvent.splice($scope.data.tabFriendEvent.indexOf(id),1);
		}
	};

// ===================  END Ajout des amis dans la BD =============

$scope.geoloc = function (){
		address = $scope.data.crEnumberForm+' '+$scope.data.crEwayForm+' '+$scope.data.crEpostalcodeForm+' '+$scope.data.crEcityForm;
		$scope.creform += 1;
		$http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyAOq8Pa8bDZCg5wbgRmcqkoP8JibZt5j1M').then(function(res) {
			$scope.position = [res.data.results[0].geometry.location.lat,res.data.results[0].geometry.location.lng];
		})
	}
	}
}
