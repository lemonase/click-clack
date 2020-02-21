// app.js

import ui from "./ui.js";
import events from "./events.js";

window.onload = function() {
  ui.hideScreenElements();
  ui.init();
  events.initEventListeners();
};
