var config = {
    apiKey: "AIzaSyCu0YykOA2AM9PN36OyPNYIRfeDypYI8n8",
    authDomain: "train-schedule-e25d2.firebaseapp.com",
    databaseURL: "https://train-schedule-e25d2.firebaseio.com",
    projectId: "train-schedule-e25d2",
    storageBucket: "train-schedule-e25d2.appspot.com",
    messagingSenderId: "803262700127"
};
firebase.initializeApp(config);

var database = firebase.database();


$("#submit").on("click", function(event) {
    event.preventDefault();

    
    var trainName = $("#name-input").val().trim();

    var destination = $("#dest-input").val().trim();


    var inputT = $("#train-time").val().trim();

    var currentT = moment().format("hh:mm");

    var inputTconverted = moment(inputT, "hh:mm").subtract(1, "years");



    var freqInput = $("#frequ-input").val().trim();     

    var freqConverted = parseInt(freqInput);

console.log(freqConverted);

    var difference = moment().diff(moment(inputTconverted), "minutes");

    var remainder = difference % freqConverted;

    console.log(remainder, freqInput)

    
      
    var nextT = moment().add(minsTill, "minutes");

    var nextTconverted = moment(nextT).format("hh:mm a");

    console.log(nextTconverted);
    
    var minsTill = parseInt(freqInput - remainder);
/*var time = moment().format('LT');
var minsAway = moment(frequency).startOf('hour').fromNow(time);
var nextArr = frequency * minsAway;*/



    /*trainName = $("#name-input").val().trim();
    destination = $("#dest-input").val().trim();
    freqInput = $("#frequ-input").val().trim();
    inputTconverted = moment(inputT, "hh:mm").subtract(1, "years");
    nextT = moment().add(minsTill, "minutes");
    minsTill = freqInput - remainder; */

    database.ref().push({
        trainName: trainName,
        destination: destination,
        freqInput: freqInput,
        nextTconverted,
        minsTill,

    });

});

database.ref().on("child_added", function(childsnapshot) {
    //console.log(childsnapshot.val().trainName);
    //console.log(childsnapshot.val().destination);
    //console.log(childsnapshot.val().frequency);
    
    $("#new-input").append("<tr><td>" + 
    	childsnapshot.val().trainName + "</td><td>" +
    	childsnapshot.val().destination + "</td><td> " + 
    	childsnapshot.val().freqInput + "</td><td>"+ 
    	childsnapshot.val().nextTconverted + "</td><td>" + 
    	childsnapshot.val().minsTill + "</td></tr>");

	}, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
});












