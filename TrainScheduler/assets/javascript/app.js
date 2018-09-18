var config = {
  apiKey: "AIzaSyDq4f-2Jxdu6XmQ0DqCbG0Z9AXXvWYEcq8",
  authDomain: "train-schedule-34975.firebaseapp.com",
  databaseURL: "https://train-schedule-34975.firebaseio.com",
  projectId: "train-schedule-34975",
  storageBucket: "train-schedule-34975.appspot.com",
  messagingSenderId: "731990978505"
};

firebase.initializeApp(config);



let trainData = firebase.database();


$("#add-train-btn").on("click", function() {

// Grabs user input
let trainName = $("#train-name-input").val().trim();
let destination = $("#destination-input").val().trim();
let firstTrain = $("#first-train-input").val().trim();
let frequency = $("#frequency-input").val().trim();

// Creates local "temporary" object for holding train data
let newTrain = {

  name: trainName,
  destination: destination,
  firstTrain: firstTrain,
  frequency: frequency
};

// Uploads train data to the database
trainData.ref().push(newTrain);

// Logs everything to console
console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.firstTrain);
console.log(newTrain.frequency);

// Alert
alert("Train successfully added");

// Clears all of the text-boxes
$("#train-name-input").val("");
$("#destination-input").val("");
$("#first-train-input").val("");
$("#frequency-input").val("");

// Determine when the next train arrives.
return false;
});

// Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    let tName = childSnapshot.val().name;
    let tDestination = childSnapshot.val().destination;
    let tFrequency = childSnapshot.val().frequency;
    let tFirstTrain = childSnapshot.val().firstTrain;

    let timeArr = tFirstTrain.split(":");
    let trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
    let maxMoment = moment.max(moment(), trainTime);
    let tMinutes;
    let tArrival;
    
    //If the first train is later than the current time, sent arrival to the first train time
    if (maxMoment === trainTime) {
      tArrival = trainTime.format("hh:mm A");
      tMinutes = trainTime.diff(moment(), "minutes");
    } else {

      // Calculate the minutes until arrival 
      let differenceTimes = moment().diff(trainTime, "minutes");
      let tRemainder = differenceTimes % tFrequency;
      tMinutes = tFrequency - tRemainder;
      // To calculate the arrival time, add the tMinutes to the currrent time
      tArrival = moment().add(tMinutes, "m").format("hh:mm A");
    }
      console.log("tMinutes:", tMinutes);
      console.log("tArrival:", tArrival);

      // Add each train's data into the table
      $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
        tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
    });