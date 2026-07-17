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
import { useEffect, useState } from "react";
import { getUnreadCount } from "../../services/notificationService"; // Adjust path if needed
const Navbar = () => {
  const navigate = useNavigate();

  const [unreadNotifications, setUnreadNotifications] = useState(0);
useEffect(() => {
  let isMounted = true;

  (async () => {
    try {
      const count = await getUnreadCount();

      if (isMounted) {
        setUnreadNotifications(count);
      }
    } catch (error) {
      console.error("Failed to load unread count", error);
    }
  })();

  return () => {
    isMounted = false;
  };
}, []);
useEffect(() => {
  const fetchUnreadCount = async () => {
    try {
      const count = await getUnreadCount();
      setUnreadNotifications(count);
    } catch (error) {
      console.error(error);
    }
  };

  fetchUnreadCount();

  const interval = setInterval(fetchUnreadCount, 5000);

  return () => clearInterval(interval);
}, []);
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
  <Box className="company-logo">
    PT
  </Box>

  <Box className="company-info">
    <Typography className="company-name">
      Primordius Technologies
    </Typography>

    {/* <Typography className="company-subtitle">
      Pvt. Ltd.
    </Typography> */}
  </Box>
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
    invisible={unreadNotifications === 0}
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