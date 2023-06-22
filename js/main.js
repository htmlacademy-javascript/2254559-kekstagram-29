// Массив с описаниями
const DESCRIPTION = [
  'Как-то так!',
  'Какая прелесть!',
  'Захотелось запечатлить эту картину',
  'Я думаю этот кадр прекрасен!',
  'Как вам такое?',
  'Вот это я поймал кадр!!!',
  'Хейтеры - мимо =)'
];

//Массив с комментариями
const MESSAGE_TEXT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Массив имен комментаторов
const NAMES = [
  'Александр',
  'Никита',
  'Андрей',
  'Виктор',
  'Анна',
  'Ольга'
];

//Константы
const NUMBER_PHOTOS_ON_PAGE = 25;
const MAX_NUMBER_COMMENTS = 30;
const MIN_NUMBER_LIKES = 15;
const MAX_NUMBER_LIKES = 200;
const MIN_NUMBER_MESSAGES = 1;
const MAX_NUMBER_MESSAGES = 2;

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

//Функция создания сообщений в комментарии
const createMessage = () => {
  if (getRandomInteger(MIN_NUMBER_MESSAGES, MAX_NUMBER_MESSAGES) === 1) {
    return getrandomArrayElement(MESSAGE_TEXT);
  }
  return getrandomArrayElement(MESSAGE_TEXT) + ' ' + getrandomArrayElement(MESSAGE_TEXT);
};

//функция создания комментариев
const createComments = (id) => {
  const comments = [{
    id: ++id,
    avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
    message: createMessage(),
    name: getrandomArrayElement(NAMES)
  }];

  return comments;
};

// функция для генерации фотографии 1 пользователя на странице
const createUserPhoto = (id) => ({
  id: arrayRandomIdPhoto[id],
  url: 'photos/' + arrayRandomIdAddress[id] + '.jpg',
  description: getrandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(MIN_NUMBER_LIKES, MAX_NUMBER_LIKES),
  comments: Array.from({length: getRandomInteger(0, MAX_NUMBER_COMMENTS)}, (_, index) => createComments(index))
});

const page = Array.from({length: NUMBER_PHOTOS_ON_PAGE}, (_, index) => createUserPhoto(index));

console.log(page);
