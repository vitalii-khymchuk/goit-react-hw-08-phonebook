import { createAsyncThunk } from '@reduxjs/toolkit';
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
          return thunkAPI.rejectWithValue(
            'User creation error. Please try again...'
          );
        case 500:
          return thunkAPI.rejectWithValue('Server error. Please try again...');
        default:
          return thunkAPI.rejectWithValue('Unknown error. Please try again...');
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
        return thunkAPI.rejectWithValue(
          'Incorrect user data. Please try again...'
        );
      default:
        return thunkAPI.rejectWithValue('Unknown error. Please try again...');
    }
  }
});

const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const { data } = await axios.post('/users/logout');
    token.reset();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Unknown error. Please authorize again...');
  }
});

const refresh = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  try {
    const persistedToken = thunkAPI.getState().authData.token;

    if (persistedToken === null) return thunkAPI.rejectWithValue(null);
    token.set(persistedToken);
    const { data } = await axios.get('/users/current');
    console.log(data);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Unknown error. Please authorize again...');
  }
});

export default { registration, logIn, logOut, refresh };
