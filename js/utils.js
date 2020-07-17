import quotes from "./quoteData.js";

function getNumWords(inputString) {
  return inputString.split(" ").length;
}

function getRandomTitle() {
  const titles = [
    "TYPE IT UP",
    "I AIN'T GOT NO TYPE",
    "GET YOUR GLOVES",
    "GOTTA GO FAST",
    "I CAN'T FEEL ME FINGERS",
    "SLIGHT OF HAND",
    "1000 WPMs",
    "MY HANDS ARE BLEEDING!!!",
    "SMASH THOSE KEYS!",
    "DON'T GIVE UP",
    "KEYBOARD WARRIORS COME OUT TO PLAY",
    "CLICK CLACK CLICK CLACK",
    "CLICK CLICK BOOM",
  ];

  return titles[Math.floor(Math.random() * titles.length)];
}

function getRandomQuote() {
  const randomQuote =
    quotes.data[Math.floor(Math.random() * quotes.data.length)];
  const fullText = randomQuote.quoteText + " - " + randomQuote.quoteAuthor;

  // not all quotes have an author field
  if (randomQuote.quoteAuthor) {
    return fullText;
  } else {
    return randomQuote.quoteText;
  }
}

function getQuoteData() {
  return quotes.data;
}

function spanifyPrompt(promptEl, promptString) {
  const charEls = [];

  for (let i = 0; i < promptString.length; i++) {
    const charEl = document.createElement("span");
    charEl.innerText = promptString[i];
    charEls.push(charEl);

    promptEl.appendChild(charEl);
  }

  return charEls;
}

export default {
  getNumWords,
  getRandomTitle,
  getRandomQuote,
  spanifyPrompt,
  getQuoteData,
};
