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

let allDivs = document.querySelectorAll('.box div');

//Assign UI min and max:
minNum.textContent = min;
maxNum.textContent = max;

//listen for guess:
guessBtn.addEventListener('mouseenter', function (params) {
    document.getElementById('guess-btn').style.backgroundColor = 'red';
})
guessBtn.addEventListener('mouseout', function (params) {
    document.getElementById('guess-btn').style.background = 'transparent';
})
guessBtn.addEventListener('click', function (params) {

    allDivs.forEach(div => {
        var createdDiv = document.createElement('div');
        div.appendChild(createdDiv);
    });

    if(guessBtn.value === 'Play Again') {
        allDivs = document.querySelectorAll('.box div');
        allDivs.forEach(div => {
           div.style.background = 'transparent';
        });
        document.querySelector('div').classList.add('wrapper');
        document.querySelector('div').classList.remove('wrapperChanged');
        document.querySelector('.box div:nth-child(8)').style.background = 'transparent';
        document.querySelector('.box div:nth-child(7)').style.background = 'transparent';
        guessesLeft = 3;
        guessInput.disabled = false;
        setMessage('', 'white');
        guessBtn.value = 'Submit';
    } else {
        let guess = parseInt(guessInput.value);
        //we want to validate our input:
        if(isNaN(guess) || guess < min || guess > max) {
            setMessage(`Please enter a number between ${min} and ${max}`, 'red');
            return;
        }
        //check if it is the winning numer:
        if(guess === winningNum) {
            document.getElementById('guess-btn').style.background = 'transparent';
            guessBtn.disabled = true;
            change('animate');
            allDivs = document.querySelectorAll('.box div');
            allDivs.forEach(div => {
                div.style.backgroundColor = 'green';
                div.classList.add('withBorder');
                div.style.color = 'rgba(10, 37, 3, 0.8)';
                div.innerHTML = `${winningNum} is correct! You win!`, 'green';
            });
            guessInput.disabled = true;
            guessInput.style.borderColor = 'green';
            // setMessage(`${winningNum} is correct! You win!`, 'green');
            document.querySelector('div').classList.remove('wrapper');
            document.querySelector('div').classList.add('wrapperWin');
            document.querySelector('.box div:nth-child(8)').style.background = 'green';
            document.querySelector('.box div:nth-child(7)').style.background = 'green';
        } else {
            //its the wrong number:
            guessesLeft -= 1;
            if(guessesLeft === 2) {
                allDivs = document.querySelectorAll('.box div');
                allDivs.forEach(div => {
                    div.style.backgroundColor = 'red';
                });
            }
            if(guessesLeft === 1) {
                allDivs = document.querySelectorAll('.box div');
                allDivs.forEach(div => {
                   div.style.backgroundColor = 'rgb(70, 6, 6)';
                });
            }
            if(guessesLeft === 0 || guessesLeft < 0) {
                //game over
                document.querySelector('div').classList.remove('wrapper');
                document.querySelector('div').classList.add('wrapperChanged');
                guessInput.disabled = true;
                guessInput.style.borderColor = 'red';
                setMessage(`Game over, you lost. The correct number was ${winningNum}`, 'red');
                guessBtn.value = 'Play Again';
            } else {
                //game continues
                setMessage(`${guess} is not correct. You have only ${guessesLeft} guesses left!`, 'red');
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

// search the CSSOM for a specific -webkit-keyframe rule
function findKeyframesRule(rule) {
    // gather all stylesheets into an array
    var ss = document.styleSheets;
    // loop through the stylesheets
    for (var i = 0; i < ss.length; ++i) {
        // loop through all the rules
        for (var j = 0; j < ss[i].cssRules.length; ++j) {
            // find the -webkit-keyframe rule whose name matches our passed over parameter and return that rule
            if ((ss[i].cssRules[j].type == window.CSSRule.KEYFRAMES_RULE) && ss[i].cssRules[j].name == rule) return [ss[i], ss[i].cssRules[j]];
        }
    }
    // rule not found
    return null;
}

// remove old keyframes and add new ones
function change(anim) {
    // find our keyframe rule
    var results1 = findKeyframesRule(anim);
    var style_sheet = results1[0];
    var rule = results1[1];
    console.log(rule);

    rule.deleteRule("0%");
    rule.deleteRule("100%");
    rule.appendRule("0% { transform: scale(0) translateY(0) rotate(0) opacity: 1;}");
    rule.appendRule("100% { transform: scale(2.9) translateY(-90px) rotate(500deg); opacity: 0; }");

    // create new 0% and 100% rules with random numbers
    // assign the animation to our element (which will cause the animation to run)
    // document.querySelector('.box').style.animationName = results2[1];
}

// begin the new animation process
function startChange() {
    // remove the old animation from our object
    document.getElementById('box').style.animationName = "none";

    // call the change method, which will update the keyframe animation
    setTimeout(function () {
        change("rotate");
    }, 0);
}

// get a random number integer between two low/high extremes
function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function unRegisterAllEventListeners(obj) {
	if ( typeof obj._eventListeners == 'undefined' || obj._eventListeners.length == 0 ) {
		return;	
	}
	
	for(var i = 0, len = obj._eventListeners.length; i < len; i++) {
		var e = obj._eventListeners[i];
		obj.removeEventListener(e.event, e.callback);
	}

	obj._eventListeners = [];
}







