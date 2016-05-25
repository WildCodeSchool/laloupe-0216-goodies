function userService($http){
	return {
		get : function() {
				return $http.get('/api/users');
		},
		create: function(user){
			return $http.post('/api/users', user);
		}
	}
}
