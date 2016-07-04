function recetteService($http) {
    return {
        get: function() {
            return $http.get('/recettes');
        },
        findOne: function(id) {
            return $http.get('/recettes/'+id);
        },
        update: function(id, datas) {
            return $http.put('/recettes/' + id, datas);
        },
        create: function(datas) {
            return $http.post('/recettes', datas);
        },
        mailConfirmAmi: function(datas) {
            return $http.post('/mail', datas);
        },
        mailIvitNewUser: function(datas) {
            return $http.post('/mail', datas);
        },
        delete: function(id) {
            return $http.delete('/recettes/' + id);
        }
    };
};
