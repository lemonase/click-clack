/*
 * Function stops the timer and changes the text color
 *
 * @param {Interval} timeInterval - the interval that calls the timer
 * @param {DOMElement} timerBoxEl - element for timer box
 * @param {DOMElement} wpmBoxEl - element for wpm box
 */
function stopTimer(timeInterval, timerBoxEl, wpmBoxEl) {
  clearInterval(timeInterval);
  wpmBoxEl.style.color = "yellow";
  timerBoxEl.style.color = "yellow";
  console.log(wpmBoxEl.innerText);
  console.log(timerBoxEl.innerText);
}

/*
 * Function that sets the timer to the default state
 *
 * @param {DOMElement} timerBoxEl - element for timer box
 * @param {DOMElement} wpmBoxEl - element for wpm box
 */
function resetTimer(timerBoxEl, wpmBoxEl) {
  timerBoxEl.innerText = "TIMER: ";
  wpmBoxEl.innerText = "WPM: ";
  wpmBoxEl.style.color = "white";
  timerBoxEl.style.color = "white";
}

/*
 * This function "updates" the time dom element
 * on an interval and calls updateWPM
 *
 * @param {DOMElement} timeEl - dom element for time
 * @param {DOMElement} wpmEl - dom element for wpm
 * @param {Date} startTime - time user started typing
 * @param {int} numWords - number of words in the prompt
 *
 */
function updateTime(timeEl, wpmEl, startTime, numWords) {
  const timePassed = (new Date() - startTime) / 1000;

  updateWPM(timePassed, wpmEl, numWords);
  timeEl.innerText = "TIME: " + timePassed + " sec";
}

/*
 * This function "updates" the wpm dom element
 *
 * @param {int} timeElapsed - the amount of time elapsed
 * @param {DOMElement) wpmEl - element that shows wpm
 * @param {int} numWords - number of words in the prompt
 */
function updateWPM(timeElapsed, wpmEl, numWords) {
  const minElapsed = timeElapsed / 60;

  wpmEl.innerText = "WPM: " + Math.floor(numWords / minElapsed);
}

export default { stopTimer, resetTimer, updateTime };
