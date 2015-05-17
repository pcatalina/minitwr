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
          var date = moment(res.date).fromNow(),
            username = res.user.username,
            message = res.text;

          appendTweet(date, username, message);

          $('textarea#text').val('');
        })
        .fail(function(res) {
          console.log(res);
        });
    }
  });
});

function appendTweet(date, username, message) {
  $.get('/partials/tweet')  // get partial html from server
    .done(function(res) {
      var tweet = $(res);   // create DOM element from it
      $("ul#tweet-list").prepend(tweet);  // prepend to list

      // find text elements and put text
      tweet.find('p#date').text(date);
      tweet.find('p#username').text(username);
      tweet.find('p.message').text(message);
    })
    .fail(function(res) {
      console.log(res);
    });
}
