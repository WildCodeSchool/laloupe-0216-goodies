// ROUTES RECETTE
var Recette = require('../models/recette.js');
var Commentaire = require('../models/commentaires.js');
module.exports = function(app) {

    app.get('/recettes', Recette.findAll);
    app.get('/recettes/:id', Recette.findOne);
    app.post('/recettes', Recette.create);
    app.post('/commentaire', Commentaire.addcommentaire);
    app.put('/recettes/:id', Recette.update);
    app.delete('/recettes/:id', Recette.delete);
}
