var express = require('express');
var router = express.Router();

var tweets = [];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/tweets', function (req, res, next) {
  res.render('tweets', {tweets: tweets});
});

router.post('/tweets', function (req, res, next) {
  tweets.unshift(req.body.tweet);
  res.redirect('/tweets')
});

router.get('/signin', function (req, res, next) {
  res.render('signin');
});

router.get('/signup', function (req, res, next) {
  res.render('signup');
});

router.get('/myprofile', function (req, res, next) {
  res.render('myprofile');
});

module.exports = router;
