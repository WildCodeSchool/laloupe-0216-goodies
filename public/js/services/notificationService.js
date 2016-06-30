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
        deleteFriend : function(id) {
            return $http.post('/notifications/delete/friends', id);
        }
        ,
        deleteEvent : function(id) {
            return $http.post('/notifications/delete/events', id);
        }
    }
};
