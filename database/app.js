// Link to Firebase
var bidderData = new Firebase("https://blinding-torch-1724.firebaseio.com/");

// Initial Values
var initialBid = 0;
var initialBidder = "No one :-("

var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------

// 
// At the initial load, get a snapshot of the current data.
bidderData.on("value", function(snapshot) {

	var data = snapshot.val();

	// If Firebase has a highPrice and highBidder stored (first case)
	if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

		// Set the initial variables for highBidder equal to the stored values.
		highBidder = data.highBidder;
		highPrice = data.highPrice;



		// Change the HTML to reflect the initial value
		$("#highestBidder").text(highBidder);
		$("#highestPrice").text(highPrice);



		// Print the initial data to the console.
		console.log(highBidder);
		console.log(highPrice);

	}

	// Keep the initial variables for highBidder equal to the initial values
	else{

		// Change the HTML to reflect the initial value
		$("#highestBidder").text(highBidder);
		$("#highestPrice").text(highPrice);

		// Print the initial data to the console.
		console.log(highBidder);
		console.log(highPrice);
	}



// If any errors are experienced, log them to console. 
}, function (errorObject) {

  	console.log("The read failed: " + errorObject.code);

});

// --------------------------------------------------------------

// Whenever a user clicks the click button
$("#submitBid").on("click", function() {

	// Get the input values
	var currentPrice = $("#bidderPrice").val();
	var currentBidder = $("#bidderName").val();


	// Log the Bidder and Price (Even if not the highest)
	console.log(currentBidder);
	console.log(currentPrice);

	if(currentPrice > highPrice) {

		// Alert 
		alert("You are now the highest bidder.");

		// Save the new price in Firebase
		bidderData.set ({
			highPrice: currentPrice,
			highBidder: currentBidder
		});


		// Log the new High Price
		console.log("New high price: " + highPrice);


		// Store the new high price and bidder name as a local variable (could have also used the firebase variable)
		highPrice = currentPrice;

		highBidder = currentBidder;

		// Change the HTML to reflect the new high price and bidder
		$("#highestBidder").text(highBidder);
		$("#highestPrice").text(highPrice);

	}

	else{

		// Alert
		alert("Sorry that bid is too low. Try again.");	
	}

	// Return False to allow "enter"
	return false;
});

