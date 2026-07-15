import { useEffect, useState } from "react";
import {
  Box,
  Typography,
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

import type { LeaveRequest } from "../../types";

import AppTable from "../../components/common/AppTable";

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

  const columns = [
    {
      field: "userId",
      headerName: "Employee ID",
    },
    {
      field: "userName",
      headerName: "Employee Name",
    },
    {
      field: "departmentName",
      headerName: "Department",
    },
    {
      field: "leaveTypeName",
      headerName: "Leave Type",
    },
    {
      field: "startDate",
      headerName: "From Date",
    },
    {
      field: "endDate",
      headerName: "To Date",
    },
    {
      field: "numberOfDays",
      headerName: "Days",
      align: "center" as const,
    },
    {
      field: "reason",
      headerName: "Reason",
    },
    {
      field: "appliedDate",
      headerName: "Applied On",
      render: (row: LeaveRequest) =>
        row.appliedDate
          ? new Date(row.appliedDate)
              .toLocaleDateString("en-GB")
              .replace(/\//g, "-")
          : "-",
    },
    {
      field: "action",
      headerName: "Action",
      align: "center" as const,
      render: (row: LeaveRequest) => (
        <IconButton
          onClick={(e) =>
            handleClick(
              e,
              row.leaveRequestId
            )
          }
        >
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

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

      <AppTable
        columns={columns}
        rows={requests}
        noDataMessage="No pending leave requests."
      />

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