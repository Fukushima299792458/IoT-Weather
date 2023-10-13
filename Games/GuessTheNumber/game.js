/*
// I am committed to being a person of integrity.
// This project is submitted as part of the assessment for Year 8 IST.
// This is all my own work. I have referenced any work used from other
// sources and have not plagiarised the work of others.
// (signed) PHOENIX WULF
*/

// declares  all the variables we need like the random number, number of guesses and record of all previous guesses
let randomNumber = Math.floor((Math.random() * 10));
let guesses = 0;
let lastGuess = [];
let guess = 1;
let checkingHasBeen = lastGuess.length;
let notAlreadyGuessed = true;
let difficulty = 1;
let input = document.getElementById("input");
let cheatCodePogress = 0;

// allows you to change the difficulty by calling a function when the button is pressed takinga value "newDifficulty" which is tehn assigned to teh difficulty variable, then also starting a new game
function changeDifficulty(newDifficultyNum, newDifficultyString){
	// update the global difficulty to the new difficulty input
	difficulty = newDifficultyNum;
	numberRange.innerHTML = "Enter A Number Between 1 And " + Math.pow(10, difficulty);
	difficultyLevelSelecter.innerHTML = "Difficulty: " + newDifficultyString;
	// initiates a new game with the updated difficulty
	startNewGame();
}

// makes sure all the values are constantly updating in the background like guess and the number of guesses variable
function update(){
	guess = document.querySelector('input').value;
	numOfGuesses.innerHTML = guesses;
}

// function to start a new game and reset everything except difficulty
function startNewGame(){
	// disable start button and enable input and guess button
	document.getElementById("startButton").disabled = true;
	document.getElementById("input").disabled = false;
	document.getElementById("guess").disabled = false;
	// generate new random number based on difficulty
	randomNumber = Math.floor((Math.random() * Math.pow(10, difficulty)) + 1);
	// updates result text
	result.innerHTML = "You Have Started A New Game";
	// resets guesses variable and lastGuesses array
	guesses = 0;
	lastGuess = [];
	// focuses on the input so you can imidiately guess without needing to muck about with the mouse for added convinience
	document.getElementById("input").focus();
}

// checks decides how to respond to the guess submitted 
function processGuess(){
	// declares some variables we need for interfunction communication  and checking if the guess has already been made
	notAlreadyGuessed = true;
	checkingHasBeen = lastGuess.length;
	// checks if the guess already has been guessed
	if (guess){ // checks if the guess has anything in it other wise sends it for processing which sould spit out "Please enter a number"
		while (checkingHasBeen > -1){
			// checks if the guess has been made
			if (guess == lastGuess[checkingHasBeen - 1]){
				if (guess < 1 || guess > Math.pow(10, difficulty)){
					// tells you if it is out of range even if guessed before
					result.innerHTML =  "Please Enter A Number Between 1 And " + Math.pow(10, difficulty);
				} else if (guess > randomNumber){
					// reminds you if the number is to high or to low if you forget
					result.innerHTML = "Come on! You know better than that. Too High!";
				} else if (guess > randomNumber){
					result.innerHTML = "Come on! You know better than that. Too Low!";
				}
				// sets the notAlreadyGuessed variable to false to say it has been guessed before
				notAlreadyGuessed = false;
			}
			checkingHasBeen = checkingHasBeen - 1;
		}
	}
	// the actual logic, deciding how to respond to input pretty self explainatory
	if (notAlreadyGuessed){
		// checks if the guess is correct
		if (randomNumber == guess){
			result.innerHTML = "Congratulations! You guessed correctly, the number was " + randomNumber + "!";
			// enables start button and disables the input and the guess button
			document.getElementById("startButton").disabled = false;
			document.getElementById("input").disabled = true;
			document.getElementById("guess").disabled = true;
			// focuses on the start button so you can just press enter to start a new game without mucking about with the mouse for added comnvinience
			document.getElementById("startButton").focus();
		} else if (guess == false){
			// checks if guess contain a value (can't tellt eh difference between 0 and "" because 0 is fasly)
			result.innerHTML = "Please enter a number";
		} else if (guess < 1 || guess > Math.pow(10, difficulty)){
			// checks if number is outside of the range allowed
			result.innerHTML =  "Please Enter A Number Between 1 And " + Math.pow(10, difficulty);
		} else if (guess > randomNumber){
			// checks if number is too high then, and then increases guesses variable if true
			result.innerHTML = "Too high! Guess a lower number and try again.";
			guesses++;
		} else if (guess < randomNumber){
			// checks if number is too low then, and then increases guesses variable if true
			result.innerHTML = "Too low! Guess a higher number and try again.";
			guesses++;
		}
		// stores the guess value to stop you from double guessing
		lastGuess.unshift(guess);
		// refocuses the text input so users can get right back to making their next guess
		document.getElementById("input").focus();
	}
	//resets the input value
	document.getElementById("input").value = "";
}

// speeds up the game by allowing users to press enter to make a guess
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("guess").click();
  }
});

// initializes the game as soon as the page loads
startNewGame();

// cheat codes
document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
        case 37:
            // left arrow pressed
			if (cheatCodePogress == 0){
				cheatCodePogress = 1;
			} else if (cheatCodePogress == 1){
				cheatCodePogress = 2;
			} else{
				cheatCodePogress = 0;
			}
            break;
        case 38:
        	// up arrow pressed
			if (cheatCodePogress == 2){
				document.getElementById("input").value = guess;
				cheatCodePogress = 3;
			} else if (cheatCodePogress == 3){
				cheatCodePogress = 4;
			} else{
				cheatCodePogress = 0;
			}
            break;
        case 39:
            // right arrow pressed
			if (cheatCodePogress == 6){
				cheatCodePogress = 7;
			} else if (cheatCodePogress == 7){
				cheatCodePogress = 8;
				result.innerHTML = "Congradulations! You guessed correctly, the number was " + guess + "!";
				document.getElementById("startButton").disabled = false;
				document.getElementById("input").disabled = true;
				document.getElementById("guess").disabled = true;
				document.getElementById("startButton").focus();
				cheatCodePogress = 0;
			} else{
				cheatCodePogress = 0;
			}
            break;
        case 40:
            // down arrow pressed
			if (cheatCodePogress == 4){
				cheatCodePogress = 5;
			} else if (cheatCodePogress == 5){
				cheatCodePogress = 6;
			} else{
				cheatCodePogress = 0;
			}
            break;
    }
});

// makes sure everything is up to date through the update function
let updateValue = setInterval(update, 0);
