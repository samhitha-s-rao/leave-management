import { useEffect, useState } from "react";
import { Box, CircularProgress, Alert } from "@mui/material";

import AttendanceFilters from "./AttendanceFilters";
import AttendanceSummary from "./AttendanceSummary";
import AttendanceTable from "./AttendanceTable";
import EmployeeCard from "./EmployeeCard";

import {
  getMonthlyAttendance,
  type MonthlyAttendance,
} from "../../api/attendanceApi";

const Attendance = () => {
  const today = new Date();

  const [month] = useState(today.getMonth() + 1);
  const [year] = useState(today.getFullYear());

  const [attendance, setAttendance] =
    useState<MonthlyAttendance | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const user =
    JSON.parse(localStorage.getItem("user") || "null") ||
    JSON.parse(sessionStorage.getItem("user") || "null");

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      setLoading(true);

      const data = await getMonthlyAttendance(
        month,
        year
      );

      setAttendance(data);

      setError("");
    } catch (err) {
      console.error(err);

      setError("Unable to load attendance.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        mt={5}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        {error}
      </Alert>
    );
  }

  if (!attendance) {
    return (
      <Alert severity="info">
        No attendance data found.
      </Alert>
    );
  }

  return (
    <Box p={3}>
      <EmployeeCard
        user={user}
      />

      <AttendanceFilters
    attendance={attendance}
/>

      <AttendanceSummary
        attendance={attendance}
      />

      <AttendanceTable
        attendance={attendance}
      />
    </Box>
  );
};

export default Attendance;