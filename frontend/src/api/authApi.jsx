// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/localStorage";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend-server-ksn.onrender.com/api/user/",
    // baseUrl: "http://localhost:8000/api/user/",
    prepareHeaders: (headers, { getState }) => {
      const currentToken = getToken();
      const access_token = currentToken ? currentToken : getState().auth.token;
      if (!headers.has("Authorization") && access_token) {
        headers.set("Authorization", `${access_token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    registration: build.mutation({
      query(body) {
        return {
          url: `register`,
          method: "POST",
          body,
        };
      },
    }),
    verifyEmail: build.mutation({
      query(body) {
        return {
          url: `verify-email`,
          method: "POST",
          body,
        };
      },
    }),
    login: build.mutation({
      query(body) {
        return {
          url: `login`,
          method: "POST",
          body,
          credentials: "include",
        };
      },
    }),
    logout: build.mutation({
      query(body) {
        return {
          url: `logout`,
          method: "POST",
          body,
          credentials: "include",
        };
      },
    }),
    changePassword: build.mutation({
      query(body) {
        return {
          url: `change-password`,
          method: "POST",
          body,
          credentials: "include",
        };
      },
    }),
    resetPasswordLink: build.mutation({
      query(body) {
        return {
          url: `reset-password-link`,
          method: "POST",
          body,
          credentials: "include",
        };
      },
    }),
    resetPassword: build.mutation({
      query(body) {
        const { id, token } = body;
        return {
          url: `reset-password/${id}/${token}`,
          method: "POST",
          body,
          credentials: "include",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useRegistrationMutation,
  useLoginMutation,
  useVerifyEmailMutation,
  useLogoutMutation,
  useChangePasswordMutation,
  useResetPasswordMutation,
  useResetPasswordLinkMutation,
} = authApi;
