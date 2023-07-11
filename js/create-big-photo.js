import { arrayPhotos } from './create-user-photos.js';

const COMMENTS_SHOWN_PER_CLICK = 5;

const bigPhotoModal = document.querySelector('.big-picture');
const closeButtonModalElement = bigPhotoModal.querySelector('.big-picture__cancel');
const commentsShownCountElement = bigPhotoModal.querySelector('.social__comment-count');
const commentsCountElement = bigPhotoModal.querySelector('.comments-count');
const commentsLoaderElement = bigPhotoModal.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsContainerElement = document.querySelector('.social__comments');

let commentsShown = 0;

//открытие модального окна
const openBigPhotoModal = () => {
  bigPhotoModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

//закрытие модального окна
const closeBigPhotoModal = () => {
  bigPhotoModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShown = 0;
};

//обработчик события закрытия модального окна по клику на кнопку
closeButtonModalElement.addEventListener('click', () => {
  closeBigPhotoModal();
});

//функция закрытия модального окна по ESC
function onDocumentKeydown (evt) {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    closeBigPhotoModal();
  }
}

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
  }
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }
  commentsContainerElement.innerHTML = '';
  commentsContainerElement.append(fragment);
  commentsShownCountElement.textContent = commentsShown + ' из ' + comments.length + ' комментариев';
};

//функция создания большой фотографии с данными для модального окна
const createBigPhoto = (data) => {
  bigPhotoModal.querySelector('.big-picture__img img').src = data.url;
  bigPhotoModal.querySelector('.likes-count').textContent = data.likes;
  bigPhotoModal.querySelector('.comments-count').textContent = data.comments.length;
  bigPhotoModal.querySelector('.social__caption').textContent = data.description;
  renderComments(data.comments);
};

const oncommentsLoaderElementClick = () => renderComments(arrayPhotos.comments);
commentsLoaderElement.addEventListener('click', oncommentsLoaderElementClick);

export {createBigPhoto, openBigPhotoModal};
