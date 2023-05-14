import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useCheckToken } from "../../hooks/useCheckToken";
import { AppDispatch, RootState } from "../../store/store";
import { logout } from "../../store/auth/authAciton";

//Render header part of admin manager page
const Header = () => {
  const router = useRouter();
  useCheckToken();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
          minHeight: "80px",
          bgcolor: "primary.main",
          color: "primary",
        }}
      >
        <Box sx={{ ml: "30px" }}>
          <Typography variant="h5" sx={{ minWidth: 100, color: "white" }}>
            FotoPie Admin Manager
          </Typography>
        </Box>
        {isAuthenticated ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              textAlign: "center",
              mr: "30px",
            }}
          >
            <Button
              variant="contained"
              onClick={handleLogout}
              sx={{
                bgcolor: "white",
                color: "black",
                ":hover": { bgcolor: "#EAE6FF" },
              }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              textAlign: "center",
              mr: "30px",
            }}
          >
            <Button
              sx={{
                bgcolor: "white",
                color: "black",
                ":hover": { bgcolor: "#EAE6FF" },
              }}
              variant="outlined"
              onClick={() => router.push("/admin-signin")}
            >
              Login
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Header;
