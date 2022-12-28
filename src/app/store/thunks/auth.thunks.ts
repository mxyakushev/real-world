import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService, profileService } from 'services';
import { IUserChange, IUserLogin, IUserRegister } from 'types';
import { AxiosError } from 'axios';

export const register = createAsyncThunk('auth/register', async (user: IUserRegister, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {
    const errors = error instanceof AxiosError ? error?.response?.data?.errors : {};
    return thunkAPI.rejectWithValue(errors);
  }
});

export const login = createAsyncThunk(
  'auth/login',
  async (user: IUserLogin, { rejectWithValue }) => {
    try {
      return await authService.login(user);
    } catch (error) {
      const errors = error instanceof AxiosError ? error?.response?.data?.errors : {};
      return rejectWithValue(errors);
    }
  }
);

export const changeProfileSettings = createAsyncThunk(
  'auth/changeProfileSettings',
  async (body: IUserChange, thunkAPI) => {
    try {
      return await profileService.changeProfileSettings(body);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error. Something went wrong';
      return thunkAPI.rejectWithValue(message);
    }
  }
);
