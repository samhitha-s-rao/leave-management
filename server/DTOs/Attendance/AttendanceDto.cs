namespace server.DTOs.Attendance
{
    public class AttendanceDto
    {
        public int AttendanceId { get; set; }

        public int UserId { get; set; }

        public string EmployeeName { get; set; } = string.Empty;

        public DateOnly AttendanceDate { get; set; }

        public TimeOnly? CheckInTime { get; set; }

        public TimeOnly? CheckOutTime { get; set; }

        public double WorkingHours { get; set; }
    }
}