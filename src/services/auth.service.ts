import { instance } from 'http';
import { IUserLogin, IUserRegister } from 'types';
import Cookies from 'js-cookie';

const register = async (userData: IUserRegister) => {
  const response = await instance.post('/users', userData);

  if (response) {
    Cookies.set('token', response.data.user.token);
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData: IUserLogin) => {
  const response = await instance.post('/users/login', userData);

  if (response) {
    Cookies.set('token', response.data.user.token);
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const checkToken = () => {
  return JSON.parse(localStorage.getItem('user') || JSON.stringify('')) !== ''
    ? `Bearer ${JSON.parse(localStorage.getItem('user') || JSON.stringify(''))?.user?.token}`
    : '';
};

const logout = () => {
  Cookies.remove('token');
  localStorage.removeItem('user');
};

export const authService = {
  register,
  logout,
  login,
  checkToken,
};
