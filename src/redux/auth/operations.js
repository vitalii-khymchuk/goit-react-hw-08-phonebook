import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';
axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  reset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const registration = createAsyncThunk(
  'auth/reg',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/signup', credentials);
      token.set(data.token);
      return data;
    } catch (error) {
      switch (error.response.status) {
        case 400:
          toast.info('User creation error. Please try again...');
          break;
        case 500:
          toast.info('Server error. Please try again...');
          break;
        default:
          toast.info('Unknown error. Please try again...');
      }
    }
  }
);

const logIn = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const { data } = await axios.post('/users/login', credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    switch (error.response.status) {
      case 400:
        toast.info('Incorrect user data. Please try again...');
        break;
      default:
        toast.info('Unknown error. Please try again...');
    }
  }
});

const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const { data } = await axios.post('/users/logout');
    token.reset();
    return data;
  } catch (error) {
    toast.info('Unknown error. Please try again...');
  }
});

const refresh = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  try {
    const persistedToken = thunkAPI.getState().authData.token;

    if (persistedToken === null) return thunkAPI.rejectWithValue(null);
    token.set(persistedToken);
    const { data } = await axios.get('/users/current');
    return data;
  } catch (error) {
    toast.info('Unknown error. Please try again...');
  }
});

const auth = { registration, logIn, logOut, refresh };
export default auth;
