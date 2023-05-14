import NavBar from "../components/NavBar/NavBar";
import Header from "../components/Header";
import Box from "@mui/material/Box";
import PostList from "../components/PostList/PostList";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import PhotoQuickView from "../components/PhotoQuickView/PhotoQuickView";
import MidBar from "../components/MainPage/MidBar";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@mui/material";
import { getRandomPhoto } from "../axiosRequest/api/unsplashAPI";

export default function Home() {
  const router = useRouter();
  const [selectedFilename, setSelectedFilename] = useState<
    string | undefined
  >();
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>(
    ""
  );
  const [hasFetchedPhoto, setHasFetchedPhoto] = useState(false);

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

  useEffect(() => {
    if (backgroundImage || hasFetchedPhoto) return;
    getRandomPhoto()
      .then((res) => {
        setBackgroundImage(res.data.urls.regular);
        setHasFetchedPhoto(true);
      })
      .catch((err) => setBackgroundImage("../../background.jpg"));
  }, [backgroundImage, hasFetchedPhoto]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Box>
            {/* Navbar and header */}
            <Box
              sx={{
                backgroundImage: `
              linear-gradient(
                rgba(0, 0, 0, 0.5),
                rgba(0, 0, 0, 0.3)
              ),
              url(${backgroundImage})`,
                backgroundSize: "cover",
                margin: 0,
                padding: 0,
                height: "600px",
                backgroundPosition: "center",
              }}
            >
              <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
                <NavBar isFixed={true} />
                <Header />
              </div>
            </Box>

            {/* MidBar */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "50px",
                marginBottom: "50px",
              }}
            >
              <MidBar />
            </Box>

            {/* Photowall */}
            <Box
              sx={{
                maxWidth: "1600px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Typography
                sx={{
                  fontSize: "30px",
                  fontWeight: "25px",
                  marginLeft: "43px",
                  marginBottom: "20px",
                  fontFamily: "Work Sans', sans-serif",
                }}
              >
                Trending Photos
              </Typography>

              <Box sx={{ marginLeft: "30px", marginRight: "50px" }}>
                <PostList handleOpen={handleOpen} />
              </Box>
            </Box>

            {/* Modal popup window -- Photo Quick View page*/}
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
                {/* Photo quick view popup window */}
                <PhotoQuickView filename={selectedFilename} router={router} />
              </Container>
            </Modal>
          </Box>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

// export async function getStaticProps() {
//   try {
//     const { data } = await getRandomPhoto();
//     const randomPhoto = data.urls.regular;
//     return {
//       props: {
//         randomPhoto,
//       },
//     };
//   } catch (err) {
//     return {
//       props: {
//         randomPhoto: "../../background.jpg",
//       },
//     };
//   }
// }
