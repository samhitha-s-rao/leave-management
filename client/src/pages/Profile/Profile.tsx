import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
  Chip,
} from "@mui/material";
import { Grid } from "@mui/material";// Using Grid2 as per modern MUI standards to avoid layout shifts
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";

import "./Profile.css";

const Profile = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+91 9876543210",
    role: "Software Engineer",
    department: "Engineering",
    photo: "",
  };

  return (
    // Box wrapper style matches the existing dashboard widths seamlessly
    <Box
  className="profile-page"
  sx={{
    width: "100%",
    mt: 1,
  }}
>
      <Typography 
        variant="h6" 
        sx={{ 
          color: "#1A3E7A", 
          fontWeight: 700, 
          mb: 2,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          fontSize: "16px"
        }}
      >
        My Profile
      </Typography>

      {/* Styled to inherit the look and feel of your existing dashboard cards */}
      <Card
  className="profile-card"
  sx={{
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    backgroundColor: "#fff",
  }}
>
        <CardContent sx={{ padding: "0 !important" }}>
          <Grid container spacing={3}>
            {/* Left Section */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={2} alignItems="center">
                <Avatar
                  src={user.photo}
                  className="profile-avatar"
              />

               <Typography
    variant="h5"
    className="profile-name"
>
    {user.name}
</Typography>

                <Chip
    label={user.role}
    className="profile-role"
    sx={{
        bgcolor:"#1A3E7A",
        color:"#fff",
        fontWeight:600,
        px:1,
        borderRadius:"20px"
    }}
/>
              </Stack>
            </Grid>

            {/* Right Section */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#1A3E7A",
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                Personal Information
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Stack spacing={2}>
                <Box className="info-row" sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <EmailOutlinedIcon className="icon" sx={{ color: "#1A3E7A" }} />
                  <Box>
                    <Typography className="label" variant="caption" sx={{ color: "#666", display: "block" }}>Email</Typography>
                    <Typography className="value">
    {user.email}
</Typography>
                  </Box>
                </Box>

                <Box className="info-row" sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <PhoneOutlinedIcon className="icon" sx={{ color: "#1A3E7A" }} />
                  <Box>
                    <Typography className="label" variant="caption" sx={{ color: "#666", display: "block" }}>Phone</Typography>
                    <Typography variant="body2">{user.phone}</Typography>
                  </Box>
                </Box>

                <Box className="info-row" sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <BadgeOutlinedIcon className="icon" sx={{ color: "#1A3E7A" }} />
                  <Box>
                    <Typography className="label" variant="caption" sx={{ color: "#666", display: "block" }}>Role</Typography>
                    <Typography variant="body2">{user.role}</Typography>
                  </Box>
                </Box>

                <Box className="info-row" sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <BusinessOutlinedIcon className="icon" sx={{ color: "#1A3E7A" }} />
                  <Box>
                    <Typography className="label" variant="caption" sx={{ color: "#666", display: "block" }}>Department</Typography>
                    <Typography variant="body2">{user.department}</Typography>
                  </Box>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;