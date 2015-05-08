$(document).ready(function()
{
    var dates = $("p#date");
    dates.each(function(i) {
        var date = $(this).text();
        $(this).text(moment(date).fromNow());

    });
});

$(document).ready(function () {
    var messages = $("li#message");
    messages.each(function (j) {
        $(messages[j + 1]).insertBefore(messages[j]);
        var message = $(this).text();
        console.log(message);
    });
});




