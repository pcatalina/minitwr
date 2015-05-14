$(document).ready(function () {

    $("input#button").click(function () {

        var text = $('textarea#text').first().val();
        console.log(text);
        if (text === "") {
            $("p#alert").text("Write something !!!");
        }
        else {
            $.post('/api/tweets', {
                tweetText: text
            })
                .done(function (res) {

                    appendTweet(function (date, user, message) {
                        date.text(res.date).text(moment(res.date).fromNow());
                        user.append(res.user);
                        message.text(res.text);

                    });

                    $('textarea#text').val('');
                })
                .fail(function (res) {
                    console.log(res);
                });

        }

    });
});

function appendTweet(done) {
    var ul = $("ul#tweet-list");
    var listItem = $("<li>").addClass("bounceInRight animated tweets media");
    ul.prepend(listItem);

    var date = $("<p>").addClass("date");

    listItem.append(date);

    var user = $("<p>").addClass("media-heading user");
    var img = $("<img>").addClass("img pull-left media-object")
                        .attr('src', '../images/icon.png');
    user.append(img);

    listItem.append(user);

    var message = $("<p>").addClass("message");

    listItem.append(message);
    done(date, user, message);
}