// prompt.js

import timer from "./timer.js";
import ui from "./ui.js";
import utils from "./utils.js";

export default prompt = {
  typedIndex: 0,
  nextChar: "",
  curChar: "",
  prevChar: "",
  timeStarted: 0,
  timeInterval: 0,
  typingStarted: false,
  typingDone: false,
  typedString: "",
  text: "",
  color: {
    goodColor: "#27e820",
    badColor: "#f93636",
    currentColor: "yellow",
    defaultColor: "white"
  },
  update: function(correctChar) {
    this.prevChar = this.letters[this.typedIndex - 1];
    this.curChar = this.letters[this.typedIndex];
    this.nextChar = this.letters[this.typedIndex + 1];

    if (this.prevChar) {
      this.prevChar.style.color = this.color.goodColor;
      this.prevChar.classList.remove("cursor");
    }

    if (this.curChar !== "undefined") {
      if (this.curChar && correctChar) {
        this.curChar.style.color = this.color.currentColor;
        this.curChar.classList.add("cursor");
      } else if (this.curChar) {
        this.curChar.style.color = this.color.badColor;
      }
    }

    if (this.nextChar) {
      this.nextChar.style.color = this.color.defaultColor;
      this.nextChar.classList.remove("cursor");
    }
  },
  reset: async function(text) {
    // reset prompt values to default
    this.typedIndex = 0;
    this.timeStarted = 0;
    this.typingStarted = false;
    this.typingDone = false;
    this.timeInterval;
    this.typedString = "";
    this.promptEl.innerText = "";

    timer.stopTimer(this.timeInterval, ui.elements.timer, ui.elements.wpm);
    timer.resetTimer(ui.elements.timer, ui.elements.wpm);

    // get new prompt and split into letters
    if (text) {
      this.text = text;
    } else {
      this.text = utils.getRandomQuote();
    }

    this.letters = utils.spanifyPrompt(this.promptEl, this.text);

    // reset ui elements
    ui.elements.heading.innerText = utils.getRandomTitle();

    // update the prompt
    this.update(true);
  },
  start: function() {
    this.timeStarted = new Date();
    this.timeInterval = setInterval(
      timer.updateTime,
      100,
      ui.elements.timer,
      ui.elements.wpm,
      this.timeStarted,
      utils.getNumWords(this.text)
    );
  },
  stop: function() {
    timer.stopTimer(this.timeInterval, ui.elements.timer, ui.elements.wpm);
    ui.elements.bottomText.hidden = false;
    this.typingDone = true;
  }
};

export async function init() {
  // grab prompt element from ui
  prompt.promptEl = ui.elements.prompt;

  // set prompt text to random quote
  prompt.text = utils.getRandomQuote();

  // returns an array of spans for each letter in prompt.text
  prompt.letters = utils.spanifyPrompt(prompt.promptEl, prompt.text);

  // highlight first letter
  prompt.update(true);

  // show ui after prompt loads
  ui.showScreenElements();
}
