function connectController($scope, $rootScope, $location, connectService, userFactory) {
    $('body').css('background-image', 'none').css('background-image', 'url("./assets/pasta.jpg")');
    $scope.connect = function() {

        connectService.connect($scope.user).then(function(res) {
            console.log('res connection');
            console.log(res.data.user);
            userFactory.user = res.data.user;
            sessionStorage.setItem('token', res.data.token); // Replace with cookies
            sessionStorage.setItem('userId', res.data.id); // Replace with cookies
            $rootScope.token = res.data.token;
            $rootScope.userId = res.data.id;

            $location.path('/');
        }).catch(function() {
            $rootScope.loginMessage.title = "Connexion error";
            $rootScope.loginMessage.message = "Error login or password";
        });
    }
}
