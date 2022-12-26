import { createSlice, AnyAction } from '@reduxjs/toolkit';
import { follow, getProfile, unfollow } from 'app/store/thunks';
import { IProfile } from 'types';

interface IState {
  profile: IProfile | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: IState = {
  profile: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state: IState) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getProfile.fulfilled, (state: IState, action: AnyAction) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(follow.fulfilled, (state: IState, action: AnyAction) => {
        state.isError = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(unfollow.fulfilled, (state: IState, action: AnyAction) => {
        state.isError = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(follow.rejected, (state: IState) => {
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(unfollow.rejected, (state: IState) => {
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getProfile.rejected, (state: IState) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.profile = null;
      });
  },
});
export const ProfilesReducer = profileSlice.reducer;
