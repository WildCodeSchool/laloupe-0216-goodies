//	MODEL EVENT

var User = require('../models/user.js');
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
    position: Array,
    name: String,
    prenom: String
});
var Event = {

    model: mongoose.model('Event', eventSchema),

    create: function(req, res) {
        Event.model.create(req.body, function(err, data) {
            console.log(req.body);
            User.addEvent(req.body.userId, data._id, res);

            
            for (var i = 0 ; i < req.body.tabFriendEvent.length ; i++){
              User.createEvents(req.body.tabFriendEvent[i],data._id, res);
            }
        });
    },
    findAll: function(req, res) {
        Event.model.find(function(err, data) {
            res.send(data);
        });
    },
    update: function(req, res) {
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
        }, function() {
            res.sendStatus(200);
        });
    },
    delete: function(req, res) {
        Event.model.findByIdAndRemove(req.params.id, function() {
            res.sendStatus(200);
        });
    }
};
module.exports = Event;
