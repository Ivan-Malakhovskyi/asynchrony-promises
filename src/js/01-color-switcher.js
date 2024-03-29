const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let id = null;
refs.start.addEventListener('click', onChangeColorClick);

refs.stop.addEventListener('click', onStopChangeColorClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function onChangeColorClick(evt) {
  evt.target.disabled = true;
  refs.stop.disabled = false;

  id = setInterval(() => {
    const changeBrndColor = getRandomHexColor();

    refs.body.style.backgroundColor = changeBrndColor;
  }, 1000);
}

function onStopChangeColorClick(evt) {
  refs.start.disabled = false;
  evt.target.disabled = true;
  clearInterval(id);
}
