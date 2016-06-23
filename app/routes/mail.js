//	ROUTES MAIL

var Mail = require('../models/mail/mail.js');
module.exports 	= function(app) {
	app.post('/mail/invitAmi', Mail.mailInvitAmi);
	app.post('/mail/invitEvent', Mail.mailInvitEvent);
};
