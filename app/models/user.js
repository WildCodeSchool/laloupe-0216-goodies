var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String,
  prenom : String,
  img: String,
  email: { type: String, required: true, unique: true },
  password: String,
  adresse: {
    num: String,
    rue: String,
    cp: String,
    ville: String,
    pays: String,
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  }],
  recettes:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recette',
  }],
  isAdmin : { type: Boolean, default: false}
});

var User = {
    model: mongoose.model('User', userSchema),
    /*
    */

    connect: function(req, res) {
        User.model.findOne(req.body,{__v: 0, isAdmin: 0})
        .populate('events',{__v: 0})
        .populate('friends',{password: 0, events: 0, adresse: 0, recettes: 0, friends: 0, isAdmin: 0,__v: 0})
        .populate('recettes',{__v: 0})
        .exec(function(err, user){
            if(err || !user)
                res.sendStatus(403);
            else{
                var token = jwt.sign(user, 'tokenSecret', {
                  expiresIn: "24h" // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                  success: true,
                  token: token,
                  id : user._id,
                  user: user
                });
            }
        });
	},

    findAll: function(req, res) {
		User.model.find({}, {password: 0}, function (err, users) {
			res.json(users);
		});
	},
	findById: function(req, res) {
    console.log('findById');
    console.log(req.params);
		User.model.findOne({_id:req.params.id})
      .populate('friends',{password: 0, events: 0, adresse: 0, recettes: 0, friends: 0, isAdmin: 0,__v: 0})
      .populate('events',{__v: 0})
      .populate('recettes',{__v: 0})
      .exec(function (err, user) {
        if (err) {
          res.sendStatus(400);
        }
        res.json(user);
		});
	},
	findByNameSurname: function(req, res) {
    console.log(req.params);
		User.model.findOne(req.params, {password: 0, __v: 0, isAdmin: 0}, function (err, user) {
			 res.json(user);
		});
	},
	findMail: function(req, res) {
    console.log('findMail');
    console.log(req.params);
		User.model.findOne(req.params, {password: 0, __v: 0, isAdmin: 0, adresse: 0}, function (err, user) {
      console.log(user);
      if (!user) {
        res.sendStatus(400);
      }
      else {
        res.json(user);
      }
		});
	},
	addEvent: function(userId, eventId, res) {
		User.model.findByIdAndUpdate(userId, {
        $push: {
          events: eventId
        }
      }, function (err) {
        res.sendStatus(200);
		});
	},
	addFriends: function(req, res) {
    console.log('addFriends');
    console.log(req.body);
    var friendId = mongoose.Types.ObjectId(req.body.friendId);
		User.model.findByIdAndUpdate(req.body.userId, {
        $push: {
          friends: friendId
        }
      }, function (err) {
        res.sendStatus(200);
		});
	},
	addRecettes: function(userId, recetteId, res) {
		User.model.findByIdAndUpdate(userId, {
        $push: {
          recettes: recetteId
        }
      }, function (err) {
        res.sendStatus(200);
		});
	},

	create: function(req, res) {
		User.model.create(req.body,
        function(err, user) {
            if (!err)
                res.json(user);
            else{
                if (err.code === 11000 || err.code === 11001)
                    err.message = "Username " + req.body.name  + " already exist";

                res.status(500).send(err.message);
            }
	    });
	},

	update: function(req, res) {
		User.model.update({_id: req.params.id}, {$set: req.body}, function(err, user) {
            if (err)
                res.status(500).send(err.message);
            res.json(user);
	    });
	},
	delete: function(req, res){
		User.model.findByIdAndRemove(req.params.id, function(err){
            if (err)
                res.status(500).send(err.message);
			res.sendStatus(200);
		})
	},
	deleteFriend: function(req, res){
    console.log('deleteFriend');
    console.log(req.params);
    console.log(req.params.userId);
    User.model.findByIdAndUpdate(req.params.userId, {
        $pull: {
          friends: req.params.friendId
        }
      }, function (err) {
        if (err)
            res.status(500).send(err.message);
  res.sendStatus(200);
		});
	}
}


module.exports = User;
