import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService, profileService } from 'services';
import { IUserChange, IUserLogin, IUserRegister } from 'types';

export const register = createAsyncThunk('auth/register', async (user: IUserRegister, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error. Something went wrong';
    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk('auth/login', async (user: IUserLogin, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error. Something went wrong';
    return thunkAPI.rejectWithValue(message);
  }
});

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
