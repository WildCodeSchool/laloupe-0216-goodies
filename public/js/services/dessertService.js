function dessertService($http) {
    return {
        get : function() {
            return $http.get('/desserts');
        },
        update : function(id, datas){
            return $http.put('/desserts/' + id, datas);
        },
        create : function(datas) {
            return $http.post('/desserts', datas);
        },
        delete : function(id) {
            return $http.delete('/desserts/' + id);
        }
    }
};
