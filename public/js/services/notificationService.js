function notificationService($http) {
    return {
        get : function() {
            return $http.get('/notifications');
        },
        update : function(id, datas){
            return $http.put('/notifications/' + id, datas);
        },
        createFriends : function(datas) {
            return $http.post('/notifications/friends', datas);
        },
        createEvents : function(datas) {
            return $http.post('/notifications/events', datas);
        },
        delete : function(id) {
            return $http.delete('/notifications/' + id);
        }
    }
};
