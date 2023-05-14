import {
  Avatar,
  Box,
  Button,
  Container,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Notification } from "../../store/notification/types";
import Item from "./Notification.style";
import PhotoQuickView from "../PhotoQuickView/PhotoQuickView";
import { useRouter } from "next/router";
import Image from "mui-image";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";

interface NotificationListProps {
  notifications: Notification[];
}

const NotificationList = ({ notifications }: NotificationListProps) => {
  const router = useRouter();

  const [selectedFilename, setSelectedFilename] = useState<
    string | undefined
  >();

  const [open, setOpen] = useState(false);
  //open modal popup window
  const handleOpen = (filename: string) => {
    setSelectedFilename(filename);
    setOpen(true);
  };
  //close modal popup window
  const handleClose = () => {
    setOpen(false);
  };

  //homepage button
  const handleClick = () => {
    router.push("/");
  };

  const matches = useMediaQuery("(min-width:600px)");
  return (
    //Notification list
    <Box sx={{ width: "100%", mt: 2, mb: 2 }}>
      <Stack
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "secondary",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            mt: { xs: 1, md: 3 },
            fontSize: { xs: "1.5rem", md: "2.5rem" },
            fontWeight: 700,
          }}
        >
          My Notification
        </Typography>
        <Box
          sx={{
            width: "55%",
            display: "flex",
            flexDirection: "column",
            alignItem: "center",
            justifyContent: "center",
            border: "1px solid #EAE6FF",
            backgroundColor: "#EAE6FF",
            borderRadius: "20px",
            pt: "10px",
            pb: "10px",
          }}
        >
          {/* to get notification mapped into Stack  */}
          {notifications.map((notification) => (
            <Container
              key={notification.id}
              // style={{ backgroundColor: "background.paper" }}
            >
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                  backgroundImage: `
                    linear-gradient(
                    rgba(0, 0, 0, 0.5),
                    rgba(0, 0, 0, 0.3)
                  )`,
                  bgcolor: "background.paper",
                }}
              >
                <Container sx={{ outline: "none" }}>
                  {/* <CloseButton /> */}
                  <Button
                    sx={{
                      position: "absolute",
                      top: 20,
                      left: 20,
                      color: "white",
                    }}
                    onClick={handleClose}
                  >
                    {<CloseIcon sx={{ fontSize: 40 }} />}
                  </Button>
                  <PhotoQuickView filename={selectedFilename} router={router} />
                </Container>
              </Modal>

              <div onClick={() => handleOpen(notification.directFilename)}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Item
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      width: "80%",
                      maxWidth: "90%",
                      height: { xs: 50, sm: 100, md: 120 },
                      color: "primary",
                      margin: "5px",
                      p: 2,
                      borderRadius: "20px",
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "primary",
                      }}
                    >
                      <Avatar
                        alt={notification.directFilename}
                        src={notification.userAvatar}
                        sx={{
                          width: { xs: 30, sm: 70 },
                          height: { xs: 30, sm: 70 },
                        }}
                      />
                    </Box>

                    <Typography
                      sx={{
                        fontSize: { xs: "0.5rem", sm: "1rem", md: "1.5rem" },
                        width: { xs: "9rem", sm: "15rem" },
                      }}
                    >
                      {notification.userName} liked your post
                    </Typography>

                    <Image
                      alt="image"
                      src={notification.post}
                      fit="contain"
                      duration={0.5}
                      {...(matches
                        ? { width: 100, height: 80 }
                        : { width: 50, height: 30 })}
                    />
                  </Item>
                </Box>
              </div>
            </Container>
          ))}
        </Box>

        <Button
          onClick={handleClick}
          variant="contained"
          sx={{
            fontSize: { xs: "0.5rem", md: "1rem" },
            borderRadius: "10px",
            p: { xs: 1.2, md: 1.5 },
            pr: { xs: 1.7, md: 2 },
            pl: { xs: 1.7, md: 2 },
          }}
        >
          Homepage
        </Button>
      </Stack>
    </Box>
  );
};

export default NotificationList;
