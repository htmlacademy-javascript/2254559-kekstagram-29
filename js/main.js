import { renderThumbnails } from './thumbnail.js';
import './form.js';
import './scale.js';
import './photo-effect.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { closeForm, setUserFormSubmit } from './form.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

//алгоритм получения данных с сервера
getData()
  .then((usersPhoto) => renderThumbnails(usersPhoto))
  .catch((err) => showAlert(err.message));

//алгоритм отправки данных на сервер
setUserFormSubmit(closeForm);

