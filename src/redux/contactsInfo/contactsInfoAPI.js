import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://63b68b3358084a7af3b54012.mockapi.io';

export const contactsInfoAPI = createApi({
  reducerPath: 'contactsInfo',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['contactsInfo'],
  endpoints: builder => ({
    getContactInfo: builder.query({
      query: ({ extraId }) => ({ url: `/contacts/${extraId}` }),
      providesTags: ['contactsInfo'],
    }),
    deleteContactsInfo: builder.mutation({
      query: ({ extraId }) => ({
        url: `/contacts/${extraId}`,
        method: 'DELETE',
      }),
    }),
    addContactsInfo: builder.mutation({
      query: comment => ({
        url: '/contacts',
        method: 'POST',
        body: comment,
      }),
      invalidatesTags: ['contactsInfo'],
    }),
    updateContactsInfo: builder.mutation({
      query: ({ extraId, body }) => ({
        url: `/contacts/${extraId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['contactsInfo'],
    }),
  }),
});

export const {
  useGetContactInfoQuery,
  useDeleteContactsInfoMutation,
  useAddContactsInfoMutation,
  useUpdateContactsInfoMutation,
} = contactsInfoAPI;

// export { contactsInfoAPI };
