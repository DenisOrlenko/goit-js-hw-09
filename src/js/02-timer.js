import '../css/timer.css';

// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_green.css';
// Добавляю библиотеку
// import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// // создаю рефы (ссылки на элементы, с которыми буду работать)
const refs = {
  startBtn: document.querySelector('button[data-start]'),
  inputDate: document.querySelector('input[type="text"]'),
  daysUI: document.querySelector('span[data-days]'),
  hoursUI: document.querySelector('span[data-hours]'),
  minsUI: document.querySelector('span[data-minutes]'),
  secsUI: document.querySelector('span[data-seconds]'),
};

let selectedTime = null;

// Конфигурация настроек, которая передается при работе с библиотекой Notiflix
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // Параметр selectedDates это массив выбранных дат, поэтому мы берем первый элемент - selectedDates[0]
    console.log(selectedDates[0])
    // Если пользователь выбрал дату в прошлом - if (selectedDates[0] < Date.now())
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
      selectedDates[0] = new Date();
    } else {
      // возвращаю кликабельность кнопки - после введения даты, которая больше настоящей
      refs.startBtn.disabled = false;
      selectedTime = selectedDates[0];
    }
  },
};
// преобразовую обьект timer в класс = экземпляр класса
// ОБЬЯВЛЕНИЕ КЛАССА
class Timer {
  // constructor() - для инициализации данных класса в вызванном экземпляре класса
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
    // по умолчанию - кнопка  некликабельна
    refs.startBtn.disabled = true;

    // вызов метода - при загрузке будет отображаться интерфейс с 00:00:00
    this.init();
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

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedTime - currentTime;
      const timeComponents = this.convertMs(deltaTime);
      // Вместо прямого вызова ф-ии updateClockface(timeComponents) - передаю через this = сохранение на интерфейсе данных при нажатии стоп
      this.onTick(timeComponents);
    }, 1000);
  }

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
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    // Remaining seconds
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  // метод форматирования записи числового формата символов
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

// отрисовую интерфейс - т.е. вывожу на польз. интерфейс рез-т отложенной ф-ии с помощью ф-ии updateClockface
// подставляю значение времени в параметр
function updateClockface({ days, hours, minutes, seconds }) {
  refs.daysUI.textContent = days;
  refs.hoursUI.textContent = hours;
  refs.minsUI.textContent = minutes;
  refs.secsUI.textContent = seconds;
}

// При клике на кнопку старт - на обьекте timer = {} будет вызываться метод start() => timer.start()
refs.startBtn.addEventListener('click', () => {
  timer.start();
});

// Вызываю ф-ю flatpickr() при событии на [input id="datetime-picker"] + указываю конфигурацию настроек при вызове flatpickr()
flatpickr(refs.inputDate, options);
