import ResetRequest from "../../components/Reset/ResetRequest";
import Copyright from "../../components/Copyright";
import NavBar from "../../components/NavBar/NavBar";
import { NavBarStyles } from "../../components/NavBar/NavbarBaseline.style";
import { motion, AnimatePresence } from "framer-motion";
import { Box, CssBaseline } from "@mui/material";

const resetRequest: React.FC = () => {
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
              <ResetRequest />
            </motion.div>
          </AnimatePresence>
        </Box>
        <Copyright />
      </Box>
    </>
  );
};

export default resetRequest;
