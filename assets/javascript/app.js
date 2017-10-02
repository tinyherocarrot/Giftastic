// variables 
// ========================
var topics = ["donut", "eggs", "coffee", "sun", "commute"];


// functions
// =========================
function renderButtons() {

	//first clears the div containing buttons
    $("#buttons-here").empty();

    // Loops through the array of topics
    for (var i = 0; i < topics.length; i++) {

      // Then dynamically generates buttons for each movie in the array
      var a = $("<button>");
      // Adds a class of topic to our button
      a.addClass("topic btn btn-warning");
      // Adds a data-attribute
      a.attr("data-name", topics[i]);
      // Provided the button text
      a.text(topics[i]);
      // Adds the button to the buttons-view div
      $("#buttons-here").append(a);
	}
};


// main logic/ startup code
// =========================

$("#add-topic").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var topic = $("#topic-input").val().trim();
    if ((topic !== "") && (topics.indexOf(topic) < 0)) {
	    // The movie from the textbox is then added to our array
	    topics.push(topic);

	    // Calling renderButtons which handles the processing of our movie array
	    renderButtons();
    	$("#topic-input").val("");
    }

});

// DOCUMENT CALL WORKS FOR EXISTING AND FUTURE BUTTONS. AMAZING.
$(document).on("click", ".topic", function() {
	console.log("button clicked")
	var topic = $(this).data("name");
	// use v2??
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";
	var newGifRow = $('<div class="scrolldiv">');

	$.ajax({
	  url: queryURL,
	  method: "GET"
	})
	.done(function(response) {
		var gifs = response.data;
		console.log(response)
		for (var i = 0; i < gifs.length; i++) {
		 	
		 	// cant directly append gif, needs to be in a new div
		 	var gifDiv = $("<span class='item'>");

            var rating = gifs[i].rating;

            var p = $("<p>").text("Rating: " + rating);

		 	var newGif = $("<img>");
		 	newGif.addClass("gif");
		 	newGif.attr("src", gifs[i].images.fixed_height_still.url);
		 	newGif.data("still", gifs[i].images.fixed_height_still.url);
		 	newGif.data("animate", gifs[i].images.fixed_height.url);
		 	newGif.data("state", "still");

		 	gifDiv.append(p);
		 	gifDiv.append(newGif);

		 	newGifRow.prepend(gifDiv);
		}
		 $("#gifs-here").prepend(newGifRow);
	});

});

$(document).on("click", ".gif", function() {
    
    var state = $(this).data("state");

    if (state === "still") {
    	$(this).attr("src", $(this).data("animate"));
    	$(this).data("state", "animate");
    } 

    if (state === "animate") {
        $(this).attr("src", $(this).data("still"));
        $(this).data("state", "still");
    } 

});


renderButtons();