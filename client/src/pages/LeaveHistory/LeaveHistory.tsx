import {
  Typography,
  Chip,
  Button,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";

import {
  getMyLeaves,
  getEmployeeLeaveHistory,
} from "../../services/leaveService";

import type {
  LeaveHistory,
  EmployeeLeaveHistory,
} from "../../types";

import AppTable from "../../components/common/AppTable";

const LeaveHistoryPage = () => {
  const navigate = useNavigate();

  const [myLeaveHistory, setMyLeaveHistory] =
    useState<LeaveHistory[]>([]);

  const [employeeHistory, setEmployeeHistory] =
    useState<EmployeeLeaveHistory[]>([]);

  const user =
    JSON.parse(localStorage.getItem("user") || "null") ||
    JSON.parse(sessionStorage.getItem("user") || "null");

  useEffect(() => {
    loadLeaveHistory();

    if (
      user?.role === "Manager" ||
      user?.role === "Admin"
    ) {
      loadEmployeeHistory();
    }
  }, []);

  const loadLeaveHistory = async () => {
    try {
      const response = await getMyLeaves();
      setMyLeaveHistory(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load leave history.");
    }
  };

  const loadEmployeeHistory = async () => {
    try {
      const response =
        await getEmployeeLeaveHistory();

      setEmployeeHistory(response.data);
    } catch (error) {
      console.error(error);
      alert(
        "Failed to load employee leave history."
      );
    }
  };

  if (!user) return null;

  const exportToExcel = () => {
    const data = myLeaveHistory.map((leave) => ({
      "Request ID": leave.leaveRequestId,
      "Leave Type": leave.leaveTypeName,
      From: new Date(
        leave.startDate
      ).toLocaleDateString(),
      To: new Date(
        leave.endDate
      ).toLocaleDateString(),
      Days: leave.numberOfDays,
      Status: leave.status,
    }));

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Leave History"
    );

    XLSX.writeFile(
      workbook,
      "Leave_History.xlsx"
    );
  };

  const myHistoryColumns = [
    {
      field: "leaveRequestId",
      headerName: "Request ID",
    },
    {
      field: "leaveTypeName",
      headerName: "Leave Type",
    },
    {
      field: "startDate",
      headerName: "From",
      render: (row: LeaveHistory) =>
        new Date(
          row.startDate
        ).toLocaleDateString(),
    },
    {
      field: "endDate",
      headerName: "To",
      render: (row: LeaveHistory) =>
        new Date(
          row.endDate
        ).toLocaleDateString(),
    },
    {
      field: "numberOfDays",
      headerName: "Days",
    },
    {
      field: "status",
      headerName: "Status",
      render: (row: LeaveHistory) => (
        <Chip
          label={row.status}
          color={
            row.status === "Approved"
              ? "success"
              : row.status === "Pending"
              ? "warning"
              : "error"
          }
        />
      ),
    },
  ];

  const employeeColumns = [
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
      field: "roleName",
      headerName: "Role",
    },
    
    {
      field: "leaveTypeName",
      headerName: "Leave Type",
    },
    {
      field: "startDate",
      headerName: "From",
      render: (
        row: EmployeeLeaveHistory
      ) =>
        new Date(
          row.startDate
        ).toLocaleDateString(),
    },
    {
      field: "endDate",
      headerName: "To",
      render: (
        row: EmployeeLeaveHistory
      ) =>
        new Date(
          row.endDate
        ).toLocaleDateString(),
    },
    {
      field: "numberOfDays",
      headerName: "Days",
    },
    {
      field: "status",
      headerName: "Status",
      render: (
        row: EmployeeLeaveHistory
      ) => (
        <Chip
          label={row.status}
          color={
            row.status === "Approved"
              ? "success"
              : row.status === "Pending"
              ? "warning"
              : "error"
          }
        />
      ),
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        sx={{ mb: 3 }}
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
          width: "100%",
          mb: 4,
        }}
      >
        <Typography variant="h4">
          Leave History
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={exportToExcel}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            px: 3,
          }}
        >
          Export
        </Button>
      </Box>

      <Typography
        variant="h5"
        mb={2}
      >
        My Leave History
      </Typography>

      <AppTable
        columns={myHistoryColumns}
        rows={myLeaveHistory}
        noDataMessage="No leave history found."
      />

      {(user.role === "Manager" ||
        user.role === "Admin") && (
        <>
          <Typography
            variant="h5"
            mt={4}
            mb={2}
          >
            Employee Leave History
          </Typography>

          <AppTable
            columns={employeeColumns}
            rows={employeeHistory}
            noDataMessage="No employee leave history found."
          />
        </>
      )}
    </Box>
  );
};

export default LeaveHistoryPage;