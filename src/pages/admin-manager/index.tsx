import Stack from "@mui/material/Stack";
import Header from "../../components/AdminManage/Header";
import Main from "../../components/AdminManage/Main";
import Copyright from "../../components/Copyright";
import { useCheckToken } from "../../hooks/useCheckToken";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Box, CssBaseline } from "@mui/material";

// Define a component that renders the page
export default function AdminManager() {
  useCheckToken();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

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
              <Stack>
                <Header />
                {isAuthenticated ? <Main /> : ""}
              </Stack>
            </motion.div>
          </AnimatePresence>
        </Box>
        <Copyright />
      </Box>
    </>
  );
}
