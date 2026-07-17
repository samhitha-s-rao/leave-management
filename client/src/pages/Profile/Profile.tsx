import { useEffect, useState } from "react";
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

import {
  getProfile,
  updateProfile,
} from "../../services/profileService";

import type { UserProfile } from "../../types";

const Profile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] =
    useState<UserProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [profileImage, setProfileImage] =
    useState("");

  const [isEditing, setIsEditing] =
    useState(false);

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      console.log("Calling getProfile...");

      const data = await getProfile();

      console.log("Received:", data);

      setProfile(data);

      console.log("setProfile completed");

      setPhone(data.phone ?? "");
      setAddress(data.address ?? "");
    } catch (err) {
      console.error("ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!profile) {
    return (
      <Typography variant="h6">
        Unable to load profile.
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
      setProfileImage(
        reader.result as string
      );
    };

    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      await updateProfile({
        phoneNumber: phone,
        address,
      });

      setProfile({
        ...profile,
        phone,
        address,
      });

      setIsEditing(false);

      alert(
        "Profile updated successfully!"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to update profile."
      );
    }
  };

  const handleCancel = () => {
    setPhone(profile.phone ?? "");
    setAddress(profile.address ?? "");
    setProfileImage("");

    setIsEditing(false);
  };

  return (
    <Box className="profile-page">
      <Button
        startIcon={<ArrowBack />}
        variant="outlined"
        onClick={() =>
          navigate("/dashboard")
        }
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      <Typography className="profile-title">
        My Profile
      </Typography>

      <Paper
        elevation={3}
        className="profile-card"
      >
        <Grid
          container
          spacing={4}
          alignItems="flex-start"
        >
          {/* Left Section */}

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
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
                    onChange={
                      handleImageUpload
                    }
                  />
                </Button>
              )}

              <Typography
                variant="h5"
                className="profile-name"
              >
                {profile.name}
              </Typography>

              <Chip
                label={profile.role}
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

          <Grid
            size={{
              xs: 12,
              md: 8,
            }}
          >
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
                  {profile.email}
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
                  {profile.role}
                </Typography>
              </Box>
            </Box>

            <Box className="info-row">
              <AccountCircle className="icon" />

              <Box flex={1}>
                <Typography className="label">
                  Employee ID
                </Typography>

                <Typography className="value">
                  {profile.employeeId}
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
                  {profile.department}
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
                    onClick={() =>
                      setIsEditing(true)
                    }
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