// utils.js

export default { getNumWords, titleRandomizer, spanifyPrompt };

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
