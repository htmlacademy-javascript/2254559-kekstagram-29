import { renderThumbnails } from './thumbnail.js';
import { showSuccessMessage, showErrorMessage, ErrorGetDataMessage } from './message.js';
import { closeForm, setUserFormSubmit } from './form.js';
import { getData, sendData } from './api.js';
import { showAlert } from './util.js';

//алгоритм получения данных с сервера

try {
  const data =await getData();
  renderThumbnails(data);
} catch(err) {
  showAlert(err.message);
}

//алгоритм отправки данных на сервер

setUserFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

