var nodemailer = require('nodemailer');

module.exports = function(app) {

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yoan.ficadiere@gmail.com',
      pass: 'P@tJerY0'
    }
  });

  // setup e-mail data with unicode symbols
  app.post('/mailEvents', function(req, res) {
    // create reusable transporter object using the default SMTP transport
    var mailOptions = {
      from: '"Goodies" <yoan.ficadiere@gmail.com>', // sender address
      to: req.body.friendmail, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world 🐴', // plaintext body
      html: '<b>Hello world 🐴</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });
  });
}
