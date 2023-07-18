const MAX_COUNT_HASHTAGS = 5;
const VALID_HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const VALID_HASHTAG_ERROR_MESSAGE = 'Использованы недопустимые символы';
const UNIQ_HASHTAG_ERROR_MESSAGE = 'Хештеги не должны повторяться';
const COUNT_HASHTAG_ERROR_MESSAGE = 'Максимальное количество хештегов - 5';

const form = document.querySelector('.img-upload__form');
const imgInputFieldForm = form.querySelector('.img-upload__input');
const modalForm = form.querySelector('.img-upload__overlay');
const closeButton = modalForm.querySelector('.img-upload__cancel');
const hashtagsField = modalForm.querySelector('.text__hashtags');
const descriptionField = modalForm.querySelector('.text__description');

//валидация формы
const pristine = new Pristine
(form,
{
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
},
false);

//подготовка текстовой строки хештега к проверке
const normalizeHashtag = (text) => {
  return text.trim().split(' ').filter((item) => Boolean(item.length));
};

//проверка хештега на допустимость символов
const hasValidHashtag = (value) => {
   return normalizeHashtag(value).every(
    (item) => VALID_HASHTAG_SYMBOLS.test(item)
  );
}

//валидатор по валидности символов
pristine.addValidator(
  hashtagsField,
  hasValidHashtag,
  VALID_HASHTAG_ERROR_MESSAGE,
  2,
  false
);

//проверка по количеству хештегов
const hasValidCount = (value) => {
  return normalizeHashtag(value).length <= MAX_COUNT_HASHTAGS;
};

// валидатор по кол-ву хештегов
pristine.addValidator(
  hashtagsField,
  hasValidCount,
  COUNT_HASHTAG_ERROR_MESSAGE,
  3,
  false
);

//проверка на уникальность хештегов
const hasUniqHashtag = (value) => {
  const lowerCaseHashtags = normalizeHashtag(value).map(
    (item) => item.toLowerCase()
  );
  return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};

//валидатор уникальности хештегов
pristine.addValidator(
  hashtagsField,
  hasUniqHashtag,
  UNIQ_HASHTAG_ERROR_MESSAGE,
  1,
  false
);

// функция проверки при отправке
const onSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    form.submit();
  }
};

//функция открытия окна формы загрузки фотографии
const openForm = () => {
  modalForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  hashtagsField.addEventListener('keydown', onTextFieldKeydown);
  descriptionField.addEventListener('keydown', onTextFieldKeydown);
  form.addEventListener('submit', onSubmit);
};

//функция закрытия окна формы
const closeForm = () => {
  modalForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  hashtagsField.removeEventListener('keydown', onTextFieldKeydown);
  descriptionField.removeEventListener('keydown', onTextFieldKeydown);
  form.removeEventListener('submit', onSubmit);
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
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeForm();
  }
}

//функция отмены закрытия модального окна, при фокусе полей хештег, комментарий
const onTextFieldKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}


