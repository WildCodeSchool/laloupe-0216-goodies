function notificationService($http) {
    return {
        get : function() {
            return $http.get('/notifications');
        },
        update : function(id, datas){
            return $http.put('/notifications/' + id, datas);
        },
        create : function(datas) {
            return $http.post('/notifications', datas);
        },
        delete : function(id) {
            return $http.delete('/notifications/' + id);
        }
    }
};
