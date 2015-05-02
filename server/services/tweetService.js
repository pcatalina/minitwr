'use strict';

module.exports = function(mongoose) {

  var moment = require('moment');

  var tweetSchema = {
    text: String,
    date: Date
  };

  var Tweet = mongoose.model('tweetModel', tweetSchema);

  return {
    addTweet: function(tweetText) {

      var tweet = new Tweet({ text: tweetText, date: moment() });

      tweet.save(function(err) {
        if(err)
          console.log(err);
      });
    },

    getTweets: function(cb) {

      var tweetsToDisplay = [];


      Tweet.find(function(err, tweets) {

        tweets.forEach(function(tw) {

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
  }
};
