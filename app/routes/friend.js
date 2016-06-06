
//	ROUTES FRIENDS

var friends = require('../models/friends.js');
module.exports 	= function(app) {
	app.get('/friends', friends.findAll);
	app.post('/friends', friends.create);
	app.put('/friends/:id', friends.update);
	app.delete('/friends/:id', friends.delete);

}
