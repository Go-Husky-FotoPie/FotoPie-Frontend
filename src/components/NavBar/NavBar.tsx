import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Link from "../../utils/Link";
import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getMe } from "../../axiosRequest/api/editUser";
import HamburgerMenu from "./HamburgerMenu";
import AvatarMenu from "./AvatarMenu";
import { logout } from "../../store/auth/authAciton";
import { useCheckToken } from "../../hooks/useCheckToken";
import { useRouter } from "next/router";
import UserIcons from "./UserIcons";
import {
  getNotificationCountAction,
  markNotificationReadAction,
} from "../../store/notificationBell/notificationBellAction";

interface NavbarProps {
  isFixed: boolean;
  color?: string;
  bgColor?: string;
  baseLine?: any;
  position?: "fixed" | "absolute" | "relative" | "static" | "sticky";
}

export default function Navbar({
  isFixed,
  color = "#FFFFFF",
  bgColor,
  baseLine,
  position,
}: NavbarProps) {
  useCheckToken();
  const { isAuthenticated, notificationCount, isNotificationRead } =
    useSelector((state: RootState) => ({
      ...state.auth,
      ...state.notificationBellSlice,
    }));
  const dispatch = useDispatch<AppDispatch>();
  const [avatarPath, setAvatarPath] = useState("");
  const [id, setId] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      // Get user info
      getMe()
        .then((res) => {
          setAvatarPath(res.data["avatarPath"]);
          setId(res.data.id);
        })
        .catch((err) => {
          router.push("/login");
        });

      dispatch(getNotificationCountAction());
    }
  }, [isAuthenticated, isNotificationRead, dispatch]);

  //Mark all new notifications as read when click notification icon
  const handleNotificationClick = () => {
    if (!router.isReady) return;
    router.push("/notification");
    router.events.on("routeChangeComplete", () => {
      dispatch(markNotificationReadAction());
    });
  };

  // set fixed navbar when scroll down
  const [fix, setFix] = useState(false);

  const setFixed = () => {
    if (window.scrollY >= 600) {
      setFix(true);
    } else {
      setFix(false);
    }
  };

  useEffect(() => {
    if (isFixed && typeof window !== "undefined") {
      window.addEventListener("scroll", setFixed);
    }
    return () => {
      if (isFixed && typeof window !== "undefined") {
        window.removeEventListener("scroll", setFixed);
      }
    };
  }, [isFixed]);

  //////////////////////////////////////////////////////////////////////////////

  // mobile menu state
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  // desktop menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // mobile menu open/close
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMenuCloseInMobileMenu = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  // Mobile logout
  const handleMobileLogout = () => {
    dispatch(logout());
    handleMenuCloseInMobileMenu();
    router.push("/");
  };

  //////////////////////////////////////////////////////////////////////////////

  // desktop menu open/close
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // desktop logout
  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    router.push("/");
  };
  const isMenuOpen = Boolean(anchorEl);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <>
        <AppBar
          color="transparent"
          elevation={0}
          sx={{
            position: fix ? "fixed" : "relative",
            backgroundColor: bgColor || (fix ? "#fff" : "transparent"),
            color: "transparent",
            height: 80,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            elevation: 0,
            "::after":
              baseLine ||
              (fix
                ? {
                    content: '""',
                    height: "8px",
                    position: "absolute",
                    top: "100%",
                    right: "0px",
                    left: "0px",
                    background:
                      "linear-gradient(rgba(9, 30, 66, 0.13) 1px, rgba(9, 30, 66, 0.13) 1px, rgba(9, 30, 66, 0.08) 1px, rgba(9, 30, 66, 0) 4px)",
                  }
                : {}),
          }}
        >
          <Toolbar
            sx={{
              mt: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: 1600,
              margin: "0 auto",
            }}
          >
            <Link
              href="/"
              underline="none"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                "&:hover": {
                  opacity: 0.9,
                },
              }}
            >
              {/* Logo  */}
              <img
                src="/logo.png"
                style={{ borderRadius: 10 }}
                alt="Fotopie_Logo"
                width={50}
                height={50}
              />

              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  ml: 2,
                  fontSize: 26,
                  fontFamily: "inherit",
                  color: fix ? "#000000" : color,
                }}
              >
                {"FotoPie"}
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1 }}></Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {isAuthenticated ? (
                <UserIcons
                  handleProfileMenuOpen={handleProfileMenuOpen}
                  notificationCount={notificationCount}
                  avatarPath={avatarPath}
                  handleNotificationClick={handleNotificationClick}
                  color={color}
                  fix={fix}
                />
              ) : (
                <Link href="/login" underline="none">
                  <Button variant="contained" sx={{ p: 1.5, pr: 2, pl: 2 }}>
                    Log In
                  </Button>
                </Link>
              )}
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon sx={{ color: fix ? "black" : color }} />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {
          <HamburgerMenu
            isMobileMenuOpen={isMobileMenuOpen}
            mobileMoreAnchorEl={mobileMoreAnchorEl}
            handleMobileMenuClose={handleMobileMenuClose}
            isAuthenticated={isAuthenticated}
            notificationCount={notificationCount}
            avatarPath={avatarPath}
            handleMobileLogout={handleMobileLogout}
            handleNotificationClick={handleNotificationClick}
            id={id}
          />
        }

        {
          <AvatarMenu
            isMenuOpen={isMenuOpen}
            anchorEl={anchorEl}
            handleMenuClose={handleMenuClose}
            handleLogout={handleLogout}
            id={id}
          />
        }
      </>
    </Box>
  );
}
