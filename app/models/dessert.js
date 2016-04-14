// MODEL DESSERT
var mongoose = require('mongoose');

var dessertSchema = new mongoose.Schema({
img: String

});

var Dessert = {

    model: mongoose.model('Dessert', dessertSchema),

    create: function(req, res) {
        Dessert.model.create({
            img: req.body.img
        }, function(){
            res.sendStatus(200);
        })
    },

    findAll: function(req, res) {
        Dessert.model.find(function (err, data) {
            res.send(data);
        });
    },

    update: function(req, res){
        Dessert.model.findByIdAndUpdate(req.params.id, {
            img: req.body.img
        }, function(){
            res.sendStatus(200);
        })
    },

    delete: function(req, res){
        Dessert.model.findByIdAndRemove(req.params.id, function(){
            res.sendStatus(200);
        })
    }
}

module.exports = Dessert;
