import { createAsyncThunk } from '@reduxjs/toolkit';
import { tagsService } from 'services';

export const tagsThunk = createAsyncThunk('tags/tagsThunk', async (_, thunkAPI) => {
  try {
    return await tagsService.getTags();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error. Something went wrong';
    return thunkAPI.rejectWithValue(message);
  }
});
