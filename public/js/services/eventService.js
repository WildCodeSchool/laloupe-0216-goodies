
//  EVENT SERVICE

function eventService($http) {
    return {
        get : function() {
            return $http.get('/events');
        },
        update : function(id, data){
            return $http.put('/events/' + id, data);
        },
        create : function(data) {
            return $http.post('/events', data);
        },
        delete : function(id) {
            return $http.delete('/events/' + id);
        }
    }
};
