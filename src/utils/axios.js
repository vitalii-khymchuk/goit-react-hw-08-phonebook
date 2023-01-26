import axios from 'axios';

const authAxios = axios.create({
  baseURL: 'https://connections-api.herokuapp.com/',
});

const contactsInfoAxios = axios.create({
  baseURL: 'https://63b68b3358084a7af3b54012.mockapi.io',
});

export { authAxios, contactsInfoAxios };
