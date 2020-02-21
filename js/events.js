// events.js

import prompt from "./prompt.js";
import ui from "./ui.js";

function initEventListeners() {
  // keydown event includes *all* keys (including modifiers)
  document.addEventListener("keydown", event => {
    // <backspace key> pressed
    if (event.keyCode == 8) {
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

    // <enter key> pressed, new prompt
    if (event.keyCode == 13) {
      prompt.reset();
      console.log("Enter");
    }
    // <tab key> pressed, reset prompt
    else if (event.keyCode == 9) {
      event.preventDefault();
      prompt.reset(prompt.text);
    }
  }); // end keydown event listener

  // keypress event *omits modifier keys*
  document.addEventListener("keypress", event => {
    const keyChar = event.key;
    const keyID = event.keyCode;

    prompt.curChar = prompt.text[prompt.typedIndex];

    // prevent default behavior of spacebar, single quote and enter
    if (keyID == 32 || keyID == 39 || keyID == 13) {
      event.preventDefault();
    }
    // otherwise start timer if typing has commenced
    else {
      if (!prompt.typingStarted) {
        prompt.typingStarted = true;
        prompt.start();
      }
    }

    // correct character?
    if (keyChar == prompt.curChar) {
      prompt.typedIndex++;
      prompt.typedString += keyChar;
      prompt.update(true);
    } else if (keyID != 32 && keyID != 39 && keyID != 13) {
      prompt.update(false);
    }

    // end of prompt?
    if (prompt.typedString.length == prompt.text.length) {
      prompt.stop();
    }
  }); // end keypress event listener

  ui.elements.quoteListButton.addEventListener("click", event => {
    ui.hideScreenElements();
    ui.displayQuoteList();
  });
} // end event listeners

export default {
  initEventListeners
};
