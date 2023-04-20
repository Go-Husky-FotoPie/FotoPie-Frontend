import Post from "../PostList/Post";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import NoMore from "../Loader/NoMore";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "@mui/lab/Masonry";
import Box from "@mui/material/Box";
import { ResponseImageData } from "../../../pages/category/[tag]";
import ErrorAlert from "../LoginForm/ErrorAlert";
import { searchPosts } from "../../axiosRequest/api/search";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import PostList from "../PostList/PostList";
import PhotoQuickView from "../PhotoQuickView/PhotoQuickView";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
interface CategoryInsidePostsProps {
  tagString: string | string[] | undefined;
  category: ResponseImageData[];
  setCategory: Dispatch<SetStateAction<ResponseImageData[]>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  loaderHandler: boolean;
  setLoaderHandler: Dispatch<SetStateAction<boolean>>;
  error: null;
  setError: Dispatch<SetStateAction<null>>;
  handleOpen: (filename: string) => void;
}

const SearchPostList = ({
  tagString,
  category,
  setCategory,
  page,
  setPage,
  loaderHandler,
  setLoaderHandler,
  error,
  setError,
  handleOpen,
}: CategoryInsidePostsProps) => {
  const router = useRouter();
  const [hasFetched, setHasFetched] = useState(false);
  let limit = 10;

  //set states for modal quickview
  const [selectedFilename, setSelectedFilename] = useState<
    string | undefined
  >();

  const [open, setOpen] = useState(false);
  //open modal popup window
  const handleOpening = (filename: string) => {
    setSelectedFilename(filename);
    setOpen(true);
  };
  //close modal popup window
  const handleClose = () => {
    setOpen(false);
  };

  const fetchImages = async () => {
    try {
      setLoaderHandler(true);
      const res = await searchPosts(tagString, page, limit);

      if (res.status === 200) {
        setCategory([...category, ...res.data]);
        setPage(page + 1);
        if ([...res.data].length === 0) {
          //setLoaderHandler(false);
        }
      }
      setLoaderHandler(false);
      setHasFetched(true);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!tagString) {
      return;
    }
    fetchImages();
  }, [tagString]);

  return (
    <>
      {/* {error && <ErrorAlert error={error}></ErrorAlert>} */}
      {[...category].length !== 0 ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            maxWidth: "1600px",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: 0,
            },
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <InfiniteScroll
            dataLength={category.length}
            next={fetchImages}
            hasMore={true}
            loader={loaderHandler ? <Loader /> : <NoMore />}
          >
            <Masonry
              columns={{ sm: 2, md: 3 }}
              spacing={2}
              sx={{ m: "auto", mt: 15 }}
            >
              {category.map((category) => (
                <Post
                  url={category.compressed_imageUrl}
                  filename={category.filename}
                  key={category._id}
                  handleOpen={() => handleOpen(category.filename)}
                />
              ))}
            </Masonry>
          </InfiniteScroll>
        </Box>
      ) : (
        hasFetched && (
          <Grid
            container
            sx={{
              maxWidth: "1600px",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              ml: "auto",
              mr: "auto",
            }}
          >
            <Grid
              item
              xs={12}
              md={12}
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: { xs: "center", sm: "start", md: "start" },
                alignItems: "center",
                ml: { xs: "7%", sm: "2.5%", md: "2.5%" },
                mt: "3%",
                mr: "2.5%",
                // marginLeft: "auto",
                // marginRight: "auto",
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
              >
                We could not find anything for "{tagString}".
                <br></br>
                Try to refine your search.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              sx={{
                width: "100%",
                height: "100%",
                mt: "5%",
              }}
            >
              <Box
                sx={{
                  //maxWidth: "1600px",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "30px",
                    fontWeight: "25px",
                    marginLeft: { xs:"25px", sm:"43px", md:"43px" },
                    marginBottom: "20px",
                    fontFamily: "Work Sans', sans-serif",
                  }}
                >
                  More photos below:
                </Typography>

                <Box sx={{ marginLeft: "auto", marginRight: "auto" }}>
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
                  <PhotoQuickView filename={selectedFilename} router={router} />
                </Container>
              </Modal>
            </Grid>
          </Grid>
        )
      )}
    </>
  );
};

export default SearchPostList;
