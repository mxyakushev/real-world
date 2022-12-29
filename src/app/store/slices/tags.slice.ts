import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tagsThunk } from 'app/store/thunks';

interface IState {
  tags: string[] | null;
  selectedTag: string;
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
  selectedTag: '',
};

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setSelectedTag(state: IState, action: PayloadAction<string>) {
      state.selectedTag = action.payload;
    },
  },
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

export const { setSelectedTag } = tagsSlice.actions;
export const TagsReducer = tagsSlice.reducer;
