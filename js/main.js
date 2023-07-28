import { renderThumbnails } from './thumbnail.js';
import './form.js';
import { getData } from './api.js';
import { showAlert, debounce } from './util.js';
import { init, getFilteredThumbnails} from './filter.js';


try {
  const data = await getData();
  const debouncedRenderThumbnails = debounce(renderThumbnails);
  init(data, debouncedRenderThumbnails);
  renderThumbnails(getFilteredThumbnails());
} catch(err) {
  showAlert(err.message);
};

//
