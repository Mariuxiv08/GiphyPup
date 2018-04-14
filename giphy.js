$(document).ready(function() {

    let puppies = [
    "dog", "puppies"
  ];

  // function to make buttons and add to page
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (let i = 0; i < arrayToUse.length; i++) {
      const a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }

  }

  $(document).on("click", ".animal-button", function() {
    $("#animals").empty();
    $(".animal-button").removeClass("active");
    $(this).addClass("active");

    const type = $(this).attr("data-type");
    const queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
      let results = response.data;

      for (let i = 0; i < results.length; i++) {
        const animalDiv = $("<div class=\"animal-item \" >");

        const rating = results[i].rating;

        let p = $("<p>").text("Rating: " + rating);

        const animated = results[i].images.fixed_height.url;
        const still = results[i].images.fixed_height_still.url;

        let animalImage = $("<img>");
        animalImage.attr("src", still);
        animalImage.attr("data-still", still);
        animalImage.attr("data-animate", animated);
        animalImage.attr("data-state", "still");
        animalImage.addClass("animal-image");

        animalDiv.append(p);
        animalDiv.append(animalImage);

        $("#animals").append(animalDiv);
      }
    });
  });

  $(document).on("click", ".animal-image", function() {

    const state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-animal").on("click", function(event) {
    event.preventDefault();
    const newAnimal = $("input").eq(0).val();

    if (newAnimal.length > 2) {
      puppies.push(newAnimal);
    }

    populateButtons(puppies, "animal-button", "#animal-buttons");

  });

  populateButtons(puppies, "animal-button", "#animal-buttons");
});