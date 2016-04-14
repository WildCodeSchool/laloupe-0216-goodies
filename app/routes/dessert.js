// ROUTES DESSERTS
var Dessert = require('../models/dessert.js');
module.exports = function(app) {

    app.get('/desserts', Dessert.findAll);
    app.post('/desserts', Dessert.create);
    app.put('/desserts/:id', Dessert.update);
    app.delete('/desserts/:id', Dessert.delete);

}
