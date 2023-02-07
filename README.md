import '../css/timer.css'

// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

// // создаю рефы (ссылки на элементы, с которыми буду работать)
const refs = {
		startBtn: document.querySelector('button[data-start]'),
		daysUI: document.querySelector('span[data-days]'),
		hoursUI: document.querySelector('span[data-hours]'),
		minsUI: document.querySelector('span[data-minutes]'),
		secsUI: document.querySelector('span[data-seconds]')
	}

// преобразовую обьект timer в класс = экземпляр класса
// ОБЬЯВЛЕНИЕ КЛАССА
class Timer {
  // constructor() - для инициализации данных класса в вызванном экземпляре класса
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;

    // вызов метода
    this.init()
  }

  // При первой загрузке - будет отображаться интерфейс с 00:00:00
  init() {
    const initTime = this.convertMs(0);
    this.onTick(initTime);
  }

  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;

    const startTime = new Date(2023, 3, 4, 15, 0, 0, 0);
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const timeComponents = this.convertMs(deltaTime);
      // Вместо прямого вызова ф-ии updateClockface(timeComponents) - передаю через this = сохранение на интерфейсе данных при нажатии стоп
      this.onTick(timeComponents);
    }, 1000);
  }
  // stop() {
  //   // отложенная ф-я прекращается вызываться (очищается)
  //   clearInterval(this.intervalId);
  //   this.isActive = false;
  //   // обнуление времени при нажатии на стоп
  //   const timeReset = this.convertMs(0);
  //   // сохранение на интерфейсе данных при нажатии стоп
  //   this.onTick(timeReset);
  // }

  // из ф-ии делаю метод класса
  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    // this. добавляю
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

// ВЫЗОВ КЛАССА
// Создаю экземпляр класса new Timer(), который вызывает класс Timer()
//Передаю через параметры экземпляра (обьект настроек {onTick: updateClockface}) ф-ю на рисование интерфейса (сам КЛАСС не будет иметь в себе ее)
// создаю св-во onTick - значением передаю ссылку на ф-ю
const timer = new Timer({
  onTick: updateClockface,
});


refs.startBtn.addEventListener('click', () => {
  timer.start();
});
// Вешаю слушатель события на stopBtn и при клике на кнопку вызываю timer.stop
// refs.stopBtn.addEventListener('click', () => {
//   timer.stop();
// });

// отрисовую интерфейс - т.е. вывожу на польз. интерфейс рез-т отложенной ф-ии с помощью ф-ии updateClockface
// подставляю значение времени в параметр
function updateClockface({ days, hours, minutes, seconds }) {
	refs.daysUI.textContent = `${days}`;
	refs.hoursUI.textContent = `${hours}`;
	refs.minsUI.textContent = `${minutes}`;
	refs.secsUI.textContent = `${seconds}`;
}