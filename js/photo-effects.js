const EFFECTS = [
  {
    name: 'original',
    filter: 'none',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
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
    name: 'phobos',
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

const modalFormElement = document.querySelector('.img-upload__overlay');
const sliderContainerElement = modalFormElement.querySelector('.img-upload__effect-level');
const sliderElementInput = modalFormElement.querySelector('.effect-level__value');
const sliderElement = modalFormElement.querySelector('.effect-level__slider');
const previewPhotoElement = modalFormElement.querySelector('.img-upload__preview img');
const effectsListElement = modalFormElement.querySelector('.img-upload__effects');

//создание слайдера
const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: EFFECTS[0].min,
      max: EFFECTS[0].max,
    },
    start: EFFECTS[0].max,
    step: EFFECTS[0].step,
    connect: 'lower',
  });

  previewPhotoElement.style.filter = 'none';
  sliderContainerElement.classList.add('hidden');
};

//обновление данных слайдера
const updateSlider = (item) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: item.min,
      max: item.max,
    },
    start: item.max,
    step: item.step,
    connect: 'lower',
  });

  const onUpdateSliderValue = () => {
    const sliderValue = sliderElement.noUiSlider.get();
    sliderElementInput.setAttribute('value', sliderValue);
    previewPhotoElement.style.filter = `${item.filter}(${sliderValue}${item.unit})`;
  };

  sliderElement.noUiSlider.on('update', onUpdateSliderValue);
};


//функция применения эффекта на фотографии
const getPhotoEfffect = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    const currentEffectValue = evt.target.value;

    if (currentEffectValue === 'none') {
    sliderContainerElement.classList.add('hidden');
    previewPhotoElement.style.filter = 'none';
    sliderElementInput.value = '';
    } else {
      sliderContainerElement.classList.remove('hidden');
      const effect = EFFECTS.find((item) => item.name === currentEffectValue);
      previewPhotoElement.style.filter = `${effect.filter}(${effect.max}${effect.unit})`;
      updateSlider(effect);
    }
  }
};

//функция обновления значений слайдера


effectsListElement.addEventListener('change', getPhotoEfffect);

//удаление слайдера
const destroySlider = () => {
  sliderElement.noUiSlider.destroy();
};


export{createSlider, destroySlider};
