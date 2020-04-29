// ui.js

import utils from "./utils.js";
import * as prompt from "./prompt.js";

let elements = {
  heading: document.getElementById("heading"),
  prompt: document.getElementById("prompt-display"),
  timer: document.getElementById("timer-box"),
  wpm: document.getElementById("wpm-box"),
  bottomText: document.getElementById("bottom-text"),
  quoteListButton: document.getElementById("quote-list-button"),
  buttons: document.querySelector(".buttons"),
};

function init() {
  prompt.init();

  elements.heading.innerText = utils.getRandomTitle();
  elements.timer.innerText = "TIME: ";
  elements.wpm.innerText = "WPM: ";
}

function hideScreenElements() {
  for (const key of Object.keys(elements)) {
    let el = elements[key];
    el.hidden = true;
  }
}

function showScreenElements() {
  for (const key of Object.keys(elements)) {
    let el = elements[key];
    el.hidden = false;
  }
}

async function displayQuoteList() {
  let quoteList = document.getElementById("quote-list");
  const json = utils.getQuoteData();

  document.body.style.overflow = "scroll";
  quoteList.hidden = false;

  if (quoteList.childElementCount == 0) {
    for (let i = 0; i < json.length; i++) {
      let listItem = document.createElement("li");
      listItem.style.marginBottom = "20px";
      listItem.style.paddingBottom = "20px";
      listItem.style.cursor = "pointer";

      let fullText = "";
      if (json[i].quoteAuthor) {
        fullText = json[i].quoteText + " - " + json[i].quoteAuthor;
      } else {
        fullText = json[i].quoteText;
      }

      listItem.innerText =
        json[i].quoteText + "\n - " + json[i].quoteAuthor + "\n";

      listItem.addEventListener("mouseover", event => {
        event.target.style.color = "yellow";
      });

      listItem.addEventListener("mouseleave", event => {
        event.target.style.color = "white";
      });

      listItem.addEventListener("click", event => {
        console.log(event.target.innerText);
        prompt.default.reset(fullText);
        quoteList.hidden = true;
        showScreenElements();
      });

      quoteList.appendChild(listItem);
    }
  }
}

export default {
  elements,
  init,
  hideScreenElements,
  showScreenElements,
  displayQuoteList
};
