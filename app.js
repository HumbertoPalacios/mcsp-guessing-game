// create a function that will generate a number 
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// create two variables that will be the max and min numbers
const minGuess = 1;
const maxGuess = 10;

// create variable that will store the exact number 
let numTarget = getRandomIntInclusive(minGuess, maxGuess);

// Initialize guesses to 0
let guesses = 0;

// create an array that will hold the user's previous guesses
let previousGuesses = [];

// create an object that will store the number of guesses for each unique name
const userNamePreviousGuesses = {};

// Function to play the guessing game
function guessNumber() {
    const guess = parseInt(prompt(`Guess the number (between ${minGuess} and ${maxGuess})`));

    previousGuesses.push(guess);

    // Check if the user's guess is valid
    if (isNaN(guess) || guess < minGuess || guess > maxGuess) {
        alert(`Please enter a valid number between ${minGuess} and ${maxGuess}.`);
        guessNumber();
    } else {
        guesses++;
        // if it is too low
        if (guess < numTarget) {
            alert(`Sorry, ${userName}. Guess Higher.`);
            guessNumber();
            // if it is too high
        } else if (guess > numTarget) {
            alert(`Sorry, ${userName}. Guess Lower.`);
            guessNumber();
        } else {
            previousGuesses.pop();
            const previousGuessesForUserName = userNamePreviousGuesses[userName]; // store the user's previous guesses in a variable

            // if the user does not have previous guesses
            if (previousGuessesForUserName === undefined) { 
                // assign current guesses to the user
                userNamePreviousGuesses[userName] = guesses;
                alert(`That's Correct, ${userName}! It took you ${guesses} guess(es) in your first attempt.`);

              // if current guesses is less than previous guesses
            } else if (guesses < previousGuessesForUserName) {
                const difference = previousGuessesForUserName - guesses;
                alert(`That's Correct, ${userName}! And you beat your previous attempt by ${difference} fewer guesses!`);
                userNamePreviousGuesses[userName] = guesses;

              // if current guesses is more than previous guesses
            } else if (guesses > previousGuessesForUserName) {
                const difference = guesses - previousGuessesForUserName;
                alert(`That's Correct, ${userName}! You did better in your last game by ${difference} fewer guesses.`);
                userNamePreviousGuesses[userName] = guesses;
            } else {
                alert(`That's Correct, ${userName}! You matched your previous attempt.`);
            }
            runAgain();
        }
    }
}

// Function to get the user's name
function getUserName() {
    userName = prompt("What is your name?");
    userName = userName.trim(); // Trim leading and trailing spaces
    if (!userName) {
        getUserName(); // If the name is empty, ask again
    } else {
        guessNumber(); // Call guessNumber() after getting the user's name
    }
}

// Function that runs the application again
function runAgain() {
    // reset everything
    guesses = 0;
    previousGuesses = [];
    numTarget = getRandomIntInclusive(minGuess, maxGuess);

    // asks the user if they want to play again
    let userInput = prompt("Would you like to play again? Type 'yes' to continue or 'no' to stop.");
    if (userInput.toLowerCase() === 'yes') {
        getUserName(); // Ask for the user's name again
    } else {
        alert(`Thank you for playing, ${userName}!`);
        return;
    }
}

// Invokes the guess number function
getUserName(); // Ask for the user's name initially