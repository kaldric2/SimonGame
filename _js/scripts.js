/*
    https://s3.amazonaws.com/freecodecamp/simonSound1.mp3
    https://s3.amazonaws.com/freecodecamp/simonSound2.mp3
    https://s3.amazonaws.com/freecodecamp/simonSound3.mp3
    https://s3.amazonaws.com/freecodecamp/simonSound4.mp3
*/


// Create an array to store user button presses
var userArray = [];
var gameArray = [];

// Create an array of twenty random numbers between 0 and 3
function createGameArray() {
    for (var i = 0; i < 20; i++) {
        gameArray.push(Math.floor(Math.random() * 4));
    }
}

createGameArray();
console.log(gameArray);

// Create a function to compare the user array to the game array upon each subsequent user button press
// Trigger button color animation on press or computer move
// Trigger button sound on press or computer move

// Handle errors based on strict/non-strict mode

// Handle start conditions
// Handle reset conditions
// Display current score (ie. length of last successful sequence in current game)
