var topics = ['Michael Jordan', 'Lebron James', 'Kobe Bryant', 'Tim Duncan']

function renderButtons() {
    
    $("#players-view").empty();

    for (var i = 0; i < topics.length; i++) {

      var a = $("<button>");
      a.addClass("player");
      a.attr("data-person", topics[i]);
      a.text(topics[i]);
      $("#players-view").append(a);
    }
  }

  $("#add-player").on("click", function(event) {
    event.preventDefault();
    
    var topic = $("#player-input").val().trim();
  
    topics.push(topic);
   
    renderButtons();
  });
  
  renderButtons();
   
$(document).on('click','.player',function() {
    var person = $(this).attr("data-person");
        
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    person + "&api_key=BV78IysChejxiELQOCnedrGPTdyE6G2z&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    
    .then(function(response) {
        var results = response.data;
  
        for (var i = 0; i < results.length; i++) {
  
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                
                var gifDiv = $("<div class='item'>");
  
                var rating = results[i].rating;
  
                var p = $("<p>").text("Rating: " + rating);

                var personImage = $("<img>");

                personImage.attr("src", results[i].images.fixed_height.url);
                personImage.attr('data-state','still');
                personImage.attr('class','gif')
                personImage.attr('data-still', )
                personImage.attr('data-animate', )
                gifDiv.append(p);
                gifDiv.append(personImage);
  
                
                $("#gifs-appear").prepend(gifDiv);
            }
        }
    });
});

$(".gif").on("click", function() {
    var state = $(this).attr("data-state");
  
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });