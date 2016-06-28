function friendHistoryController ($scope, $routeParams,userFactory){
    function load (){
        $scope.user = userFactory.user;
    }
    load ();

    
}
