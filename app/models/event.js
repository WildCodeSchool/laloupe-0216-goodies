
//	MODEL EVENT

var mongoose = require('mongoose');
var eventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  time: String,
  num: String,
  street: String,
  city: String,
});
var Event = {
    
    model: mongoose.model('Event', eventSchema),
    
    create: function(req, res) {
		Event.model.create({
			name: req.body.name,
			date: req.body.date,
			time: req.body.time,
			num: req.body.num,
			street: req.body.street,
			city: req.body.city,
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
			name: req.body.name,
			date: req.body.date,
			time: req.body.time,
			num: req.body.num,
			street: req.body.street,
			city: req.body.city,
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
