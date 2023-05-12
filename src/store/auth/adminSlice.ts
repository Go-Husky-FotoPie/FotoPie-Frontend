import { getAccessToken, getRefreshToken } from "../../utils/token";
import { createSlice } from "@reduxjs/toolkit";
import { adminLogin, logout } from "./authAciton";
import { AuthState } from "./types";

const initialState: AuthState = {
  isAuthenticated: false,
  error: null,
  loginStatus: "idle",
  logoutStatus: "idle",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    checkToken: (state) => {
      const refreshToken = getRefreshToken();
      const accessToken = getAccessToken();

      // If refresh token is expired, but access token is not expired, user is still authenticated
      if (accessToken && !refreshToken) {
        state.isAuthenticated = true;
        return;
      }

      // If refresh token is expired, and access token is expired, user is not authenticated
      state.isAuthenticated = !!refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(adminLogin.fulfilled, (state) => {
        state.loginStatus = "success";
        state.isAuthenticated = true;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.payload as string;
      })
      .addCase(logout.pending, (state) => {
        state.logoutStatus = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.logoutStatus = "success";
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutStatus = "failed";
        state.error = action.payload as string;
      });
  },
});
export const { checkToken } = adminSlice.actions;

export default adminSlice.reducer;
