
//	MODEL EVENT

var mongoose = require('mongoose');
var eventSchema = new mongoose.Schema({
  crEnameForm: String,
  crEdateForm: String,
  crEtimeForm: String,
  crEnumberForm: Number,
  crEwayForm: String,
  crEcityForm: String,
  crEpostalcodeForm: String,
  crEcountryForm: String,
  friendlastname: String,
  friendfirstname: String,
  friendmail: String,
  tabRecetteEvent: Array,
  tabFriendEvent: Array,
  userId: String,
  position: Array
});
var Event = {

    model: mongoose.model('Event', eventSchema),

    create: function(req, res) {
		Event.model.create({
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
			tabRecetteEvent: req.body.tabRecetteEvent,
			tabFriendEvent: req.body.tabFriendEvent,
      userId: req.body.userId,
      position: req.body.position,
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
		Event.model.findByIdAndRemove(req.params.id, function(){
			res.sendStatus(200);
		})
	}
}
module.exports = Event;
