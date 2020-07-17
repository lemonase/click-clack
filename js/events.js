import prompt from "./prompt.js";
import ui from "./ui.js";

const BACKSPACE_KEYCODE = 8;
const TAB_KEYCODE = 9;
const ENTER_KEYCODE = 13;

function initEventListeners() {
  /*
   * Key Presses
   */

  // keydown event
  // *includes all keys (including modifiers)*
  document.addEventListener("keydown", (event) => {
    if (event.keyCode === BACKSPACE_KEYCODE) {
      event.preventDefault();

      // remove last character from prompt string
      prompt.typedString = prompt.typedString.slice(0, -1);
      // index cannot be negative
      prompt.typedIndex > 0
        ? (prompt.typedIndex -= 1)
        : (prompt.typedIndex = 0);
      // update prompt with new index
      prompt.update(true);
    }

    if (event.keyCode === ENTER_KEYCODE) {
      prompt.reset();
    } else if (event.keyCode === TAB_KEYCODE) {
      event.preventDefault();
      prompt.reset(prompt.text);
    }
  }); // end keydown event listener

  // keypress event
  // *omits modifier keys*
  document.addEventListener("keypress", (event) => {
    const keyChar = event.key;
    const keyID = event.keyCode;
    prompt.curChar = prompt.text[prompt.typedIndex];

    // prevent default behavior of spacebar, single quote and enter
    // or start the prompt, if a letter is typed
    if (keyID === 32 || keyID === 39 || keyID === 13) {
      event.preventDefault();
    } else if (!prompt.typingStarted) {
      prompt.typingStarted = true;
      prompt.start();
    }
    // correct character?
    if (keyChar === prompt.curChar) {
      prompt.typedIndex++;
      prompt.typedString += keyChar;
      prompt.update(true);
    } else if (keyID !== 32 && keyID !== 39 && keyID !== 13) {
      prompt.update(false);
    }
    // end of prompt?
    if (prompt.typedString.length === prompt.text.length) {
      prompt.stop();
    }
  });
  // end keypress event listener

  /*
   * Buttons
   */

  ui.promptScreenElements.quoteListButton.addEventListener("click", (event) => {
    ui.displayQuoteList();
  });
} // end event listeners

export default {
  initEventListeners,
};
