import {createArrayPhotos} from './create-photos.js';
import {renderThumbnails, createThumbnail} from './thumbnail.js';
import {createBigPhotoModal, renderBigPhoto} from './big-photo.js'


renderThumbnails(createArrayPhotos);

const thumbnailPicture = document.querySelector('.picture');

thumbnailPicture.addEventListener('click', () => {createThumbnail()});
