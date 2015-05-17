$(document).ready(function() {

  $("input#button").click(function() {

    var text = $('textarea#text').first().val();
    console.log(text);
    if(text === "") {
      $("p#alert").text("Write something !!!");
    }
    else {
      $.post('/api/tweets', {
        tweetText: text
      })
        .done(function(res) {

          appendTweet(function(date, user, message) {
            date.text(res.date).text(moment(res.date).fromNow());
            user.text(res.user.username);
            message.text(res.text);

          });

          $('textarea#text').val('');
        })
        .fail(function(res) {
          console.log(res);
        });

    }

  });
});

function appendTweet(done) {
  $.get('/partials/tweet')
    .done(function(res) {
      var tweet = $(res);
      $("ul#tweet-list").prepend(tweet);

      var date = tweet.find('p#date'),
        username = tweet.find('p#username'),
        message = tweet.find('p.message');

      done(date, username, message);
    })
    .fail(function(res) {
      console.log(res);
    });
}
