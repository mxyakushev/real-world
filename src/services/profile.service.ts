import { instance } from 'http';
import Cookies from 'js-cookie';
import { IUserChange } from 'types';

const follow = async (username: string) => {
  const response = await instance
    .post(`/profiles/${username}/follow`)
    .catch((err) => console.log(err));
  return response?.data;
};

const unfollow = async (username: string) => {
  const response = await instance
    .delete(`/profiles/${username}/follow`)
    .catch((err) => console.log(err));
  return response?.data;
};

const getProfile = async (username: string) => {
  const response = await instance.get(`/profiles/${username}`).catch((err) => console.log(err));
  return response?.data;
};

const changeProfileSettings = async (body: IUserChange) => {
  const response = await instance.put(`/user`, body).catch((err) => console.log(err));
  if (response) {
    Cookies.set('token', response.data.user.token);
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response?.data;
};

export const profileService = {
  follow,
  unfollow,
  getProfile,
  changeProfileSettings,
};
