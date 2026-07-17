import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import "../Attendance/Attendance.css";

import EmployeeCard from "../Attendance/EmployeeCard";
import AttendanceLegend from "../Attendance/AttendanceLegend";
import AttendanceTable from "../Attendance/AttendanceTable";
import AttendanceSummary from "../Attendance/AttendanceSummary";

import {
  getEmployeeMonthlyAttendance,
  type MonthlyAttendance,
} from "../../api/attendanceApi";

import {
  getUsers,
  type User,
} from "../../api/userApi";

const EmployeeAttendance = () => {
  const today = new Date();

  // State for search and filters
  const [searchText, setSearchText] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());

  const [searchedUser, setSearchedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [attendance, setAttendance] = useState<MonthlyAttendance | null>(null);
  const [error, setError] = useState("");

  // Year choices for dropdown (current year and last 3 years)
  const availableYears = Array.from(
    { length: 4 },
    (_, i) => today.getFullYear() - i
  );

  // Month choices helper
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  // Load all users on mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.error("Failed to load users", err);
        setError("Failed to fetch user directory. Please check your credentials.");
      }
    };

    loadUsers();
  }, []);

  // Automatically fetch fresh attendance if the selected month or year changes for an active search
  useEffect(() => {
    if (searchedUser) {
      fetchAttendanceForUser(searchedUser.userId, selectedMonth, selectedYear);
    }
  }, [selectedMonth, selectedYear]);

  // Main logic to call your path-parameterized API
  const fetchAttendanceForUser = async (userId: number, month: number, year: number) => {
    try {
      const data = await getEmployeeMonthlyAttendance(userId, month, year);
      setAttendance(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load attendance records for the selected period.");
      setAttendance(null);
    }
  };

  const handleSearch = async () => {
    const value = searchText.trim().toLowerCase();

    if (!value) {
      setError("Please enter employee name or email.");
      setSearchedUser(null);
      setAttendance(null);
      return;
    }

    const user = users.find(
      (u) =>
        u.name.toLowerCase().includes(value) ||
        u.email.toLowerCase().includes(value)
    );

    if (!user) {
      setError("Employee not found.");
      setSearchedUser(null);
      setAttendance(null);
      return;
    }

    setSearchedUser(user);
    await fetchAttendanceForUser(user.userId, selectedMonth, selectedYear);
  };

  return (
    <div className="attendance-page">
      <Box mb={3}>
        <Typography fontSize={30} fontWeight={700}>
          EMPLOYEE ATTENDANCE
        </Typography>
        <Typography color="gray">
          Search an employee or manager and select a period to view their detailed logs.
        </Typography>
      </Box>

      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
        }}
      >
        <Box
          display="flex"
          gap={2}
          flexWrap="wrap"
          alignItems="center"
        >
          {/* Search Bar */}
          <TextField
            sx={{ flexGrow: 2, minWidth: "250px" }}
            label="Search Employee Name or Email"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Month Selector */}
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel id="month-select-label">Month</InputLabel>
            <Select
              labelId="month-select-label"
              value={selectedMonth}
              label="Month"
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
            >
              {months.map((m) => (
                <MenuItem key={m.value} value={m.value}>
                  {m.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Year Selector */}
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="year-select-label">Year</InputLabel>
            <Select
              labelId="year-select-label"
              value={selectedYear}
              label="Year"
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {availableYears.map((yr) => (
                <MenuItem key={yr} value={yr}>
                  {yr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Search Button */}
          <Button
            variant="contained"
            size="large"
            onClick={handleSearch}
            sx={{
              minWidth: 130,
              height: 56,
            }}
          >
            Search
          </Button>
        </Box>

        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}
      </Paper>

      {searchedUser && (
        <>
          <EmployeeCard
            user={{
              id: searchedUser.userId,
              name: searchedUser.name,
              email: searchedUser.email,
              role: "Employee",
              designation: searchedUser.designation,
            }}
          />


          {attendance && (
            <>
              <AttendanceSummary attendance={attendance} />
              <AttendanceTable attendance={attendance} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default EmployeeAttendance;