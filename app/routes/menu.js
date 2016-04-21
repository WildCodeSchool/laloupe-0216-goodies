// ROUTES DESSERTS
var menu = require('../models/menu.js');
module.exports = function(app) {

    app.get('/menu', menu.findAll);
    app.post('/menu', menu.create);
    app.put('/menu/:id', menu.update);
    app.delete('/menu/:id', menu.delete);

}
