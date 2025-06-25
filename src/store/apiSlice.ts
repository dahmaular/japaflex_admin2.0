import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL || 'https://delta.japaflex.com/api/v1/', // Change as needed
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('firebase_id_token');
      console.log('Token:', token); // Debugging line to check token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    adminLogin: builder.mutation<any, void>({
      query: () => ({
        url: 'admin/login',
        method: 'POST',
      }),
    }),
    getAllAdmin: builder.query<any, void>({
      query: () => ({
        url: 'admin',
        method: 'GET',
      }),
    }),
    getAllUsers: builder.query<any, void>({
      query: () => ({
        url: 'users',
        method: 'GET',
      }),
    }),
    getUsersbyId: builder.query<any, {id: string |null}>({
      query: ({id}) => ({
        url: `users/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useAdminLoginMutation, useLazyGetUsersbyIdQuery, useGetAllAdminQuery, useGetAllUsersQuery } = apiSlice;
