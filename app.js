/* global selector  */
const pinInputField = document.getElementById("pin-input-field");
const displayInputField = document.getElementById("display-input");
const notifyMessage = document.querySelector(".notify");
const audio = document.getElementById("audio");

/* function for random genarte pin */
function randomPin() {
    let rand = Math.floor(Math.random() * 100000);
    let randString = rand + '';
    if (randString.length === 5) {
        pinInputField.value = randString;
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
        }

    })
}


/* function for checking between two fields values are match or not  */
function isMatch() {
    let pinInputValues = pinInputField.value;
    let inputValues = displayInputField.value;
    if (pinInputValues === '' || inputValues === '') {
        notifyMessage.innerText = "❌ Fields are empty.";
        soundEffect('invalid.mp3')

    } else if (pinInputValues === inputValues) {
        notifyMessage.innerText = '✅ Pin Matched... Secret door is opening for you';
        displayInputField.value = '';
        soundEffect('correct.mp3')
        randomPin();
        chance.innerText = 3;

    } else {
        notifyMessage.innerText = " ❌ Pin (" + inputValues + ") Didn't Match, Please try again";
        soundEffect('wrong.mp3')
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
        notifyMessage.innerText = '⏰ Your chance end!! try again later';
        soundEffect('timeout.mp3');
    }
}

/*  function for sound effect  */
function soundEffect(path) {
    notifyMessage.classList.add('active');
    audio.src = `./effect/${path}`;
    audio.play();
}