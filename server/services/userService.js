'use strict';

module.exports = function() {

  var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


  var userSchema = new Schema({
      username: String,
      email: String,
      password: String
    },
    { versionKey: false });

  var User = mongoose.model('User', userSchema);

  function onError(err, req, res) {
    console.log(err);
    return res.send(500, err);
  }

  function addUser(req, res, done) {

    // TODO: validate data

    var user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };

    User.create(user, function(err, user) {
      done(err, user);
    });
  }

  return {

    index: function(req, res) {
      throw {message: 'not yet implemented'};
    },

    show: function(req, res) {
      throw {message: 'not yet implemented'};
    },

    create: function(req, res) {
      addUser(req, res, function(err, user) {
        if(err) return onError(err, req, res);
        return res.json(201, user);
      });
    },

    update: function(req, res) {
      throw {message: 'not yet implemented'};
    },

    destroy: function(req, res) {
      throw {message: 'not yet implemented'};
    },

    // Non-API functionality
    // TODO: get rid of it
    register: function(req, res, next) {
      addUser(req, res, function(err, user) {
        if(err) return onError(err, req, res);
        return res.redirect('/tweets');
      });
    },

    // Non-API functionality
    // TODO: get rid of it
    authenticateUser: function(email, password, done) {
      User.findOne({
          email: email
        },
        function(err, user) {
          if(err)
            return done(err, false);

          if(!user) // user not found
            return done(null, false);
          else if(user.password === password) // right password
            return done(null, user);
          else
            return done(null, false); // wrong password
        });
    },

    isAdmin: function(req, res) {
      return false;
    },

    deserializeUser: function(id, done) {
      User.findOne({ _id: id }).exec(function(err, user) {
        if(err) return done(err, false);

        if(user) {
          return done(null, user);
        }
        else {
          return done(null, false);
        }
      });
    }
  }
};
