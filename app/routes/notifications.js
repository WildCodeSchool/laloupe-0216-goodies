// ROUTES RECETTE
var Notifications = require('../models/notifications.js');
module.exports = function(app) {

    app.get('/notifications', Notifications.findAll);
    app.post('/notifications', Notifications.create);
    app.put('/notifications/:id', Notifications.update);
    app.delete('/notifications/:id', Notifications.delete);
}
