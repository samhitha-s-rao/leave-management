using System;
using System.Collections.Generic;

namespace server.DTOs.Attendance
{
    public class MonthlyAttendanceDto
    {
        public int Present { get; set; }

        public int Absent { get; set; }

        public int Leave { get; set; }

        public int HalfDay { get; set; }

        public int WeeklyOff { get; set; }

        public int TotalDays { get; set; }

        public List<AttendanceDto> Attendance { get; set; } = new();
    }
}