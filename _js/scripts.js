/*
    https://s3.amazonaws.com/freecodecamp/simonSound1.mp3
    https://s3.amazonaws.com/freecodecamp/simonSound2.mp3
    https://s3.amazonaws.com/freecodecamp/simonSound3.mp3
    https://s3.amazonaws.com/freecodecamp/simonSound4.mp3
*/


// Create an array to store user button presses
var gameArray = [];
var btnArray = [];
var btnSounds = ["audio0", "audio1", "audio2", "audio3"];
var colorClasses = [
                        "btnGreen",
                        "btnRed",
                        "btnYellow",
                        "btnBlue"
                    ];
var seqNum = -1;
var roundNum = 1;
var strictMode = 0;

// Computer functions
function createGameArray() {
    for (var i = 0; i < 20; i++) {
        gameArray.push(Math.floor(Math.random() * 4));
    }
    console.debug(gameArray);
}

function calculateTimeDelay() {
    var timeDelay = 0;
    if (roundNum < 5) { timeDelay = 1000; }
    else if (roundNum < 9) { timeDelay = 750; }
    else if (roundNum < 13) { timeDelay = 500; }
    else { timeDelay = 250; }
    return timeDelay;
}

function doSetTimeout(i) {
    var delay = calculateTimeDelay() * i;
    setTimeout( () => { lightButton(true, gameArray[i]); }, delay);
}

function cpuShowSequence() {
    for (let i = 0; i < roundNum; i++) {
        doSetTimeout(i);
    }
}

// Shared functions
function lightButton(isCorrect, i) {
    btnArray[i].classList.add(colorClasses[i]);
    playSound(isCorrect, i);
    setTimeout( () => { btnArray[i].classList.remove(colorClasses[i]); }, 225);
}

function playSound(isCorrect, idx) {
    var sound;
    if (!isCorrect) {
        sound = document.getElementById(btnSounds[idx]);
        sound.play();
        return;
    } else {
        sound = document.getElementById(btnSounds[idx]);
        sound.play();
        return;
    }
}


// User functions
function checkSelection(s, i) {
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
    var idx = btnArray.indexOf(btn.target);
    var isCorrect = checkSelection(seqNum, idx);
    lightButton(isCorrect, idx);

    if (seqNum == roundNum - 1) {
        if (isCorrect & roundNum < 20) { roundNum++; }
        seqNum = -1;
        setTimeout(cpuShowSequence, 1000);
    }
}

function initGame() {
    roundNum = 4;
    createGameArray();
    cpuShowSequence();
}

document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    btnArray.push(document.getElementsByClassName("btn0")[0]);
    btnArray.push(document.getElementsByClassName("btn1")[0]);
    btnArray.push(document.getElementsByClassName("btn2")[0]);
    btnArray.push(document.getElementsByClassName("btn3")[0]);

    btnArray.forEach(function(e) {
        document.addEventListener("click", btnClick);
    });

    initGame();

  }
};

// Create a function to compare the user array to the game array upon each subsequent user button press
// Trigger button color animation on press or computer move
// Trigger button sound on press or computer move

// Handle errors based on strict/non-strict mode

// Handle start conditions
    // add buttons to btnArray
    // add click listeners to buttons that trigger color animation(?) and sound

// Handle reset conditions
// Display current score (ie. length of last successful sequence in current game)
