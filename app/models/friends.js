
//	MODEL friends

var User = require('../models/user.js');
var mongoose = require('mongoose');
var friendsSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  friendmail: String,
  friendId: String,
  userId: String,
  img: String
});
var friends = {

    model: mongoose.model('friends', friendsSchema),

    create: function(req, res) {
      console.log('body: ' + req.body);
		friends.model.create(
      req.body
		, function(err, data){
			User.addFriends(req.body.userId, data._id, res);
		})
	},
	findAll: function(req, res) {
		friends.model.find(function (err, data) {
			res.send(data);
		});
	},
	update: function(req, res){
		friends.model.findByIdAndUpdate(req.params.id, {
			friendlastname: req.body.friendlastname,
			friendfirstname: req.body.friendfirstname,
			friendmail: req.body.friendmail,
		}, function(){
			res.sendStatus(200);
		})
	},
	delete: function(req, res){
		friends.model.findByIdAndRemove(req.params.id, function(){
			res.sendStatus(200);
		})
	}
}
module.exports = friends;
