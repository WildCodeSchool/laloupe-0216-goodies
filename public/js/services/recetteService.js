function recetteService($http) {
    return {
        get: function() {
            return $http.get('/recettes');
        },
        update: function(id, datas) {
            return $http.put('/recettes/' + id, datas);
        },
        addCommentaire: function(datas) {
            return $http.post('/recettes/commentaire', datas);
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
