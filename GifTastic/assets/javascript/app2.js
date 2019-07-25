$(document).ready(function () {
    // my array
    var topic = ["Cat", "Dog", "Horse", "Mice", "Fish", "Deer", "Whale", "Bird", "Fox", "Badger", "Squirrel"];

    //This function creates individual buttons from the array, and displays the gif buttons
    function displayGifButtons() {
        $("#gifButtons").empty();
        for (var i = 0; i < topic.length; i++) {
            var gifButton = $("<button>");

            gifButton.addClass("animal");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", topic[i]);
            gifButton.text(topic[i]);

            $("#gifButtons").append(gifButton);
        }
    }
    //This function is for creating a new button from the input box.

    function addNewButton() {
        $("#addNewGifBtn").on("click", function () {

            var newAnimal = $("#animalInput").val().trim();

            displayGifButtons();
            //return false is important, or no new button is created
            //This also prevents blank buttons from being added
            if (newAnimal == "") {
                return false;
            }
            //This outputs the new button to our array of animals, Then calls the
            //function to display the buttons
            topic.push(newAnimal);
        });
    }

    // This function is for retieving and displaying the gifs
    function displayGifs() {
        var newAnimal = $(this).attr("data-name");
        console.log(newAnimal);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newAnimal + "&api_key=qGqWyxf6PVoGWKcnyFJUPZdT0dzGxA07&limit=10";
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .then(function (response) {
                //This clears the div so we dont keep adding on with each button click
                $("#gifs").empty();

                //This shows results of gifs
                var results = response.data;
                console.log(results);

                for (var i = 0; i < results.length; i++) {
                    //this puts the gifs into a div
                    var gifDiv = $("<div>");
                    var gifImage = $("<img>");

                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height.url);

                    //This sets the images that come to paused
                    gifImage.attr("data-state", "still");

                    //This is important or the gifs won't play.  Its used in the event handlers
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);

                    //add new div to existing divs
                    $("#gifs").prepend(gifDiv);
                    var rating = results[i].rating;
                    var gifRating = $("<p>").text("Rating: " + rating);

                    gifDiv.append(gifRating);
                }
            });
    }

    displayGifButtons();
    addNewButton();

    //These are the event handlers for the button click events
    //This access the class "animal" in the buttons, on the click event, and then runs the function displayGifs
    $(document).on("click", ".animal", displayGifs);

    //This is where the gif class image is used!!!
    //This access the class "image" in the gif generation, on the click event.
    $(document).on("click", ".image", function () {


        //This handles the click event on the gif.  if still, animate and visa versa
        var gifsState = $(this).attr('data-state');
        if (gifsState == 'still') {

            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});