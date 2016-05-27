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

	$(document).ready(function () {
        $('.info').hover(function () {
            $('.fa-1').addClass('topNavActive');
        }, function () {
            $(this).removeClass('topNavActive');
        });
    });

		// $(document).ready(function () {
    //     $('#topNav a').hover(function () {
    //         $(this).siblings().removeClass('topNavActive');
    //         $(this).addClass('topNavActive');
    //     }
    // });
}
