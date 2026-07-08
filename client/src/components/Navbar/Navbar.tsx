import "./Navbar.css";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Avatar,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Navbar = () => {
  const navigate = useNavigate();

  const unreadNotifications = 3;

  const user =
    JSON.parse(localStorage.getItem("user") || "null") ||
    JSON.parse(sessionStorage.getItem("user") || "null");

  return (
    <AppBar
      position="static"
      elevation={1}
      className="navbar"
    >
      <Toolbar className="navbar-toolbar">
        {/* Logo */}
        <Box className="navbar-left">
          <Typography className="navbar-logo-text">
            Primordius
          </Typography>
        </Box>

        {/* Title */}
        <Typography className="navbar-title">
          Leave Management System
        </Typography>

        {/* Right Section */}
        <Box className="navbar-right">
          <IconButton
            onClick={() => navigate("/notification")}
            className="navbar-icon"
          >
            <Badge
              badgeContent={unreadNotifications}
              color="error"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton
            onClick={() => navigate("/profile")}
            className="navbar-icon"
          >
            <Avatar
                    src={user?.profileImage}
                    className="navbar-avatar"
                    >
                    {!user?.profileImage && (
                        <AccountCircleIcon
                        sx={{
                            width: "100%",
                            height: "100%",
                        }}
                        />
                    )}
                    </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;