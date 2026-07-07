import React from 'react';
import { 
  Divider,
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography 
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PostAddIcon from '@mui/icons-material/PostAdd';
import HistoryIcon from '@mui/icons-material/History';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useNavigate } from "react-router-dom";
import './Sidebar.css';

// Define explicit valid user roles
type UserRole = 'Employee' | 'Manager' | 'Admin';

// Explicitly type the props passing down from Dashboard.tsx
interface SidebarProps {
  userRole: UserRole;
  activeItem: string;
  setActiveItem: React.Dispatch<React.SetStateAction<string>>;
}

interface SidebarItem {
  text: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

// Master configuration matrix for navigation nodes
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
    roles: ['Manager'], // Manager and Admin only
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
      <Typography className="sidebar-header-label">
        {userRole}
      </Typography>
      
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
  setActiveItem(item.text);

  if (item.text === "Leave History") {
    navigate("/leave-history");
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