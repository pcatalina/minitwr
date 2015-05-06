$(document).ready(function()
{
   /* var tweets = $("ul#tweet-list").children();
    tweets.each(function(i) {
        $(this).text("Hello");
    })*/
    var dates = $("p#date");
    dates.each(function(i) {
        var date = $(this).text();
        $(this).text(moment(date).fromNow());

    console.log(date);
    //console.log(dates);
    });
});


//moment(date).formNow()