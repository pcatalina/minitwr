var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signin', function(req, res, next) {
    res.render('signin', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'Express' });
});

router.get('/tweets', function(req, res, next) {
    res.render('tweets', { title: 'Express' });
});

router.get('/myprofile', function(req, res, next) {
    res.render('myprofile', { title: 'Express' });
});

module.exports = router;
