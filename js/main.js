// import {arrayPhotos} from './render-user-photos.js';
import {renderThumbnails} from './thumbnail.js';
import './form.js';
import './scale.js';
import './photo-effect.js';
import {showSuccessMessage, showErrorMessage} from './message.js';
import { closeForm, setUserFormSubmit } from './form.js';

//получение данных с сервера
fetch('https://29.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((usersPhoto) => renderThumbnails(usersPhoto));

setUserFormSubmit(closeForm);

