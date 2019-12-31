// events.js
import prompt from './prompt.js'
import timer from './timer.js';
import ui from './ui.js';

function initEventListeners() {
  // keydown event includes *all* keys
  document.addEventListener("keydown", event => {
    if (event.keyCode == 8) {
      // <backspace key>
      event.preventDefault();

      // remove last character from string
      prompt.typedString = prompt.typedString.slice(0, -1);

      // make sure the index is not negative
      prompt.typedIndex > 0
        ? (prompt.typedIndex -= 1)
        : (prompt.typedIndex = 0);

      // update prompt with new index
      prompt.update(true);
    }

    // <enter key>
    // if we are done typing, reset
    if (event.keyCode == 13 && prompt.typingDone) {
      timer.resetTimer(ui.elements.timer, ui.elements.wpm);
      prompt.reset();
      ui.elements.bottomText.hidden = true;
    }
  }); // end keydown event listener

  // keypress event *omits modifier keys*
  document.addEventListener("keypress", event => {
    const keyChar = event.key;
    const keyID = event.keyCode;

    // update the current character
    prompt.curChar = prompt.text[prompt.typedIndex];

    if (keyID == 32 || keyID == 39 || keyID == 13) {
      event.preventDefault(); // prevent default spacebar, single quote and enter
    } else {
      if (!prompt.typingStarted) {
        prompt.typingStarted = true;

        // store time started and update timer every 100ms
        prompt.timeStarted = new Date();
        prompt.timeInterval = setInterval(
          timer.updateTime,
          100,
          ui.elements.timer,
          ui.elements.wpm,
          prompt.timeStarted,
          prompt.text.length
        );
      }
    }

    // correct character typed
    if (keyChar == prompt.curChar) {
      // increment index
      prompt.typedIndex++;

      // append typed char to the typed string
      prompt.typedString += keyChar;

      // update cursor position
      prompt.update(true);
    } else {
      // wrong character typed
      prompt.update(false);
    }

    // check if we are finished typing
    if (prompt.typedString.length == prompt.text.length) {
      timer.stopTimer(prompt.timeInterval, ui.elements.timer, ui.elements.wpm);
      ui.elements.bottomText.hidden = false;
      prompt.typingDone = true;
    }
  }); // end keypress event listener
} // end event listeners

export default { initEventListeners }
