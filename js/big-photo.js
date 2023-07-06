const bigPhotoModal = document.querySelector('.big-picture');
const closeButtonModal = bigPhotoModal.querySelector('.big-picture__cancel');

//функция создания окна большой фотографии
const createBigPhotoModal = (item) => {
  bigPhotoModal.querySelector('.big-picture__img img').src = item.url;
  bigPhotoModal.querySelector('.likes-count').textContent = item.description;
  bigPhotoModal.querySelector('.coments-count').textContent = item.comments;
  bigPhotoModal.querySelector('.social__caption').textContent = item.description;

};

//открытие модального окна
const openBigPhotoModal = () => {
  bigPhotoModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

//закрытие модального окна просмотра фотографии
closeButtonModal.addEventListener('click', () => {
  bigPhotoModal.classList.add('hidden');
});

//закрытие модального окна по ESC
document.addEventListener('keydown', (evt) => {
  if (evt.key !== 'esc') {
    evt.preventDefault();
    bigPhotoModal.classList.add('hidden');
  }
});

const renderBigPhoto = (pictures) => {
  pictures.forEach((picture) => {
    const bigPhoto = createBigPhotoModal(picture);
  });
  return bigPhoto;
};

export {createBigPhotoModal, renderBigPhoto};
