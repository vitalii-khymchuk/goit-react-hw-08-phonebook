import { createAsyncThunk } from '@reduxjs/toolkit';
import { contactsInfoAxios } from 'utils/axios';

const addContactInfo = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const { data } = await contactsInfoAxios.post('/contacts', contact);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const deleteContactInfo = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const { data } = await contactsInfoAxios.delete(`/contacts/${id}`);
      return data.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const editContactInfo = createAsyncThunk(
  'contacts/editContact',
  async (contact, thunkAPI) => {
    try {
      const { data } = await contactsInfoAxios.put(
        `/contacts/${contact.id}`,
        contact
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const getContactInfo = createAsyncThunk(
  'contacts/getContactsInfo',
  async (id, thunkAPI) => {
    try {
      const { data } = await contactsInfoAxios.get(`/contacts/${id}`);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export { deleteContactInfo, addContactInfo, getContactInfo, editContactInfo };
