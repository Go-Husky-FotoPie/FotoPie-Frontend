import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateCollect, updateLike } from "./quickViewAciton";

interface QuickViewState {
  userName: string;
  userAvatar: string;
  postPhoto: string;
  userCollects: number;
  userLikes: number;
  userID: string;
  collected: boolean;
  liked: boolean;
  isLoading: boolean;
}

const initialState: QuickViewState = {
  userName: "",
  userAvatar: "",
  postPhoto: "",
  userCollects: 0,
  userLikes: 0,
  userID: "",
  collected: false,
  liked: false,
  isLoading: false,
};

export const quickViewSlice = createSlice({
  name: "quickView",
  initialState,
  reducers: {
    setQuickViewData: (state, action) => {
      state.userName = action.payload.user_name;
      state.userAvatar = action.payload.avatar_url;
      state.postPhoto = action.payload.photo_url;
      state.userCollects = action.payload.collect_count;
      state.userLikes = action.payload.like_count;
      state.userID = action.payload.user_id;
      state.collected = action.payload.collect_status;
      state.liked = action.payload.like_status;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateCollect.fulfilled, (state, action) => {
      state.userCollects = action.payload.userCollects;
      state.collected = !state.collected;
    });
    builder.addCase(updateLike.fulfilled, (state, action) => {
      state.userLikes = action.payload.userLikes;
      state.liked = !state.liked;
    });
  },
});
export const { setQuickViewData, setLoading } = quickViewSlice.actions;

export default quickViewSlice.reducer;
