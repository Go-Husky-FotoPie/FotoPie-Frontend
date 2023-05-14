import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getNotificationCountRequest,
  markNotificationReadRequest,
} from "../../axiosRequest/api/notification";

export const getNotificationCountAction = createAsyncThunk(
  "notification/getNotificationCount",
  async () => {
    const response = await getNotificationCountRequest();
    return response.data;
  }
);

export const markNotificationReadAction = createAsyncThunk(
  "notification/fetchNotificationStatus",
  async () => {
    const response = await markNotificationReadRequest();
    return response.data;
  }
);
