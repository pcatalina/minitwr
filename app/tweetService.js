(function () {
  'use strict';

  var tweets = [];

  module.exports.addTweet = function (tweet) {
    tweets.unshift(tweet);
  };

  module.exports.getTweets = function () {
    return tweets;
  }

})();
