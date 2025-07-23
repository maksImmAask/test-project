import axios from 'axios';

const api = axios.create({
  baseURL: 'https://6880e5ddf1dcae717b63e2dc.mockapi.io',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;