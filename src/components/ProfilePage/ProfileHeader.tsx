import { Avatar, Button, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { User } from "../../pages/profile/[profileUserId]";

interface ProfileHeaderProps {
  user: User | null;
  isGallery: boolean;
  setIsGallery: (isGallery: boolean) => void;
}
const ProfileHeader: FC<ProfileHeaderProps> = ({
  user,
  isGallery,
  setIsGallery,
}: ProfileHeaderProps) => {
  if (!user) return null;
  const { firstName, lastName, avatarPath } = user;
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={{ xs: 2, md: 4 }}
      sx={{ mt: { xs: 2, sm: 6 } }}
    >
      {/* avatar */}
      <Grid item>
        <Avatar
          alt={avatarPath}
          src={avatarPath}
          sx={{ width: { xs: 140, md: 180 }, height: { xs: 140, md: 180 } }}
        />
      </Grid>

      {/* name */}
      <Grid item>
        <Grid container direction="row" justifyContent="center" spacing={2}>
          <Grid item>
            <Typography variant="h1">{firstName}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h1">{lastName}</Typography>
          </Grid>
        </Grid>
      </Grid>

      {/* Gallery & Collection button*/}
      <Grid item>
        <Grid container justifyContent="center" spacing={{ xs: 2, md: 5 }}>
          <Grid item>
            <Button
              variant={isGallery ? "contained" : "outlined"}
              sx={{
                borderRadius: 10,
                p: 1.5,
                pl: 3,
                pr: 3,
                width: { xs: 80, md: 150 },
              }}
              onClick={() => {
                setIsGallery(true);
              }}
            >
              <Typography sx={{ fontSize: { xs: "0.6rem", md: "1rem" } }}>
                Gallery
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={!isGallery ? "contained" : "outlined"}
              sx={{
                borderRadius: 10,
                p: 1.5,
                pl: 3,
                pr: 3,
                width: { xs: 80, md: 150 },
              }}
              onClick={() => {
                setIsGallery(false);
              }}
            >
              <Typography sx={{ fontSize: { xs: "0.6rem", md: "1rem" } }}>
                Collection
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileHeader;
