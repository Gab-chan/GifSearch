$(document).ready(function() {

    var gifs = [
      "News", "trolls", "Trump", "2020", "funny", "anime",
      "movies", "shows", "memes", "tech", "jokes",
      "trending", "hot", "food", "puppies", "cats"
    ];
  
    // function to make buttons and add to page
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
      $(areaToAddTo).empty();
  
      for (var i = 0; i < arrayToUse.length; i++) {
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type", arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
      }
  
    }
  
    $(document).on("click", ".gifs-button", function() {
      $("#gifs").empty();
      $(".gifs-button").removeClass("active");
      $(this).addClass("active");
  
      var type = $(this).attr("data-type");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
  
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;
  
          for (var i = 0; i < results.length; i++) {
            var gifsDiv = $("<div class=\"animal-item\">");
  
            var rating = results[i].rating;
  
            var p = $("<p>").text("Rating: " + rating);
  
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
  
            var gifsImage = $("<img>");
            gifsImage.attr("src", still);
            gifsImage.attr("data-still", still);
            gifsImage.attr("data-animate", animated);
            gifsImage.attr("data-state", "still");
            gifsImage.addClass("animal-image");
  
            gifsDiv.append(p);
            gifsDiv.append(gifsImage);
  
            $("#gifs").append(gifsDiv);
          }
        });
    });
  
    $(document).on("click", ".gifs-image", function() {
  
      var state = $(this).attr("data-state");
  
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  
    $("#add-gifs").on("click", function(event) {
      event.preventDefault();
      var newGifs = $("input").eq(0).val();
  
      if (newGifs.length > 2) {
        gifs.push(newGifs);
      }
  
      populateButtons(gifs, "gifs-button", "#gifs-buttons");
  
    });
  
    populateButtons(gifs, "gifs-button", "#gifs-buttons");
  });
  