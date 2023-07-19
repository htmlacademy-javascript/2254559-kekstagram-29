const EFFECTS = [
  {
    name: 'default',
    filter: 'none',
  },
  {
    name: 'chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'fobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

// const sliderElement = document.querySelector('.img-upload__effect-level');
const modalFormElement = document.querySelector('.img-upload__overlay');
const sliderContainerElement = modalFormElement.querySelector('.img-upload__effect-level');
const sliderElementInput = modalFormElement.querySelector('.effect-level__value');
const sliderElement = modalFormElement.querySelector('.effect-level__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
});

// sliderElement.noUiSlider.on('update', () => {
//   sliderElementInput.value = sliderElement.noUiSlider.get();
// });
