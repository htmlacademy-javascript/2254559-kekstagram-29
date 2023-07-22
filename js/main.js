import { renderThumbnails } from './thumbnail.js';
import './form.js';
import './scale.js';
import './photo-effect.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { closeForm, setUserFormSubmit } from './form.js';
import { getData } from './api.js';

//получение данных с сервера
getData()
  .then((usersPhoto) => renderThumbnails(usersPhoto));

setUserFormSubmit(closeForm);

