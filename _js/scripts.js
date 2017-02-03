/*
    https://s3.amazonaws.com/freecodecamp/simonSound1.mp3
    https://s3.amazonaws.com/freecodecamp/simonSound2.mp3
    https://s3.amazonaws.com/freecodecamp/simonSound3.mp3
    https://s3.amazonaws.com/freecodecamp/simonSound4.mp3
*/


// Create an array to store user button presses
var gameArray = [];
var btnArray = [];
var btnSounds = [
                    "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
                    "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
                    "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
                    "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
                ];
var seqNum = -1;
var roundNum = 1;
var strictMode = 0;

// Computer functions
function createGameArray() {
    for (var i = 0; i < 20; i++) {
        gameArray.push(Math.floor(Math.random() * 4));
    }
}

function calculateTimeDelay() {
    var timeDelay = 0;
    if (roundNum < 5) { timeDelay = 1000; }
    else if (roundNum < 9) { timeDelay = 750; }
    else if (roundNum < 13) { timeDelay = 500; }
    else { timeDelay = 250; }
    return timeDelay;
}

function cpuShowSequence() {
    for (let i = 0; i < roundNum; i++) {
        setTimeout(lightButton(true, i), calculateTimeDelay());
    }
}

// Shared functions
function lightButton(isCorrect, i) {
    // TODO: light up the button at btnArray[i]
    btnArray[i].classList.add("btnLit");
    playSound(isCorrect, i);
    btnArray[i].classList.remove("btnLit");
}

function playSound(isCorrect, idx) {
    if (!isCorrect) {
        // TODO: play lose sound
    } else {
        // TODO: play btnSounds[idx]
    }
}


// User functions
function isCorrect(s, i) {
    if (i != gameArray[s]) {
        return false;
    }
    return true;
}

function wrongAnswer() {
    seqNum = -1;
    if (strictMode) {
        roundNum = 1;
    }
    cpuShowSequence();
}

function btnClick(btn) {
    seqNum++;
    var idx = btnArray.indexOf(btn);
    var isCorrect = isCorrect(seqNum, idx);
    lightButton(isCorrect, idx);

    if (seqNum == roundNum-1) {
        if (isCorrect & roundNum < 20) { roundNum++; }
        seqNum = -1;
        cpuShowSequence();
    }
}

document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    btnArray.push = document.getElementsByClassName("btn0");
    btnArray.push = document.getElementsByClassName("btn1");
    btnArray.push = document.getElementsByClassName("btn2");
    btnArray.push = document.getElementsByClassName("btn3");

    btnArray.forEach(function(e) {
        document.addEventListener("click", btnClick);
    });

  }
}

// Create a function to compare the user array to the game array upon each subsequent user button press
// Trigger button color animation on press or computer move
// Trigger button sound on press or computer move

// Handle errors based on strict/non-strict mode

// Handle start conditions
    // add buttons to btnArray
    // add click listeners to buttons that trigger color animation(?) and sound

// Handle reset conditions
// Display current score (ie. length of last successful sequence in current game)
