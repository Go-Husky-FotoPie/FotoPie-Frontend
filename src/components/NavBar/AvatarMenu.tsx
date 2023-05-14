import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import ListItemIcon from "@mui/material/ListItemIcon";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

interface avatarMenuProps {
  isMenuOpen: boolean;
  anchorEl: null | HTMLElement;
  handleMenuClose: () => void;
  handleLogout: () => void;
  id: string;
}

export default function avatarMenu({
  isMenuOpen,
  anchorEl,
  handleMenuClose,
  handleLogout,
  id,
}: avatarMenuProps) {
  const menuId = "primary-search-account-menu";

  return (
    <Menu
      disableScrollLock={true}
      anchorEl={anchorEl}
      onClick={handleMenuClose}
      open={isMenuOpen}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <div>
        <MenuItem
          component="a"
          href={`/profile/${id}`}
          onClick={handleMenuClose}
          sx={{ ":hover": { bgcolor: "secondary.main" } }}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          My Profile
        </MenuItem>

        <MenuItem
          component="a"
          href="/edit-profile"
          onClick={handleMenuClose}
          sx={{ ":hover": { bgcolor: "secondary.main" } }}
        >
          <ListItemIcon>
            <ManageAccountsIcon />
          </ListItemIcon>
          Edit Profile
        </MenuItem>

        <MenuItem
          onClick={handleLogout}
          sx={{ ":hover": { bgcolor: "secondary.main" } }}
        >
          <ListItemIcon>
            <LogoutOutlinedIcon />
          </ListItemIcon>
          Logout
        </MenuItem>
      </div>
    </Menu>
  );
}
