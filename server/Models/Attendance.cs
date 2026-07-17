using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class Attendance
    {
        [Key]
        public int AttendanceId { get; set; }

        public int UserId { get; set; }

        public DateOnly AttendanceDate { get; set; }

        public TimeOnly? CheckInTime { get; set; }

        public TimeOnly? CheckOutTime { get; set; }

        public double WorkingHours { get; set; }

        public User User { get; set; } = null!;
    }
}