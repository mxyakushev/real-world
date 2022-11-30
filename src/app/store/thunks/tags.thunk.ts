import { createAsyncThunk } from '@reduxjs/toolkit';
import { tagsService } from 'services';

export const tagsThunk = createAsyncThunk('tags/tagsThunk', async (_, thunkAPI) => {
  try {
    return await tagsService.getTags();
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
