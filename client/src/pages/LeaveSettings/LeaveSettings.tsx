import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate } from "react-router-dom";

import type { LeaveType } from "../../types";
import AppTable from "../../components/common/AppTable";
import { useEffect } from "react";

import {
  fetchLeaveTypes,
  editLeaveType,
} from "../../services/leaveTypeService";

const LeaveSettings = () => {
  const navigate = useNavigate();

  const [leaveTypes, setLeaveTypes] =
  useState<LeaveType[]>([]);

  const loadLeaveTypes = async () => {
  try {
    const data =
      await fetchLeaveTypes();

    setLeaveTypes(data);
  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {
  loadLeaveTypes();
}, []);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [currentId, setCurrentId] = useState<number | null>(null);

  const [leaveType, setLeaveType] = useState("");
  const [totalLeaves, setTotalLeaves] = useState("");

  const handleEdit = (leave: LeaveType) => {
    setIsEdit(true);
    setCurrentId(leave.leaveTypeId);
    setLeaveType(leave.leaveTypeName);
    setTotalLeaves(leave.allocatedLeaves.toString());
    setOpen(true);
  };

  const handleSave = async () => {
  if (!leaveType || !totalLeaves)
    return;

  try {
    if (isEdit && currentId) {
      await editLeaveType(
        currentId,
        leaveType,
        Number(totalLeaves)
      );

      await loadLeaveTypes();
    }

    setOpen(false);
  } catch (error) {
    console.error(error);
  }
};

  const handleDelete = (id: number) => {
    setLeaveTypes((prev) =>
      prev.filter(
        (item) => item.leaveTypeId !== id
      )
    );
  };

  const columns = [
    {
      field: "leaveTypeName",
      headerName: "Leave Type",
    },
    {
      field: "allocatedLeaves",
      headerName: "Total Leaves",
    },
    {
      field: "actions",
      headerName: "Actions",
      align: "center" as const,
      render: (leave: LeaveType) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleEdit(leave)}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            color="error"
            onClick={() =>
              handleDelete(
                leave.leaveTypeId
              )
            }
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box p={4}>
      <Button
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        sx={{ mb: 2 }}
        onClick={() =>
          navigate("/dashboard")
        }
      />

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">
          Leave Settings
        </Typography>

      </Box>

      <AppTable
        columns={columns}
        rows={leaveTypes}
        noDataMessage="No leave types found."
      />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {isEdit
            ? "Edit Leave Type"
            : "Add Leave Type"}
        </DialogTitle>

        <DialogContent>
          <TextField
            label="Leave Type"
            fullWidth
            margin="normal"
            value={leaveType}
            onChange={(e) =>
              setLeaveType(
                e.target.value
              )
            }
          />

          <TextField
            label="Total Leaves"
            type="number"
            fullWidth
            margin="normal"
            value={totalLeaves}
            onChange={(e) =>
              setTotalLeaves(
                e.target.value
              )
            }
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setOpen(false)
            }
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LeaveSettings;