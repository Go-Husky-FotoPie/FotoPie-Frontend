import { createSlice } from "@reduxjs/toolkit";
import {
  fetchNotifications,
} from "./notifyAction";
import { NotificationState } from "./types";

const initialState: NotificationState = {
  notifications: [],
  status: "idle",
  error: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchNotifications
      .addCase(fetchNotifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
  },
});

export default notificationSlice.reducer;
