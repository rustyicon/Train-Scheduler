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

    

    var freqInput = $("#frequ-input").val().trim();

    var inputTconverted = moment(inputT, "hh:mm").subtract(1, "years");

    var difference = moment().diff(moment(inputTconverted), "minutes");

    var remainder = difference % freqInput;

    var inputT = $("#train-time").val().trim();

    var freqInput = $("#frequ-input").val().trim();
    
    var nextT = moment().add(minsTill, "minutes");
    
    var minsTill = freqInput - remainder;
/*var time = moment().format('LT');
var minsAway = moment(frequency).startOf('hour').fromNow(time);
var nextArr = frequency * minsAway;*/


$("#submit").on("click", function(event) {
    event.preventDefault();

    trainName = $("#name-input").val().trim();
    destination = $("#dest-input").val().trim();
    freqInput = $("#frequ-input").val().trim();
    inputTconverted = moment(inputT, "hh:mm").subtract(1, "years");
    nextT = moment().add(minsTill, "minutes");
    minsTill = freqInput - remainder;

    database.ref().push({
        trainName: trainName,
        destination: destination,
        freqInput: freqInput,
        inputTconverted: inputTconverted,
        nextT: nextT,
        minsTill: minsTill
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
    	childsnapshot.val().inputTconverted + "</td><td>" + 
    	childsnapshot.val().nextT +"</td><td>"+ 
        childsnapshot.val().minsTill + "</td></tr>");

	}, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
});












