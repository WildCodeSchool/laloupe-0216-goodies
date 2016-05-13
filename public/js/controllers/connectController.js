function connectController($scope, $rootScope, $location, connectService){
	$('body').css('background-image', 'none').css('background-image','url("./assets/pasta.jpg")');
	$scope.connect = function(){
		connectService.connect($scope.user).then(function(res){
			$rootScope.token = res.data.token;
			$rootScope.userId = res.data.id;
			$location.path('/');
		}).catch(function(){
			$rootScope.loginMessage.title = "Connexion error";
			$rootScope.loginMessage.message = "Error login or password";
		});
	}
}
