function connectController($scope, $rootScope, $location, connectService, userService){
	$('body').css('background-image', 'none').css('background-image','url("./assets/pasta.jpg")');
	$scope.connect = function(){

		connectService.connect($scope.user).then(function(res){
			// userService.findOne(res.data.id).then(function(res){
			// 	console.log('user');
			// 	console.log(res.data);
			// })
			console.log('res');
			console.log(res.data);
			sessionStorage.setItem('token', res.data.token); // Replace with cookies
			sessionStorage.setItem('userId', res.data.id); // Replace with cookies
			$rootScope.token = sessionStorage.getItem('token');
	    $rootScope.userId = sessionStorage.getItem('userId');
			console.log($scope.user);
			$location.path('/');
		}).catch(function(){
			$rootScope.loginMessage.title = "Connexion error";
			$rootScope.loginMessage.message = "Error login or password";
		});
	}
}
