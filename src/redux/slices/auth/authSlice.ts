import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: Cookies.get("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      Cookies.set("token", action.payload, { expires: 7 });
    },
    Logout: (state) => {
      state.token = null;
      Cookies.remove("token");
    },
    forgotPassword: (state) => {
      console.log("Forgot password request sent.");
    },
    resetPassword: (state, action) => {
      console.log("Reset password successful.", action.payload);
    },
  },
});
export const { login, Logout } = authSlice.actions;
export default authSlice.reducer;
