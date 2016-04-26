function recetteService($http) {
    return {
        get : function() {
            return $http.get('/recettes');
        },
        update : function(id, datas){
            return $http.put('/recettes/' + id, datas);
        },
        create : function(datas) {
            return $http.post('/recettes', datas);
        },
        delete : function(id) {
            return $http.delete('/recettes/' + id);
        }
    }
};
