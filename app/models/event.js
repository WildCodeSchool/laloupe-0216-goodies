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
    tabRecetteEvent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recette'
    }],
    tabFriendEvent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    userId: String,
    position: Array,
    name: String,
    prenom: String,
    type: Boolean
});
var Event = {

    model: mongoose.model('Event', eventSchema),

    create: function(req, res) {
        Event.model.create(req.body, function(err, data) {
            console.log(req.body);
            if (req.body._id) {
                dataid = req.body._id;
            } else {
                dataid = data._id;
                for (var i = 0; i < req.body.tabFriendEvent.length; i++) {
                    User.createEvents(req.body.tabFriendEvent[i], data._id, res);
                }
            }
            User.addEvent(req.body.userId, dataid, res);

        });
    },
    findAll: function(req, res) {
        Event.model.find(function(err, data) {
            res.send(data);
        });
    },
    findById: function(req, res) {
        console.log('================ findById =============');
        console.log(req.params.id);
        Event.model.findOne({
                _id: req.params.id
            })
            .populate('tabRecetteEvent', {
                __v: 0
            })
            .populate('tabFriendEvent', {
                events: 0,
                password: 0,
                email: 0,
                adresse: 0,
                friends: 0,
                recettes: 0,
                eventInvit: 0,
                friendsInvit: 0,
                addfriends: 0,
                isAdmin: 0
            })
            .exec(function(err, user) {
                if (err) {
                    res.sendStatus(400);
                }
                res.json(user);
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
}
module.exports = Event;
