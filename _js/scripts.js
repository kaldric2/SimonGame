// TODO: change seqNum to start at 0?

// Create an array to store user button presses
var gameArray = [];
var btnArray = [];
var btnSounds = ["audio0", "audio1", "audio2", "audio3", "audio4"];
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
    if (gameArray.length > 0) {gameArray = [];}
    for (var i = 0; i < 20; i++) {
        gameArray.push(Math.floor(Math.random() * 4));
    }
    console.debug(gameArray);
}

function calculateTimeDelay() {
    if (roundNum < 5) { return 1000; }
    else if (roundNum < 9) { return 750; }
    else if (roundNum < 13) { return 500; }
    else { return 250; }
}

function doSetTimeout(idx, delay) {
    setTimeout(() => { lightButton(true, idx); }, delay);
}

function cpuShowSequence() {
    for (let i = 0; i < roundNum; i++) {
        doSetTimeout(gameArray[i], calculateTimeDelay()*i);
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
        sound = document.getElementById(btnSounds[4]);
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
    setTimeout(cpuShowSequence, 1000);
}

function btnClick(btn) {
    try {
        seqNum++;
        var idx = btnArray.indexOf(btn.target);
        var isCorrect = checkSelection(seqNum, idx);
        lightButton(isCorrect, idx);

        if (isCorrect) {
            if (seqNum == roundNum - 1 && roundNum < 20) {
                roundNum++;
                document.getElementsByClassName("score")[0].innerText =
                    (roundNum <= 10) ? "0" + (roundNum - 1) : roundNum - 1;
                seqNum = -1;
                setTimeout(cpuShowSequence, 1000);
            } else if (seqNum == roundNum - 1 && roundNum == 20) {
                document.getElementsByClassName("score")[0].innerText =
                    20;
                initGame(true);
            }
        } else if (!isCorrect) {
            wrongAnswer();
        }
    }
    catch (TypeError) {
        seqNum--;
        return;
    }
}

function spinButtons(i) {
    doSetTimeout(0, 0+(1000*i));
    doSetTimeout(1, 250+(1000*i));
    doSetTimeout(3, 500+(1000*i));
    doSetTimeout(2, 750+(1000*i));
}

function flashButtons(i) {
    doSetTimeout(0, 1000*i);
    doSetTimeout(1, 1000*i);
    doSetTimeout(2, 1000*i);
    doSetTimeout(3, 1000*i);
}

function fancyShow() {
    [1,2,3,4,5].forEach(function(e) { spinButtons(e); });
    [6,7,8].forEach(function(e) { flashButtons(e); });
}

function initGame(isFancy) {
    if (isFancy) { fancyShow(); }
    roundNum = 1;
    createGameArray();
    setTimeout(()=>{ document.getElementsByClassName("score")[0].innerText =
        "00"; }, 9000);
    setTimeout(()=>{ cpuShowSequence(); }, 10000);
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

    initGame(true);
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
