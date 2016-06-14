//	MODEL EVENT

var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
// var EmailTemplates = require('swig-email-templates');
var EmailTemplate = require('email-templates').EmailTemplate;
var eventSchema = new mongoose.Schema({
  crEnameForm: String,
  crEdateForm: Date,
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
      tabFriendEvent: req.body.tabFriendEvent
    },
    function() {
      console.log(req.body.friendmail);
      // create reusable transporter object using the default SMTP transport
      var transporter = nodemailer.createTransport({
             service: 'gmail',
             auth: {
                 user: "yoan.ficadiere@gmail.com", // your email here
                 pass: "P@tJerY0" // your password here
             }
         });
      // setup e-mail data with unicode symbols
      var mailOptions = {
        from: '"uber" <yoan.ficadiere@gmail.com>', // sender address
        to: req.body.friendmail, // list of receivers
        subject: 'Hello', // Subject line
        text: 'Hello world', // plaintext body
        html: '<b>Hello world</b>' // html body
      };
      // send mail with defined transport object
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: ' + info.response);
      });
      res.sendStatus(200);
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
      },
      function() {
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
