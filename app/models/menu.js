// MODEL DESSERT
var mongoose = require('mongoose');

var menuSchema = new mongoose.Schema({
img: String

});

var menu = {

    model: mongoose.model('menu', menuSchema),

    create: function(req, res) {
        menu.model.create({
            img: req.body.img
        }, function(){
            res.sendStatus(200);
        })
    },

    findAll: function(req, res) {
        menu.model.find(function (err, data) {
            res.send(data);
        });
    },

    update: function(req, res){
        menu.model.findByIdAndUpdate(req.params.id, {
            img: req.body.img
        }, function(){
            res.sendStatus(200);
        })
    },

    delete: function(req, res){
        menu.model.findByIdAndRemove(req.params.id, function(){
            res.sendStatus(200);
        })
    }
}

module.exports = menu;
