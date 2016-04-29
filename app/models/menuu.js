// MODEL MENU
var mongoose = require('mongoose');

var menuSchema = new mongoose.Schema({
  img: String,
  titre: String,
  description: String,
  preparation: String,
  cuisson: String,
  ingredient: String,
  recette: String,
  type: String
})
var Menu = {
  model: mongoose.model('Menu', menuSchema),
  create: function(req, res) {
    console.log(req.body);
    Menu.model.create(req.body, function() {
      res.sendStatus(200);
    })
  },
  findAll: function(req, res) {
    Menu.model.find(function(err, data) {
      res.send(data);
    });
  },
  update: function(req, res) {
    Menu.model.findByIdAndUpdate(req.params.id, req.body, function(err) {
      if (err) {
        res.send(err);
      } else {
        res.sendStatus(200);
      }
    });
  },
  delete: function(req, res) {
    Menu.model.findByIdAndRemove(req.params.id, function() {
      res.sendStatus(200);
    })
  }
}
module.exports = Menu;
