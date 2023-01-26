import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAxios } from 'utils/axios';
import twoInOne from 'utils/twoInOne';

const extractNumbers = data =>
  data.map(item => ({
    ...item,
    number: twoInOne.getFirstValue(item.number),
    extraId: twoInOne.getSecondValue(item.number),
  }));

const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await authAxios.get('/contacts');
      return extractNumbers(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const { data } = await authAxios.post('/contacts', contact);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const { data } = await authAxios.delete(`/contacts/${id}`);
      console.log(data);
      return data.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const editContact = createAsyncThunk(
  'contacts/editContact',
  async (contact, thunkAPI) => {
    try {
      const { data } = await authAxios.put(`/contacts/${contact.id}`, contact);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export { fetchContacts, deleteContact, addContact, editContact };
