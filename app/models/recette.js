// MODEL RECETTE
var User = require('../models/user.js');
var mongoose = require('mongoose');

var recetteSchema = new mongoose.Schema({
    img: String,
    titre: String,
    description: String,
    preparation: String,
    cuisson: String,
    ingredient: String,
    recette: String,
    type: String,
    NbrPersonne: String,
    prix: String,
    difficulte: String,
    userId: String,
    moreVote: Number,
    lessVote: Number,
    commentaires: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Commentaires',
    }]
});
var Recette = {
    model: mongoose.model('Recette', recetteSchema),
    create: function(req, res) {
        console.log('body: ')
        console.log(req.body);
        Recette.model.create(req.body, function(err, data) {
            if (req.body._id) {
                dataid = req.body._id;
            } else {
                dataid = data._id;
            }
            User.addRecettes(req.body.userId, dataid, res);
        });
    },
    findAll: function(req, res) {
        Recette.model.find({}, {
                __v: 0,
            })
            .populate('commentaires', {
                __v: 0
            })
            .exec(function(err, recettes) {
                if (err) {
                    res.sendStatus(400);
                }
                res.json(recettes);
            });
    },
    findOne: function(req, res) {
        Recette.model.findOne({_id: req.params.id}, {
                __v: 0,
            })
            .populate('commentaires', {
                __v: 0
            })
            .exec(function(err, recette) {
                if (err) {
                    res.sendStatus(400);
                }
                res.json(recette);
            });
    },
    addcommentaire: function(userId, recetteId, comId, res) {
        console.log('========= body add com recette: ==========')
        console.log(recetteId);
        console.log(comId);
        Recette.model.findByIdAndUpdate(recetteId, {
            $push: {
                commentaires: comId
            }
            // User.model.addcommentaire(userId, comId, res);
        }, function(err, userId, comId) {
            if (err) {
                console.log(err)
                res.send(err);
            }else {
              res.sendStatus(200)
            }
        });
    },
    update: function(req, res) {
        Recette.model.findByIdAndUpdate(req.params.id, req.body, function(err) {
            if (err) {
                res.send(err);
            } else {
                res.sendStatus(200);
            }
        });
    },
    delete: function(req, res) {
        Recette.model.findByIdAndRemove(req.params.id, function() {
            res.sendStatus(200);
        });
    }
};
module.exports = Recette;
