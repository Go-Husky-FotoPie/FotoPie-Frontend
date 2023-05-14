import { Button, IconButton } from "@mui/material";
import { NextRouter } from "next/router";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { updateLike } from "../../store/photoQuickView/quickViewAciton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

export interface LikeButtonProps {
  filenameString: string | string[] | undefined;
  liked: boolean;
  userLikes: number;
  router: NextRouter;
  isAuthenticated: boolean;
}

//Toggle like button and add/delete like
const LikeButton = ({
  filenameString,
  liked,
  userLikes,
  router,
  isAuthenticated,
}: LikeButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const addToLiked = async () => {
    if (!isAuthenticated) router.push("/login");
    if (isAuthenticated) {
      dispatch(updateLike(filenameString));
    }
  };

  return (
    <>
      {/* show like button on desktop */}
      <Button
        variant="outlined"
        color="info"
        sx={{
          display: { xs: "none", sm: "none", md: "flex" },
          color: liked ? "red" : "black",
          textTransform: "none",
          fontSize: "1.2rem",
        }}
        startIcon={
          <FavoriteBorderIcon sx={{ color: liked ? "red" : "black" }} />
        }
        onClick={addToLiked}
      >
        {liked
          ? "Unlike" + " " + `${userLikes}`
          : "Like" + " " + `${userLikes}`}
      </Button>

      {/* show like button on mobile */}
      <IconButton
        sx={{
          display: { xs: "flex", sm: "flex", md: "none" },
          color: liked ? "red" : "black",
        }}
        onClick={addToLiked}
      >
        {<FavoriteBorderIcon sx={{ color: liked ? "red" : "black" }} />}
      </IconButton>
    </>
  );
};

export default LikeButton;
