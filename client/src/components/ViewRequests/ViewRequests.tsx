import { useState } from "react";

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

const requestData = [
  {
    id: "EMP001",
    name: "John Doe",
    department: "IT",
    leaveType: "Casual Leave",
    fromDate: "10-Jul-2026",
    toDate: "12-Jul-2026",
    days: 3,
    reason: "Family Function",
    appliedOn: "05-Jul-2026",
  },
  {
    id: "EMP002",
    name: "Jane Smith",
    department: "HR",
    leaveType: "Sick Leave",
    fromDate: "18-Jul-2026",
    toDate: "19-Jul-2026",
    days: 2,
    reason: "Fever",
    appliedOn: "17-Jul-2026",
  },
  {
    id: "EMP003",
    name: "Alex Kumar",
    department: "Finance",
    leaveType: "Earned Leave",
    fromDate: "25-Jul-2026",
    toDate: "27-Jul-2026",
    days: 3,
    reason: "Vacation",
    appliedOn: "20-Jul-2026",
  },
];

const ViewRequests = () => {
    const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
const [rejectReason, setRejectReason] = useState("");

  const open = Boolean(anchorEl);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleApprove = () => {
  handleClose();
  alert("Leave Approved");
};

const handleReject = () => {
  handleClose();
  setOpenRejectDialog(true);
};

const handleRejectSubmit = () => {
  if (!rejectReason.trim()) {
    alert("Please enter the rejection reason.");
    return;
  }

  console.log("Reject Reason:", rejectReason);


  setRejectReason("");
  setOpenRejectDialog(false);

  alert("Leave Rejected Successfully");
};

const handleRejectCancel = () => {
  setRejectReason("");
  setOpenRejectDialog(false);
};

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ p: 4 }}>
        <Button
  startIcon={<ArrowBackIcon />}
  variant="outlined"
  sx={{ mb: 2 }}
  onClick={() => navigate("/dashboard")}
>
</Button>

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

              <TableCell>
                <b>Employee ID</b>
              </TableCell>

              <TableCell>
                <b>Employee Name</b>
              </TableCell>

              <TableCell>
                <b>Department</b>
              </TableCell>

              <TableCell>
                <b>Leave Type</b>
              </TableCell>

              <TableCell>
                <b>From Date</b>
              </TableCell>

              <TableCell>
                <b>To Date</b>
              </TableCell>

              <TableCell align="center">
                <b>Days</b>
              </TableCell>

              <TableCell>
                <b>Reason</b>
              </TableCell>

              <TableCell>
                <b>Applied On</b>
              </TableCell>

              <TableCell align="center">
                <b>Action</b>
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {requestData.map((request) => (
              <TableRow key={request.id}>

                <TableCell>{request.id}</TableCell>

                <TableCell>{request.name}</TableCell>

                <TableCell>{request.department}</TableCell>

                <TableCell>{request.leaveType}</TableCell>

                <TableCell>{request.fromDate}</TableCell>

                <TableCell>{request.toDate}</TableCell>

                <TableCell align="center">
                  {request.days}
                </TableCell>

                <TableCell>{request.reason}</TableCell>

                <TableCell>{request.appliedOn}</TableCell>

                <TableCell align="center">

                  <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                  </IconButton>

                </TableCell>

              </TableRow>
            ))}

          </TableBody>

        </Table>

      </TableContainer>

      <Menu
  anchorEl={anchorEl}
  open={open}
  onClose={handleClose}
>
  <MenuItem onClick={handleApprove}>
    Approve
  </MenuItem>

  <MenuItem
    onClick={handleReject}
    sx={{ color: "error.main" }}
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
  <DialogTitle>Reject Leave Request</DialogTitle>

  <DialogContent>
    <TextField
      autoFocus
      margin="dense"
      label="Reason for Rejection"
      fullWidth
      multiline
      rows={4}
      value={rejectReason}
      onChange={(e) => setRejectReason(e.target.value)}
      placeholder="Enter rejection reason..."
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