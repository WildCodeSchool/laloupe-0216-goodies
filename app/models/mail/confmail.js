var nodemailer = require('nodemailer');
var mail = function() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yoan.ficadi@gmail.com',
      pass: '*'
    }
  });
  // create reusable transporter object using the default SMTP transport
  var mailOptions = {
    from: '"Goodies" yoan.ficadiere@gmail.com', // sender address
    to: "yoan.ficadiere@gmail.com", // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: 'test'
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
};

module.exports = mail;

