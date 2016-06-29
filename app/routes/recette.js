// ROUTES RECETTE
var Recette = require('../models/recette.js');
module.exports = function(app) {
    app.get('/recettes', Recette.findAll);
    app.post('/recettes', Recette.create);
    app.put('/recettes/:id', Recette.update);
    app.delete('/recettes/:id', Recette.delete);
};
