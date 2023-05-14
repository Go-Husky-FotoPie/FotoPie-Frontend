import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkToken } from "../store/auth/authSlice";
import { AppDispatch } from "../store/store";
import { getRefreshToken } from "../utils/token";

export const useCheckToken = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);
};
