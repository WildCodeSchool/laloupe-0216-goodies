function compteController($scope, $rootScope, $location, eventService, friendService, userService){
	$('body').css('background-image', 'none').css('background-image','url("./assets/pasta.jpg")');
	function load (){
		eventService.get().then(function(res){
			$scope.events = res.data;
		});
		friendService.get().then(function(res){
			$scope.friends = res.data;
		});
		userService.findOne($rootScope.userId).then(function (res) {
			$scope.user = res.data;
		});
	}
	load();

	// ==================  Hover pencil case =============

	$(document).ready(function () {
        $('.info').hover(function () {
            $('.fa-1').addClass('fa-12');
        }, function () {
            $('.fa-1').removeClass('fa-12');
        });
    });

		// ================= END Hover pencil case =============


			$scope.update = function(user){
						userService.update($rootScope.userId, user).then(function(res){
							$scope.adresse = false;
					load();
				});
			}
			$scope.updateEmail = function(user){
						userService.update($rootScope.userId, user).then(function(res){
							$scope.adresseEmail = false;
					load();
				});
			}


}
