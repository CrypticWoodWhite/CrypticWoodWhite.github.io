var config = {
    apiKey: "AIzaSyB4NSYuISvalQInheKFysQ0vuU7pFh2CXg",
    authDomain: "train-schedule-19d5b.firebaseapp.com",
    databaseURL: "https://train-schedule-19d5b.firebaseio.com",
    projectId: "train-schedule-19d5b",
    storageBucket: "train-schedule-19d5b.appspot.com",
    messagingSenderId: "66370288315"
};
firebase.initializeApp(config);

var trainDatabase = firebase.database();

// show current time
var updateTime = function() {
    now = moment().format("HH:mm");
    time = $("<p class='text-center'>").html("<strong>Current time: " + now + "</strong>");
    $("#clock").html(time);
}
updateTime();
setInterval(updateTime, 60000);

// add input values to database when click submit
$("#submit").on("click", function(event) {
    event.preventDefault();

    // initialize new train object
    var newTrain = {
        name: "",
        destination: "",
        firstTrain: "",
        frequency: 0,
    };

    // push input values into object
    newTrain.name = $("#train-name").val().trim();
    newTrain.destination = $("#destination").val().trim();
    newTrain.firstTrain = $("#first-train-time").val();
    newTrain.frequency = $("#frequency").val();

    console.log(newTrain);
    // push object into database
    trainDatabase.ref().push(newTrain);

    // clear input forms
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");
})

trainDatabase.ref().on("child_added", function(childSnapshot) {

    // time calculations
    var tFreq = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().firstTrain;
    var tFirstConverted = moment(tFirstTrain, "HH:mm").subtract(1, "years");
    var tDiff = moment().diff(moment(tFirstConverted), "minutes");
    var tRemainder = tDiff % tFreq;
    var minAway = tFreq - tRemainder;
    var nextArrival = moment().add(minAway, "minutes").format("HH:mm");

    // update minAway and nextArrival
    var updateTrainSchedule = function() {
        var now = moment();
        minAway = tFreq - tRemainder;
        nextArrival = now.add(minAway, "minutes").format("HH:mm");
    }
    setInterval(updateTrainSchedule, 60000);

    // get the firebase key for the new train
    var key = childSnapshot.key;
    console.log("Key: " + key);

    // add everything to the table
    $("#table-body").prepend("<tr><th scope='row'>" + childSnapshot.val().name + "</th><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td><td>" + "<button class='btn btn-light btn-sm remove' id=" + key + ">X</button>" + "</td></tr>");

    // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
});

// remove button deletes row AND corresponding data in firebase when clicked
$("#table-body").on("click", ".remove", function() {
    $(this).closest("tr").remove();
    removeData($(this).attr("id"));
});
function removeData(key) {
    trainDatabase.ref(key).remove();
    console.log("successfully removed");
}
