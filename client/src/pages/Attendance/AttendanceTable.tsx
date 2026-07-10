import { useState } from "react";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,  
  Select,
  MenuItem,
  FormControl,
  Stack,
} from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

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
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const AttendanceTable = ({
  year = 2026,
  month = 6,
}) => {
  const [selectedMonth, setSelectedMonth] = useState(month);
const [selectedYear, setSelectedYear] = useState(year);

const totalDays = getDaysInMonth(
  selectedYear,
  selectedMonth
);

  const [page, setPage] = useState(0);

  const startDay = page === 0 ? 1 : 16;

  const endDay =
    page === 0
      ? Math.min(15, totalDays)
      : totalDays;

  const visibleDays = Array.from(
    {
      length: endDay - startDay + 1,
    },
    (_, index) => startDay + index
  );
  const years = Array.from(
  { length: 10 },
  (_, index) => 2023 + index
);
  return (
    <Paper elevation={2} sx={{ mt: 3 }}>
      <div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    padding: "15px 20px 0px 20px",
  }}
>
  <Stack
    direction="row"
    spacing={2}
  >
    <FormControl size="small" sx={{ minWidth: 170 }}>
      <Select
        value={selectedMonth}
        onChange={(e) => {
          setSelectedMonth(Number(e.target.value));
          setPage(0);
        }}
      >
        {months.map((monthName, index) => (
          <MenuItem
            key={index}
            value={index}
          >
            {monthName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    <FormControl size="small" sx={{ minWidth: 120 }}>
      <Select
        value={selectedYear}
        onChange={(e) => {
          setSelectedYear(Number(e.target.value));
          setPage(0);
        }}
      >
        {years.map((year) => (
          <MenuItem
            key={year}
            value={year}
          >
            {year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Stack>
</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
        }}
      >
        <IconButton
          disabled={page === 0}
          onClick={() => setPage(0)}
        >
          <ArrowBackIosIcon />
        </IconButton>

        <b>
          {page === 0
            ? `Day 1 - Day ${Math.min(15, totalDays)}`
            : `Day 16 - Day ${totalDays}`}
        </b>

        <IconButton
          disabled={page === 1 || totalDays <= 15}
          onClick={() => setPage(1)}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>

      <TableContainer
        sx={{
          maxHeight: 550,
          overflowX: "auto",
        }}
      >
        <Table
          stickyHeader
          sx={{
            minWidth: 1200,
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
              {months[selectedMonth]} {selectedYear}
            </TableCell>

              {visibleDays.map((day) => {
              const date = new Date(selectedYear, selectedMonth, day);

              return (
                <TableCell
                  key={day}
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    background: "#f5f5f5",
                  }}
                >
                  <div>{date.toLocaleDateString("en-US", { weekday: "short" })}</div>
                  <div>{day}</div>
                </TableCell>
              );
            })}
            </TableRow>
          </TableHead>

          <TableBody>
            {/* STATUS */}

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

              {visibleDays.map((day) => {
                const status = getStatus(day);

                return (
                  <TableCell
                    key={day}
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

              {visibleDays.map((day) => {
                const status = getStatus(day);

                return (
                  <TableCell
                    key={day}
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

              {visibleDays.map((day) => {
                const status = getStatus(day);

                return (
                  <TableCell
                    key={day}
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

              {visibleDays.map((day) => {
                const status = getStatus(day);

                return (
                  <TableCell
                    key={day}
                    align="center"
                  >
                    {status === "P"
                      ? "9.0"
                      : "-"}
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