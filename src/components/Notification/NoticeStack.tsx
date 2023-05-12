import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNotifications } from "../../store/notification/notifyAction";
import { AppDispatch, RootState } from "../../store/store";
import Loading from "./Loading";
import NoNotification from "./NoNotification";
import NotificationList from "./NotificationList";

export default function NoticeStack() {
  //RTK Dispatch and fetch data
  const dispatch = useDispatch<AppDispatch>();
  const { notifications, status } = useSelector(
    (state: RootState) => state.notifySlice
  );

  const fetchData = useCallback(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  //fetch data
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //render Loading/no notification tips/notification list
  if (status === "loading" || status === "idle") {
    return <Loading />;
  } else if (notifications.length === 0) {
    return <NoNotification />;
  } else {
    return <NotificationList notifications={notifications} />;
  }
}
