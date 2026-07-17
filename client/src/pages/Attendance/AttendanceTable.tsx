import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

import type { MonthlyAttendance } from "../../api/attendanceApi";

interface AttendanceTableProps {
  attendance: MonthlyAttendance;
}

const getStatus = (checkInTime: string | null) => {
  return checkInTime ? "P" : "A";
};

const getChipColor = (
  status: string
): "success" | "error" | "default" => {
  switch (status) {
    case "P":
      return "success";

    case "A":
      return "error";

    default:
      return "default";
  }
};

const formatTime = (time: string | null) => {
  if (!time) return "-";

  return time.substring(0, 5);
};

const AttendanceTable = ({
  attendance,
}: AttendanceTableProps) => {
  return (
    <Paper elevation={2} sx={{ mt: 3 }}>
      <TableContainer>
        <Table>

          <TableHead>

            <TableRow>

              <TableCell sx={{ fontWeight: "bold" }}>
                Date
              </TableCell>

              <TableCell
                align="center"
                sx={{ fontWeight: "bold" }}
              >
                Status
              </TableCell>

              <TableCell
                align="center"
                sx={{ fontWeight: "bold" }}
              >
                Check In
              </TableCell>

              <TableCell
                align="center"
                sx={{ fontWeight: "bold" }}
              >
                Check Out
              </TableCell>

              <TableCell
                align="center"
                sx={{ fontWeight: "bold" }}
              >
                Working Hours
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {attendance.attendance.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={5}
                  align="center"
                >
                  No attendance records found.
                </TableCell>

              </TableRow>

            ) : (

              attendance.attendance.map((record) => {

                const status = getStatus(
                  record.checkInTime
                );

                return (

                  <TableRow
                    key={record.attendanceId}
                  >

                    <TableCell>
                      {new Date(
                        record.attendanceDate
                      ).toLocaleDateString()}
                    </TableCell>

                    <TableCell align="center">
                      <Chip
                        label={status}
                        color={getChipColor(status)}
                        size="small"
                      />
                    </TableCell>

                    <TableCell align="center">
                      {formatTime(
                        record.checkInTime
                      )}
                    </TableCell>

                    <TableCell align="center">
                      {formatTime(
                        record.checkOutTime
                      )}
                    </TableCell>

                    <TableCell align="center">
                      {record.workingHours > 0
                        ? record.workingHours.toFixed(2)
                        : "-"}
                    </TableCell>

                  </TableRow>

                );
              })

            )}

          </TableBody>

        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AttendanceTable;