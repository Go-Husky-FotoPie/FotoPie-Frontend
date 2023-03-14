import { Button, Container, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosRequest from "../../src/utils/axiosRequest";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import NavBar from "../../src/components/NavBar";
import Gallery from "../../src/components/profile/Gallery";
import Collection from "../../src/components/profile/Collection";

export default function ProfilePage() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [avatarPath, setAvatarPath] = useState("");
  const [isGallery, setIsGallery] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  // const id = params[0];

  useEffect(() => {
    if (!router.isReady) return;

    axiosRequest(`/api/user/${id}`, "GET").then((res) => {
      // if (id !== res.data.id) return router.push("/404");
      console.log(res);
      setLastName(res.data.data.lastName);
      setFirstName(res.data.data.firstName);
      setAvatarPath(res.data.data.avatarPath);
    });
  }, [id]);

  // if (params[1] === "gallery") {
  //   return <h1>gallery</h1>;
  // }

  // if (params[2] === "collection") {
  //   return <h1>collection</h1>;
  // }

  return (
    <>
      <NavBar isFixed={false} color="#000000" />
      <Grid
        container
        direction="column"
        alignItems="center"
        sx={{ mt: 10, width: "100%" }}
      >
        {/* avatar */}
        <Grid item>
          <Avatar
            alt="avatar"
            src={avatarPath}
            sx={{ width: 180, height: 180 }}
          />
        </Grid>

        {/* name */}
        <Grid
          container
          direction="row"
          justifyContent="center"
          sx={{ mt: 5 }}
          spacing={2}
        >
          <Grid item>
            <Typography variant="h3">{firstName}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h3">{lastName}</Typography>
          </Grid>
        </Grid>

        {/* Gallery & Collection button*/}
        <Grid container justifyContent="center" sx={{ mt: 5 }} spacing={5}>
          <Grid item>
            <Button
              variant={isGallery ? "contained" : "outlined"}
              sx={{ borderRadius: 10, p: 1.5, pl: 3, pr: 3 }}
              size="large"
              onClick={() => {
                // router.push(`/profile/${id}/gallery`);
                setIsGallery(true);
              }}
            >
              <Typography>Gallery</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={!isGallery ? "contained" : "outlined"}
              sx={{ borderRadius: 10, p: 1.5, pl: 3, pr: 3 }}
              size="large"
              onClick={() => {
                // router.push(`/profile/${id}/collection`);
                setIsGallery(false);
              }}
            >
              <Typography>Collection</Typography>
            </Button>
          </Grid>
        </Grid>

        <Grid sx={{m:5}}>
          {isGallery ? (
            <Gallery id={id as string} />
          ) : (
            <Collection id={id as string} />
          )}
        </Grid>
      </Grid>
    </>
  );
}
