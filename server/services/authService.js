'use strict';

module.exports = function(app, userService) {
  var passport = require('passport');

  app.use(passport.initialize());
  app.use(passport.session());

  var LocalStrategy = require('passport-local').Strategy;

  passport.use(new LocalStrategy(
    function(username, password, done) {

      console.log("Local auth\nUsername:\t" + username + "n\Password:\t" + password);

      userService.authenticateUser(username, password, function(err, user) {

        if(!user) {
          console.log("local auth failed!");
          return done(null, false, { message: 'Invalid username and/or password' });
        }
        else {
          return done(null, user);
        }
      });
    }));

  passport.serializeUser(function(user, done) {
    if(user)
      done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    userService.deserializeUser(id, done);
  });

  return {

    // API functionality
    authenticate: function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {

        var error = err || info;

        if(error)
          return res.json(401, error);

        if(!user)
          return res.json(404, { message: 'Something went wrong, please try again.' });

          req.logIn(user, function(err) {
            if(err)
              return res.json(404, err);
            else
              return res.json(200, user);
          });

      })(req, res, next)
    },

    isAdmin: function(req, res, next) {
      if(req.isAuthenticated() && userService.isAdmin(req, res))
        next();
      else
        return res.json(403, { message: 'user not authenticated' });
    },

    isAuthenticated: function(req, res, next) {
      if(req.isAuthenticated())
        next();
      else
        return res.json(403, { message: 'user not authenticated' });
    },

    // Non-API functionality
    // TODO: get rid of it
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

    logOut: function(req, res, next) {
      req.logout();
      res.redirect('/');
    },

    ensureAuthenticated: function(req, res, next) {
      if(req.isAuthenticated())
        return next();
      else
      // TODO: return json fail and blame on client side instead
        res.redirect('/signin')
    }
  }
};
