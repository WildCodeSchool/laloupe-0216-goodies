
//	MODEL EVENT

var User = require('../models/user.js');
var mongoose = require('mongoose');
var notificationSchema = new mongoose.Schema({
  events:{
    userId: String,
    eventUserId: String,
    eventUserName: String,
    eventUserSurname: String,
    name: String,
    date: Date,
  },
  friends:{
    userId: String,
    friendUserId: String,
    friendUserName: String,
    friendUserSurname: String
  },
  addfriends:{
    userId: String,
    friendUserName: String,
    friendUserSurname: String
  }
});
var Notifications = {

    model: mongoose.model('Notifications', notificationSchema),

    create: function(req, res) {
      console.log('body Notifications: ')
      console.log(req.body);
      console.log(req.body.friends.friendUserId);
		Notifications.model.create(req.body, function(err, data){
			User.addNotifications(req.body.friends.userId, data._id, res);
		})
	},
	findAll: function(req, res) {
    Notifications.model.find(function(err, data) {
      res.send(data);
    });
  },
	update: function(req, res){
		Notifications.model.findByIdAndUpdate(req.params.id, req.body, function(){
			res.sendStatus(200);
		})
	},
	delete: function(req, res){
		Notifications.model.findByIdAndRemove(req.params.id, function(){
			res.sendStatus(200);
		})
	}
}
module.exports = Notifications;
