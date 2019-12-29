"use strict";

window.onload = async function() {
  // prompt variables
  let typedIndex = 0;
  let timeStarted = 0;
  let typingStarted = false;
  let timeInterval;
  let outputString = "";
  const typingPrompt = await promptRandomizer();
  const numWords = getNumWords(typingPrompt);

  // dom elements
  const headingEl = document.getElementById("heading");
  const promptEl = document.getElementById("prompt-display");
  const timerBoxEl = document.getElementById("timer-box");
  const wpmBoxEl = document.getElementById("wpm-box");
  const letterElements = spanifyPrompt(promptEl, typingPrompt);

  // set initial style for prompt
  updatePrompt(promptEl, typedIndex, letterElements, true);

  // set a random title
  headingEl.textContent = titleRandomizer();

  // keydown event includes all keys
  document.addEventListener("keydown", event => {
    if (event.keyCode == 8) {
      // backspace key
      event.preventDefault();

      // remove last character from string
      outputString = outputString.slice(0, -1);

      // make sure the index is not negative
      typedIndex > 0 ? (typedIndex -= 1) : (typedIndex = 0);

      // update prompt with new index
      updatePrompt(promptEl, typedIndex, letterElements, true);
    }
  });

  // keypress event omits modifier keys
  document.addEventListener("keypress", event => {
    const keyChar = event.key;
    const keyID = event.keyCode;
    const promptChar = typingPrompt[typedIndex];

    if (keyID == 32) {
      // spacebar
      event.preventDefault(); // prevent default spacebar scrolldown
    } else if (keyID == 39) {
      event.preventDefault(); // prevent single quote action
    }

    if (!typingStarted) {
      // started typing a character
      typingStarted = true;

      // store time started and update timer every 100ms
      timeStarted = new Date();
      timeInterval = setInterval(
        updateTime,
        100,
        timerBoxEl,
        wpmBoxEl,
        timeStarted,
        numWords
      );
    }

    if (keyChar == promptChar) {
      // correct character typed
      // increment index
      typedIndex++;

      // add to output for the typing box
      outputString += keyChar;

      // update cursor position
      updatePrompt(promptEl, typedIndex, letterElements, true);
    } else {
      // wrong character typed
      updatePrompt(promptEl, typedIndex, letterElements, false);
    }

    // check if we are finished typing
    if (outputString.length == typingPrompt.length) {
      clearInterval(timeInterval);
      wpmBoxEl.style.color = "yellow";
      timerBoxEl.style.color = "yellow";
    }
  });
};

/*
 * Returns the length of an input string
 *
 * @param {string} inputString - string to get num of words from
 * @return {int} number of words (separated by space)
 */
function getNumWords(inputString) {
  return inputString.split(" ").length;
}

/*
 * This function "updates" the time dom element
 * on an interval and calls updateWPM
 *
 * @param {DOMElement} timeEl - dom element for time
 * @param {DOMElement} wpmEl - dom element for wpm
 * @param {Date} startTime - time user started typing
 * @param {int} numWords - number of words in the prompt
 *
 */
function updateTime(timeEl, wpmEl, startTime, numWords) {
  const timePassed = (new Date() - startTime) / 1000;

  updateWPM(timePassed, wpmEl, numWords);
  timeEl.innerText = "TIME: " + timePassed + " sec";
}

/*
 * This function "updates" the wpm dom element
 *
 * @param {int} timeElapsed - the amount of time elapsed
 * @param {DOMElement) wpmEl - element that shows wpm
 * @param {int} numWords - number of words in the prompt
 */
function updateWPM(timeElapsed, wpmEl, numWords) {
  const minElapsed = timeElapsed / 60;

  wpmEl.innerText = "WPM: " + Math.floor(numWords / minElapsed);
}

/*
 * This function "updates" the prompt by changing styles, etc.
 *
 * @param {DOMElement} promptEl - element that gets updated
 * @param {int} index - the position of the char being typed
 * @param {DOMElement[]} letterElements - the array of span elements
 * @param {bool} correctChar - whether the correct character was typed
 */
function updatePrompt(promptEl, index, letterElements, correctChar) {
  const nextCursorEl = letterElements[index + 1];
  const cursorEl = letterElements[index];
  const prevCursorEl = letterElements[index - 1];

  const goodColor = "cyan";
  const badColor = "#f93636";
  const currentColor = "yellow";
  const defaultColor = "white";

  if (prevCursorEl) {
    if (prevCursorEl.innerText == " ") {
      prevCursorEl.style.border = "1px ridge" + goodColor;
    }
    prevCursorEl.style.color = goodColor;
    prevCursorEl.classList.remove("cursor");
  }

  if (cursorEl !== "undefined") {
    if (cursorEl && correctChar) {
      cursorEl.style.color = currentColor;
      if (cursorEl.innerText == " ") {
        cursorEl.style.border = "1px ridge" + currentColor;
      }
      cursorEl.classList.add("cursor");
    } else if (cursorEl) {
      cursorEl.style.color = badColor;
    }
  }

  if (nextCursorEl) {
    nextCursorEl.style.color = defaultColor;
  }
}

/*
 * Takes an input string and appends a span for each character
 * to the promptEl
 *
 * @param {DOMElement} promptEl - the dom element to be populated
 * @param {string} promptString - the string to be splint into spans
 *
 * @returns {Array} an array of span elements for each letter in promptString
 */
function spanifyPrompt(promptEl, promptString) {
  const charEls = [];

  for (let i = 0; i < promptString.length; i++) {
    const charEl = document.createElement("span");
    charEl.innerText = promptString[i];
    if (promptString[i] == " ") {
      charEl.classList.add("space");
    }
    charEls.push(charEl);

    promptEl.appendChild(charEl);
  }

  return charEls;
}

/*
 * Return a random prompt string
 *
 * @returns {string} a random prompt
 */
async function promptRandomizer() {
  // fetch quotes file
  const response = await fetch("/data/quotes.json");
  const json = await response.json();

  const randomQuote = json[Math.floor(Math.random() * json.length)];
  const fullText = randomQuote.quoteText + " - " + randomQuote.quoteAuthor;

  // not all quotes have authors
  if (randomQuote.quoteAuthor) {
    return fullText;
  } else {
    return randomQuote.quoteText;
  }
}

/*
 * Returns a random title string
 *
 * @returns {string} a random title
 */
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
    "CLICK CLACK CLICK CLACK",
    "CLICK CLICK BOOM"
  ];

  return titles[Math.floor(Math.random() * titles.length)];
}
