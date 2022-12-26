import { createAsyncThunk } from '@reduxjs/toolkit';
import { profileService } from 'services';

export const follow = createAsyncThunk('profiles/follow', async (username: string, thunkAPI) => {
  try {
    return await profileService.follow(username);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error. Something went wrong';
    return thunkAPI.rejectWithValue(message);
  }
});

export const unfollow = createAsyncThunk(
  'profiles/unfollow',
  async (username: string, thunkAPI) => {
    try {
      return await profileService.unfollow(username);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error. Something went wrong';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProfile = createAsyncThunk(
  'profiles/getProfile',
  async (username: string, thunkAPI) => {
    try {
      return await profileService.getProfile(username);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error. Something went wrong';
      return thunkAPI.rejectWithValue(message);
    }
  }
);
