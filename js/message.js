const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const bodyElement = document.querySelector('body');


const onDocumentKeydown = (evt, callback) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    callback();
  }
};

//============сообщение о загрузке фотографиии

const onSuccessButtonClick = () => closeSuccessMessage();
const onCloseSuccessMessage = (evt) => onDocumentKeydown(evt, closeSuccessMessage);
const onCloseSuccessClickDocument = (evt) => {
  if (!evt.target.closest('.success__inner')) {
    closeSuccessMessage();
  }
};

const showSuccessMessage = () => {
  const sucessMessage = successMessageTemplate.cloneNode(true);
  bodyElement.append(sucessMessage);
  bodyElement.classList.add('modal-open');
  sucessMessage.querySelector('.success__button').addEventListener('click', onSuccessButtonClick);
  bodyElement.addEventListener('click', onCloseSuccessClickDocument);
  bodyElement.addEventListener('keydown', onCloseSuccessMessage);
};

const closeSuccessMessage = () => {
  bodyElement.querySelector('.success').remove();
};


//=============сообщение об ошибке загрузки фотографии

const onErrorButtonClick = () => closeErrorMessage();
const onCloseErrorMessage = (evt) => onDocumentKeydown(evt, closeErrorMessage);
const onCloseErrorClickDocument = (evt) => {
  if (!evt.target.closest('.error__inner')) {
    closeErrorMessage();
  }
};

const showErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  bodyElement.append(errorMessage);
  bodyElement.classList.add('modal-open');
  errorMessage.querySelector('.error__button').addEventListener('click', onErrorButtonClick);
  bodyElement.addEventListener('click', onCloseErrorClickDocument);
  bodyElement.addEventListener('keydown', onCloseErrorMessage);
};



const closeErrorMessage = () => {
  bodyElement.querySelector('.error').remove();
};

export{showSuccessMessage, showErrorMessage};