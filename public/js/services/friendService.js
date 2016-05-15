
//  friends SERVICE

function friendService($http) {
    return {
        get : function() {
            return $http.get('/friends');
        },
        update : function(id, data){
            return $http.put('/friends/' + id, data);
        },
        create : function(data) {
            return $http.post('/friends', data);
        },
        delete : function(id) {
            return $http.delete('/friends/' + id);
        }
    }
};
