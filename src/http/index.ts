import axios from 'axios';
import { authService } from 'services';

export const API_URL = 'https://api.realworld.io/api';

export const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use((config) => {
  const auth = authService.checkToken();
  if (config.headers && auth) {
    config.headers.Authorization = auth;
  }
  return config;
});
