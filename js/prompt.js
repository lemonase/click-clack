// prompt.js

import utils from "./utils.js";
import ui from "./ui.js";

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
    goodColor: "#26ff00",
    badColor: "#f93636",
    currentColor: "yellow",
    defaultColor: "white"
  },
  randomizer: async function() {
    // fetch quotes file
    const response = await fetch("./data/quotes.json");
    const json = await response.json();

    // grab a random quote and the text from that quote
    const randomQuote = json[Math.floor(Math.random() * json.length)];
    const fullText = randomQuote.quoteText + " - " + randomQuote.quoteAuthor;

    // not all quotes have authors
    if (randomQuote.quoteAuthor) {
      return fullText;
    } else {
      return randomQuote.quoteText;
    }
  },
  update: function(correctChar) {
    this.prevChar = this.letters[this.typedIndex - 1];
    this.curChar = this.letters[this.typedIndex];
    this.nextChar = this.letters[this.typedIndex + 1];

    if (this.prevChar) {
      if (this.prevChar.innerText == " ") {
        this.prevChar.style.borderBottom =
          "5px dotted" + this.color.defaultColor;
      }
      this.prevChar.style.color = this.color.goodColor;
      this.prevChar.classList.remove("cursor");
    }

    if (this.curChar !== "undefined") {
      if (this.curChar && correctChar) {
        this.curChar.style.color = this.color.currentColor;
        if (this.curChar.innerText == " ") {
          this.curChar.style.borderBottom =
            "5px dotted" + this.color.currentColor;
        }
        this.curChar.classList.add("cursor");
      } else if (this.curChar) {
        this.curChar.style.color = this.color.badColor;
      }
    }

    if (this.nextChar) {
      this.nextChar.style.color = this.color.defaultColor;
    }
  },
  reset: async function() {
    // reset prompt values to default
    this.typedIndex = 0;
    this.timeStarted = 0;
    this.typingStarted = false;
    this.typingDone = false;
    this.timeInterval;
    this.typedString = "";
    this.promptEl.innerText = "";

    // get new prompt and title
    this.text = await this.randomizer();
    this.letters = utils.spanifyPrompt(this.promptEl, this.text);
    ui.elements.heading.innerText = utils.titleRandomizer();

    // update the prompt
    this.update(true);
  }
};

export async function init() {
  // grab prompt element from ui
  prompt.promptEl = ui.elements.prompt;

  // set prompt text to random quote
  prompt.text = await prompt.randomizer();

  // returns an array of spans for each letter in prompt.text
  prompt.letters = utils.spanifyPrompt(prompt.promptEl, prompt.text);

  // highlight first letter
  prompt.update(true);
}
