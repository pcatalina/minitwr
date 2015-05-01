var express = require('express');
var router = express.Router();

var tweetService = require('../services/tweetService');

router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/signin', function (req, res, next) {
  res.render('signin');
});

router.get('/signup', function (req, res, next) {
  res.render('signup');
});

router.use(function (req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/signin')
});

router.get('/tweets', function (req, res, next) {
  tweetService.getTweets(function (err, tweets) {
    res.render('tweets', {tweets: tweets});
  });
});

router.post('/tweets', function (req, res, next) {
  tweetService.addTweet(req.body.tweet);
  res.redirect('/tweets')
});

router.get('/myprofile', function (req, res, next) {
  res.render('myprofile');
});

module.exports = router;
