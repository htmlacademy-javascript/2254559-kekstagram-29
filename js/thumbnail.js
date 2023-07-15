import {openBigPhotoModal} from './render-big-photo.js';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const containerElement = document.querySelector('.pictures');

const createThumbnail = ({ url, description, likes, comments }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__info').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length ;
  thumbnail.querySelector('.picture__likes').textContent = likes;

  return thumbnail;
};

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    thumbnail.addEventListener('click', () => openBigPhotoModal(picture));
    fragment.append(thumbnail);
  });
  containerElement.append(fragment);
};

export {renderThumbnails, createThumbnail};
