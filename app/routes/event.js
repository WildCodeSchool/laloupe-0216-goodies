//	ROUTES EVENTS

var Event = require('../models/event.js');
module.exports 	= function(app) {
	app.get('/events', Event.findAll);
	app.post('/events', Event.create);
	app.put('/events/:id', Event.update);
	app.delete('/events/:id', Event.delete);

};
