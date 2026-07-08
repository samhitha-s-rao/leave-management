import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  ArrowBack,
  Email,
  Phone,
  Badge,
  Business,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const storedUser =
    JSON.parse(localStorage.getItem("user") || "null") ||
    JSON.parse(sessionStorage.getItem("user") || "null");

  const [user, setUser] = useState(storedUser);
  const [phone, setPhone] = useState(storedUser?.phone || "");
  const [profileImage, setProfileImage] = useState(
    storedUser?.profileImage || ""
  );
  const [address, setAddress] = useState(storedUser?.address || "");

  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return (
      <Typography variant="h6">
        User not found.
      </Typography>
    );
  }

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      phone,
      address,
      profileImage,
    };

    if (localStorage.getItem("user")) {
      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );
    } else {
      sessionStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );
    }

    setUser(updatedUser);
    setIsEditing(false);

    alert("Profile updated successfully!");
  };

 const handleCancel = () => {
  setPhone(user.phone || "");
  setAddress(user.address || "");
  setProfileImage(user.profileImage || "");
  setIsEditing(false);
};

  return (
    <Box className="profile-page">
      <Button
        startIcon={<ArrowBack />}
        variant="outlined"
        onClick={() => navigate("/dashboard")}
        sx={{ mb: 2 }}
      >
        
      </Button>

      <Typography className="profile-title">
        MY PROFILE
      </Typography>

      <Paper elevation={3} className="profile-card">
        <Grid container spacing={2}>
          {/* Left Section */}

          <Grid size={{ xs: 12, md: 4 }}>
            <Box className="profile-left">
              <Avatar
                src={profileImage}
                className="profile-avatar"
              >
                {!profileImage && (
                  <AccountCircle
                    sx={{
                      fontSize: 120,
                    }}
                  />
                )}
              </Avatar>

              {isEditing && (
                <Button
                  component="label"
                  variant="outlined"
                  sx={{ mt: 2 }}
                >
                  Upload Photo

                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </Button>
              )}

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
                  bgcolor: "#1A3E7A",
                  color: "#fff",
                  fontWeight: 600,
                }}
              />
            </Box>
          </Grid>

          {/* Right Section */}

          <Grid size={{ xs: 12, md: 8 }}>
            <Typography className="profile-section-title">
              Personal Information
            </Typography>

            <Divider />

            <Box className="info-row">
  <Email className="icon" />

  <Box flex={1}>
    <Typography className="label">
      Email
    </Typography>

    <Typography className="value">
      {user.email}
    </Typography>
  </Box>
</Box>

            <Box className="info-row">
              <Phone className="icon" />

              <Box flex={1}>
                <Typography className="label">
                  Phone
                </Typography>

                {isEditing ? (
                  <TextField
                    fullWidth
                    size="small"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                  />
                ) : (
                  <Typography className="value">
                    {phone || "Not Available"}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box className="info-row">
              <Business className="icon" />

              <Box flex={1}>
                <Typography className="label">
                  Address
                </Typography>

                {isEditing ? (
                  <TextField
                    fullWidth
                    size="small"
                    value={address}
                    onChange={(e) =>
                      setAddress(e.target.value)
                    }
                  />
                ) : (
                  <Typography className="value">
                    {address || "Not Available"}
                  </Typography>
                )}
              </Box>
            </Box>

            <Box className="info-row">
              <Badge className="icon" />

              <Box flex={1}>
                <Typography className="label">
                  Role
                </Typography>

                <Typography className="value">
                  {user.role}
                </Typography>
              </Box>
            </Box>
                        <Box className="info-row">
              <AccountCircle className="icon" />

              <Box flex={1}>
                <Typography className="label">
                  User ID
                </Typography>

                <Typography className="value">
                  EMP{String(user.id).padStart(3, "0")}
                </Typography>
              </Box>
            </Box>

            <Box className="info-row">
              <Business className="icon" />

              <Box flex={1}>
                <Typography className="label">
                  Department
                </Typography>

                <Typography className="value">
                  {user.role === "Admin"
                    ? "Administration"
                    : user.role === "Manager"
                    ? "Management"
                    : "Engineering"}
                </Typography>
              </Box>
            </Box>

            <Box
              mt={2}
              display="flex"
              gap={2}
              justifyContent="flex-end"
            >
              {isEditing ? (
                <>
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    sx={{
                      bgcolor: "#1A3E7A",
                      "&:hover": {
                        bgcolor: "#14325f",
                      },
                    }}
                  >
                    Save Changes
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => setIsEditing(true)}
                  sx={{
                    bgcolor: "#1A3E7A",
                    "&:hover": {
                      bgcolor: "#14325f",
                    },
                  }}
                >
                  Update Profile
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Profile;