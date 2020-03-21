/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;


//Play again event listener
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen for the guess
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value);

  //Validate the input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    //Clear the input
    guessInput.value = '';

  } else if (guess === winningNum) {
    //Game over - won
    gameOver(true, `${winningNum} is correct! You have won!`);

  } else {
    // Wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      //Game over - lost
      gameOver(false, `Game over! You have lost. The correct number was ${winningNum}!`);

    } else {
      //Game continues - answer wrong
      setMessage(`Guess is not correct. ${guessesLeft} attempts left.`, 'red')
      //Clear the input
      guessInput.value = '';
    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  //Disable the input
  guessInput.disabled = true;
  //Change the border color
  guessInput.style.borderColor = color;
  //Change the message text color
  message.style.color = color;
  //Inform the your s/he has won
  setMessage(msg);

  //Play again
  guessBtn.value = 'Play again';
  guessBtn.className += 'play-again';

}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

//Set the winning number
function getRandomNum(min, max) {
  return (Math.floor(Math.random() * (max - min + 1) + min));
}