import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "./ApplyLeave.css";

import {
  applyLeave,
  getLeaveTypes,
} from "../../services/leaveService";

interface LeaveType {
  leaveTypeId: number;
  leaveTypeName: string;
  allocatedLeaves: number;
}

const ApplyLeave = () => {
  const navigate = useNavigate();

  const [leaveTypes, setLeaveTypes] =
    useState<LeaveType[]>([]);

  const [leaveTypeId, setLeaveTypeId] =
    useState<number | "">("");

  const [leaveDuration, setLeaveDuration] =
    useState("Full Day");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [reason, setReason] =
    useState("");

  useEffect(() => {
    loadLeaveTypes();
  }, []);

  const loadLeaveTypes = async () => {
    try {
      const response =
        await getLeaveTypes();

      setLeaveTypes(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load leave types.");
    }
  };

  const calculateDays = () => {
    if (!startDate || !endDate)
      return 0;

    if (leaveDuration === "Half Day")
      return 0.5;

    const start =
      new Date(startDate);

    const end =
      new Date(endDate);

    const diff =
      (end.getTime() -
        start.getTime()) /
      (1000 * 60 * 60 * 24);

    return diff >= 0
      ? diff + 1
      : 0;
  };

  const handleReset = () => {
    setLeaveTypeId("");
    setLeaveDuration("Full Day");
    setStartDate("");
    setEndDate("");
    setReason("");
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !leaveTypeId ||
      !startDate ||
      !endDate ||
      !reason
    ) {
      alert(
        "Please fill all fields."
      );
      return;
    }

    if (
      leaveDuration ===
        "Half Day" &&
      startDate !== endDate
    ) {
      alert(
        "Half Day leave can only be applied for a single day."
      );
      return;
    }

    try {
      await applyLeave({
        leaveTypeId,
        startDate,
        endDate,
        leaveDuration,
        reason,
      });

      alert(
        "Leave applied successfully."
      );

      handleReset();
    } catch (error: any) {
      console.error(error);

      alert(
        error.response?.data
          ?.message ??
          "Failed to apply leave."
      );
    }
  };

  return (
    <Paper
      elevation={2}
      className="apply-card"
    >
      <Button
        startIcon={
          <ArrowBackIcon />
        }
        variant="outlined"
        sx={{ mb: 2 }}
        onClick={() =>
          navigate("/dashboard")
        }
      />

      <Typography
        variant="h4"
        className="page-title"
      >
        Apply Leave
      </Typography>

      <Typography className="page-subtitle">
        Submit a leave request
        for approval.
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        className="leave-form"
      >
        <Grid
          container
          spacing={3}
        >
          {/* Leave Type */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              select
              fullWidth
              label="Leave Type"
              value={leaveTypeId}
              onChange={(e) => {
                setLeaveTypeId(
                  Number(
                    e.target.value
                  )
                );

                setStartDate("");
                setEndDate("");
              }}
            >
              {leaveTypes.map(
                (type) => (
                  <MenuItem
                    key={
                      type.leaveTypeId
                    }
                    value={
                      type.leaveTypeId
                    }
                  >
                    {
                      type.leaveTypeName
                    }
                  </MenuItem>
                )
              )}
            </TextField>
          </Grid>

          {/* Leave Duration */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              select
              fullWidth
              label="Leave Duration"
              value={
                leaveDuration
              }
              onChange={(e) =>
                setLeaveDuration(
                  e.target.value
                )
              }
            >
              <MenuItem value="Full Day">
                Full Day
              </MenuItem>

              <MenuItem value="Half Day">
                Half Day
              </MenuItem>
            </TextField>
          </Grid>

          {/* Start Date */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              fullWidth
              type="date"
              label="Start Date"
              value={startDate}
              onChange={(e) =>
                setStartDate(
                  e.target.value
                )
              }
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: new Date()
                  .toISOString()
                  .split("T")[0],
              }}
            />
          </Grid>

          {/* End Date */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              fullWidth
              type="date"
              label="End Date"
              value={endDate}
              onChange={(e) =>
                setEndDate(
                  e.target.value
                )
              }
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min:
                  startDate ||
                  new Date()
                    .toISOString()
                    .split(
                      "T"
                    )[0],
              }}
            />
          </Grid>

          {/* Reason */}

          <Grid
            size={12}
          >
            <TextField
              fullWidth
              multiline
              rows={5}
              label="Reason"
              value={reason}
              onChange={(e) =>
                setReason(
                  e.target.value
                )
              }
            />
          </Grid>

          {/* Days */}

          <Grid
            size={12}
          >
            <div className="days-card">
              <Typography className="days-title">
                Number of Days
              </Typography>

              <Typography className="days-value">
                {calculateDays()}
              </Typography>
            </div>
          </Grid>
        </Grid>

        <div className="button-group">
          <Button
            variant="outlined"
            onClick={
              handleReset
            }
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