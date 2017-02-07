// TODO: add on/off switch?
// TODO: check sounds for missed plays
// TODO: make the background into a radial gradient to suggest the circular game itself

// Create an array to store user button presses
var powerOn = false;
var gameArray = [];
var timeoutsArray = [];
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
    timeoutsArray.push(setTimeout(() => { lightButton(true, idx); }, delay));
}

function cpuShowSequence() {
    document.getElementsByClassName("score")[0].innerText =
        (roundNum < 10) ? "0" + roundNum : roundNum;
    for (let i = 0; i < roundNum; i++) {
        doSetTimeout(gameArray[i], calculateTimeDelay()*i);
    }
}

// Shared functions
function lightButton(isCorrect, i) {
    btnArray[i].classList.add(colorClasses[i]);
    playSound(isCorrect, i);
    timeoutsArray.push(setTimeout(()=>{ btnArray[i].classList.remove(colorClasses[i]); }, 225));
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
        resetScore();
    }
    timeoutsArray.push(setTimeout(cpuShowSequence, 1000));
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
                // document.getElementsByClassName("score")[0].innerText =
                //     (roundNum <= 10) ? "0" + (roundNum - 1) : roundNum - 1;
                seqNum = -1;
                timeoutsArray.push(setTimeout(cpuShowSequence, 1000));
            } else if (seqNum == roundNum - 1 && roundNum == 20) {
                // document.getElementsByClassName("score")[0].innerText =
                //     20;
                initGame(2, 1);
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

function toggleStrictMode() {
    if (strictMode) {
        document.getElementsByClassName("strict")[0].classList.remove("btnWhiteOn");
        document.getElementsByClassName("strict")[0].classList.add("btnWhiteOff");
    } else {
        document.getElementsByClassName("strict")[0].classList.remove("btnWhiteOff");
        document.getElementsByClassName("strict")[0].classList.add("btnWhiteOn");
    }
    strictMode = !strictMode;
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

function fancyShow(first, second) {
    var firstArr = [], secondArr = [];
    for (var i = 0; i < first; i++) { firstArr.push(i); }
    for (var i = first; i < (first + second); i++) { secondArr.push(i); }
    firstArr.forEach(function(e) { spinButtons(e); });
    secondArr.forEach(function(e) { flashButtons(e); });
}

function restartGame() {
    initGame(0, 1, 0);
}

function initGame(spins, flashes, delay=1000) {
    var numOfSpins = spins;
    var numOfFlashes = flashes;
    var scoreDelay = delay * (numOfSpins + numOfFlashes);

    timeoutsArray.forEach((e)=>{ clearTimeout(e); });
    timeoutsArray = [];

    fancyShow(numOfSpins, numOfFlashes);

    roundNum = 1;
    createGameArray();
    resetScore(scoreDelay);
    timeoutsArray.push(setTimeout(()=>{ cpuShowSequence(); }, scoreDelay + 500));
}

function resetScore(delay) {
    if (delay) {
        timeoutsArray.push(setTimeout(()=>{ document.getElementsByClassName("score")[0].innerText =
            "00"; }, delay));
    } else {
        document.getElementsByClassName("score")[0].innerText = "00";
    }
}

function togglePower() {
    if (powerOn) {
        document.getElementsByClassName("switch")[0].classList.remove("switchOn");
        document.getElementsByClassName("switch")[0].classList.add("switchOff");

    } else {
        document.getElementsByClassName("switch")[0].classList.remove("switchOff");
        document.getElementsByClassName("switch")[0].classList.add("switchOn");
    }
    powerOn = !powerOn;
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

    document.getElementsByClassName("strict")[0].addEventListener("click", toggleStrictMode);

    document.getElementsByClassName("restart")[0].addEventListener("click", restartGame);

    document.getElementsByClassName("onOffSwitch")[0].addEventListener("click", togglePower);

    initGame(5, 3);
  }
};
