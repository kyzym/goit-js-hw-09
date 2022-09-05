import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
require('flatpickr/dist/themes/light.css');

let timerValue = 0;
const btn = document.querySelector('button');
btn.disabled = true;
timerStyle();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timerValue = selectedDates[0] - options['defaultDate'];
    checkAndCall(timerValue);
  },
};

function timerStyle() {
  const timerContainerStyle = document.querySelector('.timer').style;
  timerContainerStyle.display = 'flex';
  timerContainerStyle.gap = '1%';

  document.querySelectorAll('.field').forEach(item => {
    const { style } = item;
    style.display = 'flex';
    style.flexDirection = 'column';
    style.alignItems = 'center';
    style.gap = '10%';
  });
}

function checkAndCall(timerValue) {
  if (timerValue < 0) {
    Notify.failure('Please chose a date in the future ');
    return;
  }
  btn.disabled = false;

  let timeData = convertMs(timerValue);

  btn.addEventListener('click', () => {
    btn.disabled = true;
    const interval = setInterval(() => countDown(timeData, interval), 1000);
  });
}

function countDown(timeData, int) {
  timeData = convertMs((timerValue -= 1000));
  writeData(timeData);
  console.log(timerValue);
  if (timerValue <= 1000) {
    clearInterval(int);
  }
}

function writeData(timeData) {
  for (let key in timeData) {
    let timeValue = timeData[key];

    timeValue = String(timeValue).padStart(2, 0);
    addLeadingZero(timeValue);

    document.querySelector(`[data-${key}]`).textContent = timeValue;
  }
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
  const timeData = { days, hours, minutes, seconds };

  return timeData;
}

function addLeadingZero(timeDataKey) {
  return timeDataKey;
}

flatpickr('#datetime-picker', options);
