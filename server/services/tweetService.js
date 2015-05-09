'use strict';

module.exports = function() {

  var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    moment = require('moment');

  var tweetSchema = new Schema({
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      text: String,
      date: Date
    },
    { versionKey: false });

  var Tweet = mongoose.model('Tweet', tweetSchema);

  function onError(err, req, res) {
    console.log(err);
    return res.send(500, err);
  }

  function getAllTweets(req, res, done) {
    Tweet.find()
      .populate('user', 'username')
      .exec(function(err, tweets) {
        if(err) return onError(res, err);
        done(err, tweets);
      });
  }

  function addTweet(req, res, done) {
    // TODO: verify data
    var tweet = {
      user: req.user.id,
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
        return res.json(200, tweets);
      });
    },

    show: function(req, res) {
      throw {message: 'not yet implemented'};
    },

    create: function(req, res) {
      addTweet(req, res, function(err, tweet) {
        if(err || !tweet) return onError(res, err);
        return res.json(201, tweet);
      });
    },

    update: function(req, res) {
      throw {message: 'not yet implemented'};
    },

    destroy: function(req, res) {
      throw {message: 'not yet implemented'};
    },

    // Non-API route TODO: get rid of
    postTweet: function(req, res) {
      addTweet(req, res, function(err, tweet) {
        if(err || !tweet) return onError(res, err);
        return res.redirect('/tweets');
      });
    },

    // Non-API route TODO: get rid of
    getTweets: function(req, res) {
      getAllTweets(req, res, function(err, tweets) {
        if(err || !tweets) return onError(res, err);
        res.render('tweets', { tweets: tweets });
      });
    }
  };
};
