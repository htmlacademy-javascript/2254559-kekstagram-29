const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const bodyElement = document.querySelector('body');

const onDocumentKeydown = (evt, callback) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    evt.stopPropagation();
    callback();
  }
};

const closeSuccessMessage = () => {
  bodyElement.querySelector('.success').remove();
  bodyElement.removeEventListener('click', onCloseSuccessClickDocument);
  bodyElement.removeEventListener('keydown', onCloseSuccessMessage);
};

function onCloseSuccessMessage (evt) {
  onDocumentKeydown(evt, closeSuccessMessage);
}

function onCloseSuccessClickDocument (evt) {
  if (!evt.target.closest('.success__inner')) {
    closeSuccessMessage();
  }
}

const onSuccessButtonClick = () => closeSuccessMessage();

const showSuccessMessage = () => {
  const sucessMessage = successMessageTemplate.cloneNode(true);
  bodyElement.append(sucessMessage);
  sucessMessage.querySelector('.success__button').addEventListener('click', onSuccessButtonClick);
  bodyElement.addEventListener('click', onCloseSuccessClickDocument);
  bodyElement.addEventListener('keydown', onCloseSuccessMessage);
};

const closeErrorMessage = () => {
  bodyElement.querySelector('.error').remove();
  bodyElement.removeEventListener('click', onCloseErrorClickDocument);
  bodyElement.removeEventListener('keydown', onCloseErrorMessage);
};

function onCloseErrorMessage (evt) {
  onDocumentKeydown(evt, closeErrorMessage);
}

function onCloseErrorClickDocument (evt) {
  if (!evt.target.closest('.error__inner')) {
    closeErrorMessage();
  }
}

const onErrorButtonClick = () => closeErrorMessage();

const showErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  bodyElement.append(errorMessage);
  errorMessage.querySelector('.error__button').addEventListener('click', onErrorButtonClick);
  bodyElement.addEventListener('click', onCloseErrorClickDocument);
  bodyElement.addEventListener('keydown', onCloseErrorMessage);
};

export{ showSuccessMessage, showErrorMessage };
