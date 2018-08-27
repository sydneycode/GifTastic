// an array of strings, each one related to a different topic
var topics = ["cat", "horse", "rat", "road runner"];

for (var i = 0; i < topics.length; i++) {
    var nextButton = "<button class='animal-btn' data-topic='" + topics[i] + "'>" + 
        topics[i] + "</button>"
    $('#buttons').append(nextButton);
}

$(document).on("click", ".animal-btn", function() {
    // store the value of the topic corresponding to the value that was clicked on 
    // in the variable animal
    var animal = $(this).attr("data-topic");
    console.log(animal);

    // construct the URL for the Giphy API for the current animal topic
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    // perform an AJAX GET request to access data from the specified URL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        //console.log(JSON.stringify(response));
        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // create an image tag and set the src attribute to the value necessary to 
            // display each gif correctly on the page
            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height_still.url);

            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("data-state", "still");
            animalImage.attr("class", "gif");
            
            //$(".gif").on("click", stopOrStartAnimation);

            // append the p element with the rating and the animal image to the gifDiv div
            gifDiv.append(p);
            gifDiv.append(animalImage);

            // prepend the gifDiv to the gif-results div
            $("#gif-results").prepend(gifDiv);
        }
    });
});

$(document).on("click", ".gif", function() {
    console.log("cat");
    
    // store the current data-state attribute of the image (class "gif") that was clicked
    var state = $(this).attr("data-state");
    
    // if the value of the data-state is still, then change the image to be animated
    // otherwise change the image to be still
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
});

$('#add-search-term').on("click", function() {
    // if the user enters a search term longer than 0 characters in length, 
    // add the search term typed into search input form as a new button
    if ($('#animal-input').val().length > 0) {
        var searchTerm = $('#animal-input').val().toLowerCase();
        topics.push(searchTerm);
        var nextButton = "<button class='animal-btn' data-topic='" + searchTerm + "'>" + 
            searchTerm + "</button>"
            console.log(nextButton);
        $('#buttons').append(nextButton);
    }
});

