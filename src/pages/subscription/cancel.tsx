import Copyright from "../../components/Copyright";
import { NavBarStyles } from "../../components/NavBar/NavbarBaseline.style";
import NavBar from "../../components/NavBar/NavBar";
import Button from "@mui/material/Button";
import Link from "next/link";
import Box from "@mui/material/Box";
import { motion, AnimatePresence } from "framer-motion";
import { CssBaseline } from "@mui/material";

export default function SubscriptionPage() {
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
              <NavBar isFixed={false} color="#000000" baseLine={NavBarStyles} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30%",
                  }}
                >
                  <img src="/payment-cancelled.jpg" alt=""></img>
                </Box>
                <h1>Payment Cancelled</h1>
                <br />
                <Link href="/" passHref style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "primary.dark",
                      },
                    }}
                  >
                    Home Page
                  </Button>
                </Link>
              </Box>
            </motion.div>
          </AnimatePresence>
        </Box>
        <Copyright />
      </Box>
    </>
  );
}
