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
} from "@mui/material";

const employeeHistory = [
  {
    id: "LR001",
    type: "Casual Leave",
    from: "10-Jul-2026",
    to: "12-Jul-2026",
    days: 3,
    reason: "Family Function",
    status: "Approved",
  },
  {
    id: "LR002",
    type: "Sick Leave",
    from: "18-Jul-2026",
    to: "19-Jul-2026",
    days: 2,
    reason: "Fever",
    status: "Pending",
  },
  {
    id: "LR003",
    type: "Earned Leave",
    from: "25-Jul-2026",
    to: "27-Jul-2026",
    days: 3,
    reason: "Vacation",
    status: "Rejected",
  },
];

const managerHistory = [
  {
    employee: "John",
    type: "Casual Leave",
    from: "10-Jul-2026",
    to: "12-Jul-2026",
    status: "Approved",
  },
  {
    employee: "David",
    type: "Sick Leave",
    from: "15-Jul-2026",
    to: "16-Jul-2026",
    status: "Pending",
  },
  {
    employee: "Alex",
    type: "Earned Leave",
    from: "20-Jul-2026",
    to: "22-Jul-2026",
    status: "Rejected",
  },
];

const LeaveHistory = () => {

  const user =
    JSON.parse(localStorage.getItem("user") || "null") ||
    JSON.parse(sessionStorage.getItem("user") || "null");

  if (!user) return null;

  return (
    <div style={{ padding: "30px" }}>

      <Typography variant="h4" mb={3}>
        Leave History
      </Typography>

      <TableContainer component={Paper}>

        <Table>

          {user.role === "Employee" && (
            <>
              <TableHead>
                <TableRow>
                  <TableCell>Request ID</TableCell>
                  <TableCell>Leave Type</TableCell>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell>Days</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {employeeHistory.map((leave) => (
                  <TableRow key={leave.id}>
                    <TableCell>{leave.id}</TableCell>
                    <TableCell>{leave.type}</TableCell>
                    <TableCell>{leave.from}</TableCell>
                    <TableCell>{leave.to}</TableCell>
                    <TableCell>{leave.days}</TableCell>
                    <TableCell>{leave.reason}</TableCell>
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
            </>
          )}

          {(user.role === "Manager" || user.role === "Admin") && (
            <>
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell>Leave Type</TableCell>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {managerHistory.map((leave, index) => (
                  <TableRow key={index}>
                    <TableCell>{leave.employee}</TableCell>
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
            </>
          )}

        </Table>

      </TableContainer>

    </div>
  );
};

export default LeaveHistory;