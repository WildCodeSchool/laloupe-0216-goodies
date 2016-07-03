// MODEL RECETTE
var Recette = require('../models/recette.js');
var mongoose = require('mongoose');

var commentaireSchema = new mongoose.Schema({
  userName: String,
  userId: String,
  recetteId: String,
  commentaire: String,
  date: Date
});
var Commentaires = {
    model: mongoose.model('Commentaires', commentaireSchema),
    addcommentaire: function(req, res) {
        console.log('========= add com: ===========')
        console.log(req.body);
        Commentaires.model.create(req.body, function(err, data) {
            if (req.body._id) {
              dataid = req.body._id;
            }
            else {
              dataid = data._id;
            }
            Recette.addcommentaire(req.body.userId,req.body.recetteId, dataid, res);
        });
    },
    findAll: function(req, res) {
        Commentaires.model.find({}, function(err, data) {
            res.send(data);
        });
    },
    update: function(req, res) {
        Commentaires.model.findByIdAndUpdate(req.params.id, req.body, function(err) {
            if (err) {
                res.send(err);
            } else {
                res.sendStatus(200);
            }
        });
    },
    delete: function(req, res) {
        Commentaires.model.findByIdAndRemove(req.params.id, function() {
            res.sendStatus(200);
        });
    }
};
module.exports = Commentaires;
