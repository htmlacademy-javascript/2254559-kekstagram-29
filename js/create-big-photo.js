import { arrayPhotos } from './create-user-photos.js';

const COMMENTS_SHOWN_PER_CLICK = 5;

const bigPhotoModalElement = document.querySelector('.big-picture');
const closeButtonModalElement = bigPhotoModalElement.querySelector('.big-picture__cancel');
const commentsShownCountElement = bigPhotoModalElement.querySelector('.comments-shown-count');
const commentsCountElement = bigPhotoModalElement.querySelector('.comments-count');
const commentsLoaderElement = bigPhotoModalElement.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsContainerElement = document.querySelector('.social__comments');

let commentsShown = 0;

//открытие модального окна
const openBigPhotoModal = (data) => {
  bigPhotoModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.addEventListener('click', onCommentsLoaderElementClick);
};

//закрытие модального окна
const closeBigPhotoModal = () => {
  bigPhotoModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderElementClick);
  commentsShown = 0;
};

//обработчик события закрытия модального окна по клику на кнопку
closeButtonModalElement.addEventListener('click', () => {
  closeBigPhotoModal();
});

//функция закрытия модального окна по клику
function onCommentsLoaderElementClick (data) {
  renderComments(data.comments)
};

//функция закрытия модального окна по ESC
function onDocumentKeydown (evt) {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    closeBigPhotoModal();
  }
};

//функция создания комментария
const createComment = ({ avatar, name, message }) => {
  const commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

//функция создания комментариев
const renderComments = (comments) => {
  commentsShown += COMMENTS_SHOWN_PER_CLICK;
  const fragment = document.createDocumentFragment();

  if (commentsShown >= comments.length) {
    commentsShown = comments.length;
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }

  commentsContainerElement.innerHTML = '';
  commentsContainerElement.append(fragment);
  commentsCountElement.textContent = comments.length;
  commentsShownCountElement.textContent = commentsShown;
};

//функция создания большой фотографии с данными для модального окна
const createBigPhoto = (data) => {
  bigPhotoModalElement.querySelector('.big-picture__img img').src = data.url;
  bigPhotoModalElement.querySelector('.likes-count').textContent = data.likes;
  bigPhotoModalElement.querySelector('.comments-count').textContent = data.comments.length;
  bigPhotoModalElement.querySelector('.social__caption').textContent = data.description;
  renderComments(data.comments);
};



export {createBigPhoto, openBigPhotoModal};
