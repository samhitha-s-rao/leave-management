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

const totalDays = 31;

const getStatus = (day: number) => {
  if (day === 5 || day === 12 || day === 19 || day === 26)
    return "WO";

  if (day === 10)
    return "L";

  if (day === 18)
    return "A";

  if (day === 25)
    return "HD";

  return "P";
};

const getChipColor = (status: string) => {
  switch (status) {
    case "P":
      return "success";

    case "A":
      return "error";

    case "L":
      return "primary";

    case "WO":
      return "default";

    case "HD":
      return "warning";

    default:
      return "default";
  }
};

const AttendanceTable = () => {
  return (
    <Paper elevation={2} sx={{ mt: 3 }}>

      <TableContainer
        sx={{
          maxHeight: 550,
          overflowX: "auto",
        }}
      >

        <Table
          stickyHeader
          sx={{
            minWidth: 2200,
          }}
        >

          <TableHead>

            <TableRow>

              <TableCell
                sx={{
                  minWidth: 180,
                  fontWeight: "bold",
                  background: "#f5f5f5",
                  position: "sticky",
                  left: 0,
                  zIndex: 10,
                }}
              >
                Attendance Details
              </TableCell>

              {Array.from({ length: totalDays }, (_, i) => (

                <TableCell
                  key={i}
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    background: "#f5f5f5",
                  }}
                >
                  {i + 1}
                </TableCell>

              ))}

            </TableRow>

          </TableHead>

          <TableBody>

            {/* STATUS ROW */}

            <TableRow>

              <TableCell
                sx={{
                  fontWeight: "bold",
                  position: "sticky",
                  left: 0,
                  background: "#fff",
                  zIndex: 5,
                }}
              >
                Status
              </TableCell>

              {Array.from({ length: totalDays }, (_, i) => {

                const status = getStatus(i + 1);

                return (
                  <TableCell
                    key={i}
                    align="center"
                  >

                    <Chip
                      label={status}
                      color={getChipColor(status)}
                      size="small"
                    />

                  </TableCell>
                );
              })}

            </TableRow>

            {/* IN TIME */}

            <TableRow>

              <TableCell
                sx={{
                  fontWeight: "bold",
                  position: "sticky",
                  left: 0,
                  background: "#fff",
                }}
              >
                In Time
              </TableCell>

              {Array.from({ length: totalDays }, (_, i) => {

                const status = getStatus(i + 1);

                return (
                  <TableCell
                    key={i}
                    align="center"
                  >
                    {status === "P"
                      ? "09:00"
                      : "-"}
                  </TableCell>
                );

              })}

            </TableRow>

            {/* OUT TIME */}

            <TableRow>

              <TableCell
                sx={{
                  fontWeight: "bold",
                  position: "sticky",
                  left: 0,
                  background: "#fff",
                }}
              >
                Out Time
              </TableCell>

              {Array.from({ length: totalDays }, (_, i) => {

                const status = getStatus(i + 1);

                return (
                  <TableCell
                    key={i}
                    align="center"
                  >
                    {status === "P"
                      ? "18:00"
                      : "-"}
                  </TableCell>
                );

              })}

            </TableRow>

            {/* WORKING HOURS */}

            <TableRow>

              <TableCell
                sx={{
                  fontWeight: "bold",
                  position: "sticky",
                  left: 0,
                  background: "#fff",
                }}
              >
                Working Hrs
              </TableCell>

              {Array.from({ length: totalDays }, (_, i) => {

                const status = getStatus(i + 1);

                return (
                  <TableCell
                    key={i}
                    align="center"
                  >
                    {status === "P"
                      ? "9.0"
                      : "-"}
                  </TableCell>
                );

              })}

            </TableRow>
                        {/* OT HOURS */}

            <TableRow>

              <TableCell
                sx={{
                  fontWeight: "bold",
                  position: "sticky",
                  left: 0,
                  background: "#fff",
                }}
              >
                OT Hrs
              </TableCell>

              {Array.from({ length: totalDays }, (_, i) => {

                const status = getStatus(i + 1);

                return (
                  <TableCell
                    key={i}
                    align="center"
                  >
                    {status === "P"
                      ? "0"
                      : "-"}
                  </TableCell>
                );

              })}

            </TableRow>

            {/* REMARKS */}

            <TableRow>

              <TableCell
                sx={{
                  fontWeight: "bold",
                  position: "sticky",
                  left: 0,
                  background: "#fff",
                }}
              >
                Remarks
              </TableCell>

              {Array.from({ length: totalDays }, (_, i) => {

                const status = getStatus(i + 1);

                let remark = "-";

                if (status === "L")
                  remark = "Leave";

                if (status === "WO")
                  remark = "Weekend";

                if (status === "A")
                  remark = "Absent";

                if (status === "HD")
                  remark = "Half Day";

                return (
                  <TableCell
                    key={i}
                    align="center"
                  >
                    {remark}
                  </TableCell>
                );

              })}

            </TableRow>

            {/* DAY COUNT */}

            <TableRow>

              <TableCell
                sx={{
                  fontWeight: "bold",
                  position: "sticky",
                  left: 0,
                  background: "#fff",
                }}
              >
                Day Count
              </TableCell>

              {Array.from({ length: totalDays }, (_, i) => (

                <TableCell
                  key={i}
                  align="center"
                >
                  {i + 1}
                </TableCell>

              ))}

            </TableRow>

            {/* PRESENT COUNT */}

            <TableRow>

              <TableCell
                sx={{
                  fontWeight: "bold",
                  position: "sticky",
                  left: 0,
                  background: "#fff",
                }}
              >
                Present Count
              </TableCell>

              {Array.from({ length: totalDays }, (_, i) => {

                let count = 0;

                for (let j = 1; j <= i + 1; j++) {

                  if (getStatus(j) === "P") {
                    count++;
                  }

                }

                return (
                  <TableCell
                    key={i}
                    align="center"
                  >
                    {count}
                  </TableCell>
                );

              })}

            </TableRow>

          </TableBody>

        </Table>

      </TableContainer>

    </Paper>

  );

};

export default AttendanceTable;