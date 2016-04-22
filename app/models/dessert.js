// MODEL DESSERT
var mongoose = require('mongoose');

var dessertSchema = new mongoose.Schema({
imgEntre : String,
titreEntre : String,
descriptionEntre : String,
recetteEntre : String,

imgPlat : String,
titrePlat : String,
descriptionPlat : String,
recettePlat : String,

imgDessert : String,
titreDessert : String,
descriptionDessert : String,
recetteDessert : String,

});
var Dessert = {
    model: mongoose.model('Dessert', dessertSchema),

    create: function(req, res) {
        console.log(req.body.imgDessert);
        Dessert.model.create(req.body, function(){
            res.sendStatus(200);
        })
    },
    findAll: function(req, res) {
        Dessert.model.find(function (err, data) {
            res.send(data);
        });
    },
    update: function(req, res){
        Dessert.model.findByIdAndUpdate(req.params.id, req.body, function(){
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
