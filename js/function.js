/* Функция для проверки длины принимает строку, которую нужно проверить, и максимальную длину
и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее. */

const stringValidation = (string, maxLength) => string.length <= maxLength;

stringValidation('проверяемая строка', 20);

/*Функция для проверки, является ли строка палиндромом. Палиндром — это слово или фраза,
которые одинаково читаются и слева направо и справа налево.*/

function polyndromCheck(string) {

  let normalizeString = string.replaceAll(' ', '');
  normalizeString = normalizeString.toLowerCase();
  let newString = '';

  for (let i = normalizeString.length - 1; i >= 0; i--) {
    newString += normalizeString[i];
  }

  return (newString === normalizeString);
}

polyndromCheck('Лёша на полке клопа нашёл ');

/* Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде
целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN */

function extractionNumber(string) {
  let newString = '';
  let symbol;
  let number;
  string = string.toString();

  for (let i = 0; i <= string.length - 1; i++) {
    symbol = parseInt(string[i], 10);
    if (!Number.isNaN(symbol)) {
      newString += string[i];
    }
  }
  number = parseInt(newString, 10);
  return (!Number.isNaN(number)) ? number : NaN;
}

extractionNumber('2023 год');