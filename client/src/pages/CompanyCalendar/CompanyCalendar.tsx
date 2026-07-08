import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";

import {
  Box,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";


import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteIcon from "@mui/icons-material/Delete";
import type {  Holiday } from "../../types";
import "./CompanyCalendar.css";

// interface Holiday {
//   id: number;
//   title: string;
//   date: string;
// }

const CompanyCalendar: React.FC = () => {
   const navigate = useNavigate();
  const user =
    JSON.parse(localStorage.getItem("user") || "null") ||
    JSON.parse(sessionStorage.getItem("user") || "null");

  const role = user?.role || "Employee";

  const [currentDate, setCurrentDate] = useState(new Date());

  const [holidays, setHolidays] = useState<Holiday[]>([
    {
      id: 1,
      title: "Republic Day",
      date: "2026-01-26",
    },
    {
      id: 2,
      title: "Independence Day",
      date: "2026-08-15",
    },
    {
      id: 3,
      title: "Gandhi Jayanti",
      date: "2026-10-02",
    },
  ]);

  const [selectedDate, setSelectedDate] =
    useState<Date | null>(null);

  const [holidayName, setHolidayName] = useState("");

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);

  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const previousMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      )
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      )
    );
  };

  const handleDateClick = (date: Date) => {
    if (role === "Admin") {
      setSelectedDate(date);
    }
  };

  const handleAddHoliday = () => {
    if (!selectedDate || !holidayName.trim()) {
      return;
    }

    const holidayDate = format(
      selectedDate,
      "yyyy-MM-dd"
    );

    setHolidays([
      ...holidays,
      {
        id: Date.now(),
        title: holidayName,
        date: holidayDate,
      },
    ]);

    setHolidayName("");
    setSelectedDate(null);
  };

  const handleDeleteHoliday = (id: number) => {
    setHolidays(
      holidays.filter((holiday) => holiday.id !== id)
    );
  };

  const closeDialog = () => {
    setSelectedDate(null);
    setHolidayName("");
  };

  return (
    <Box className="company-calendar-page">
      <Button
  startIcon={<ArrowBackIcon />}
  variant="outlined"
  sx={{ mb: 2 }}
  onClick={() => navigate("/dashboard")}
>
</Button>
      <Typography className="calendar-title">
        Company Calendar
      </Typography>
      

      <Paper elevation={3} className="calendar-container">
        {/* Header */}

        <Box className="calendar-header">
          <Typography className="month-title">
            {format(currentDate, "MMMM yyyy")}
          </Typography>

          <Box>
            <IconButton onClick={previousMonth}>
              <ChevronLeftIcon />
            </IconButton>

            <Button
              variant="text"
              onClick={() => setCurrentDate(new Date())}
            >
              
            </Button>

            <IconButton onClick={nextMonth}>
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Week Names */}

        <Box className="calendar-weekdays">
          {[
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
          ].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </Box>

        {/* Calendar Grid */}

        <Box className="calendar-grid">
          {days.map((day) => {
            const dayHolidays = holidays.filter(
              (holiday) =>
                isSameDay(
                  new Date(holiday.date),
                  day
                )
            );

            return (
              <Box
                key={format(day, "yyyy-MM-dd")}
                onClick={() =>
                  handleDateClick(day)
                }
                className={`calendar-cell ${
                  !isSameMonth(day, monthStart)
                    ? "inactive-date"
                    : ""
                }`}
              >
                <div
                  className={`date-number ${
                    isToday(day)
                      ? "today-date"
                      : ""
                  }`}
                >
                  {format(day, "d")}
                </div>

                <Box className="holiday-list">
                  {dayHolidays.map((holiday) => (
                    <div
                      key={holiday.id}
                      className="holiday-chip"
                    >
                      <span>
                        🎉 {holiday.title}
                      </span>

                      {role === "Admin" && (
                        <DeleteIcon
                          style={{
                            fontSize: 14,
                            cursor: "pointer",
                            marginLeft: 6,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteHoliday(
                              holiday.id
                            );
                          }}
                        />
                      )}
                    </div>
                  ))}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Paper>

      {/* Add Holiday Dialog */}

      <Dialog
        open={Boolean(selectedDate)}
        onClose={closeDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Add Company Holiday
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Date:{" "}
            {selectedDate
              ? format(
                  selectedDate,
                  "dd MMM yyyy"
                )
              : ""}
          </Typography>

          <TextField
            fullWidth
            label="Holiday Name"
            value={holidayName}
            onChange={(e) =>
              setHolidayName(
                e.target.value
              )
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDialog}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleAddHoliday}
          >
            Add Holiday
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CompanyCalendar;