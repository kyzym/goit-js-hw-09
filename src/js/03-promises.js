import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const form = document.querySelector('.form');
const firstDelay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');

form.addEventListener('submit', submitPromises);

function submitPromises(e) {
  e.preventDefault();

  let delayValue = firstDelay.value;

  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`);
      });
    delayValue += step.value;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
