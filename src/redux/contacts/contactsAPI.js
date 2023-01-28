import axios from 'axios';
import twoInOne from 'utils/twoInOne';
import { createApi } from '@reduxjs/toolkit/query/react';
import { sortAZ } from 'utils/sort';

const extractNumbers = (data = []) =>
  data.map(item => ({
    ...item,
    number: twoInOne.getFirstValue(item.number),
    extraId: twoInOne.getSecondValue(item.number),
  }));

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      const error = {
        error: {
          status: axiosError.response?.status,
          data: axiosError.message,
        },
      };
      return error;
    }
  };

export const contactsAPI = createApi({
  reducerPath: 'contacts',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['contacts'],
  endpoints(build) {
    return {
      fetchContacts: build.query({
        query: () => ({ url: '/contacts', method: 'get' }),
        providesTags: ['contacts'],
        transformResponse: (response, meta, arg) => {
          const formattedContacts = extractNumbers(response);
          return sortAZ(formattedContacts);
        },
      }),
      addContact: build.mutation({
        query: data => ({ url: '/contacts', method: 'post', data }),
        invalidatesTags: ['contacts'],
      }),
      deleteContact: build.mutation({
        query: id => ({ url: `/contacts/${id}`, method: 'delete' }),
        invalidatesTags: ['contacts'],
      }),
      editContact: build.mutation({
        query: ({ data, id }) => ({
          url: `/contacts/${id}`,
          method: 'patch',
          data,
        }),
        invalidatesTags: ['contacts'],
      }),
    };
  },
});

export const {
  useFetchContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useEditContactMutation,
} = contactsAPI;

// const fetchContacts = createAsyncThunk(
//   'contacts/fetchAll',
//   async (_, thunkAPI) => {
//     try {
//       const { data } = await authAxios.get('/contacts');
//       return extractNumbers(data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// const addContact = createAsyncThunk(
//   'contacts/addContact',
//   async (contact, thunkAPI) => {
//     try {
//       const { data } = await authAxios.post('/contacts', contact);
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// const deleteContact = createAsyncThunk(
//   'contacts/deleteContact',
//   async (id, thunkAPI) => {
//     try {
//       const { data } = await authAxios.delete(`/contacts/${id}`);
//       console.log(data);
//       return data.id;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// const editContact = createAsyncThunk(
//   'contacts/editContact',
//   async (contact, thunkAPI) => {
//     try {
//       const { data } = await authAxios.put(`/contacts/${contact.id}`, contact);
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export { fetchContacts, deleteContact, addContact, editContact };
