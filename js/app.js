'use strict'

// let rainbowColors = ["orange", "yellow", "green", "blue", "indigo", "violet"];

window.onload = function () {
    // dom elements
    let headingEl = document.getElementById('heading');
    let promptEl = document.getElementById('prompt-display');
    let typingBoxEl = document.getElementById('typing-box');
    let timerBoxEl = document.getElementById('timer-box');
    let wpmBoxEl = document.getElementById('wpm-box');

    let typedIndex = 0;
    let timeStarted = 0;
    let typingStarted = false;
    let timeInterval;

    let outputString = '';
    let title = titleRandomizer();
    let typingPrompt = promptRandomizer();
    let letterElements = spanifyPrompt(promptEl, typingPrompt);
    let numWords = getNumWords(typingPrompt);


    updatePrompt(promptEl, typedIndex, letterElements, 'yellow');
    headingEl.textContent = title;


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

        // console.log(keyID + "  " + keyChar);

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
    // let goodColor = rainbowColors[Math.floor((Math.random() * 100) % rainbowColors.length)];
    console.log(goodColor);
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
function promptRandomizer() {
    
    // these are just test prompts for now
    // in the future, we can get quotes from and api
    // or another source
    const prompts = [
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "Sphinx of black quartz, judge my vow.",
        "The true test of intelligence is not how much you know how to do, it's how you behave when you don't know what to do. - John Holt",
        "If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals. - Sirius Black",
        "Every man desires to live long, but no man wishes to be old. - Jonathan Swift",
        "Every saint has a past, and every sinner has a future. - Oscar Wilde"
    ];

    return prompts[Math.floor((Math.random() * prompts.length))];
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
