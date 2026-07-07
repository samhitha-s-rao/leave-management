import { Paper, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={2}
      sx={{
        padding: "35px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,.08)",
      }}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        sx={{ mb: 2 }}
        onClick={() => navigate("/dashboard")}
      >
        
      </Button>

      <Typography
        variant="h4"
        sx={{
          color: "#1A3E7A",
          fontWeight: "bold",
          mb: 1,
        }}
      >
        Notifications
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#666",
          mt: 3,
          fontSize: "15px",
        }}
      >
        All your notifications appear here.
      </Typography>
    </Paper>
  );
};

export default Notification;