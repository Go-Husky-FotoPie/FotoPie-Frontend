import { Button, Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Post from "../../src/components/PostList/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../src/components/Loader/Loader";
import Masonry from "@mui/lab/Masonry";
import NoMore from "../../src/components/Loader/NoMore";
import { categoryPosts } from "../../src/axiosRequest/api/category";

interface ResponseImageData {
  _id: string;
  price: number;
  tag: string;
  userEmail: string;
  imageUrl: string;
  description: string;
}

export default function CategoryInsidePage() {
  const router = useRouter();
  const { tag } = router.query;
  console.log({ tag });
 

  const [category, setCategory] = useState<ResponseImageData[]>([]);
  const [page, setPage] = useState(1);
  const [loaderHandler, setLoaderHandler] = useState(true);

  const [Error, setError] = useState(null);

  let limit = 10;

  //let id = props.id;
  const fetchImages = async () => {
    try {
      //console.log(tag);
      const res = await categoryPosts( tag  , page, limit);
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

  useEffect(() => {
    if (!router.isReady) return;
    fetchImages();
  }, [tag]);

  return (
    <>
      <h1>Category: '{tag}'</h1>
      {/*<h2>{props.id}</h2>*/}
      <Box sx={{ width: "100%", height: "100%", overflowY: "scroll" }}>
        <InfiniteScroll
          dataLength={category.length}
          next={fetchImages}
          hasMore={true}
          loader={loaderHandler ? <Loader /> : <NoMore />}
        >
          <Masonry columns={{ sm: 2, md: 3 }} spacing={2} sx={{ m: "auto" }}>
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