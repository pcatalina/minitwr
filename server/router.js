'use strict';

module.exports = function(express, app, mongoose) {
  var router = express.Router();

  var userService = require('./services/userService')(mongoose),
    tweetService = require('./services/tweetService')(mongoose),
    authService = require('./services/authService')(app, userService);

// Routes that don't require authentication
  router.get('/:path(signin|signup)',
    function(req, res, next) {
      res.render(req.param('path'));
    });

// Routes that require authentication
  router.get('/:path(myprofile)',
    authService.ensureAuthenticated,
    function(req, res) {
      res.render(req.param('path'), { user: req.user });
    });

// TODO: move to API
  router.post('/signup', userService.register);

// TODO: move to API
  router.post('/signin', authService.logIn);

// TODO: move to API
  router.get('/logout', authService.logOut);

// TODO: move to API
  router.get('/tweets', authService.ensureAuthenticated, tweetService.getTweets);

// TODO: move to API
  router.post('/tweets', authService.ensureAuthenticated, tweetService.postTweet);

// Anything else goes to index
  router.get('/*', function(req, res, next) {
    res.render('index');
  });

  return router;
};
