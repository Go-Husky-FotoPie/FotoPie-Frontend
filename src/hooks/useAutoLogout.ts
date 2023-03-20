import { AuthState } from "./../../store/auth/types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutSync } from "../../store/auth/authSlice";
import { AppDispatch, RootState } from "../../store/store";
import { getAccessToken, getAccessTokenExpiration } from "../utils/token";

export const useAutoLogout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Check if the token exists every 5 seconds
  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        const accessToken = getAccessToken();

        // If the token doesn't exist, logout
        if (!accessToken) {
          dispatch(logoutSync());
          console.log("💩logout");
        }
      }, 1000 * 5); // every 5 seconds
      // clean up to avoid memory leaks when the component is unmounted
      return () => {
        clearInterval(interval);
      };
    }
  }, [dispatch, isAuthenticated]);

  // Check if the token is expired
  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken) return;

    const tokenExpiration = getAccessTokenExpiration();
    const now = new Date().getTime();

    // If the token is expired, logout
    if (now > tokenExpiration) {
      dispatch(logoutSync());
      console.log("😜logout");
    }
  }, [dispatch]);
};
