import { Box, Card, Typography } from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WeekendIcon from "@mui/icons-material/Weekend";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import type { MonthlyAttendance } from "../../api/attendanceApi";

interface AttendanceSummaryProps {
  attendance: MonthlyAttendance;
}

const AttendanceSummary = ({
  attendance,
}: AttendanceSummaryProps) => {
  const cards = [
    {
      title: "Present",
      value: attendance.present,
      icon: <CheckCircleIcon color="success" />,
    },
    {
      title: "Absent",
      value: attendance.absent,
      icon: <EventBusyIcon color="error" />,
    },
    {
      title: "Leave",
      value: attendance.leave,
      icon: <EventAvailableIcon color="primary" />,
    },
    {
      title: "Half Day",
      value: attendance.halfDay,
      icon: <AccessTimeIcon color="warning" />,
    },
    {
      title: "Weekly Off",
      value: attendance.weeklyOff,
      icon: <WeekendIcon color="disabled" />,
    },
    {
      title: "Total Days",
      value: attendance.totalDays,
      icon: <CalendarMonthIcon color="info" />,
    },
  ];

  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        xs: "1fr",
        sm: "repeat(2,1fr)",
        md: "repeat(3,1fr)",
        lg: "repeat(6,1fr)",
      }}
      gap={2}
      mb={3}
    >
      {cards.map((card) => (
        <Card
          key={card.title}
          sx={{
            p: 2,
            textAlign: "center",
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          {card.icon}

          <Typography mt={1}>
            {card.title}
          </Typography>

          <Typography
            variant="h5"
            fontWeight="bold"
          >
            {card.value}
          </Typography>
        </Card>
      ))}
    </Box>
  );
};

export default AttendanceSummary;