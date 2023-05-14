import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "../../utils/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import UploadIcon from "@mui/icons-material/Upload";
import LoginIcon from "@mui/icons-material/Login";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Avatar from "@mui/material/Avatar";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LoyaltyIcon from "@mui/icons-material/Loyalty";

interface hamburgerMenuProps {
  mobileMoreAnchorEl: null | HTMLElement;
  isMobileMenuOpen: boolean;
  handleMobileMenuClose: () => void;
  isAuthenticated: boolean;
  notificationCount: number;
  avatarPath: string;
  handleMobileLogout: () => void;
  handleNotificationClick: () => void;
  id: string;
}

export default function hamburgerMenu({
  isMobileMenuOpen,
  mobileMoreAnchorEl,
  handleMobileMenuClose,
  isAuthenticated,
  notificationCount,
  avatarPath,
  handleMobileLogout,
  handleNotificationClick,
  id,
}: hamburgerMenuProps) {
  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <Menu
      disableScrollLock={true}
      anchorEl={mobileMoreAnchorEl}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {isAuthenticated ? (
        <Box>
          <MenuItem
            onClick={handleNotificationClick}
            sx={{ ":hover": { bgcolor: "secondary.main" } }}
          >
            <IconButton href="/notification" size="large" color="inherit">
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Notifications</p>
          </MenuItem>
          <MenuItem
            component="a"
            href={`/profile/${id}`}
            sx={{ ":hover": { bgcolor: "secondary.main" } }}
          >
            <Avatar
              alt="Avatar"
              src={avatarPath}
              sx={{ width: 40, height: 40, marginRight: 1 }}
            />
            <p>Profile</p>
          </MenuItem>
          <MenuItem
            component="a"
            href="/edit-profile"
            sx={{ ":hover": { bgcolor: "secondary.main" } }}
          >
            <IconButton size="large" color="inherit">
              <ManageAccountsIcon />
            </IconButton>
            <p>Edit Profile</p>
          </MenuItem>
          <MenuItem
            component="a"
            href="/upload"
            sx={{ ":hover": { bgcolor: "secondary.main" } }}
          >
            <IconButton size="large" color="inherit">
              <UploadIcon />
            </IconButton>
            <p>Upload</p>
          </MenuItem>
          <MenuItem
            component="a"
            href="/subscription"
            sx={{ ":hover": { bgcolor: "secondary.main" } }}
          >
            <IconButton size="large" color="inherit">
              <LoyaltyIcon />
            </IconButton>
            <p>FotoPie+</p>
          </MenuItem>
          <MenuItem
            onClick={handleMobileLogout}
            sx={{ ":hover": { bgcolor: "secondary.main" } }}
          >
            <IconButton size="large" color="inherit">
              <LogoutOutlinedIcon />
            </IconButton>
            <p>Log Out</p>
          </MenuItem>
        </Box>
      ) : (
        <MenuItem>
          <IconButton size="large" color="inherit">
            <LoginIcon />
          </IconButton>
          <Link href="/login" style={{ textDecoration: "none" }}>
            Log In
          </Link>
        </MenuItem>
      )}
    </Menu>
  );
}
