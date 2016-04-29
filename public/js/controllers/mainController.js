function mainController($scope, $rootScope, $http) {
	$('body').css('background-image', 'none');
	$scope.showRecette = 'entree';


	$scope.menuShow = function (n) {
		angular.element($('#'+$scope.showRecette)).removeClass( "boutonActive" );
    angular.element($('#'+n)).addClass( "boutonActive" );
    $scope.showRecette = n;
  }
}
