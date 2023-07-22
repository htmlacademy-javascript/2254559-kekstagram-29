import { resetScale, buttonScaleBigger, buttonScaleLittle, onButtonScaleBiggerClick, onButtonScaleLittleClick } from './scale.js';
import { createSlider, destroySlider } from './photo-effect.js';
import { showSuccessMessage, showErrorMessage} from './message.js';

const MAX_COUNT_HASHTAGS = 5;
const VALID_HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const VALID_HASHTAG_ERROR_MESSAGE = 'Использованы недопустимые символы';
const UNIQ_HASHTAG_ERROR_MESSAGE = 'Хештеги не должны повторяться';
const COUNT_HASHTAG_ERROR_MESSAGE = 'Максимальное количество хештегов - 5';

const formElement = document.querySelector('.img-upload__form');
const imgInputFieldForm = formElement.querySelector('.img-upload__input');
const modalFormElement = formElement.querySelector('.img-upload__overlay');
const closeButtonElement = modalFormElement.querySelector('.img-upload__cancel');
const hashtagsFieldElement = modalFormElement.querySelector('.text__hashtags');
const descriptionFieldElement = modalFormElement.querySelector('.text__description');
const submitButtonFormElement = modalFormElement.querySelector('.img-upload__submit');

//валидация формы
const pristine = new Pristine
(formElement,
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
  hashtagsFieldElement,
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
  hashtagsFieldElement,
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
  hashtagsFieldElement,
  hasUniqHashtag,
  UNIQ_HASHTAG_ERROR_MESSAGE,
  1,
  false
);

//Кнопка отправки формы
const blockSubmitButton = () => {
  submitButtonFormElement.disabled = true;
  submitButtonFormElement.textContent = 'Отправка данных';
};

const unblockSubmitButton = () => {
  submitButtonFormElement.disabled = false;
  submitButtonFormElement.textContent = 'Опубликовать';
};

const loadUserFormSubmit = async (data) => {
  console.log(data);
  try {
    await sendData(data);
    closeForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
};

// функция проверки при нажатии кнопки для отправки формы

const onFormElementSubmit = async (evt) => {
  evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      await loadUserFormSubmit(new FormData(formElement))
      unblockSubmitButton();
    }
};

const setUserFormSubmit = () => {
  formElement.addEventListener('submit', onFormElementSubmit);
};

const unsetUserFormSubmit = () => {
  formElement.removeEventListener('submit', onFormElementSubmit);
};

//функция открытия окна формы загрузки фотографии
const openForm = () => {
  modalFormElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButtonElement.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  hashtagsFieldElement.addEventListener('keydown', onTextFieldKeydown);
  descriptionFieldElement.addEventListener('keydown', onTextFieldKeydown);
  buttonScaleLittle.addEventListener('click', onButtonScaleLittleClick);
  buttonScaleBigger.addEventListener('click', onButtonScaleBiggerClick);
  createSlider();
  setUserFormSubmit();
};

//функция закрытия окна формы
const closeForm = () => {
  modalFormElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButtonElement.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  hashtagsFieldElement.removeEventListener('keydown', onTextFieldKeydown);
  descriptionFieldElement.removeEventListener('keydown', onTextFieldKeydown);
  imgInputFieldForm.value = '';
  formElement.reset();
  pristine.reset();
  resetScale();
  destroySlider();
  unsetUserFormSubmit();
};

//обработчик открытия формы
const onInputFieldChange = () => openForm();
imgInputFieldForm.addEventListener('change', onInputFieldChange);

//функция закрытия окна формы
const onCloseButtonClick = () => closeForm();


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

export { setUserFormSubmit, closeForm };
