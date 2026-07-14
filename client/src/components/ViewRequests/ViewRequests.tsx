import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

import {
  getPendingLeaves,
  leaveDecision,
} from "../../services/leaveService";

interface LeaveRequest {
  leaveRequestId: number;
  userId: number;
  userName: string;
  departmentName: string;
  leaveTypeName: string;
  startDate: string;
  endDate: string;
  numberOfDays: number;
  reason: string;
  appliedDate: string | null;
}

const ViewRequests = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [openRejectDialog, setOpenRejectDialog] = useState(false);

  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    loadPendingRequests();
  }, []);

  const loadPendingRequests = async () => {
    try {
      const response = await getPendingLeaves();
      setRequests(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load leave requests.");
    }
  };

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    leaveRequestId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRequestId(leaveRequestId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApprove = async () => {
    try {
      if (!selectedRequestId) return;

      await leaveDecision(selectedRequestId, {
        status: "Approved",
        managerRemarks: "",
      });

      alert("Leave Approved");

      loadPendingRequests();
    } catch (error) {
      console.error(error);
      alert("Failed to approve leave.");
    }

    handleClose();
  };

  const handleReject = () => {
    handleClose();
    setOpenRejectDialog(true);
  };

  const handleRejectSubmit = async () => {
    if (!rejectReason.trim()) {
      alert("Please enter rejection reason.");
      return;
    }

    try {
      if (!selectedRequestId) return;

      await leaveDecision(selectedRequestId, {
        status: "Rejected",
        managerRemarks: rejectReason,
      });

      alert("Leave Rejected Successfully");

      setRejectReason("");
      setOpenRejectDialog(false);

      loadPendingRequests();
    } catch (error) {
      console.error(error);
      alert("Failed to reject leave.");
    }
  };

  const handleRejectCancel = () => {
    setRejectReason("");
    setOpenRejectDialog(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        sx={{ mb: 2 }}
        onClick={() => navigate("/dashboard")}
      />

      <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: "bold" }}
      >
        Leave Requests
      </Typography>

      <TableContainer component={Paper}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell><b>Employee ID</b></TableCell>
              <TableCell><b>Employee Name</b></TableCell>
              <TableCell><b>Department</b></TableCell>
              <TableCell><b>Leave Type</b></TableCell>
              <TableCell><b>From Date</b></TableCell>
              <TableCell><b>To Date</b></TableCell>
              <TableCell align="center"><b>Days</b></TableCell>
              <TableCell><b>Reason</b></TableCell>
              <TableCell><b>Applied On</b></TableCell>
              <TableCell align="center"><b>Action</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {requests.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={10}
                  align="center"
                >
                  No pending leave requests.
                </TableCell>
              </TableRow>
            ) : (
              requests.map((request) => (
                <TableRow key={request.leaveRequestId}>
              <TableCell>{request.userId}</TableCell>
              <TableCell>{request.userName}</TableCell>
              <TableCell>{request.departmentName}</TableCell>
              <TableCell>{request.leaveTypeName}</TableCell>
              <TableCell>{request.startDate}</TableCell>
              <TableCell>{request.endDate}</TableCell>

              <TableCell align="center">
                {request.numberOfDays}
              </TableCell>

              <TableCell>{request.reason}</TableCell>

              <TableCell>
                {request.appliedDate ? new Date(request.appliedDate).toLocaleDateString("en-GB").replace(/\//g, "-"): "-"}
              </TableCell>

              <TableCell align="center">
                <IconButton
                  onClick={(e) =>
                    handleClick(
                      e,
                      request.leaveRequestId
                    )
                  }
                >
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
              ))
            )}

          </TableBody>

        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleApprove}>
          Approve
        </MenuItem>

        <MenuItem
          sx={{ color: "error.main" }}
          onClick={handleReject}
        >
          Reject
        </MenuItem>
      </Menu>

      <Dialog
        open={openRejectDialog}
        onClose={handleRejectCancel}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Reject Leave Request
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            multiline
            rows={4}
            margin="dense"
            label="Reason for Rejection"
            value={rejectReason}
            onChange={(e) =>
              setRejectReason(
                e.target.value
              )
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleRejectCancel}>
            Cancel
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleRejectSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewRequests;