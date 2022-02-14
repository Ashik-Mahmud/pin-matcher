/* global selector  */
const pinInputField = document.getElementById("pin-input-field");
const displayInputField = document.getElementById("display-input");
const notifyMessage = document.querySelector(".notify");
const audio = document.getElementById("audio");

/* function for random generate pin */
function randomPin() { 
    let rand = Math.floor(Math.random() * 100000);
    let randString = rand + '';
    if (randString.length === 5) {
        pinInputField.value = randString;
        pinInputField.focus();
    }
}
/* function for display value when users press key  */
const buttons = document.getElementsByClassName("button");
for (let button of buttons) {
    button.addEventListener("click", function () {
        let buttonValue = button.innerText;
        if (buttonValue.toLowerCase() === 'c') {
            displayInputField.value = '';
        } else if (buttonValue.toLowerCase() === '<') {
            displayInputField.value = displayInputField.value.slice(0, -1);
        } else {
            displayInputField.value += buttonValue;
            displayInputField.focus();
        }

    })
}


/* function for checking between two fields values are match or not  */
function isMatch() {
    let pinInputValues = pinInputField.value;
    let inputValues = displayInputField.value;
    if (pinInputValues === '' || inputValues === '') {
        soundEffect('invalid.mp3', "❌ Fields are empty.")

    } else if (pinInputValues === inputValues) {
        displayInputField.value = '';
        soundEffect('correct.mp3', '✅ Pin Matched... Secret door is opening for you')
        randomPin();
        chance.innerText = 3;

    } else {
        soundEffect('wrong.mp3', " ❌ Pin (" + inputValues + ") Didn't Match, Please try again")
        takeChance();
    }
};

/* function for get 3 times chance for pin match  */
function takeChance() {
    const chance = document.getElementById('chance');
    let chanceValue = parseInt(chance.innerText) - 1;
    chance.innerText = chanceValue;
    if (parseInt(chance.innerText) === 0) {
        document.querySelector(".submit-btn").classList.add("disabled");
        soundEffect('timeout.mp3', '⏰ Your chance end!! try again later');
    }
}

/*  function for sound effect  */
function soundEffect(path, error) {
    notifyMessage.classList.add('active');
    notifyMessage.innerText = error;
    audio.src = `./effect/${path}`;
    audio.play();
}