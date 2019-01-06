// global variables

var ALLWORDS = ["migration","predator","forage","terrestrial","marine","ecology","ecosystem","mutualism","parasite","megafauna","prey","community","habitat","niche theory","convergent evolution","hotspot","conservation","natural resources","preservation","herbivore","carnivore","population","invasive species","management","endangered","extinct","omnivore","aquatic","vegetation","flora and fauna","trophic level","island biogeography","life history"];
var CURRENTWORD; /*whatever the current word being played is*/
var WORDLETTERS; /*array of all letters in current word*/
var WORDPLACEHOLDERS; /*array of placeholders for all letters*/
var GUESS; /*current letter guessed*/
var STATS; /*keeps track of guesses, wins, losses*/
var STARTGAME; /*starts new game*/

// initialize game
function clear() {
    var CURRENTWORD = "";
    var WORDLETTERS = [];
    var WORDPLACEHOLDERS = [];
    var STARTGAME = false;
    var STATS = {
        guessesRemaining: 10,
        wins: 0,
        losses: 0,
        lettersGuessed: [],
    };
}

//initialize on page load/regresh
clear();

// start new game
function newGame() {

    document.getElementById("win-lose-message").textContent = "";
    document.getElementById("guesses-remaining").textContent = 10;
    document.getElementById("letters-guessed").innerHTML = "<br/>";
    
    var CURRENTWORD = ALLWORDS[Math.floor(Math.random()*ALLWORDS.length)]; /*pick random word from array and print to console*/
    console.log(CURRENTWORD);
    var WORDLETTERS = CURRENTWORD.split(""); /*split that word into characters stored in array*/
    console.log(WORDLETTERS);

    //create placeholder underscores or spaces
    WORDPLACEHOLDERS = [];
    for (i=0; i<WORDLETTERS.length; i++) {
        var letter = WORDLETTERS[i];
        if (letter === " ") {
            WORDPLACEHOLDERS.push(letter);
        }
        else {
            WORDPLACEHOLDERS.push("_");
        }
    }

    //add placeholders in document for word to be guessed
    document.getElementById("word-to-be-guessed").textContent = WORDPLACEHOLDERS.join(" ");

    play();
}

// initialize and start new game when space bar is pressed
document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
        alert("Let's get started! Guess any letter your heart desires.");
        var STARTGAME = true;
        console.log("start");
        newGame();
    }
    else {
        alert("Try hitting the space bar to get started");
        console.log("false start");
    }
}

// pressing keys to guess the word
function play() {
    console.log("real start");
    document.body.onkeypress = function(e) {
        var GUESS = e.key;
        checkGuess(GUESS);
    }
}

//checking guesses
function checkGuess(GUESS) {
    for (i=0; i<WORDLETTERS.length; i++) {
        if (GUESS === WORDLETTERS[i]) {
            STATS.lettersGuessed.push(GUESS);
            WORDPLACEHOLDERS[i] = GUESS;
        }
        else if (GUESS !== WORDLETTERS[i]) {
            alert("Try again!");
            STATS.guessesRemaining = STATS.guessesRemaining - 1;
            document.getElementById("letters-guessed").textContent = STATS.lettersGuessed.join(",");
        }
        else if (STATS.lettersGuessed.includes(GUESS)) {
            alert("You already tried this letter so you lose a guess");
            STATS.guessesRemaining = STATS.guessesRemaining - 1;
            document.getElementById("letters-guessed").textContent = STATS.lettersGuessed.join(",");
        }
    }
    if (STATS.guessesRemaining === 0) {
        youLose();
    }
    if (WORDPLACEHOLDERS.join("") === WORDLETTERS.join("")) {
        youWin();
    }
}

// what happens when you win
function youWin() {
    var STARTGAME = false;
    STATS.wins = STATS.wins++;
    document.getElementById("wins").textContent = STATS.wins;
    document.getElementById("win-lose-message").textContent = "You win, you magnificent golden eagle!";
    documents.getElementByID("picture").src = "Assets/images/bat.jpg";
    if (confirm("Do you want to continue playing?")) {
        newGame();
    }
    else {
        alert("Thanks for playing! Goodbye!");
        clear();
    }
}

// what happens when you lose
function youLose() {
    STATS.losses = STATS.losses++;
    document.getElementById("losses").textContent = STATS.losses;
    var STARTGAME = false;
    document.getElementById("win-lose-message").textContent = "You lose, you deflated fried egg jellyfish!";
    documents.getElementByID("picture").src = "Assets/images/shrike.jpg";
    if (confirm("Do you want to continue playing?")) {
        newGame();
    }
    else {
        alert("Thanks for playing! Goodbye!");
        clear();
    }
}
