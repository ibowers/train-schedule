var config = {
    apiKey: "AIzaSyBOXrIi5C08HG-NTt8i7lVy_heOKci-6wQ",
    authDomain: "traintimes-6f440.firebaseapp.com",
    databaseURL: "https://traintimes-6f440.firebaseio.com",
    storageBucket: "traintimes-6f440.appspot.com",
  };
  firebase.initializeApp(config);

var dataRef = firebase.database();

var trainName = "";
var destination = "";
var trainStartTime = 0;
var frequency = "";


$("#addTrain").on("click", function() {

	trainName = $('#trainName').val().trim();
	destination = $('#destination').val().trim();
	firstTrainTime = $('#firstTrainTime').val().trim();
	frequency = $('#frequency').val().trim();

	dataRef.ref().push({
		train_name: trainName,
		destination: destination,
		first_train_time: firstTrainTime,
		frequency: frequency,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
	
	return false;
});


dataRef.ref().on("child_added", function(childSnapshot) {
	
	console.log(childSnapshot.val().train_name);
	console.log(childSnapshot.val().destination);
	console.log(childSnapshot.val().first_train_time);
	console.log(childSnapshot.val().frequency);
	console.log(childSnapshot.val().dateAdded);

	$('#trainTable > tbody').append("<tr><td><span id='trainName'> "+childSnapshot.val().train_name+" </span></td><td><span id='destination'> "+childSnapshot.val().destination+" </span></td><td><span id='frequency'> "+childSnapshot.val().frequency+" </span></td><td><span id='nextArrival'> "+childSnapshot.val().next_arrival+" </span></td><td><span id='minutesAway'> "+childSnapshot.val().minutes_away+" </span></td></tr>");


}, function(errorObject){
	//console.log("Errors handled: " + errorObject.code)
});

dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
	$("#trainName").html(snapshot.val().train_name);
	$("#destination").html(snapshot.val().destination);
	$("#firstTrainTime").html(snapshot.val().first_train_time);
	$("#frequency").html(snapshot.val().frequency);
});