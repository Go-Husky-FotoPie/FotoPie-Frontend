import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Copyright from "../../components/Copyright";
import { motion, AnimatePresence } from "framer-motion";
import { CssBaseline } from "@mui/material";

function NotFound() {
  return (
    <>
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
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 1 }}
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
                  <h3>Oops, Something Went Wrong...</h3>

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
                      <Link href="/" color="inherit" underline="none">
                        Go Back
                      </Link>
                    </Button>
                  </div>
                  <br />
                  <br />
                  <br />
                </Box>
              </Box>
            </motion.div>
          </AnimatePresence>
        </Box>
        <Copyright />
      </Box>
    </>
  );
}

export default NotFound;
