const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdown-form");
const countdownEl = document.getElementById("countdown-El");
const complete = document.getElementById("complete");
const timeElements = document.querySelectorAll("span");
const ul = document.querySelector("ul");
const resetBtn1 = document.getElementById("reset1");
const resetBtn2 = document.getElementById("reset2");

let countdownValue = 0;
let countdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;

const updateDOM = () => {
  // update the DOM every second
  countdown = setInterval(() => {
    const now = new Date().getTime();
    // Calculate the difference the countdown value and now
    const distance = countdownValue - now;

    // Get the time constants from the distance
    const hours = Math.floor(distance / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    if (distance < 0) {
      clearInterval(countdown);
      ul.classList.add("completed");
      localStorage.removeItem("countdown");
      setTimeout(() => {
        countdownEl.style.display = "none";
        complete.hidden = false;
      }, 10000);
    }
    // Populate DOM
    timeElements[0].textContent = `${hours}`;
    timeElements[1].textContent = `${minutes}`;
    timeElements[2].textContent = `${seconds}`;

    inputContainer.hidden = true;
    countdownEl.style.display = "flex";
  }, 1000);
};

// Get the values from the form
const getCountdownValue = (event) => {
  event.preventDefault();
  const { srcElement } = event;
  const hoursAmount = +srcElement[0].value * hour;
  const minutesAmount = +srcElement[1].value * minute;
  const secondsAmount = +srcElement[2].value * second;
  const total = hoursAmount + minutesAmount + secondsAmount;
  const now = new Date().getTime();
  countdownValue = new Date(now + total).getTime();
  localStorage.setItem("countdown", countdownValue);
  if (countdownValue === now) {
    alert("The Countdown time should be greater than 0");
    return;
  }
  updateDOM();
};

// Reset the countdown
const resetCountdown = () => {
  clearInterval(countdown);
  localStorage.removeItem("countdown");
  ul.classList.remove("completed");
  inputContainer.hidden = false;
  countdownEl.style.display = "none";
  complete.hidden = true;
};

// Restore stored countdown value and check if it is valid
const restoreCountdown = () => {
  const restoreValue = JSON.parse(localStorage.getItem("countdown"));
  const now = new Date().getTime();
  const currentValue = +restoreValue - now;
  if (restoreValue || currentValue > 0) {
    countdownValue = +restoreValue;
    updateDOM();
  } else {
    localStorage.removeItem("countdown");
  }
};

countdownForm.addEventListener("submit", getCountdownValue);
resetBtn1.addEventListener("click", resetCountdown);
resetBtn2.addEventListener("click", resetCountdown);
restoreCountdown();
