
//	MODEL EVENT

var User = require('../models/user.js');
var mongoose = require('mongoose');
var notificationSchema = new mongoose.Schema({
  events:{
    eventUserId: String,
    eventUserName: String,
    eventUserSurname: String,
    name: String,
    date: Date,
  },
  friends:{
    friendsUserId: String,
    friendUserName: String,
    friendUserSurname: String
  },
  addfriends:{
    friendUserName: String,
    friendUserSurname: String
  }
});
var Notifications = {

    model: mongoose.model('Notifications', notificationSchema),

    create: function(req, res) {
      console.log('body: ')
      console.log(req.body);
		Notifications.model.create(req.body, function(err, data){
			User.addNotifications(req.body.userId, data._id, res);
		})
	},
	findAll: function(req, res) {
    Notifications.model.find(function(err, data) {
      res.send(data);
    });
  },
	update: function(req, res){
		Notifications.model.findByIdAndUpdate(req.params.id, {
			crEnameForm: req.body.crEnameForm,
			crEdateForm: req.body.crEdateForm,
			crEtimeForm: req.body.crEtimeForm,
			crEnumberForm: req.body.crEnumberForm,
			crEwayForm: req.body.crEwayForm,
			crEcityForm: req.body.crEcityForm,
			crEpostalcodeForm: req.body.crEpostalcodeForm,
			crEcountryForm: req.body.crEcountryForm,
			friendlastname: req.body.friendlastname,
			friendfirstname: req.body.friendfirstname,
			friendmail: req.body.friendmail,
		}, function(){
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
