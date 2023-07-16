const MAX_COUNT_HASHTAGS = 5;

const VALID_HASHTAG_ERROR_MESSAGE = 'Введен невалидный хештег';
const UNIQ_HASHTAG_ERROR_MESSAGE = 'Хештеги не должны повторяться';
const COUNT_HASHTAG_ERROR_MESSAGE = 'Максимальное количество хештегов - 5';

const form = document.querySelector('.img-upload__form');
const imgInputFieldForm = form.querySelector('.img-upload__input');
const modalForm = form.querySelector('.img-upload__overlay');
const closeButton = modalForm.querySelector('.img-upload__cancel');
const hashtagsField = modalForm.querySelector('.text__hashtags');
const descriptionField = modalForm.querySelector('.text__description');


//функция открытия окна формы загрузки фотографии
const openForm = () => {
  modalForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  hashtagsField.addEventListener('keydown', onTextFieldKeydown);
  descriptionField.addEventListener('keydown', onTextFieldKeydown);
};

//функция закрытия окна формы
const closeForm = () => {
  modalForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  hashtagsField.removeEventListener('keydown', onTextFieldKeydown);
  descriptionField.removeEventListener('keydown', onTextFieldKeydown);
  imgInputFieldForm.value = '';
  form.reset();
  pristine.reset();
};

//обработчик открытия формы
const onInputFieldChange = () => openForm();
imgInputFieldForm.addEventListener('change', onInputFieldChange);

//обработчик закрытия окна формы
const onCloseButtonClick = () => closeForm();
closeButton.addEventListener('click', onCloseButtonClick);

//функция закрятия по нажатию ESC
function onDocumentKeydown (evt) {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    closeForm();
  }
}

//функция отмены закрытия модального окна, при фокусе полей хештег, комментарий
function onTextFieldKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}

//валидация формы
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextOarent: 'img-upload__field-wrapper',
});

//подготовка текстовой строки хештега к проверке
const normalizeHashtag = (textHashtag) => {
  textHashtag.trim().split(' ').filter((tag) => Boolean(tag.length));
};

//проверка валидности хештега
// const hasValidHashtag = () => {

// }

//проверка по количеству хештегов
const hasValidCount = (value) => {
  normalizeHashtag(value).length <= MAX_COUNT_HASHTAGS;
};

//проверка на уникальность хештегов


//добавление валидатора полю хештег
pristine.addValidator(
  hashtagsField,
  hasValidCount,
  COUNT_HASHTAG_ERROR_MESSAGE,
  3,
  false
);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
