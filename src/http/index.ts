import axios from 'axios';

export const API_URL = 'https://api.realworld.io/api';

export const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
