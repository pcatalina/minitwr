$(document).ready(function() {
  var dates = $("p#date");
  dates.each(function(i) {
    var date = $(this).text();
    $(this).text(moment(date).fromNow());

  });

  var messages = $("li#message");
  messages.each(function(j) {
    $(messages[j + 1]).insertBefore(messages[j]);
    var message = $(this).text();
    console.log(message);
  });

  /*
   A test example of API consumption: tweets retrieval
   TODO: get rid of
   */
  $.get('/api/tweets')
    .done(function(tweets) {
      console.log(tweets);
    })
    .fail(function(err) {
      console.log(err);
    });


  /*
   A test example of API consumption: tweet posting
   TODO: get rid of
   */
  var newTweet = {
    tweetText: "Blah blah blah"
  };

  $.post('/api/tweets', newTweet)
    .done(function(res) {
      console.log(res);
    })
    .fail(function(res) {
      console.log(res);
    });

});




