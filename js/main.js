// Объект - фотография с описанием. Состоит из 5 ключей:
const userPhoto = {
  // id (число)- идентификатор опубликованной фотографии (рандом от 1 до 25, не повторяется)
  id: 0,
  // url(строка) - адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25.
  // Адреса картинок не должны повторяться.)
  url: '',

  // description (строка) — описание фотографии. Описание придумайте самостоятельно.
  description: 'Описание фотографии',
  // likes (число) — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
  likes: 0,

  /* comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии.
  Количество комментариев к каждой фотографии — случайное число от 0 до 30.
  Все комментарии генерируются случайным образом.
  Объекты массива комментария:
  - id — любое число. Идентификаторы не должны повторяться.
  - avatar — это строка, значение которой формируется по
  правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.
  - Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:
  */
 comments: [{
  id: 0,
  avatar: '',
  message: '',
  name: ''
 }]
}
// Массив с описаниями
const DESCRIPTION =[
  'Как-то так!',
  'Какая прелесть!',
  'Захотелось запечатлить эту картину',
  'Я думаю этот кадр прекрасен!',
  'Как вам такое?',
]

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

//Задаем количество фотографий на страниц и максимальное кол-во комментариев под фотографиями
const NUMBER_PHOTOS_ON_PAGE = 25;
const MAX_NUMBER_COMMENTS = 30;
const MIN_NUMBER_LIKES = 15;
const MAX_NUMBER_LIKES = 200;

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

// функция для генерации фотографии 1 пользователя на странице
const createUserPhoto = () => {
  const randomIdUser = getRandomIdFromRange(1, NUMBER_PHOTOS_ON_PAGE);
  const randomAddress = getRandomIdFromRange(1, NUMBER_PHOTOS_ON_PAGE);
  const randomNumberLikes = getRandomInteger(MIN_NUMBER_LIKES, MAX_NUMBER_LIKES);
  const randomDescription = getRandomInteger(0, DESCRIPTION.length - 1);
  const randomAvatar = 'img/avatar-' + getRandomInteger(1, 6) + '.svg';
  const randomIdComment = getRandomIdFromRange(0, MAX_NUMBER_COMMENTS);
  const randomCommentMessage = getRandomInteger(0, MESSAGE_TEXT.length - 1);
  const randomNameCommentator = getRandomInteger(0, NAMES.length - 1);
  //const randomNumberComments = getRandomInteger(0, MAX_NUMBER_COMMENTS);
  return {
    id: randomIdUser(),
    url: 'photos/' + randomAddress() + '.jpg',
    description: DESCRIPTION[randomDescription],
    likes: randomNumberLikes,
    comments: [{
      id: randomIdComment(),
      avatar : randomAvatar,
      message: MESSAGE_TEXT[randomCommentMessage],
      name: NAMES[randomNameCommentator]
    }]
  };
}

const page = Array.from({length: NUMBER_PHOTOS_ON_PAGE}, createUserPhoto);
console.log(page);
