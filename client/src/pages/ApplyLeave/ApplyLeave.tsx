import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import "./ApplyLeave.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";


const leaveTypes = [
  "Casual Leave",
  "Sick Leave",
  "Earned Leave",
  "Work From Home",
];

const ApplyLeave = () => {
   const navigate = useNavigate();
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
const [leaveDuration, setLeaveDuration] = useState("Full Day");
  const calculateDays = () => {
  if (!startDate || !endDate) return "";

  if (leaveDuration === "Half Day") {
    return 0.5;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  const diff =
    (end.getTime() - start.getTime()) /
    (1000 * 60 * 60 * 24);

  return diff >= 0 ? diff + 1 : "";
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!leaveType || !startDate || !endDate || !reason) {
      alert("Please fill all fields.");
      return;
    }
    
    if (leaveDuration === "Half Day" && startDate !== endDate) {
  alert("Half Day leave can only be applied for a single day.");
  return;
}

    alert("Leave Applied Successfully (Mock)");

    setLeaveType("");
    setStartDate("");
    setEndDate("");
    setReason("");
  };

  const handleReset = () => {
    setLeaveType("");
    setStartDate("");
    setEndDate("");
    setReason("");
  };

  return (
    <Paper elevation={2} className="apply-card">
<Button
  startIcon={<ArrowBackIcon />}
  variant="outlined"
  sx={{ mb: 2 }}
  onClick={() => navigate("/dashboard")}
>
</Button>

      <Typography variant="h4" className="page-title">
        Apply Leave
      </Typography>

      <Typography className="page-subtitle">
        Submit a leave request for approval.
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        className="leave-form"
      >

        <Grid container spacing={3}>

{/* Leave Type */}
<Grid size={{ xs: 12, md: 6 }}>
<TextField
  select
  fullWidth
  label="Leave Type"
  value={leaveType}
  onChange={(e) => {
    setLeaveType(e.target.value);

    // Reset dates whenever leave type changes
    setStartDate("");
    setEndDate("");
  }}
>
  {leaveTypes.map((type) => (
    <MenuItem key={type} value={type}>
      {type}
    </MenuItem>
  ))}
</TextField>
</Grid>

{/* Leave Duration */}
<Grid size={{ xs: 12, md: 6 }}>
  <TextField
    select
    fullWidth
    label="Leave Duration"
    value={leaveDuration}
    onChange={(e) => setLeaveDuration(e.target.value)}
  >
    <MenuItem value="Full Day">Full Day</MenuItem>
    <MenuItem value="Half Day">Half Day</MenuItem>
  </TextField>
</Grid>

        <Grid size={{ xs: 12, md: 6 }}>
  <TextField
    fullWidth
    type="date"
    label="Start Date"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
    InputLabelProps={{
      shrink: true,
    }}
    inputProps={{
      min:
        leaveType === "Sick Leave"
          ? undefined
          : new Date().toISOString().split("T")[0],
    }}
  />
</Grid>

        <Grid size={{ xs: 12, md: 6 }}>
  <TextField
    fullWidth
    type="date"
    label="End Date"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
    InputLabelProps={{
      shrink: true,
    }}
    inputProps={{
      min:
        leaveType === "Sick Leave"
          ? undefined
          : startDate || new Date().toISOString().split("T")[0],
    }}
  />
</Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              multiline
              rows={5}
              label="Reason"
              value={reason}
              onChange={(e) =>
                setReason(e.target.value)
              }
            />
          </Grid>
          <Grid size={12}>
  <div className="days-card">
    <Typography className="days-title">
      Number of Days
    </Typography>

    <Typography className="days-value">
      {calculateDays() || 0}
    </Typography>
  </div>
</Grid>

        </Grid>

        <div className="button-group">

          <Button
            variant="outlined"
            onClick={handleReset}
          >
            Reset
          </Button>

          <Button
            variant="contained"
            type="submit"
          >
            Apply Leave
          </Button>

        </div>

      </Box>

    </Paper>
  );
};

export default ApplyLeave;