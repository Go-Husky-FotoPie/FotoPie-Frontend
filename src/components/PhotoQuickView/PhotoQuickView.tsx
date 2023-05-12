import { useEffect, FC } from "react";
import { NextRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getInitialData } from "../../axiosRequest/api/photoQuickView";
import { AppDispatch, RootState } from "../../store/store";
import {
  setQuickViewData,
  setLoading,
} from "../../store/photoQuickView/quickViewSlice";
import DownloadImage from "./DownloadImage";
import PostImage from "./PostImage";
import CollectButton from "./CollectButton";
import LikeButton from "./LikeButton";
import UserName from "./UserName";
import DeletePostButton from "../PostDelete/DeletePost";
import { Grid } from "@mui/material";
import { PhotoQuickViewStyles } from "./PhotoQuickView.style";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import ImageQualityButton from "../ImageQuality/ImageQuality";
interface PhotoQuickViewProps {
  filename: string | string[] | undefined;
  router: NextRouter;
}

// Define a main body component that renders the Photo Quick View part
const PhotoQuickView: FC<PhotoQuickViewProps> = ({ filename, router }) => {
  //Redux toolkit
  const {
    isAuthenticated,
    userName,
    userAvatar,
    postPhoto,
    userCollects,
    userLikes,
    userID,
    collected,
    liked,
    isLoading,
  } = useSelector((state: RootState) => ({
    ...state.auth,
    ...state.quickView,
  }));

  const dispatch = useDispatch<AppDispatch>();

  // fetch get user avatar,username,post image, collect/like status, collect/like count
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true)); // Set loading state to true before fetching data
        const response = await getInitialData(filename);
        dispatch(setQuickViewData(response.data));
      } catch (error: any) {
        console.error(error);
      } finally {
        dispatch(setLoading(false)); // Set loading state to false after fetching data
      }
    };
    fetchData();
  }, [filename, dispatch]);

  return (
    <>
      {/* main body */}
      {isLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <Grid
          container
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
          rowSpacing={{ xs: 1, md: 2 }}
          sx={PhotoQuickViewStyles}
        >
          {/* User infos and buttons */}
          <Grid item xs={1} sm={1.5} md={2} width={1}>
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* Avatar and username */}
              <Grid item xs={6} md={4}>
                {/* <Grid item xs={8} md={4}> */}
                <UserName
                  userID={userID}
                  userAvatar={userAvatar}
                  userName={userName}
                />
              </Grid>
              {/* Collect, like, download buttons */}
              <Grid item xs={6} md={8}>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-end"
                  columnSpacing={{ sm: 1, md: 2 }}
                >
                  {/* collect button */}
                  <Grid item>
                    <CollectButton
                      isAuthenticated={isAuthenticated}
                      filenameString={filename}
                      userCollects={userCollects}
                      collected={collected}
                      router={router}
                    />
                  </Grid>
                  {/* like button */}
                  <Grid item>
                    <LikeButton
                      isAuthenticated={isAuthenticated}
                      filenameString={filename}
                      userLikes={userLikes}
                      liked={liked}
                      router={router}
                    />
                  </Grid>
                  {/* down button */}
                  <Grid item>
                    <DownloadImage
                      isAuthenticated={isAuthenticated}
                      filenameString={filename}
                      router={router}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Post image */}
          <Grid
            item
            width={{ xs: "70vw", sm: "50vw", md: "auto", xl: "auto" }}
            height={{ xs: "auto", sm: "auto", md: "60vh", xl: "70vh" }}
          >
            {postPhoto && <PostImage postPhoto={postPhoto} />}
          </Grid>

          {/* Delete post button */}
          {/* <Grid item xs>
            <DeletePostButton filenameString={filename} />
          </Grid> */}

          <Grid item xs>
            <ImageQualityButton filenameString={filename} />
          </Grid>

          <Grid
            item
            xs
            sx={{
              position: "absolute",
              bottom: "5%",
              right: "5%",
            }}
          >
            <DeletePostButton filenameString={filename} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default PhotoQuickView;
