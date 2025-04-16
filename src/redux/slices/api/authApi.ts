import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface UserData {
  name?: string;
  email: string;
  password?: string;
}

interface AuthResponse {
  token?: string;
  message?: string;
}
interface ResetPasswordData {
  token: string;
  newPassword: string;
}

interface OtpVerificationData {
  token: string;
  otp: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, UserData>({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    signup: builder.mutation<AuthResponse, UserData>({
      query: (userData) => ({
        url: "/signup",
        method: "POST",
        body: userData,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    forgotPassword: builder.mutation<AuthResponse, Pick<UserData, "email">>({
      query: (userData) => ({
        url: "/forget-password",
        method: "POST",
        body: userData,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    resetPassword: builder.mutation<AuthResponse, ResetPasswordData>({
      query: ({ token, newPassword }) => ({
        url: "/reset-password",
        method: "POST",
        body: { token, newPassword },
        headers: { "Content-Type": "application/json" },
      }),
    }),
    verifyOtp: builder.mutation<AuthResponse, OtpVerificationData>({
      query: ({ token, otp }) => ({
        url: `/verify-otp`,
        method: "POST",
        body: { token, otp },
        headers: { "Content-Type": "application/json" },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
} = authApi;
