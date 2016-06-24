var nodemailer = require('nodemailer');

var Mail = {
  mailInvitAmi: function(req, res) {

    console.log('yoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoanyoan');
    console.log(req.body);
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'yoan.ficadiere@gmail.com',
        pass: '********'
      }
    });
    // create reusable transporter object using the default SMTP transport
    var mailOptions = {
      from: '"Goodies" <yoan.ficadiere@gmail.com>', // sender address
      to: req.body.email, // list of receivers
      subject: 'World ✔', // Subject line
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
  },
  mailConfirmAmi: function(req, res) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'yoan.ficadiere@gmail.com',
        pass: '*******'
      }
    });
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
  },

  mailIvitNewUser: function(req, res) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'yoan.ficadiere@gmail.com',
        pass: '*******'
      }
    });
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
