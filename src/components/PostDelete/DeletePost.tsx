import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Typography,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getMe } from "../../axiosRequest/api/editUser";
import { deletePost } from "../../axiosRequest/api/userPost";
import { useCheckToken } from "../../hooks/useCheckToken";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import {useDeleteSuccessful} from "../../hooks/useDeleteSuccessful";

interface DeletePostButtonProps {
  filenameString: string | string[] | undefined;
  // userID: string;
}

const currentLoginUserId = async () => {
  try {
    const response = await getMe();
    const { id } = response.data;
    return id;
  } catch (error) {}
};
const DeletePostButton: FC<DeletePostButtonProps> = ({ filenameString }) => {
  useCheckToken();

  const { userID, isAuthenticated } = useSelector((state: RootState) => ({
    ...state.auth,
    ...state.quickView,
  }));
  // const {isDeleteSuccessful, updateIsDeleteSuccessful} = useDeleteSuccessful();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isCurrentUserId, setIsCurrentUserId] = useState<boolean>(false);
  const [isDeleteSuccessful, setIsDeleteSuccessful] = useState(false);
  // const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserId = async () => {
      const trueUser = await currentLoginUserId();
      const isMatch = trueUser === userID;
      setIsCurrentUserId(isMatch);
    };
    fetchUserId();
    if (isDeleteSuccessful) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [userID, isDeleteSuccessful]);

  //useMemo (chatgpt optimization)
  // useEffect(() => {
  //     const fetchUserId = async () => {
  //       const trueUser = await currentLoginUserId();
  //       setCurrentUserId(trueUser);
  //     };

  //     fetchUserId();
  //   }, []);

  //   const isCurrentUserId = useMemo(() => {
  //     return currentUserId === userID;
  //   }, [currentUserId, userID]);

  const handleDeleteClick = async () => {
    setIsConfirmationOpen(true);
  };

  const handleConfirmationCancel = () => {
    setIsConfirmationOpen(false);
  };

  const handleConfirmationConfirm = async () => {
    setIsDeleting(true);
    setIsConfirmationOpen(false);
    try {
      const response = await deletePost(filenameString);
      setIsConfirmationOpen(true);
      setIsDeleteSuccessful(true);
    } catch (error) {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {isAuthenticated && isCurrentUserId ? (
        <div>
          <Button
            variant="contained"
            onClick={handleDeleteClick}
            disabled={isDeleting}
            sx={{
              display: { xs: "none", sm: "none", md: "flex" },
              //bgcolor: "primary.main",
              bgcolor: "#E8EAF6",

              textTransform: "none",
              fontSize: "1.2rem",
            }}
          >
            <Typography
              textTransform="none"
              fontWeight={700}
              fontSize={{
                xs: "0.5rem",
                sm: "0.75rem",
                md: "1rem",
              }}
              color="black"
            >
              {isDeleting ? "Deleting..." : "Delete this post"}
            </Typography>
          </Button>
          <IconButton
            sx={{
              display: { xs: "flex", sm: "flex", md: "none" },
              color: "primary.main",
            }}
            onClick={handleDeleteClick}
          >
            {<DeleteOutlineIcon />}
          </IconButton>
          <Dialog open={isConfirmationOpen} onClose={handleConfirmationCancel}>
            <DialogTitle>Confirm Deletion</DialogTitle>

            {/* dialog content body */}
            <DialogContent>
              {isDeleteSuccessful ? (
                <DialogContentText>
                  Delete successful! Redirecting...
                </DialogContentText>
              ) : (
                "Are you sure you want to delete this post?"
              )}
            </DialogContent>

            {/* first dialog button */}
            {isDeleteSuccessful ? null : (
              <DialogActions>
                <Button onClick={handleConfirmationCancel} color="primary">
                  Cancel
                </Button>
                {/* click this button will call delete api and will popup second dialog*/}
                <Button
                  onClick={handleConfirmationConfirm}
                  color="primary"
                  autoFocus
                >
                  Delete
                </Button>
              </DialogActions>
            )}
          </Dialog>
        </div>
      ) : null}
    </>
  );
};

export default DeletePostButton;
