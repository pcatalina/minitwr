'use strict';

module.exports = function(app) {
  var passport = require('passport');

  app.use(passport.initialize());
  app.use(passport.session());

  var LocalStrategy = require('passport-local').Strategy;

  passport.use(new LocalStrategy(
    function(username, password, done) {

      console.log("local auth: " + username + " " + password);

      if(username === 'test' && password === 'test') {

        console.log("local auth succeeded!");

        var user = {
          username: username
        };


        return done(null, user);
      }

      console.log("local auth failed!");
      return done(null, false, { message: 'Invalid username and/or password' });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.username);
  });

  passport.deserializeUser(function(username, done) {

    var user = {
      username: username
    };

    done(null, user);
  });

  return {
    logIn: function(req, res, next) {

      passport.authenticate('local',
        function(err, user, info) {

          if(err) {
            return next(err);
          }

          // login failed
          if(!user) {
            // TODO: return json fail and blame on client side instead
            return res.redirect('/signin');
          }

          req.logIn(user, function(err) {
            if(err) return next(err);

            // login succeeded
            // TODO: return json success and do something on client side instead
            return res.redirect('/tweets');
          });
        })(req, res, next);

    },

    ensureAuthenticated: function(req, res, next) {
      if(req.isAuthenticated())
        return next();
      else
        res.redirect('/signin')
    }
  }
};
