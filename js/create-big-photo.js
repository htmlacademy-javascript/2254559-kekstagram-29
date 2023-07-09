
const bigPhotoModal = document.querySelector('.big-picture');
const closeButtonModalElement = bigPhotoModal.querySelector('.big-picture__cancel');
const commentsCountElement = bigPhotoModal.querySelector('.social__comment-count');
const commentsLoaderElement = bigPhotoModal.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsContainerElement = document.querySelector('.social__comments');

//открытие модального окна
const openBigPhotoModal = () => {
  bigPhotoModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

//закрытие модального окна
const closeBigPhotoModal = () => {
  bigPhotoModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

};

//обработчик события закрытия модального окна по клику на кнопку
closeButtonModalElement.addEventListener('click', () => {
  closeBigPhotoModal();
});

//функция закрытия модального окна по ESC
const onDocumentKeydown = (evt) => {
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

  return commentElement
};

//функция создания комментариев
const renderComments = (comments) => {
  commentsContainerElement.innerHTML = '';
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = createComment(comment);
    fragment.append(commentElement);
  });

  commentsContainerElement.append(fragment);
};

//функция создания большой фотографии с данными для модального окна
const createBigPhoto = (data) => {
  bigPhotoModal.querySelector('.big-picture__img img').src = data.url;
  bigPhotoModal.querySelector('.likes-count').textContent = data.likes;
  bigPhotoModal.querySelector('.comments-count').textContent = data.comments.length;
  bigPhotoModal.querySelector('.social__caption').textContent = data.description;
  renderComments(data.comments);
};

export {createBigPhoto, openBigPhotoModal};



