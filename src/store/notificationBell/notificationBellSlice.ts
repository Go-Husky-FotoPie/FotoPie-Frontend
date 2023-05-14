import { createSlice } from "@reduxjs/toolkit";
import {
  getNotificationCountAction,
  markNotificationReadAction,
} from "./notificationBellAction";
import { NotificationState } from "./types";

const initialState: NotificationState = {
  notificationCount: 0,
  isNotificationRead: false,
  getNotificationCountStatus: "idle",
  markNotificationReadStatus: "idle",
  getNotificationCountError: null,
  markNotificationReadError: null,
};

const notificationBellSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //getNotificationCount
      .addCase(getNotificationCountAction.pending, (state) => {
        state.getNotificationCountStatus = "loading";
      })
      .addCase(getNotificationCountAction.fulfilled, (state, action) => {
        state.getNotificationCountStatus = "succeeded";
        state.notificationCount = action.payload.count;
      })
      .addCase(getNotificationCountAction.rejected, (state, action) => {
        state.getNotificationCountStatus = "failed";
        state.getNotificationCountError =
          action.error.message ?? "Unknown error";
      })

      //fetchNotificationStatus
      .addCase(markNotificationReadAction.pending, (state) => {
        state.markNotificationReadStatus = "loading";
      })
      .addCase(markNotificationReadAction.fulfilled, (state, action) => {
        state.markNotificationReadStatus = "succeeded";
        state.isNotificationRead = action.payload.acknowledged;
      })
      .addCase(markNotificationReadAction.rejected, (state, action) => {
        state.markNotificationReadStatus = "failed";
        state.markNotificationReadError =
          action.error.message ?? "Unknown error";
      });
  },
});

export default notificationBellSlice.reducer;
