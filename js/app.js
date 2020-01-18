import ui from './ui.js';
import events from './events.js';
import * as prompt from './prompt.js';

window.onload = function() {
  ui.init();
  events.initEventListeners();
  prompt.init();
};
