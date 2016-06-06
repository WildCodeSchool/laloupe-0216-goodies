function connectController($scope, $rootScope, $location, connectService, userService, userFactory){
	$('body').css('background-image', 'none').css('background-image','url("./assets/pasta.jpg")');
	$scope.connect = function(){

		connectService.connect($scope.user).then(function(res){
			console.log('res connection');
			console.log(res.data.user);
			sessionStorage.setItem('token', res.data.token); // Replace with cookies
			sessionStorage.setItem('userId', res.data.id); // Replace with cookies
			$rootScope.token = sessionStorage.getItem('token');
	    $rootScope.userId = sessionStorage.getItem('userId');
			$location.path('/');
			userFactory.user = res.data.user;
		}).catch(function(){
			$rootScope.loginMessage.title = "Connexion error";
			$rootScope.loginMessage.message = "Error login or password";
		});
	}
}
