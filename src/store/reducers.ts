import { combineReducers } from "redux";
import auth from "./auth/authSlice";
import quickView from "./photoQuickView/quickViewSlice";
import notifySlice from "./notification/notifySlice";
import adminSlice from "./auth/adminSlice";
import notificationBellSlice from "./notificationBell/notificationBellSlice";

const reducers = combineReducers({
  auth,
  quickView,
  notifySlice,
  adminSlice,
  notificationBellSlice,
});

export default reducers;
