'use strict';

module.exports = function(mongoose) {

  var userSchema = {
    username: String,
    email: String,
    password: String
  };

  var User = mongoose.model('userModel', userSchema);

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
    create: function() {
      addUser(req, res, function(err, user) {
        if(err) return onError(err, req, res);
        return res.json(201, user);
      });
    },

    register: function(req, res, next) {
      addUser(req, res, function(err, user) {
        if(err) return onError(err, req, res);
        return res.redirect('/tweets');
      });
    },

    authenticateUser: function(username, password, done) {
      User.findOne({
          username: username.toLowerCase()
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
