const bigPhotoModal = document.querySelector('.big-picture');
const closeButton = bigPhotoModal.querySelector('.big-picture__cancel');

//функция создания окна большой фотографии
const createBigPhotoModal = (item) => {
  bigPhotoModal.querySelector('.big-picture__img').src = item.url;
  bigPhotoModal.querySelector('.likes-count').textContent = item.description;
  bigPhotoModal.querySelector('.coments-count').textContent = item.comments;
  bigPhotoModal.querySelector('.social__caption').textContent = item.description;

};

//закрытие модального окна просмотра фотографии
closeButton.addEventListener('click', () => {
  bigPhotoModal.classList.add('hidden');
});

//закрытие модального окна по ESC
document.addEventListener('keydown', (evt) => {
  if (evt.key !== 'esc') {
    evt.preventDefault();
    bigPhotoModal.classList.add('hidden');
  }
});
