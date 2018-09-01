let questions = [{
    ques: "Who was the first rapper to win a Grammy?",
    ans: ["Tupac", "Will Smith", "Sugarhill Gang", "Grandmaster Flash"],
    name: "firstGrammy",
    correct: "Will Smith",
    divClass: ".firstGrammy"
},
{
    ques: "In 2008, Jay-Z got the largest contract in rap history. How much was it worth? (in millions)",
    ans: ["100", "80", "50", "150"],
    name: "contract",
    correct: "150",
    divClass: ".contract"
},
{
    ques: "What group became infamous for saying F*ck the police?",
    ans: ["Fugees", "Migos", "NWA", "G-Unit"],
    name: "infamous",
    correct: "NWA",
    divClass: ".infamous"
},
{
    ques: "Which rapper was killed in a drive-by shooting in 1999?",
    ans: ["Tupac", "Notorious BIG", "Big L", "50 Cent"],
    name: "driveby",
    correct: "Big L",
    divClass: ".driveby"
},
{
    ques: "Who is the best selling rapper of all time?",
    ans: ["Eminem", "Nelly", "Jay-Z", "Tupac"],
    name: "selling",
    correct: "Eminem",
    divClass: ".selling"
},
{
    ques: "Which rapper is the only artist to win a Grammy with a stream-only album?",
    ans: ["Lil Pump", "Lil Wayne", "Chance the Rapper", "Lil Uzi Vert"],
    name: "stream",
    correct: "Chance the Rapper",
    divClass: ".stream"
},
{
    ques: "In what year did Notorious BIG release his classic album, Ready to Die?",
    ans: ["1990", "2000", "1996", "1994"],
    name: "big",
    correct: "1994",
    divClass: ".big"
},
{
    ques: "Which of the following rappers if from Chicago?",
    ans: ["Bun B", "Common", "Nicki Minaj", "Drake"],
    name: "chicago",
    correct: "Common",
    divClass: ".chicago"
},
{
    ques: "Which of the following rappers broke the record for having the most simultaneous singles in the Billboard Top 10?",
    ans: ["Lil Wayne", "Jay-Z", "Drake", "Pitbull"],
    name: "singles",
    correct: "Drake",
    divClass: ".singles"
},
{
    ques: "What is the title of Nas' first album?",
    ans: ["I Am...", "It Was Written", "Nasir", "Illmatic"],
    name: "nas",
    correct: "Illmatic",
    divClass: ".nas"
}
] // end questions object

let labels = ["first", "second", "third", "forth"];

// click to start then display quesions
let startGame = $("#start-btn").on('click', function() {
$(this).parent().hide();
$('.container').show();
countdown(60);
questionDisplay();
});

// function for displaying questions
let questionDisplay = function() {
$(".questions :not('#sub-but')").empty();
// loops through the 10 questions 
for (let j = 0; j < 10; j++) {
$('.questions').prepend('<div class="' + questions[j].name + '"></div>');
$(questions[j].divClass).append('<div class ="ques-title">' + questions[j].ques + '</div>');
// loops through answers for each radio button
for (let i = 0; i <= 3; i++) {
    $(questions[j].divClass).append('<input type="radio"  name="' + questions[j].name + '" value="' + questions[j].ans[i] + '"/><label for="' + labels[i] + '">' + questions[j].ans[i] + '</label>');
}
$('.questions').prepend('<hr />');
}
}


// function for countdown timer
let countdown = function(seconds) {

let timer = setInterval(function() {
seconds = seconds - 1;
$("#time-remain").html(seconds);

if (seconds <= 0) {
    $('.container').fadeOut(500);
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let unAnswered = 0;

    // loop through correctArray & radioName to match html elements & answers
    for (let i = 0; i < 10; i++) {

        if ($('input:radio[name="' + questions[i].name + '"]:checked').val() === questions[i].correct) {

            correctAnswers++;
            console.log("this is correct! number:" + i)
        } else {
            wrongAnswers++;
            console.log("this is wrong! number:" + i)
        };
    }
    $('#correctTimesUp').append(correctAnswers);
    // display wrongAnswers
    $('#wrongTimesUp').append(wrongAnswers);
    $('#timesUp').fadeIn(1000).show();

    // alert("Times Up!");
    clearInterval(timer);
    return;
}
}, 1000);

// click event for submit button to stop timer
$('#sub-but').on('click', function() {
clearInterval(timer);
})
}; // end countdown


// function to grade quiz once submit button is clicked
let gradeQuiz = $('#sub-but').on('click', function() {

let correctAnswers = 0;
let wrongAnswers = 0;
let unAnswered = 0;

// loop through correctArray & radioName to match html elements & answers
for (let i = 0; i < 10; i++) {

if ($('input:radio[name="' + questions[i].name + '"]:checked').val() === questions[i].correct) {

    correctAnswers++;
} else {
    wrongAnswers++;
};
};

// once submit is clicked...
// tests
// stop timer
countdown();
// fade out questions
$('.container').fadeOut(500);
// show answerScreen
$('#answerScreen').show();
// display correctAnswers
$('#correctScreen').append(correctAnswers);
// display wrongAnswers
$('#wrongScreen').append(wrongAnswers);

});