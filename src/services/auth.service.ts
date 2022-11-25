import axios from 'axios';

import { API_URL } from 'http';
import { IUserLogin, IUserRegister } from 'types';

const register = async (userData: IUserRegister) => {
  const response = await axios.post(`${API_URL}/users`, userData);

  if (response) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData: IUserLogin) => {
  const response = await axios.post(`${API_URL}/users/login`, userData);

  if (response) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

export const authService = {
  register,
  logout,
  login,
};
