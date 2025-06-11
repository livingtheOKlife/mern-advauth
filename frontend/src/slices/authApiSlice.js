import { apiSlice } from './apiSlice'

const AUTH_URL = '/api/auth'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: 'POST',
      }),
    }),
  }),
})

export const { useRegisterMutation, useLogoutMutation } = authApiSlice
