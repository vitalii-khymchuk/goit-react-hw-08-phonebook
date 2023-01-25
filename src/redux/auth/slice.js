import { createSlice } from '@reduxjs/toolkit';
import auth from './operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'authData',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(auth.registration.fulfilled, (state, { payload }) => {
        state.user = { ...payload.user };
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(auth.logIn.fulfilled, (state, { payload }) => {
        state.user = { ...payload.user };
        state.token = payload.token;
        state.isLoggedIn = true;
      }),
});

export { authSlice };
