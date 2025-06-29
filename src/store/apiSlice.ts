import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { parseQueryParams } from "../helpers";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.REACT_APP_API_BASE_URL ||
      "https://delta.japaflex.com/api/v1/", // Change as needed
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("firebase_id_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    adminLogin: builder.mutation<any, void>({
      query: () => ({
        url: "admin/login",
        method: "POST",
      }),
    }),
    getAllAdmin: builder.query<any, void>({
      query: () => ({
        url: "admin",
        method: "GET",
      }),
    }),
    getAllUsers: builder.query<any, Record<string, any>>({
      query: (params) => {
        const queryParams = parseQueryParams(params);
        return {
          url: `users?${queryParams}`,
          method: "GET",
        };
      },
    }),
    getUsersbyId: builder.query<any, { id: string | null }>({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: "GET",
      }),
    }),
    getUserPosts: builder.query<any, string>({
      query: (id: string) => ({
        url: `users/${id}/posts`,
        method: "GET",
      }),
    }),
    assignAdmin: builder.mutation<any, any>({
      query: (body) => ({
        url: "admin/assign",
        method: "POST",
        body,
      }),
    }),
    deleteUser: builder.mutation<any, string>({
      query: (id: string) => ({
        url: `users/${id}`,
        method: "DELETE",
        body: {
          hard_delete: true,
        },
      }),
    }),

    updateUserStatus: builder.mutation<any, { id: string; status: string }>({
      query: (params: { id: string; status: string }) => ({
        url: `users/${params.id}/status`,
        method: "PATCH",
        body: {
          status: params.status,
        },
      }),
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useLazyGetUsersbyIdQuery,
  useGetAllAdminQuery,
  useGetAllUsersQuery,
  useLazyGetUserPostsQuery,
  useAssignAdminMutation,
  useDeleteUserMutation,
  useUpdateUserStatusMutation,
} = apiSlice;
