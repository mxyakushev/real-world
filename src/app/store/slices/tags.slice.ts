import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { tagsThunk } from 'app/store/thunks';

interface IState {
  tags: string[] | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: IState = {
  tags: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(tagsThunk.pending, (state: IState) => {
        state.isLoading = true;
      })
      .addCase(tagsThunk.fulfilled, (state: IState, action: AnyAction) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tags = action.payload;
      })
      .addCase(tagsThunk.rejected, (state: IState, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.tags = null;
      });
  },
});
export const TagsReducer = tagsSlice.reducer;
