const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);

let intervalId = null;

function onStartClick() {
  console.log('start');
  refs.startBtn.disabled = true;
	refs.stopBtn.disabled = false;
  // ССЫЛКА НА КОЛБЕК
	intervalId = setInterval(changeColor, 1000);
	// или
  // intervalId = setInterval(() => {
  //   refs.body.style.backgroundColor = getRandomHexColor();
  // }, 1000);
}

function onStopClick() {
  console.log('stop');
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
	// или
	// refs.startBtn.removeAttribute('disabled');
	// refs.stopBtn.setAttribute('disabled', true);
	//
	// отменяю запланированный вызов ф-ии setInterval()
  clearInterval(intervalId);
}

function changeColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}