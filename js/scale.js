const STEP_SCALE = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const DEFAULT_SCALE = 100;

const modalForm = document.querySelector('.img-upload__overlay');
const buttonScaleLittle = modalForm.querySelector('.scale__control--smaller');
const buttonScaleBigger = modalForm.querySelector('.scale__control--bigger');
const scaleFieldElement = modalForm.querySelector('.scale__control--value');
const photoPreview = modalForm.querySelector('.img-upload__preview img');


const scaleImage = (value) => {
  photoPreview.style.transform = `scale(${value / 100})`;
  scaleFieldElement.value = `${value}%`;
};

const onButtonScaleLittleClick = () => {
  const currentScaleValue = parseInt(scaleFieldElement.value, 10);
  const newScaleValue = currentScaleValue - STEP_SCALE;
  if (newScaleValue < MIN_SCALE) {
    scaleImage(MIN_SCALE);
  } else {
    scaleImage(newScaleValue);
  }
};

const onButtonScaleBiggerClick = () => {
  const currentScaleValue = parseInt(scaleFieldElement.value, 10);
  const newScaleValue = currentScaleValue + STEP_SCALE;
  if (newScaleValue > MAX_SCALE) {
    scaleImage(MAX_SCALE);
  } else {
    scaleImage(newScaleValue);
  }
};

const resetScale = () => {
  scaleImage(DEFAULT_SCALE);
};

export {resetScale, buttonScaleLittle, buttonScaleBigger, onButtonScaleBiggerClick, onButtonScaleLittleClick};
