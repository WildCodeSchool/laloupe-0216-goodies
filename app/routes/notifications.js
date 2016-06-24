// ROUTES RECETTE
var User = require('../models/user.js');
module.exports = function(app) {

    // app.get('/notifications', Notifications.findAll);
    app.post('/notifications/friends', User.createFriends);
    app.post('/notifications/events', User.createEvents);
    // app.put('/notifications/:id', Notifications.update);
    // app.delete('/notifications/:id', Notifications.delete);
}
