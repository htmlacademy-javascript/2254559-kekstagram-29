import {NUMBER_PHOTOS_ON_PAGE} from './data.js';

const ALERT_SHOW_TIME = 5000;

// Функция для генерации случайного числа в заданном диапазоне значений.
const getRandomInteger = (min, max) => {
  const result = Math.random() * (max - min + 1) + min;
  return Math.floor(result);
}

//Функция для генерации случайного числа без повторений из диапазона
const getRandomIdFromRange = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

// создание массивов случайных чисел в заданном диапазоне
const arrayRandomIdPhoto = Array.from({length: 25}, getRandomIdFromRange(1,NUMBER_PHOTOS_ON_PAGE));
const arrayRandomIdAddress = Array.from({length: 25}, getRandomIdFromRange(1,NUMBER_PHOTOS_ON_PAGE));

// функция для выбора случайного элемента массива
const getrandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];


//функция показа сообщения с ошибкой
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}


export {arrayRandomIdPhoto, arrayRandomIdAddress, getrandomArrayElement, getRandomInteger};
