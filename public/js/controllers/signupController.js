function signupController($scope, $location, $timeout, userService) {
    $('body').css('background-image', 'none').css('background-image', 'url("./assets/pasta.jpg")');

    $scope.username = "";
    $scope.signupMessage = {};
    $scope.signupMessage.title = "";

    $scope.signup = function() {
        userService.create($scope.user).then(function(res) {
            $scope.username = res.data.username;
            $timeout(function() {
                $location.path('/login');
            }, 2000);
        }).catch(function(res) {
            $scope.signupMessage.title = "Signup error";
            $scope.signupMessage.message = res.data;
        });
    }
}
