// app.js
import * as prompt from "./prompt.js";
import events from './events.js';
import ui from "./ui.js";

window.onload = function() {
  events.initEventListeners();
  ui.init();
  prompt.init();
};

