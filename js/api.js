import { ErrorMessage } from './data.js';

const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const request = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => request(Route.GET_DATA, ErrorMessage.GET);

const sendData = (body) => request(Route.SEND_DATA, ErrorMessage.POST, Method.POST, body);

export{ getData, sendData };
