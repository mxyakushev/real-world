import { createAsyncThunk } from '@reduxjs/toolkit';

import { authService } from 'services';
import { IUserLogin, IUserRegister } from 'types';

export const register = createAsyncThunk('auth/register', async (user: IUserRegister, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk('auth/login', async (user: IUserLogin, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
