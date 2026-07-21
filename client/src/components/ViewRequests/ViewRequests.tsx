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

import SearchBar from "../../components/SearchBar/SearchBar";
import AppTable from "../../components/common/AppTable";

import {
  getPendingLeaves,
  leaveDecision,
} from "../../services/leaveService";

import type { LeaveRequest } from "../../types";

const ViewRequests = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedRequestId, setSelectedRequestId] =
    useState<number | null>(null);

  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);

  const [openRejectDialog, setOpenRejectDialog] =
    useState(false);

  const [rejectReason, setRejectReason] =
    useState("");

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

      await loadPendingRequests();
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

      await loadPendingRequests();
    } catch (error) {
      console.error(error);
      alert("Failed to reject leave.");
    }
  };

  const handleRejectCancel = () => {
    setRejectReason("");
    setOpenRejectDialog(false);
  };

  const filteredRequests = requests.filter(
    (request) => {
      const search =
        searchTerm.toLowerCase().trim();

      return (
        request.userId
          ?.toString()
          .includes(search) ||
        request.userName
          ?.toLowerCase()
          .includes(search) ||
        request.departmentName
          ?.toLowerCase()
          .includes(search) ||
        request.leaveTypeName
          ?.toLowerCase()
          .includes(search) ||
        request.reason
          ?.toLowerCase()
          .includes(search)
      );
    }
  );

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
        onClick={() =>
          navigate("/dashboard")
        }
      >
        Back
      </Button>

      <Box
        sx={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold" }}
        >
          Leave Requests
        </Typography>

        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search requests..."
          width={350}
        />
      </Box>

      <AppTable
        columns={columns}
        rows={filteredRequests}
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