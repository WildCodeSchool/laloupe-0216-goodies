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
      html: req.body.user + ' vous à inviter à son événement'
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

  mailNewUser: function(req, res) {

    // create reusable transporter object using the default SMTP transport
    var mailOptions = {
      from: '"Goodies" <yoan.ficadiere@gmail.com>', // sender address
      to: "yoan.ficadiere@gmail.com", // list of receivers
      subject: req.body.user + 'Vous invite à rejoindre Goodies', // Subject line
      text: 'Hello world 🐴', // plaintex t body
      html: req.body.user + ' Vous invite à rejoindre Goodies ' + ' connectez vous vite avec votre mot de passe temporaire :' + req.body.password + '  <a href="192.168.3.186:8000/#/signup">Connecter Vous ici</a>'
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
