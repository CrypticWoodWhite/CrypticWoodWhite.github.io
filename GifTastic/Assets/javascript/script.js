var topics = [
    "annapurna",
    "everest",
    "mount vinson",
    "rainier",
    "denali",
    "mont blanc",
    "fuji",
    "matterhorn",
    "kilimanjaro",
    "fitz roy",
    "aconcagua",
    "lhotse",
    "eiger",
    "half dome",
    "kosciusko",
    "mount elbrus",
    "k2",
    "puncak jaya"
]

// create a button for each string in array
function renderAllBtns() {
    for (i=0; i<topics.length; i++) {
        topicBtn = $("<button>");
        topicBtn.addClass("mountain btn btn-light mr-2 mb-2");
        topicBtn.attr("name", topics[i]);
        topicBtn.text(topics[i]);
        $("#buttons-go-here").append(topicBtn);
    }
    console.log(topics);
}

renderAllBtns();

// click submit and add to array of buttons
$("#submit").on("click", function(event) {
    event.preventDefault();

    newTopic = $("#input").val().trim();
    topics.push(newTopic);

    // render the last topic added to the array as a button
    topicBtn = $("<button>");
    topicBtn.addClass("mountain btn btn-light mr-2 mb-2");
    topicBtn.attr("name", topics[topics.length - 1]);
    topicBtn.text(topics[topics.length - 1]);
    $("#buttons-go-here").append(topicBtn);

    // reset the input form
    $("#input").val("Add a mountain here");

    console.log(topics);
})

// ajax call when click a button
$("#buttons-go-here").on("click", ".mountain", function(event) {
    event.preventDefault();

    var searchGiphy = $(this).attr("name");
    console.log(searchGiphy);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchGiphy + "&limit=10&api_key=r2kqhlSIjqyRxoLRa3nNsR8rATxYv3Xm";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            console.log(queryURL);

            var results = response.data;
            
            // clears the div of any gifs from previous click
            $("#gifs-go-here").html("");

            if (results.length === 0) {
                $("#gifs-go-here").html("<p>Sorry, no GIFs to report :(</p>");
            }
            // for each search result, get rating and src for still and animated gif
            else {
                for (i=0; i<results.length; i++) {
                    gifsGoHere = $("<div>");
                    rating = $("<p>").text("Rating: " + results[i].rating);
                    mountainPic = $("<img>");
                    mountainPic.attr("src", results[i].images.fixed_height_still.url);
                    mountainPic.attr("src-still", results[i].images.fixed_height_still.url);
                    mountainPic.attr("src-animate", results[i].images.fixed_height.url);
                    mountainPic.attr("image-state", "still");
                    mountainPic.addClass("gif");
                    gifsGoHere.append(mountainPic);
                    gifsGoHere.append(rating);
                    $("#gifs-go-here").prepend(gifsGoHere);
                }
            }
        });
})

// start and stop gif on click
// learned that I have to select the wrapper element rather than the gifs because the gifs are dynamically created
$("#gifs-go-here").on("click", ".gif", function(event) {
    event.preventDefault();

    var state = $(this).attr("image-state");
    console.log("This gif's state before click was: " + state);

    if (state === "still") {
        $(this).attr("src", $(this).attr("src-animate"));
        $(this).attr("image-state", "animate");
        console.log("We are animated!");
    }
    else if (state === "animate") {
        $(this).attr("src", $(this).attr("src-still"));
        $(this).attr("image-state", "still");
        console.log("We are stilled!");
    }
})
    



