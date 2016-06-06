/* ------------------------------------------------------------------------- *\
	 						   ROUTES USERS
\* ------------------------------------------------------------------------- */

var User = require('../models/user.js');
var Auth = require('../middlewares/authorization.js');

module.exports 	= function(app) {

	app.get('/api/users', User.findAll);

	app.get('/api/users/email/:email', Auth.user.hasAuthorization, User.findMail);

	app.get('/api/users/:name/:prenom', Auth.user.hasAuthorization, User.findByNameSurname);

	app.get('/api/users/:id', Auth.user.hasAuthorization, User.findById);

	app.post('/api/users', User.create);

	app.post('/api/users/friends', User.addFriends)

	app.put('/api/users/:id', Auth.user.hasAuthorization, User.update);

	app.delete('/api/users/friends/:userId/:friendId', Auth.user.hasAuthorization, User.deleteFriend);

	app.delete('/api/users/:id', Auth.user.isAdministrator, User.delete);

}
