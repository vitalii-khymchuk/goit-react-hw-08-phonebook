import { createSlice } from '@reduxjs/toolkit';
import auth from './operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const loggedInHandler = (state, { payload }) => {
  state.user = { ...payload.user };
  state.token = payload.token;
  state.isLoggedIn = true;
};

const resetState = state => {
  state.user = { name: null, email: null };
  state.token = null;
  state.isLoggedIn = false;
};

const refreshFulfilledHandler = (state, { payload }) => {
  state.user = { ...payload };
  state.isLoggedIn = true;
  state.isRefreshing = false;
};

const authSlice = createSlice({
  name: 'authData',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(auth.registration.fulfilled, loggedInHandler)
      .addCase(auth.logIn.fulfilled, loggedInHandler)
      .addCase(auth.logOut.fulfilled, resetState)
      .addCase(auth.refresh.fulfilled, refreshFulfilledHandler)
      .addCase(auth.refresh.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(auth.refresh.rejected, state => {
        state.isRefreshing = false;
      }),
});

export { authSlice };
