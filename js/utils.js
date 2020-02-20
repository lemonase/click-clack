function getNumWords(inputString) {
  return inputString.split(" ").length;
}

function titleRandomizer() {
  const titles = [
    "TYPE IT UP",
    "I AIN'T GOT NO TYPE",
    "DON'T FORGET YOUR FINGER(LESS) GLOVES",
    "GOTTA GO FAST",
    "I CAN'T FEEL ME FINGERS",
    "SLIGHT OF HAND",
    "1000 WPMs",
    "MY HANDS ARE BLEEDING!!!",
    "SMASH THOSE KEYS!",
    "DON'T GIVE UP",
    "KEYBOARD WARRIORS COME OUT TO PLAY",
    "CLICK CLACK CLICK CLACK",
    "CLICK CLICK BOOM"
  ];

  return titles[Math.floor(Math.random() * titles.length)];
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
  titleRandomizer,
  spanifyPrompt
};
