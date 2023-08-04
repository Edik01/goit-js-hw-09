const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector(`[data-stop]`);
const bodyEl = document.querySelector(`body`);

let timerId = null;

btnStartEl.addEventListener(`click`, onClickStartBtn);

function onClickStartBtn() {
  btnStartEl.disabled = true;
  timerId = setInterval(() => {
    bodyEl.style.background = getRandomHexColor();
  }, 1000);
}
btnStopEl.addEventListener(`click`, onClickStoptBtn);

function onClickStoptBtn() {
  btnStartEl.disabled = false;
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
