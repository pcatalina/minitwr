'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


var app = express();

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: 'minisecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 360000
  }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.username);
});

passport.deserializeUser(function (username, done) {

  var user = {
    username: username
  };

  done(null, user);
});

passport.use(new LocalStrategy(
  function (username, password, done) {
    if (username === 'test' && password === 'test') {

      var user = {
        username: username
      };

      return done(null, user);
    }
    return done(null, false, {message: 'Invalid username and/or password'});
  }
));

app.post('/signin', passport.authenticate('local', {
  successRedirect : '/tweets',
  failureRedirect : '/signin'
}));

var users = [];

app.post('/signup', function(req, res, next) {
  var user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };

  users.push(user);

  res.redirect('/tweets');
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {

    console.error(err.message);
    console.error(err.status);
    console.error(err.stack);
    console.error(err);

    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
