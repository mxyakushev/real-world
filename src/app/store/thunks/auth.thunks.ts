import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from 'services';
import { IUserLogin, IUserRegister } from 'types';

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
