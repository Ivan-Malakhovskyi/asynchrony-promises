import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const flatpickr = require('flatpickr');
let flatpickrInstance;
let intervalId;

const refs = {
  btnStart: document.querySelector('[data-start]'),
  day: document.querySelector('[data-days]'),
  hour: document.querySelector('[data-hours]'),
  minute: document.querySelector('[data-minutes'),
  second: document.querySelector('[data-seconds]'),
  input: document.querySelector('#datetime-picker'),
};

refs.btnStart.addEventListener('click', onCheckUserDate);
refs.btnStart.disabled = true;

function updateClockValue(formattedTime) {
  const { days, hours, minutes, seconds } = formattedTime;
  refs.day.textContent = days;
  refs.hour.textContent = hours;
  refs.minute.textContent = minutes;
  refs.second.textContent = seconds;
}

function onCheckUserDate(evt) {
  const selectedDate = flatpickrInstance.selectedDates[0];

  if (selectedDate >= Date.now()) {
    evt.target.disabled = false;

    Notify.success('The timer has started');

    clearInterval(intervalId);

    intervalId = setInterval(() => {
      const currentTime = Date.now();
      const calculatedTime = selectedDate - currentTime;

      if (calculatedTime <= 0) {
        Notify.info('Time is up');
        clearInterval(intervalId);
      } else {
        const formattedTime = convertMs(calculatedTime);

        updateClockValue(formattedTime);
      }
    }, 1000);
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
  //- 1 => 01
}
console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (!selectedDate || selectedDate < Date.now()) {
      Notify.failure('Please choose a date in the future');
      refs.btnStart.disabled = true;
    } else {
      refs.btnStart.disabled = false;
    }
  },
};

flatpickrInstance = flatpickr('#datetime-picker', options);
