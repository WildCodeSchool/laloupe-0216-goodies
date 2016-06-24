var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yoan.ficadiere@gmail.com',
    pass: 'P@tJerY02'
  }
});
var Mail = {
  mailInvitAmi: function(req, res) {
    // create reusable transporter object using the default SMTP transport
    var mailOptions = {
      from: '"Goodies" <yoan.ficadiere@gmail.com>', // sender address
      to: req.body.email, // list of receivers
      subject: 'Demande d\'ami', // Subject line
      text: 'Hello world ', // plaintex t body
      html: req.body.user + ' vous à demandez en amis',
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });
    transporter.close();
  },
  mailInvitEvent: function(req, res) {
    // create reusable transporter object using the default SMTP transport
    var mailOptions = {
      from: '"Goodies" <yoan.ficadiere@gmail.com>', // sender address
      to: req.body.email.join(), // list of receivers
      subject: 'Invitation', // Subject line
      text: 'Hello world 🐴', // plaintex t body
      html: req.body.user + ' vous à inviter à son événement <a>http://localhost:8000/#/signup</a>'
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });
    transporter.close();
  },

  mailIvitNewUser: function(req, res) {

    // create reusable transporter object using the default SMTP transport
    var mailOptions = {
      from: '"Goodies" <yoan.ficadiere@gmail.com>', // sender address
      to: "yoan.ficadiere@gmail.com", // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world 🐴', // plaintex t body
      html: 'test'
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });
  }
};
module.exports = Mail;
