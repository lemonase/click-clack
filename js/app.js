'use strict'

window.onload = async function () {
    // prompt variables
    let typedIndex = 0;
    let timeStarted = 0;
    let typingStarted = false;
    let timeInterval;
    let outputString = '';
    let typingPrompt = await promptRandomizer();
    let numWords = getNumWords(typingPrompt);

    // dom elements
    let headingEl = document.getElementById('heading');
    let promptEl = document.getElementById('prompt-display');
    let typingBoxEl = document.getElementById('typing-box');
    let timerBoxEl = document.getElementById('timer-box');
    let wpmBoxEl = document.getElementById('wpm-box');
    let letterElements = spanifyPrompt(promptEl, typingPrompt);

    // set initial style for prompt
    updatePrompt(promptEl, typedIndex, letterElements, 'yellow');

    // set a random title
    headingEl.textContent = titleRandomizer();

    // keydown event includes all keys
    document.addEventListener('keydown', event => {
        if (event.keyCode == 8) { // backspace key
            event.preventDefault();

            // remove last character from string
            outputString = outputString.slice(0, -1);

            // make sure the index is not negative
            (typedIndex > 0 ? typedIndex -= 1 : typedIndex = 0);

            // update prompt with new index
            updatePrompt(promptEl, typedIndex, letterElements, true);
        }

        // update the typing box after every key
        // updateTypingBox(typingBoxEl, outputString);
    });

    // keypress event omits modifier keys
    document.addEventListener('keypress', event => {
        let keyChar = event.key;
        let keyID = event.keyCode;
        let promptChar = typingPrompt[typedIndex];

        if (keyID == 32) { // spacebar
            event.preventDefault(); // prevent default spacebar scrolldown
        } else if (keyID == 39) {
            event.preventDefault(); // prevent single quote action
        }

        if (!typingStarted) { // started typing a character
            typingStarted = true;
            timeStarted = new Date();
            timeInterval = setInterval(updateTime, 100, timerBoxEl, wpmBoxEl, timeStarted, numWords);
        }

        if (keyChar == promptChar) { // correct character typed
            // increment index
            typedIndex++;

            // add to output for the typing box
            outputString += keyChar;

            // update cursor position
            updatePrompt(promptEl, typedIndex, letterElements, true);
        }
        else { // wrong character typed
            updatePrompt(promptEl, typedIndex, letterElements, false);
        }

        // check if we are finished typing
        if (outputString.length == typingPrompt.length) {
            clearInterval(timeInterval);
            wpmBoxEl.style.color = "yellow";
            timerBoxEl.style.color = "yellow";
        }

        // update the typing box
        // updateTypingBox(typingBoxEl, outputString);
    });

};

function getNumWords(inputString) {
    return inputString.split(" ").length;
}

function updateTime(timeEl, wpmEl, startTime, numWords) {
    let timePassed = (new Date() - startTime) / 1000;

    updateWPM(timePassed, wpmEl, numWords);
    timeEl.innerText = "TIME: " + timePassed + " sec";
}

function updateWPM(timeElapsed, wpmEl, numWords) {
    let minElapsed = timeElapsed / 60;

    wpmEl.innerText = "WPM: " + Math.floor(numWords / minElapsed);
}

function updatePrompt(promptEl, index, letterElements, correctChar) {
    let nextCursorEl = letterElements[index + 1];
    let cursorEl = letterElements[index];
    let prevCursorEl = letterElements[index - 1];

    let goodColor = "cyan";
    let badColor = "#f93636";
    let currentColor = "yellow";
    let defaultColor = "white";

    if (prevCursorEl) {
        if (prevCursorEl.innerText == " ") {
            prevCursorEl.style.border = "1px ridge" + goodColor;
        }
        prevCursorEl.style.color = goodColor;
        prevCursorEl.classList.remove('cursor');
    }

    if (cursorEl !== 'undefined') {
        if (cursorEl && correctChar) {
            cursorEl.style.color = currentColor;
            if (cursorEl.innerText == " ") {
                cursorEl.style.border = "1px ridge" + currentColor;
            }
            cursorEl.classList.add('cursor');
        } else if (cursorEl) {
            cursorEl.style.color = badColor;
        }
    }

    if (nextCursorEl) {
        nextCursorEl.style.color = defaultColor;
    }
}

// updates the value of the text box
function updateTypingBox(boxEl, outputString) {
    boxEl.textContent = outputString;
}

// takes an input string and appends a span for each character
function spanifyPrompt(promptEl, promptString) {
    let charEls = [];

    for (let i = 0; i < promptString.length; i++) {
        let charEl = document.createElement("span");
        charEl.innerText = promptString[i];
        if (promptString[i] == " ")
            charEl.classList.add("space");
        charEls.push(charEl);

        promptEl.appendChild(charEl);
    }

    return charEls;
}

// returns a random prompt
async function promptRandomizer() {

  // fetch quotes file
  let response = await fetch('/data/quotes.json');
  let json = await response.json()

  let randomQuote = json[Math.floor(Math.random() * json.length)];
  let fullText = randomQuote.quoteText + ' - ' + randomQuote.quoteAuthor

  return fullText
}

// returns a random title
function titleRandomizer() {

    // stupid titles
    const titles = [
        "TYPE IT UP",
        "I AIN'T GOT NO TYPE",
        "DON'T FORGET YOUR FINGER(LESS) GLOVES",
        "GOTTA GO FAST",
        "I CAN'T FEEL ME FINGERS",
        "SLIGHT OF HAND",
        "1000 WPMs",
        "MY HANDS ARE BLEEDING!!!",
        "SMASH THOSE KEYS!",
        "DON'T GIVE UP",
        "KEYBOARD WARRIORS COME OUT TO PLAY",
        "CLICK CLACK CLICK CLACK"
    ];

    return titles[Math.floor((Math.random() * titles.length))];
}
