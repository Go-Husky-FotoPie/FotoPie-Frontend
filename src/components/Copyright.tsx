import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import { Box } from "@mui/material";

export default function Copyright(props: any) {
  return (
    <Box>

      <MuiLink
        color="inherit"
        href="/"
        sx={{
          textDecoration: "none",
          "&:hover": {
            textDecoration: "none",
          },
          backgroundColor: "#091e4221",
          opacity: 0.7,
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          Height: "10vh",
          textAlign: "center",
          lineHeight: "5vh",
          '::after': {
            content: '""',
            height: "8px",
            position: "absolute",
            top: "100%",
            right: "0px",
            left: "0px",
            background:
              "linear-gradient(rgba(9, 30, 66, 0.13) 1px, rgba(9, 30, 66, 0.13) 1px, rgba(9, 30, 66, 0.08) 1px, rgba(9, 30, 66, 0) 4px)",
          }

        }}
      >
        Copyright © 2023 FotoPie Inc. All rights reserved.
      </MuiLink>
    </Box>
  );
}
