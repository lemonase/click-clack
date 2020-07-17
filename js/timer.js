function stopTimer(timeInterval, timerBoxEl, wpmBoxEl) {
  clearInterval(timeInterval);
  wpmBoxEl.style.color = "yellow";
  timerBoxEl.style.color = "yellow";
}

function resetTimer(timerBoxEl, wpmBoxEl) {
  timerBoxEl.innerText = "TIME: ";
  wpmBoxEl.innerText = "WPM: ";
  wpmBoxEl.style.color = "white";
  timerBoxEl.style.color = "white";
}

function updateTime(timeEl, wpmEl, startTime, numWords) {
  const timePassed = ((new Date() - startTime) / 1000).toFixed(2);
  updateWPM(timePassed, wpmEl, numWords);
  timeEl.innerText = "TIME: " + timePassed + " sec";
}

function updateWPM(timeElapsed, wpmEl, numWords) {
  const minElapsed = timeElapsed / 60;
  wpmEl.innerText = "WPM: " + Math.round(numWords / minElapsed);
}

export default {
  stopTimer,
  resetTimer,
  updateTime,
};
