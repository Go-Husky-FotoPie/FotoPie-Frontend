import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Copyright from "../Copyright";
import { CssBaseline } from "@mui/material";

function InvalidToken() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            height: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: "30px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="/404.jpg"
              alt=""
              style={{
                objectFit: "contain",
                maxHeight: "60vh",
                maxWidth: "100%",
              }}
            />
            <h3>Invalid Token</h3>

            <div>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#2196f3", // Set background color
                  color: "#fff", // Set text color
                  "&:hover": {
                    bgcolor: "#1976d2", // Set background color on hover
                  },
                }}
              >
                <Link
                  href="/reset/reset-request"
                  color="inherit"
                  underline="none"
                >
                  Go Back
                </Link>
              </Button>
            </div>
            <br />
            <br />
            <br />
          </Box>
        </Box>
      </Box>
      <Copyright />
    </Box>
  );
}

export default InvalidToken;
