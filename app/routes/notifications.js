// ROUTES RECETTE
var Notifications = require('../models/notifications.js');
module.exports = function(app) {

    app.get('/notifications', Notifications.findAll);
    app.post('/notifications/friends', Notifications.createFriends);
    app.post('/notifications/events', Notifications.createEvents);
    app.put('/notifications/:id', Notifications.update);
    app.delete('/notifications/:id', Notifications.delete);
}
