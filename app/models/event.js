
//	MODEL EVENT

var mongoose = require('mongoose');
var eventSchema = new mongoose.Schema({
  description: String,
  description1: String,
  nom: String,
  image: String,
  lieu: String,
  jour: String,
  mois: String,
  annee: String,
  heure: String,
  minute: String,
  menu: Array,
  invites: Array
  
});
var Event = {
    
    model: mongoose.model('Event', eventSchema),
    
    create: function(req, res) {
		Event.model.create({
			description: req.body.description,
			description1: req.body.description1,
			nom: req.body.nom,
			image: req.body.image,
			lieu: req.body.lieu,
			jour: req.body.jour,
			mois: req.body.mois,
			annee: req.body.annee,
			heure: req.body.heure,
			minute: req.body.minute,
			menu: req.body.menu,
			invites: req.body.invites
		}, function(){
			res.sendStatus(200);
		})
	},
	findAll: function(req, res) {
		Event.model.find(function (err, data) {
			res.send(data);
		});
	},
	update: function(req, res){
		Event.model.findByIdAndUpdate(req.params.id, {
			description: req.body.description,
			nom: req.body.nom,
			lieu: req.body.lieu,
			jour: req.body.jour,
			mois: req.body.mois,
			annee: req.body.annee,
			heure: req.body.heure,
			minute: req.body.minute,
			menu: req.body.menu,
			invites: req.body.invites
		}, function(){
			res.sendStatus(200);
		})
	},
	delete: function(req, res){
		Event.model.findByIdAndRemove(req.params.id, function(){
			res.sendStatus(200);
		})
	} 
}
module.exports = Event;
