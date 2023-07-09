import { Notify } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const selectors = {
  buttonSubmit: document.querySelector('button'),
  form: document.querySelector('.form'),
};

selectors.buttonSubmit.addEventListener('click', handlerUpdateUserInput);
selectors.form.addEventListener('submit', handlerUpdateUserInput);

function handlerUpdateUserInput(evt) {
  evt.preventDefault();

  const { delay, step, amount } = evt.target.form; //*  колекція усіх елементів форми;

  const firstInputDelay = parseInt(delay.value);
  const inputStep = parseInt(step.value);
  const inputAmount = parseInt(amount.value);

  for (let i = 0; i < inputAmount; i += 1) {
    const position = i + 1;
    const delay = firstInputDelay + i * inputStep;

    createPromise(position, delay)
      .then(({ position, delay }) =>
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );

    selectors.form.reset();
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
