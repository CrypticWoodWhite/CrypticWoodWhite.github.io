// GLOBAL VARIABLES
var guess;
var currentQuestion = 0; // current question
var rightAnswer;
var isCorrect; // boolean
var numQuestionsAsked = 0;
var numCorrectGuesses = 0;
var numWrongGuesses = 0;
var numTimeouts = 0;
var counter = 30; // time left
var countingDown; // countdown timer
var timeOut; // setTimeOut

// EVENT LISTENERS
// start game
$("#startButton").on("click", function() {
    $("#start").remove();
    $("#time-remaining").removeClass("hidden");
    $("#question").removeClass("hidden");
    $("#answers").removeClass("hidden");
    countdown();
    showQuestion();
})

// what happens when you click a guess
$(".answers").on("click", function() {
    guess = $(this).val();
    console.log("click! you guessed " + guess);
    if (guess === rightAnswer) {
        $("#message").html("<p>You guessed right, you shimmering rainbow unicorn!</p>");
        $("#message").removeClass("hidden");
        $("#answers").addClass("hidden");
        $("#time-remaining").addClass("hidden");
        numCorrectGuesses++;
        isCorrect = true;
    }
    else {
        $("#answers").addClass("hidden");
        $("#time-remaining").addClass("hidden");
        $("#message").html("<p>WRONG! You're a stinking pile of cubic wombat poop! The correct answer is " + "<strong>" + rightAnswer + "</strong>" + ".</p>");
        $("#message").removeClass("hidden");
        $("#time-remaining").addClass("hidden");
        numWrongGuesses++;
        isCorrect = false;
    }
})

// option to start game over
$("#restart").on("click", function() {
    $("#end-game").addClass("hidden");
    $("#message").addClass("hidden");
    $("#time-remaining").removeClass("hidden");
    $("#question").removeClass("hidden");
    $("#answers").removeClass("hidden");
    guess = undefined;
    currentQuestion = undefined;
    rightAnswer = undefined;
    isCorrect = undefined;
    counter = 30;
    numQuestionsAsked = 0;
    numCorrectGuesses = 0;
    numWrongGuesses = 0;
    numTimeouts = 0;
    countdown();
    showQuestion();
})

// FUNCTIONS BELOW

// shows the first question
function showQuestion() {
    $("#question").html(questionAnswers[currentQuestion].question);
    $("#answer-A").html(questionAnswers[currentQuestion].answers.answerA);
    $("#answer-A").attr("value", questionAnswers[currentQuestion].answers.answerA);
    $("#answer-B").html(questionAnswers[currentQuestion].answers.answerB);
    $("#answer-B").attr("value", questionAnswers[currentQuestion].answers.answerB);
    $("#answer-C").html(questionAnswers[currentQuestion].answers.answerC);
    $("#answer-C").attr("value", questionAnswers[currentQuestion].answers.answerC);
    $("#answer-D").html(questionAnswers[currentQuestion].answers.answerD);
    $("#answer-D").attr("value", questionAnswers[currentQuestion].answers.answerD);
    rightAnswer = questionAnswers[currentQuestion].correctAnswer;
}

// all following questions
function nextQuestion() {
    isCorrect = undefined;
    currentQuestion++;
    resetTimer();
}

function resetTimer() {
    counter = 30;
    timeout = setTimeout(function() {
        $("#message").addClass("hidden");
        $("#answers").removeClass("hidden");
        $("#time-remaining").removeClass("hidden");
        countdown();
        showQuestion();
        },
        3000
    );
}

function countdown() {
    counter = 30;
    countingDown = setInterval(function() {
        $("#timer").html("Time remaining: " + counter + " seconds");
        if (counter < 0) {
            clearInterval(countingDown);
            numQuestionsAsked++;
            numTimeouts++;
            console.log("#timeouts: " + numTimeouts);
            if (numQuestionsAsked === Object.keys(questionAnswers).length) {
                console.log("game over");
                gameOver();
            }
            else {
                timeoutMessage();
                nextQuestion();
            }
        }
        else if (isCorrect === true && counter > 0) {
            console.log("good guess");
            clearInterval(countingDown);
            numQuestionsAsked++;
            console.log("#correct guesses: " + numCorrectGuesses);
            if (numQuestionsAsked === Object.keys(questionAnswers).length) {
                console.log("game over");
                gameOver();
            }
            else {
                nextQuestion();
            }
            //functions
        }
        else if (isCorrect === false && counter > 0) {
            console.log("wrong guess");
            clearInterval(countingDown);
            numQuestionsAsked++;
            console.log("#wrong guesses: " + numWrongGuesses);
            if (numQuestionsAsked === Object.keys(questionAnswers).length) {
                console.log("game over");
                gameOver();
            }
            else {
                nextQuestion();
            }
            // functions
        }
        counter--;
    },1000);
}

function timeoutMessage() {
    $("#answers").addClass("hidden");
    $("#time-remaining").addClass("hidden");
    $("#message").html("<p>You ran out of time, you indecisive garden snail! The correct answer is " + "<strong>" + rightAnswer + "</strong>" + ".</p>");
    $("#message").removeClass("hidden");
}

// shows result at end of game
function gameOver() {
    isCorrect = undefined;
    counter = 30;
    $("#time-remaining").addClass("hidden");
    $("#question").addClass("hidden");
    $("#answers").addClass("hidden");
    $("#number-correct-guesses").html("Correct guesses: " + numCorrectGuesses);
    $("#number-wrong-guesses").html("Wrong guesses: " + numWrongGuesses);
    $("#number-timeouts").html("Timeouts: " + numTimeouts);
    $("#end-game").removeClass("hidden");
}