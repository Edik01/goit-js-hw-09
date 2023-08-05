import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector(`#datetime-picker`);
const btnEl = document.querySelector('[data-start]');
const spanDaysEl = document.querySelector(`[data-days]`);
const spanHoursEl = document.querySelector(`[data-hours]`);
const spanMinutesEl = document.querySelector(`[data-minutes]`);
const spanSecondsEl = document.querySelector(`[data-seconds]`);

btnEl.disabled = true;
inputEl.disabled = false; // Enable the input by default

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    const disabled = selectedDates < Date.now();
    btnEl.disabled = disabled;
    if (disabled) {
      return alert('Please choose a date in the future');
    }
  },
};

flatpickr(inputEl, options);

btnEl.addEventListener(`click`, onClick);

function onClick() {
  const date = new Date(inputEl.value).getTime();

  btnEl.disabled = true; // Disable the button when the timer starts
  inputEl.disabled = true; // Disable the input when the timer starts

  let timerId = setInterval(() => {
    const deltaTime = date - Date.now();
    if (deltaTime < 1000) {
      clearInterval(timerId);
      updateTime();
      btnEl.disabled = false; // Enable the button when the timer stops
      inputEl.disabled = false; // Enable the input when the timer stops
      return;
    }

    const time = convertMs(deltaTime);
    updateTime(time);
  }, 1000);
}

function updateTime({
  days = `00`,
  hours = `00`,
  minutes = `00`,
  seconds = `00`,
} = {}) {
  spanDaysEl.textContent = padStart(days);
  spanHoursEl.textContent = padStart(hours);
  spanMinutesEl.textContent = padStart(minutes);
  spanSecondsEl.textContent = padStart(seconds);
}

function padStart(value) {
  return value.toString().padStart(2, `0`);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
