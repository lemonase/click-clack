import ui from "./ui.js";
import events from "./events.js";

window.onload = function () {
  ui.init();
  // ui.hideScreenElements(ui.promptElements);
  events.initEventListeners();
};
