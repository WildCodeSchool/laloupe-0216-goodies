
// eventController ==============================

function eventController($scope, $http, eventService) {
	

	$scope.form = 1;

	
	$scope.required = true;
	
	
	function load(){
		eventService.get().then(function(res){
			$scope.events = res.data;
		});
		
	};



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
		$scope.form = 1;
		var data = {};
		data.name = $scope.name;
		data.date = $scope.date;
		data.time = $scope.time;
		data.num = $scope.num;
		data.street = $scope.street;
		data.city = $scope.city;
		$scope.test=1;
		

		eventService.create(data).then(function(res){
			load();
		});
		$scope.description = "";
		$scope.name = "";
		$scope.date = "";
		$scope.time = "";
		$scope.num = "";
		$scope.street = "";
		$scope.city = "";
		$scope.invitation = "";
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
