import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Button,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const myLeaveHistory = [
  {
    id: "ML001",
    type: "Casual Leave",
    from: "10-Jul-2026",
    to: "12-Jul-2026",
    days: 3,
    reason: "Family Function",
    status: "Approved",
  },
  {
    id: "ML002",
    type: "Earned Leave",
    from: "20-Jul-2026",
    to: "22-Jul-2026",
    days: 3,
    reason: "Vacation",
    status: "Pending",
  },
  {
    id: "ML003",
    type: "Sick Leave",
    from: "28-Jul-2026",
    to: "29-Jul-2026",
    days: 2,
    reason: "Fever",
    status: "Rejected",
  },
];

const employeeHistory = [
  {
    employee: "John",
    role: "Employee",
    type: "Casual Leave",
    from: "10-Jul-2026",
    to: "12-Jul-2026",
    status: "Approved",
  },
  {
    employee: "David",
    role: "Manager",
    type: "Sick Leave",
    from: "15-Jul-2026",
    to: "16-Jul-2026",
    status: "Pending",
  },
  {
    employee: "Alex",
    role: "Employee",
    type: "Earned Leave",
    from: "20-Jul-2026",
    to: "22-Jul-2026",
    status: "Rejected",
  },
];

const LeaveHistory = () => {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user") || "null") ||
    JSON.parse(sessionStorage.getItem("user") || "null");

  if (!user) return null;

  return (
    <Box sx={{ p: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        sx={{ mb: 3 }}
        onClick={() => navigate("/dashboard")}
      >
        
      </Button>

      <Typography variant="h4" mb={4}>
        Leave History
      </Typography>

      {/* Employee */}
      {user.role === "Employee" && (
        <>
          <Typography variant="h5" mb={2}>
            My Leave History
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Request ID</b>
                  </TableCell>
                  <TableCell>
                    <b>Leave Type</b>
                  </TableCell>
                  <TableCell>
                    <b>From</b>
                  </TableCell>
                  <TableCell>
                    <b>To</b>
                  </TableCell>
                  <TableCell>
                    <b>Days</b>
                  </TableCell>
                  <TableCell>
                    <b>Status</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {myLeaveHistory.map((leave) => (
                  <TableRow key={leave.id}>
                    <TableCell>{leave.id}</TableCell>
                    <TableCell>{leave.type}</TableCell>
                    <TableCell>{leave.from}</TableCell>
                    <TableCell>{leave.to}</TableCell>
                    <TableCell>{leave.days}</TableCell>

                    <TableCell>
                      <Chip
                        label={leave.status}
                        color={
                          leave.status === "Approved"
                            ? "success"
                            : leave.status === "Pending"
                            ? "warning"
                            : "error"
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Manager & Admin */}
      {(user.role === "Manager" || user.role === "Admin") && (
        <>
          <Typography variant="h5" mb={2}>
            My Leave History
          </Typography>

          <TableContainer component={Paper} sx={{ mb: 5 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Request ID</b>
                  </TableCell>
                  <TableCell>
                    <b>Leave Type</b>
                  </TableCell>
                  <TableCell>
                    <b>From</b>
                  </TableCell>
                  <TableCell>
                    <b>To</b>
                  </TableCell>
                  <TableCell>
                    <b>Days</b>
                  </TableCell>
                  <TableCell>
                    <b>Status</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {myLeaveHistory.map((leave) => (
                  <TableRow key={leave.id}>
                    <TableCell>{leave.id}</TableCell>
                    <TableCell>{leave.type}</TableCell>
                    <TableCell>{leave.from}</TableCell>
                    <TableCell>{leave.to}</TableCell>
                    <TableCell>{leave.days}</TableCell>

                    <TableCell>
                      <Chip
                        label={leave.status}
                        color={
                          leave.status === "Approved"
                            ? "success"
                            : leave.status === "Pending"
                            ? "warning"
                            : "error"
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h5" mb={2}>
            Employee Leave History
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Employee</b>
                  </TableCell>

                  {user.role === "Admin" && (
                    <TableCell>
                      <b>Role</b>
                    </TableCell>
                  )}

                  <TableCell>
                    <b>Leave Type</b>
                  </TableCell>

                  <TableCell>
                    <b>From</b>
                  </TableCell>

                  <TableCell>
                    <b>To</b>
                  </TableCell>

                  <TableCell>
                    <b>Status</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {employeeHistory.map((leave, index) => (
                  <TableRow key={index}>
                    <TableCell>{leave.employee}</TableCell>

                    {user.role === "Admin" && (
                      <TableCell>{leave.role}</TableCell>
                    )}

                    <TableCell>{leave.type}</TableCell>

                    <TableCell>{leave.from}</TableCell>

                    <TableCell>{leave.to}</TableCell>

                    <TableCell>
                      <Chip
                        label={leave.status}
                        color={
                          leave.status === "Approved"
                            ? "success"
                            : leave.status === "Pending"
                            ? "warning"
                            : "error"
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default LeaveHistory;