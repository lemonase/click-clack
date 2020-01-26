// ui.js

import utils from "./utils.js";
import * as prompt from "./prompt.js";

let elements = {
  heading: document.getElementById("heading"),
  prompt: document.getElementById("prompt-display"),
  timer: document.getElementById("timer-box"),
  wpm: document.getElementById("wpm-box"),
  bottomText: document.getElementById("bottom-text")
};

function init() {
  elements.heading.innerText = utils.titleRandomizer();
  elements.timer.innerText = "TIME: ";
  elements.wpm.innerText = "WPM: ";
  elements.bottomText.hidden = true;

  prompt.init();
}

export default {
  elements,
  init
};
