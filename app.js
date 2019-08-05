
var drinks = ["Beer", "Whiskey", "Vodka", "Tequila", "Rum", "Gin"];

var button;
var newDrink = ""; // new topic that will be added via the input field 

// create buttons from drinks array
var buttonGenerator = function (){
	// empty out previous emelements
	 $("#buttonArea").empty();
	// loops through the array to create the buttons
	for(i = 0; i < drinks.length; i++) {
		button = $("<button type=" + "button" + ">" + drinks[i] + "</button>").addClass("btn btn-warning").attr("data",drinks[i]);
		$("#buttonArea").append(button);
	};
}


// click button to create 10 images
$("#buttonArea").on("click", ".btn", function(){
        
var drinks = $(this).attr("data-drink");
  		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + drinks + "&api_key=o0mNHAy0Hks61Cb1guhzVXtlXgrYqtSq&limit=10";



  		$.ajax({
  			url: queryURL,
  			method: "GET" 

  		}).done(function(response){
  			console.log(response);
  			
          	var results = response.data;

          	for (var i = 0; i < results.length; i++) {
          		// a div for drinks
	          	var drinkDiv = $("<div>");
	 			
	          	// ratings
	 			var p = $("<p>");
	 			p.text(results[i].rating);
	 			var p = $("<p>").text("Rating: " + results[i].rating);

	 			// border around gifs
	 			var drinkImage = $("<img>").addClass("orangeBorder");

	 			// animate and still states for gifs 
	 			drinkImage.attr("src", results[i].images.fixed_height_still.url);
	 			drinkImage.attr("data-still", results[i].images.fixed_height_still.url);
	 			drinkImage.attr("data-animate", results[i].images.fixed_height.url)
	 		    drinkImage.attr("data-state", "still")
	 			drinkImage.addClass("gif");
	 			
	 			// image is appended to the div
	 			drinkDiv.append(drinkImage);
	 			// rating is appended below gifs
	 			drinkDiv.append(p); 			
	 			// put new images at the top of the gif area
	 			$("#gifArea").prepend(drinkDiv);
 			}
  		})
  })


// click to animate the gif
$("#gifArea").on("click", ".gif", function(event){
	event.preventDefault();
	
	// gets the state of the gif 
	var state = $(this).attr("data-state");
	
	// toggle based on the state of the gif 
	if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

})
   

// Takes the value and generates a button.


$(".submit").on("click", function(event){
	event.preventDefault();

	console.log("submit");
	// sets inputted value to newDrink 
	newDrink = $("#drink-input").val();
	// new drink is added to the drinks array 
	drinks.push(newDrink);
	console.log(drinks);
	// call the function that creates the new button
	buttonGenerator();
});



buttonGenerator();
 