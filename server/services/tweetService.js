(function () {
  'use strict';

  var mongoose = require('mongoose'),
    moment = require('moment');


  mongoose.connect('mongodb://localhost/minitwr');

  var tweetSchema = {
    text: String,
    date: Date
  };

  var Tweet = mongoose.model('tweetModel', tweetSchema);


  module.exports.addTweet = function (tweetText) {

    var tweet = new Tweet({text: tweetText, date: moment()});

    tweet.save(function (err) {
      if (err)
        console.log(err);
    });
  };

  module.exports.getTweets = function (cb) {

    var tweetsToDisplay = [];


    Tweet.find(function (err, tweets) {

      tweets.forEach(function (tw) {

        var date = moment(tw.date);

        var tweetToDisplay;

        tweetToDisplay = {
          text: tw.text,
          time: date.format('HH:mm:ss'),
          date: date.format('DD-MM-YYYY')
        };

        tweetsToDisplay.push(tweetToDisplay)
      });


      cb(err, tweetsToDisplay);
    });
  }

})();
