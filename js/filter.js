const RANDOM_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};
const filterElement = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let pictures = [];

const sortByRandom = () => Math.random() - 0.5;

const sortByComments = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

const getFilteredThumbnails = () => {
  switch(currentFilter) {
    case Filter.DEFAULT:
      return [...pictures];
    case Filter.RANDOM:
      return [...pictures].sort(sortByRandom).slice(0, RANDOM_COUNT);
    case Filter.DISCUSSED:
      return [...pictures].sort(sortByComments);
  }
};

const setOnFilterClick = (callback) => {
  filterElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if (clickedButton === currentFilter) {
      return;
    }

    filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    callback(getFilteredThumbnails());
  });
};

const init = (loadThumbnails, callback) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = [...loadThumbnails];
  setOnFilterClick(callback);
};

export { init, getFilteredThumbnails };
