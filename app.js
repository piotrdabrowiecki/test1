//define game variables:
let min = 1,
    max = 10,
    winningNum = 2,
    guessesLeft = 3;

//UI elemets;
const game = document.getElementById('game'),
      minNum = document.querySelector('.min-number'),  
      maxNum = document.querySelector('.max-number'),
      guessBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message');

let guessInput = document.querySelector('#guess-input');

//Assign UI min and max:
minNum.textContent = min;
maxNum.textContent = max;

//listen for guess:
guessBtn.addEventListener('click', function (params) {
    if(guessBtn.value === 'Play Again') {
        guessesLeft = 3;
        guessInput.disabled = false;
        setMessage('', 'white');
        guessBtn.value = 'Submit';
    } else {
        let guess = parseInt(guessInput.value);
        //we want to validate our input:
        if(isNaN(guess) || guess < min || guess > max) {
            setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        }
        //check if it is the winning numer:
        if(guess === winningNum) {
            guessInput.disabled = true;
            guessInput.style.borderColor = 'green';
            setMessage(`${winningNum} is correct!`, 'green');
    
        } else {
            //its the wrong number:
            guessesLeft -= 1;
            if(guessesLeft === 0 || guessesLeft < 0) {
                //game over
                guessInput.disabled = true;
                guessInput.style.borderColor = 'red';
                setMessage(`Game over, you lost. The correct number was ${winningNum}`, 'red');
                guessBtn.value = 'Play Again';
            } else {
                //game continues
                setMessage(`${guess} is not correct. You have only ${guessesLeft} guesses left`, 'red');
                //clear the input
                guessInput.style.borderColor = 'red';
                guessInput.value = '';
            }
        }
    }
})

function setMessage(msg,color) {
    message.style.color = color;
    message.textContent = msg;
}
















