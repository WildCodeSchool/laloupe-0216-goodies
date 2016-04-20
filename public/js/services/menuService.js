function menuService($http) {
    return {
        get : function() {
            return $http.get('/menu');
        },
        update : function(id, datas){
            return $http.put('/menu/' + id, datas);
        },
        create : function(datas) {
            return $http.post('/menu', datas);
        },
        delete : function(id) {
            return $http.delete('/menu/' + id);
        }
    }
};
