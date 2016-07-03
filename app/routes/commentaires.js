// ROUTES RECETTE
var Commentaires = require('../models/commentaires.js');
module.exports = function(app) {
    app.post('/commentaire', Commentaires.addcommentaire);
}
