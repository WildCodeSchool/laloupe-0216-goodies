
// eventController ==============================

function eventsController($scope, $http, eventService) {
	$scope.title = "Evénements";
	// $scope.test = 1;

	// $scope.suivant = function (){
	// 	$scope.test += 1;
	// }
	// $scope.retour = function (){
	// 	$scope.test -= 1;
	// }
	// $scope.required = true;
	

	function load(){
		eventService.get().then(function(res){
			$scope.events = res.data;
		});
		menuService.get().then(function(res){
			$scope.menus = res.data;
		});
		accountService.get().then(function(res){
			$scope.accounts = res.data;
		});
	}
	$scope.event = {
		menu:[],
		invites: []
	};
	$scope.addToEventMenu= function(menu){
    $scope.event.menu.push(menu);
	};
	$scope.addToEventInvites= function(account){
	    $scope.event.invites.push(account);
	};

	// $scope.jours = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15',
	// 				'16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];

	// $scope.month = ['Jan','Fev','Mar','Avr','Mai','Juin','Juil','Aou','Sep','Nov','Oct','Dec'];

	// $scope.years = ['2016','2017','2018','2019','2020','2021','2022','2023','2024','2025','2026','2027','2028','2029','2030',
	// 				'2031','2032','2033','2034','2035','2036','2037','2038','2039','2040','2041','2042','2043','2045','2046',
	// 				'2047','2048','2049','2050'];

	// $scope.heures = ['00','01','02','03','04','05','06','07','08','09','10','11','12',
	// 				 '13','14','15','16','17','18','19','20','21','22','23'];

	// $scope.minutes = ['00','01','02','03','04','05','06','07','08','09',
	// 				  '10','11','12','13','14','15','16','17','18','19',
	// 				  '20','21','22','23','24','25','26','27','28','29',
	// 				  '30','31','32','33','34','35','36','37','38','39',
	// 				  '40','41','42','43','44','45','46','47','48','49',
	// 				  '50','51','52','53','54','55','56','57','58','59'];

	// $scope.images = ['../img/birthday.jpg','../img/christmas.jpg','../img/new_year.jpg','../img/petit_dej.jpg','../img/lunch.jpg','../img/diner.jpg'];
	// $scope.evenement = ['Anniversaire','Noel','Nouvel an','Petit déjeuner','déjeuner','diner'];

	$scope.add = function(){
		var data = {};
		data.description = $scope.description;
		data.description1 = $scope.evenement[$scope.description];
		data.nom = $scope.nom;
		data.lieu = $scope.lieu;
		data.jour = $scope.jour;
		data.mois = $scope.mois;
		data.annee = $scope.annee;
		data.heure = $scope.heure;
		data.minute = $scope.minute;
		data.menu = $scope.event.menu;
		data.invites = $scope.event.invites;
		data.image = $scope.images[$scope.description];
		$scope.test=1;
		

		eventService.create(data).then(function(res){
			load();
		});
		$scope.description = "";
		$scope.nom = "";
		$scope.lieu = "";
		$scope.jour = "";
		$scope.mois = "";
		$scope.annee = "";
		$scope.heure = "";
		$scope.minute = "";
		$scope.invitation = "";
		$scope.event.menu = [];
		$scope.event.invites = [];
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
	load();
}
