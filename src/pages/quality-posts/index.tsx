import { useEffect, useState } from "react";
import { findQualityPosts } from "../../axiosRequest/api/imageQuality";
import Box from "@mui/material/Box";
//import Item from "../src/components/Notification/Notification.style";
import Item from "../../components/QualityPosts/QualityPosts.style";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Image from "mui-image";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";
import Modal from "@mui/material/Modal";
import PhotoQuickView from "../../components/PhotoQuickView/PhotoQuickView";
import Button from "@mui/material/Button";
import NavBar from "../../components/NavBar/NavBar";
import { NavBarStyles } from "../../components/NavBar/NavbarBaseline.style";

interface QualityPostsData {
  _id: string;
  user_email: string;
  filename: string;
  score: string;
  userName: string;
  userAvatar: string;
}

export default function QualityPostsStack() {
  const [posts, setPost] = useState<QualityPostsData[]>([]);
  const [page, setPage] = useState(1);
  const [loaderHandler, setLoaderHandler] = useState(true);
  const [Error, setError] = useState(null);
  //set the states for quick-view modal
  const [selectedFilename, setSelectedFilename] = useState<
    string | undefined
  >();
  const router = useRouter();

  let limit = 10;

  const fetchQualityPosts = async () => {
    try {
      const res = await findQualityPosts(page, limit);
      if (res.status === 200) {
        setPost([...posts, ...res.data]);
        setPage(page + 1);
        if ([...res.data].length === 0) {
          setLoaderHandler(false);
        }
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

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

  useEffect(() => {
    fetchQualityPosts();
  }, []);

  return (
    <>
      <NavBar isFixed={false} color="#000000" baseLine={NavBarStyles} />
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
            Photo Quality Leaderboard
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
            {posts.map((post, index) => (
              <div key={post._id}>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <PhotoQuickView filename={selectedFilename} router={router} />
                </Modal>
                <div onClick={() => handleOpen(post.filename)}>
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
                      <Typography
                        sx={{
                          fontSize: { xs: "0.5rem", sm: "1rem", md: "1.5rem" },
                          width: { xs: "2rem", sm: "3rem" },
                        }}
                      >
                        {`No.${index + 1}`}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "primary",
                        }}
                      >
                        <Avatar
                          alt={post.filename}
                          src={post.userAvatar}
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
                        {post.userName} achieved the score {post.score}
                      </Typography>

                      <Image
                        alt="image"
                        src={`https://fotopie-photo-compression.s3.ap-southeast-2.amazonaws.com/${post.filename}`}
                        fit="contain"
                        duration={0.5}
                        {...(matches
                          ? { width: 100, height: 80 }
                          : { width: 50, height: 30 })}
                      />
                    </Item>
                  </Box>
                </div>
              </div>
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
    </>
  );
}
