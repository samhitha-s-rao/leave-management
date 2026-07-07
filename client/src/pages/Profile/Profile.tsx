import {
  Avatar,
  Box,
  Chip,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Profile = () => {
  const user =
    JSON.parse(localStorage.getItem("user") || "null") ||
    JSON.parse(sessionStorage.getItem("user") || "null");

  if (!user) {
    return (
      <Typography variant="h6">
        User not found.
      </Typography>
    );
  }

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          color: "#1A3E7A",
          fontWeight: 700,
          mb: 3,
        }}
      >
        MY PROFILE
      </Typography>

      <Paper
        elevation={2}
        sx={{
          borderRadius: 3,
          p: 5,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          gap={8}
        >
          {/* Left Section */}

          <Box
            width="35%"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Avatar
              sx={{
                width: 160,
                height: 160,
                bgcolor: "#D9D9D9",
                border: "5px solid #1A3E7A",
              }}
            >
              <AccountCircleIcon
                sx={{
                  fontSize: 120,
                  color: "white",
                }}
              />
            </Avatar>

            <Typography
              variant="h4"
              sx={{ mt: 3 }}
            >
              {user.name}
            </Typography>

            <Chip
              label={user.role}
              sx={{
                mt: 2,
                bgcolor: "#1A3E7A",
                color: "white",
                fontWeight: 600,
              }}
            />
          </Box>

          {/* Right Section */}

          <Box flex={1}>
            <Typography
              sx={{
                color: "#1A3E7A",
                fontWeight: 700,
                mb: 2,
              }}
            >
              Personal Information
            </Typography>

            <Divider />

            <Box py={3}>
              <Typography
                color="text.secondary"
                fontWeight={600}
              >
                EMAIL
              </Typography>

              <Typography variant="h6">
                {user.email}
              </Typography>
            </Box>

            <Divider />

            <Box py={3}>
              <Typography
                color="text.secondary"
                fontWeight={600}
              >
                ROLE
              </Typography>

              <Typography variant="h6">
                {user.role}
              </Typography>
            </Box>

            <Divider />

            <Box py={3}>
              <Typography
                color="text.secondary"
                fontWeight={600}
              >
                USER ID
              </Typography>

              <Typography variant="h6">
                EMP{String(user.id).padStart(3, "0")}
              </Typography>
            </Box>

            <Divider />

            <Box py={3}>
              <Typography
                color="text.secondary"
                fontWeight={600}
              >
                DEPARTMENT
              </Typography>

              <Typography variant="h6">
                {user.role === "Admin"
                  ? "Administration"
                  : user.role === "Manager"
                  ? "Management"
                  : "Engineering"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default Profile;