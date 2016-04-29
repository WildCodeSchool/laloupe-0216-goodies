// MODEL RECETTE
var mongoose = require('mongoose');

var recetteSchema = new mongoose.Schema({
  img: String,
  titre: String,
  description: String,
  preparation: String,
  cuisson: String,
  ingredient: String,
  recette: String,
  type: String
})
var Recette = {
  model: mongoose.model('Recette', recetteSchema),
  create: function(req, res) {
    console.log(req.body);
    Recette.model.create(req.body, function() {
      res.sendStatus(200);
    })
  },
  findAll: function(req, res) {
    Recette.model.find(function(err, data) {
      res.send(data);
    });
  },
  update: function(req, res) {
    Recette.model.findByIdAndUpdate(req.params.id, req.body, function(err) {
      if (err) {
        res.send(err);
      } else {
        res.sendStatus(200);
      }
    });
  },
  delete: function(req, res) {
    Recette.model.findByIdAndRemove(req.params.id, function() {
      res.sendStatus(200);
    })
  }
}
module.exports = Recette;
