import { AnyAction, createSlice } from '@reduxjs/toolkit';

import { changeProfileSettings, login, register } from 'app/store';
import { AuthState } from 'types';

const user = JSON.parse(String(localStorage.getItem('user')));

const initialState: AuthState = {
  user: user || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  errors: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    removeUser: (state: AuthState) => {
      state.user = null;
    },
    reset: (state: AuthState) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state: AuthState) => {
        state.isLoading = true;
      })
      .addCase(changeProfileSettings.pending, (state: AuthState) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state: AuthState, action: AnyAction) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state: AuthState, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state: AuthState) => {
        state.isLoading = true;
      })
      .addCase(changeProfileSettings.fulfilled, (state: AuthState, action: AnyAction) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.fulfilled, (state: AuthState, action: AnyAction) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state: AuthState, action: AnyAction) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(changeProfileSettings.rejected, (state: AuthState) => {
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { reset, removeUser } = authSlice.actions;
export const AuthReducer = authSlice.reducer;
