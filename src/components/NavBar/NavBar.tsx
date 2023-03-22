import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Link from "../../utils/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getMe } from "../../axiosRequest/api/editUser";
import { count } from "../../axiosRequest/api/notification"
import HamburgerMenu from "./HamburgerMenu";
import AvatarMenu from "./AvatarMenu";

interface NavbarProps {
  isFixed: boolean;
  color?: string;
  bgColor?: string;
}

export default function Navbar({
  isFixed,
  color = "#FFFFFF",
  bgColor,
}: NavbarProps) {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [avatarPath, setAvatarPath] = useState("");
  const [id, setId] = useState("");
  const [newNotificationCount, setNewNotificationCount] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      getMe().then((res) => {
        setAvatarPath(res.data["avatarPath"]);
        setId(res.data.id);
      });
      
      count().then((res) => {
        setNewNotificationCount(res.data.count);
      });
    }
  }, []);

  const [fix, setFix] = useState(false);

  const setFixed = () => {
    if (window.scrollY >= 410) {
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        color="transparent"
        elevation={0}
        sx={{
          position: fix ? "fixed" : "relative",
          bgcolor: bgColor || (fix ? "#f8f8ff" : "transparent"),
        }}
      >
        <Toolbar
          sx={{
            marginTop: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo  */}
          <Link
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              "&:hover": {
                opacity: 0.8,
              },
            }}
          >
            <img
              src="/logo.png"
              style={{ borderRadius: 10 }}
              alt="Fotopie_Logo"
              width={45}
              height={45}
            />
          </Link>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
            <Link
              variant="h6"
              underline="none"
              href="/"
              sx={{
                fontSize: 24,
                fontFamily: "inherit",
                color: fix ? "#000000" : color,
              }}
            >
              {"FotoPie"}
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1 }}></Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 0.12,
              justifyContent: "space-between",
            }}
          >
            {isAuthenticated ? (
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  flexGrow: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* notifications */}
                <IconButton href="/upload" size="large" color="inherit" onClick={() => setNewNotificationCount(0)}>
                  <Badge badgeContent={newNotificationCount} color="error">
                    <NotificationsIcon
                      sx={{
                        color: fix ? "black" : color,
                        "&:hover": {
                          opacity: 0.8,
                        },
                      }}
                    />
                  </Badge>
                </IconButton>

                {/* User Profile */}
                <Avatar
                  alt="Avatar"
                  src={avatarPath}
                  // onClick={handleProfileMenuOpen}
                  sx={{
                    width: 40,
                    height: 40,
                    "&:hover": {
                      opacity: 0.8,
                    },
                  }}
                />

                <Button
                  variant="contained"
                  sx={{
                    bgcolor: fix ? "#F4DADA" : "#FBF1F1",
                    "&:hover": {
                      backgroundColor: "#F4DADA",
                    },
                  }}
                >
                  <Link href="/upload" underline="none">
                    Upload
                  </Link>
                </Button>
              </Box>
            ) : (
              <Button
                variant="contained"
                color="success"
                sx={{
                  bgcolor: fix ? "#F4DADA" : "#FBF1F1",
                }}
              >
                <Link href="/login" underline="none">
                  Log In
                </Link>
              </Button>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-haspopup="true"
              // onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon sx={{ color: fix ? "black" : color }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {HamburgerMenu}
      {AvatarMenu}
    </Box>
  );
}
