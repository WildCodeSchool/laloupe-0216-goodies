// ROUTES RECETTE
var Recette = require('../models/recette.js');
var Commentaire = require('../models/commentaires.js');
module.exports = function(app) {

    app.get('/recettes', Recette.findAll);
    app.post('/recettes', Recette.create);
    app.post('/recettes/commentaire', Commentaire.create);
    app.put('/recettes/:id', Recette.update);
    app.delete('/recettes/:id', Recette.delete);
}
