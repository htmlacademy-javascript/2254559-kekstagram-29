const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadField = imgUploadForm.querySelector('.img-upload__input');
const imgUploadWindow = imgUploadForm.querySelector('.img-upload__overlay');
const closeButtonForm = imgUploadWindow.querySelector('.img-upload__cancel');
const hashtagsField = imgUploadWindow.querySelector('.text__hashtags');
const descriptionField = imgUploadWindow.querySelector('.text__description');


//функция открытия окна формы загрузки фотографии
const openUploadForm = () => {
  imgUploadWindow.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

//функция закрытия окна формы
const closeUploadForm = () => {
  imgUploadWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadField.value = '';
  hashtagsField.value = '';
  descriptionField.value = '';
};

//обработчик открытия формы
imgUploadField.addEventListener('change', openUploadForm);

//обработчик закрытия окна формы
closeButtonForm.addEventListener('click', closeUploadForm);

//функция закрятия по нажатию ESC
function onDocumentKeydown (evt) {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    closeUploadForm();
  }
}

//валидация формы
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextOarent: 'img-upload__field-wrapper',
});

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
