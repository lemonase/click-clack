import timer from "./timer.js";
import ui from "./ui.js";
import utils from "./utils.js";

var prompt = {};

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
  update: function (correctChar) {
    this.prevChar = this.letters[this.typedIndex - 1];
    this.curChar = this.letters[this.typedIndex];
    this.nextChar = this.letters[this.typedIndex + 1];

    if (this.prevChar) {
      this.prevChar.classList.add("cursor-correct");
      this.prevChar.classList.remove("cursor");
    }

    if (this.curChar !== "undefined") {
      if (this.curChar && correctChar) {
        this.curChar.classList.remove("cursor-correct");
        this.curChar.classList.remove("cursor-wrong");

        this.curChar.classList.add("cursor");
      } else if (this.curChar) {
        this.curChar.classList.add("cursor-wrong");
      }
    }

    if (this.nextChar) {
      this.nextChar.classList.remove("cursor");
    }
  },
  reset: async function (text) {
    // reset prompt values to default
    this.typedIndex = 0;
    this.timeStarted = 0;
    this.typingStarted = false;
    this.typingDone = false;
    this.timeInterval;
    this.typedString = "";
    this.promptEl.innerText = "";

    // timers
    timer.stopTimer(
      this.timeInterval,
      ui.promptScreenElements.timer,
      ui.promptScreenElements.wpm
    );
    timer.resetTimer(
      ui.promptScreenElements.timer,
      ui.promptScreenElements.wpm
    );

    // get new prompt and split into letters
    if (text) {
      this.text = text;
    } else {
      this.text = utils.getRandomQuote();
    }

    // make each letter of text a span element for styling
    this.letters = utils.spanifyPrompt(this.promptEl, this.text);

    // reset ui elements
    ui.promptScreenElements.heading.innerText = utils.getRandomTitle();

    // update the prompt
    this.update(true);

    // hide bottom text and scrollbar
    document.body.style.overflow = "hidden";
    ui.promptScreenElements.bottomText.style.display = "none";
  },
  start: function () {
    this.timeStarted = new Date();
    this.timeInterval = setInterval(
      timer.updateTime,
      100,
      ui.promptScreenElements.timer,
      ui.promptScreenElements.wpm,
      this.timeStarted,
      utils.getNumWords(this.text)
    );
  },
  stop: function () {
    timer.stopTimer(
      this.timeInterval,
      ui.promptScreenElements.timer,
      ui.promptScreenElements.wpm
    );
    ui.promptScreenElements.bottomText.style.display = "block";
    this.typingDone = true;
  },
  display: function () {
    // grab prompt element from ui
    this.promptEl = ui.promptScreenElements.prompt;

    // reset or initialize data
    this.reset();

    // show ui after prompt loads
    ui.showScreenElements(ui.promptScreenElements);
  },
};
