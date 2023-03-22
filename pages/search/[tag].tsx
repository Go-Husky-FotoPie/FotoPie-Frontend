import { Button, Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Post from "../../src/components/PostList/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../src/components/Loader/Loader";
import Masonry from "@mui/lab/Masonry";
import NoMore from "../../src/components/Loader/NoMore";
import { searchPosts } from "../../src/axiosRequest/api/search";
import NavBar from "../../src/components/NavBar";
import Stack from "@mui/material/Stack";

interface ResponseImageData {
  _id: string;
  price: number;
  tag: string;
  userEmail: string;
  imageUrl: string;
  description: string;
}

export default function SearchInsidePage() {
  const router = useRouter();
  const { tag } = router.query;
  const tagString = tag as string;

  const [category, setCategory] = useState<ResponseImageData[]>([]);
  const [page, setPage] = useState(1);
  const [loaderHandler, setLoaderHandler] = useState(true);
  const [Error, setError] = useState(null);
  const [links, setLinks] = useState([]);
  const [prevUrl, setPrevUrl] = useState("");

  let limit = 10;

  const fetchImages = async () => {
    try {
      
      //console.log(tag, 'axiosrequestTag')
      //console.log(page, "axiosrequestPage");
      const res = await searchPosts(tag, page, limit);
      
      if (res.status === 200) {
        setCategory([...category, ...res.data]);
        setPage(page + 1);
        if ([...res.data].length === 0) {
          setLoaderHandler(false);
        }
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const resetCategoryState = async (newTag: string) => {
    setCategory([]);
    setPage(1);
    setLoaderHandler(true);
    router.push(`/search/${newTag}`);
    
    
  };
  const getSynonyms = async (word: string) => {
    try {
      const response = await fetch(
        `https://words.bighugelabs.com/api/2/3f3f84727a0ebebcff3c969e871a286a/${word}/json`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const synonyms = data?.noun?.syn || data?.verb?.syn || [];
      // check if the response contains synonyms for the noun or verb form of the word, otherwise return an empty array
      return synonyms;
    } catch (error) {
      console.error("Error fetching synonyms:", error);
      return [];
    }
  };
  useEffect(() => {
    // Save the previous URL when the component mounts
    setPrevUrl(window.location.href);

    const handlePopstate = () => {
      // Check if the user has navigated back
      if (window.location.href === prevUrl) {
        // Reset the page state to 1
        setCategory([]);
        setPage(1);
        setLoaderHandler(true);
        // Fetch the images for the new category
        fetchImages();
      }
      // Update the previous URL
      setPrevUrl(window.location.href);
    };

    // Add an event listener to the window object
    window.addEventListener("popstate", handlePopstate);

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [tag]);

  useEffect(() => {
    if (!router.isReady) return;
    getSynonyms(tagString).then((result) => {
      //console.log(result);
      setLinks(result);
    });
    fetchImages();
    
  }, [tag]);

  return (
    <>
      <NavBar isFixed={false} color="#000000" />
      <Typography
        variant="h3"
        sx={{
          ml: 5,
          mt: 5,
          fontWeight: 500,
        }}
      >
        Search: '{tag} image'
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 4, md: 6 }}
        sx={{ ml: 5, mt: 7 }}
      >
        {links.map((link) => (
          <Button
            key={link}
            variant="outlined"
     
            color="primary"
            onClick={() => {
              resetCategoryState(link);
            }}
          >
            {link}
          </Button>
          //</Link>
        ))}
      </Stack>
      {/*<h1>Category: '{tag} image'</h1>*/}
      <Box sx={{ width: "100%", height: "100%", overflowY: "scroll" }}>
        <InfiniteScroll
          dataLength={category.length}
          next={fetchImages}
          hasMore={true}
          loader={loaderHandler ? <Loader /> : <NoMore />}
          //scrollThreshold={0.9}
        >
          <Masonry
            columns={{ sm: 2, md: 3 }}
            spacing={2}
            sx={{ m: "auto", mt: 15 }}
          >
            {category.map((category) => (
              <Post
                url={category.imageUrl}
                filename={category.imageUrl}
                key={category._id}
              />
            ))}
          </Masonry>
        </InfiniteScroll>
      </Box>
    </>
  );
}
