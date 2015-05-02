'use strict';

module.exports = function(mongoose) {

  var moment = require('moment');

  var tweetSchema = {
    text: String,
    date: Date
  };

  var Tweet = mongoose.model('Tweet', tweetSchema);

  function onError(err, req, res) {
    console.log(err);
    return res.send(500, err);
  }

  function getAllTweets(req, res, done) {
    Tweet.find(function(err, tweets) {
      if(err) return onError(res, err);
      done(err, tweets);
    });
  }

  function addTweet(req, res, done) {
    // TODO: verify data
    var tweet = {
      text: req.body.tweetText,
      date: moment()
    };

    Tweet.create(tweet, function(err, tweet) {
      if(err) return onError(res, err);
      done(err, tweet);
    });
  }

  return {
    index: function(req, res) {
      getAllTweets(req, res, function(err, tweets) {
        if(err || !tweets) return onError(res, err);
        res.render('tweets', { tweets: tweets });
      });
      return res.json(200, tweets);
    },

    create: function(req, res) {
      addTweet(req, res, function(err, tweet) {
        if(err || !tweet) return onError(res, err);
        return res.json(201, tweet);
      });
    },

    postTweet: function(req, res) {
      addTweet(req, res, function(err, tweet) {
        if(err || !tweet) return onError(res, err);
        return res.redirect('/tweets');
      });
    },

    getTweets: function(req, res) {
      getAllTweets(req, res, function(err, tweets) {
        if(err || !tweets) return onError(res, err);
        res.render('tweets', { tweets: tweets });
      });
    }
  };
};

