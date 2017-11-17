animalArr = ["puppy", "kitten", "panda", "lamb", "horse", "bunny", "leopard", "tiger",
	"lion", "giraffe", "elephant", "dog", "cat", "sheep", "goat", "deer","whale","hamster",
	"zebra"];

//function to load inital buttons from array
function initailLoad() {
	for (var i = 0; i < animalArr.length; i++) {		
		var createBtn = $("<button>");
		createBtn.attr("type", "button");
		createBtn.addClass("btn btn-primary animalBtn");
		createBtn.html(animalArr[i]);
		$(".buttonCls").append(createBtn);
	}
}

//function to add new animal button
function addButton(animalName) {
	var createBtn = $("<button>");
	createBtn.attr("type", "button");
	createBtn.addClass("btn btn-primary animalBtn");
	createBtn.html(animalName);
	$(".buttonCls").append(createBtn);
	$("#getAnimalName").val("");
}

//function to display result
function loadImgs(results) {
	//empty div
	$(".searchImgs").empty();
	var createImg = "", pTag = "", temp="";
	console.log(results[1]);
	//create imgs and display in page
	for (var i = 0; i < results.length; i++) {	
		console.log(results[i].rating);		
		//img	
		createImg = $("<img>");	
		createImg.addClass("imgCls");
		createImg.attr('data-state','still');			 
		createImg.attr('data-animate', results[i].images.fixed_height.url);
		console.log("animate - " + results[i].images.fixed_height.url);
		temp = results[i].images.fixed_height_still.url;
		createImg.attr('data-still', temp);		
		createImg.attr('src', temp);
		createImg.attr('data-index',i);
		console.log("still - " + temp);
		//rating
		pTag = $("<p>");		
		pTag.html("<b>Rating: " + results[i].rating + "<b>");		
		//append to div
		createDiv = $("<div>");
		createDiv.addClass('innerDiv');	
		createDiv.append(createImg);	
		createDiv.append(pTag);
		//append to parent div
		$(".searchImgs").append(createDiv);		
	}
}

//----------------------------Execution start------------------------

$(document).ready(function(){
	//load array buttons
	initailLoad();

	//animal button click event
	$(document).on("click", ".animalBtn", function(event){
		event.preventDefault();
		var name = $(this).text();
		var queryURL = `https://api.giphy.com/v1/gifs/search?q=${name}&rating=g&offset=0&lang=en&api_key=2421e87268de4373afcba9ba73735910&limit=10`
		//console out
		console.log(name);
		console.log(queryURL);

		//ajax call
		$.ajax({
			url: queryURL,
			method: 'GET'
		}).done(function(response){			
			console.log(JSON.stringify(response));
			loadImgs(response.data);
		});
	});

	//image click event
	$(document.body).on("click", ".imgCls", function(event){
		event.preventDefault();
		var state = $(this).attr("data-state");      
	    if (state === "still") {
	    	$(this).attr("src", $(this).attr("data-animate"));
	        $(this).attr("data-state", "animate");
	    } else {
	        $(this).attr("src", $(this).attr("data-still"));
	        $(this).attr("data-state", "still");
	    }
	});

	//submit button click event
	$(".addBtn").on("click", function(event){
		event.preventDefault();
		//get text
		var animalNm = $("#getAnimalName").val().trim();
		console.log(animalNm);
		//add button
		addButton(animalNm);
	});
})