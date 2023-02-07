// import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delayEl: document.querySelector('[name="delay"]'),
  stepEl: document.querySelector('[name="step"]'),
  amountE: document.querySelector('[name="amount"]'),
  submitBtn: document.querySelector('button'),
};

// При событии SUBMIT на элементе refs.form => будет вызываться ф-я onFormSubmit
refs.form.addEventListener('submit', onFormSubmit);

// Обьявляю переменные, которые будут принимать значения, вводимые пользователем
let firtstDelayValue = null;
let stepDelayValue = null;
let amountValue = null;

function onFormSubmit(e) {
  // При отправке формы (сабмит) => страница не будет перезагружаться
  e.preventDefault();
  // При нажатии на кнопку - вешаю атрибут disabled - т.е. делаю кнопку некликабельной
  refs.submitBtn.disabled = true;
  // или
  // refs.form.lastElementChild.setAttribute('disabled', '');

  // 1
  // Привязываю имя переменных к полям формы для дальнейшей работы с данными, вводимыми пользователем +
  // Number() - привожу к числу
  firtstDelayValue = Number(refs.delayEl.value);
  stepDelayValue = Number(refs.stepEl.value);
  amountValue = Number(refs.amountE.value);
  //
  // или
  // const {delay, step, amount} = e.target.elements
  // console.log(delay, step, amount)
  // delayValue = Number(e.target.delay.value);
  // stepValue = Number(e.target.step.value);
  // amountValue = Number(e.target.amount.value);
  //
  // или
  // delayValue = Number(refs.form.elements.delay.value);
  // stepValue = Number(refs.form.elements.step.value);
  // amountValue = Number(refs.form.elements.amount.value);
  //
  // Применяю цикл для работы с каждым вызовом ф-ии
  for (let i = 1; i <= amountValue; i += 1) {
    // Вызываю ф-ю createPromise() => в параметрах ф-ии передаю номер п/п каждоого промиса + задержку
    createPromise(i, firtstDelayValue)
      // метод then()
      // внутри метода - в параметры стрелочной ф-ии будут принимать аргументы из ф-ии createPromise(i, firtstDelayValue)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      })
      // Метод finally() - будет выполнен в конце, после всех вызовов ф-й
      .finally(() => {
        setTimeout(() => {
          // После окончания вызовов - возвращаю кликабельность кнопки
          if (i === amountValue) {
            // 1 - возвращаю кликабельность кнопки
            refs.submitBtn.disabled = false;
            // 2
            // refs.form.lastElementChild.removeAttribute('disabled');
          }
          // firtstDelayValue - указываю интервал(задержку) - чтобы сработали все вызова ф-й
        }, 4000);
      });
      // при каждом вызове ф-й - суммирую общее время
    firtstDelayValue += stepDelayValue;
  }
}
// Обьявляю ф-ю с параметрами
// position- номер промиса,
// delay - время, после которого сработала ф-я
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  // В ф-ии createPromise(position, delay) => создаю ПРОМИС
  //   new Promise((resolve, reject) => {})
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //   - в случае выполнения условия if() - промис будет выполняться успешно (fulfilled)
      //   - в случае если условие не будет выполняться if() - промис будет отклонен (rejected)
      //   - аргументом при вызове ф-й вызова resolve() и reject() => для того, чтобы предать несколько переменных в параетре ф-ии -
      ////// передаю обьект данных -  { position, delay }
      //   - устанавливаю задержку выполнения промиса - delay(т.е. через переменную, а именно значение, которое будет вводить пользователь)
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
