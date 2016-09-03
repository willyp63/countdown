const COUNTDOWN_DATE = '01/01/2017'; // month/day/year
const COUNTDOWN_TIME = '00:00:00'; // hours(0-23):minutes(0-59):seconds(0-59)
const ALERT_MESSAGE = 'Happy New Year!';

// create countdown date object
const dateMatch = COUNTDOWN_DATE.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
if (!dateMatch) { throw new Error('Invalid COUNTDOWN_DATE!!!'); }
const timeMatch = COUNTDOWN_TIME.match(/^(\d{2}):(\d{2}):(\d{2})$/);
if (!timeMatch) { throw new Error('Invalid COUNTDOWN_TIME!!!'); }
const DATE = new Date(dateMatch[3], dateMatch[1] - 1, dateMatch[2],
                      timeMatch[1], timeMatch[2], timeMatch[3]);

// start timer when dom loads
document.addEventListener('DOMContentLoaded', function () {
  updateTimer();
});

function hoursUntilDate () {
  const msPerHour = 1000 * 60 * 60;
  return Math.floor(msDiff() / msPerHour);
}

function minutesUntilDate () {
  const msPerMinute = 1000 * 60;
  return Math.floor((msDiff() / msPerMinute) % 60);
}

function secondsUntilDate () {
  return Math.floor((msDiff() / 1000) % 60);
}

function msDiff () {
  return DATE.getTime() - new Date().getTime();
}

function padNumber (num) {
  return (num < 10) ? `0${num}` : num;
}

function updateTimer () {
  // check if timer is still counting down
  if (msDiff() > 0) {
    document.getElementById('hours').innerHTML = padNumber(hoursUntilDate());
    document.getElementById('minutes').innerHTML = padNumber(minutesUntilDate());
    document.getElementById('seconds').innerHTML = padNumber(secondsUntilDate());
    setTimeout(updateTimer, 1000 / 60); // schedule next update
  } else {
    document.getElementById('hours').innerHTML = '00';
    document.getElementById('minutes').innerHTML = '00';
    document.getElementById('seconds').innerHTML = '00';
    alert(ALERT_MESSAGE);
  }

  // adjust css styles
  resizeHours();
  colorSeconds();
}

function resizeHours () {
  const hoursEl = document.getElementById('hours');
  const numDigits = hoursEl.innerHTML.length - 0.5; // don't scale quite so much ( - 0.5)
  let digitRatio = numDigits / 2;
  if (digitRatio < 1.0) { digitRatio = 1.0; }

  // restyle hours display to allow text to fit
  const oldFontSize = parseFloat(unitDisplayFontSize().match(/(.+)px/)[1]);
  hoursEl.style.fontSize = (oldFontSize / digitRatio) + 'px';
  hoursEl.style.height = unitDisplayHeight();
  hoursEl.style.lineHeight = unitDisplayHeight();
}

function colorSeconds () {
  const secondsDisplayEl = document.getElementById('seconds').parentElement;
  // check if countdown is less than a minute away
  if (msDiff() < 1000 * 60) {
    secondsDisplayEl.style.color = 'red';
  } else {
    secondsDisplayEl.style.color = 'black';
  }
}

function unitDisplayFontSize () {
  const el = document.getElementById('hours');
  return window.getComputedStyle(el.parentElement, null).getPropertyValue('font-size');
}

function unitDisplayHeight () {
  const el = document.getElementById('minutes');
  return window.getComputedStyle(el, null).getPropertyValue('height');
}
