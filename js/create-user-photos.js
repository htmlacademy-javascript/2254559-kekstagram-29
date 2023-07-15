import {DESCRIPTION, MESSAGE_TEXT, NAMES, NUMBER_PHOTOS_ON_PAGE, MAX_NUMBER_COMMENTS, MAX_NUMBER_LIKES, MAX_NUMBER_MESSAGES, MIN_NUMBER_LIKES, MIN_NUMBER_MESSAGES} from './data.js';
import {arrayRandomIdPhoto, arrayRandomIdAddress, getrandomArrayElement, getRandomInteger} from './util.js';

//Функция создания сообщений в комментарии
const createMessage = () => {
  if (getRandomInteger(MIN_NUMBER_MESSAGES, MAX_NUMBER_MESSAGES) === 1) {
    return getrandomArrayElement(MESSAGE_TEXT);
  }
  return getrandomArrayElement(MESSAGE_TEXT) + ' ' + getrandomArrayElement(MESSAGE_TEXT);
};

//функция создания комментариев
const createComments = (id) => {
  const comments = {
    id: ++id,
    avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
    message: createMessage(),
    name: getrandomArrayElement(NAMES)
  };

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

//создание массива рандомных фотографий
const arrayPhotos = Array.from({length: NUMBER_PHOTOS_ON_PAGE}, (_, index) => createUserPhoto(index));

export {arrayPhotos};

