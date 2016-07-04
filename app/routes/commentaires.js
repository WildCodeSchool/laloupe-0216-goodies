// ROUTES RECETTE
var Commentaires = require('../models/commentaires.js');
module.exports = function(app) {
    app.post('/commentaire', Commentaires.addcommentaire);
    app.put('/commentaire/:id', Commentaires.updateCommentaire);
    app.delete('/commentaire/:id', Commentaires.deleteCommentaire);
}
