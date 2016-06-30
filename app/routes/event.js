//	ROUTES EVENTS

var Event = require('../models/event.js');
module.exports 	= function(app) {
	app.get('/events', Event.findAll);
	app.get('/events/:id', Event.findById);
	app.post('/events/create', Event.create);
	app.put('/events/:id', Event.update);
	app.delete('/events/delete/:id', Event.delete);

};
