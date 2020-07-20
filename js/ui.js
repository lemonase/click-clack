import utils from "./utils.js";
import * as prompt from "./prompt.js";

const promptScreenElements = {
  timer: document.getElementById("timer-box"),
  wpm: document.getElementById("wpm-box"),
  heading: document.getElementById("heading"),
  prompt: document.getElementById("prompt-display"),
  bottomText: document.getElementById("bottom-text"),
  progressBar: document.getElementById("progress-bar"),
  progressBarInner: document.getElementById("progress-bar-inner"),
  quoteListButton: document.getElementById("quote-list-button"),
  buttons: document.querySelector(".buttons"),
};

const quoteListElements = {
  quoteList: document.getElementById("quote-list"),
};

function hideScreenElements(screenElements) {
  for (const key of Object.keys(screenElements)) {
    const el = screenElements[key];
    el.hidden = true;
  }
}

function showScreenElements(screenElements) {
  for (const key of Object.keys(screenElements)) {
    const el = screenElements[key];
    el.hidden = false;
  }
}

function updateProgressBar(widthPercent) {
  promptScreenElements.progressBarInner.style.width = widthPercent + "%";
}

function initPrompt() {
  // set heading elements
  promptScreenElements.heading.innerText = utils.getRandomTitle();
  promptScreenElements.timer.innerText = "TIME: ";
  promptScreenElements.wpm.innerText = "WPM: ";

  // display all the elements of the prompt
  prompt.default.display();
}

async function displayQuoteList() {
  hideScreenElements(promptScreenElements);

  let quoteList = quoteListElements.quoteList;
  const json = utils.getQuoteData();

  let backBtn = document.querySelector("#quote-list-back-button");
  if (!backBtn) {
    backBtn = document.createElement("button");
    backBtn.classList.add("btn");
    backBtn.style.position = "fixed";
    backBtn.style.right = "10%";
    backBtn.innerText = "Back To Prompt";
    backBtn.id = "quote-list-back-button";
    document.body.prepend(backBtn);
  }
  document.body.style.overflow = "auto";
  backBtn.style.display = "inline-flex";

  backBtn.addEventListener("click", (e) => {
    hideScreenElements(quoteListElements);
    e.target.style.display = "none";
    prompt.default.display();
  });

  if (quoteList.childElementCount === 0) {
    for (let i = 0; i < json.length; i++) {
      const listItem = document.createElement("li");
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

      listItem.addEventListener("mouseover", (event) => {
        event.target.style.color = "yellow";
      });

      listItem.addEventListener("mouseleave", (event) => {
        event.target.style.color = "white";
      });

      listItem.addEventListener("click", () => {
        prompt.default.reset(fullText);
        hideScreenElements(quoteListElements);
        backBtn.style.display = "none";

        showScreenElements(promptScreenElements);
      });

      quoteList.appendChild(listItem);
    }
  } else {
    showScreenElements(quoteListElements);
  }
}

export default {
  promptScreenElements,
  quoteListElements,
  initPrompt,
  updateProgressBar,
  hideScreenElements,
  showScreenElements,
  displayQuoteList,
};
