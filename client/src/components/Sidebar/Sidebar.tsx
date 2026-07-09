
import { 
  Divider,
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography 
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PostAddIcon from '@mui/icons-material/PostAdd';
import HistoryIcon from '@mui/icons-material/History';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RateReviewIcon from '@mui/icons-material/RateReview';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FactCheckIcon from "@mui/icons-material/FactCheck";
import './Sidebar.css';
import type {  SidebarProps, SidebarItem } from "../../types";
import SettingsIcon from "@mui/icons-material/Settings";

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon fontSize="small" />,
    roles: ['Employee', 'Manager', 'Admin'],
  },
  {
    text: 'Apply Leave',
    icon: <PostAddIcon fontSize="small" />,
    roles: ['Employee', 'Manager', 'Admin'],
  },
  {
    text: 'Leave History',
    icon: <HistoryIcon fontSize="small" />,
    roles: ['Employee', 'Manager', 'Admin'],
  },
  {
    text: 'View Requests',
    icon: <RateReviewIcon fontSize="small" />,
    roles: ['Manager', 'Admin'], 
  },
  {
    text: 'Notification',
    icon: <NotificationsNoneIcon fontSize="small" />,
    roles: ['Employee', 'Manager', 'Admin'],
  },
  {
    text: 'Users / Profile',
    icon: <AccountCircleIcon fontSize="small" />,
    roles: ['Employee', 'Manager', 'Admin'],
  },
  {
  text: "Leave Settings",
  icon: <SettingsIcon fontSize="small" />,
  roles: ["Admin"],
},
  
{
  text: 'Attendance',
  icon: <FactCheckIcon fontSize="small" />,
  roles: ['Employee','Manager', 'Admin'],
},
{
  text: 'Company Calendar',
  icon: <CalendarMonthIcon fontSize="small" />,
  roles: ['Employee', 'Manager', 'Admin'],
},

  {
  text: 'Logout',
  icon: <LogoutIcon fontSize="small" />,
  roles: ['Employee', 'Manager', 'Admin'],
},
];

export default function Sidebar({ userRole, activeItem, setActiveItem }: SidebarProps) {
 const navigate = useNavigate();
  // Filter out authorized buttons dynamically based on active session role data
  const filteredItems = SIDEBAR_ITEMS.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <div className="sidebar-container">
      {/* Sidebar Label tracking context */}
      {/* <Typography className="sidebar-header-label">
        {userRole}
      </Typography>
       */}
      <Divider sx={{ mb: 1 }} />
      
      <List disablePadding>
        {filteredItems.map((item) => {
          const isSelected = activeItem === item.text;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                className="sidebar-list-item-btn"
                selected={isSelected}
                onClick={() => {
                  
if (item.text === "Logout") {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    return;
  }

  setActiveItem(item.text);

  switch (item.text) {
    case "Dashboard":
      navigate("/dashboard");
      break;

    case "Apply Leave":
      navigate("/apply-leave");
      break;

    case "Leave History":
      navigate("/leave-history");
      break;
    
    case "Attendance":
      navigate("/attendance");
      break;

    case "View Requests":
      navigate("/view-requests");
      break;

    case "Notification":
      navigate("/notification");
      break;

    case "Users / Profile":
      navigate("/profile");
      break;

      case "Leave Settings":
  navigate("/leave-settings");
  break;
  
    case "Company Calendar":
      navigate("/company-calendar");
      break;

    default:
      break;
  }
}}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                
                <ListItemText 
                  className="sidebar-list-item-text"
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '14px',
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        fontWeight: isSelected ? 700 : 500, 
                      }}
                    >
                      {item.text}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}