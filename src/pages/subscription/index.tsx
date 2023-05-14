import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import SubscriptionComponent from "../../components/Subscription/SubscriptionComponent";
import CustomerPortalComponent from "../../components/Subscription/CustomerPortalComponent";
import { getSubscriptionStatus } from "../../axiosRequest/api/subscription";
import Loader from "../../components/Loader/Loader";
import { NavBarStyles } from "../../components/NavBar/NavbarBaseline.style";
import { motion, AnimatePresence } from "framer-motion";
import Copyright from "../../components/Copyright";
import { Box, CssBaseline } from "@mui/material";

const CreateImage: React.FC = () => {
  const [status, setStatus] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getSubscription = async () => {
      try {
        setIsLoading(true);
        // Send Get request to /api/subscription/get-subscription-status
        const response = await getSubscriptionStatus();
        setStatus(response.data.subscription_status);
      } catch (error) {
        console.error({ message: error });
        setStatus(false);
      } finally {
        setIsLoading(false);
      }
    };
    getSubscription();
  }, []);

  if (isLoading === true || status === null) {
    return <Loader />;
  } else if (status === false) {
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
                <NavBar
                  isFixed={false}
                  color="#000000"
                  baseLine={NavBarStyles}
                />
                <SubscriptionComponent />
              </motion.div>
            </AnimatePresence>
          </Box>
          <Copyright />
        </Box>
      </>
    );
  } else {
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
                <NavBar
                  isFixed={false}
                  color="#000000"
                  baseLine={NavBarStyles}
                />
                <CustomerPortalComponent />
              </motion.div>
            </AnimatePresence>
          </Box>
          <Copyright />
        </Box>
      </>
    );
  }
};

export default CreateImage;
