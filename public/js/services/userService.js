function userService($http){
	return {
		get : function() {
			return $http.get('/api/users');
		},
		findOne : function(id){
			return $http.get('/api/users/' + id);
		},
		create : function(user){
			return $http.post('/api/users', user);
		}
	}
}
