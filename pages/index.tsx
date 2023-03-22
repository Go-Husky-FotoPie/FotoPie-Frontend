import Container from "@mui/material/Container";
import NavBar from "../src/components/NavBar";
import Header from "../src/components/Header";
import Box from "@mui/material/Box";
import PostList from "../src/components/PostList/PostList";
import { useCheckToken } from "../src/hooks/useCheckToken";

export default function Home() {
  useCheckToken();
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          backgroundImage: `
            linear-gradient(
              rgba(0, 0, 0, 0.1),
              rgba(0, 0, 0, 0.1)
            ),
            url(../../background.jpg)`,

          backgroundSize: "cover",
          // position: 'absolute',
          // top: 0,
          // left: 0,
          // right: 0,
          margin: 0,
          padding: 0,
          // overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: "100%", margin: "0 auto" }}>
          <NavBar isFixed={true} />
          <Header />
        </div>
      </Box>

      <Box sx={{ maxWidth: "1600px", m: "auto" }}>
        <PostList />
      </Box>
    </Box>
  );
}
