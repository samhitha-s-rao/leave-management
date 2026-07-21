using server.DTOs.Attendance;
using server.Models;
using server.Repositories.Interfaces;
using server.Services.Interfaces;

namespace server.Services
{
    public class AttendanceService : IAttendanceService
    {
        private readonly IAttendanceRepository _attendanceRepository;

        public AttendanceService(
            IAttendanceRepository attendanceRepository)
        {
            _attendanceRepository = attendanceRepository;
        }

        public async Task<string> CheckInAsync(int userId)
        {
            var attendance =
                await _attendanceRepository
                    .GetTodayAttendanceAsync(userId);

            if (attendance != null)
            {
                return "You have already checked in today.";
            }

            attendance = new Attendance
            {
                UserId = userId,
                AttendanceDate = DateOnly.FromDateTime(DateTime.Today),
                CheckInTime = TimeOnly.FromDateTime(DateTime.Now),
                WorkingHours = 0
            };

            await _attendanceRepository.CheckInAsync(attendance);

            await _attendanceRepository.SaveChangesAsync();

            return "Checked in successfully.";
        }

        public async Task<string> CheckOutAsync(int userId)
{
    var attendance =
        await _attendanceRepository
            .GetTodayAttendanceAsync(userId);

    if (attendance == null)
{
    throw new Exception("Please check in first.");
}

    if (attendance.CheckOutTime != null)
{
    throw new Exception("You have already checked out today.");
}

    // Minimum 3 hours validation
    var checkInDateTime = attendance.AttendanceDate.ToDateTime(
    attendance.CheckInTime!.Value);

var minimumCheckoutTime = checkInDateTime.AddHours(3);

if (DateTime.Now < minimumCheckoutTime)
{
    var remaining = minimumCheckoutTime - DateTime.Now;

    throw new Exception(
        $"You can check out only after completing 3 hours. Remaining time: {remaining.Hours} hour(s) {remaining.Minutes} minute(s).");
}

    attendance.CheckOutTime =
        TimeOnly.FromDateTime(DateTime.Now);

    attendance.WorkingHours =
        (attendance.CheckOutTime.Value.ToTimeSpan() -
         attendance.CheckInTime.Value.ToTimeSpan())
        .TotalHours;

    await _attendanceRepository.CheckOutAsync(attendance);

    await _attendanceRepository.SaveChangesAsync();

    return "Checked out successfully.";
}

        public async Task<IEnumerable<AttendanceDto>>
            GetAttendanceByUserAsync(int userId)
        {
            var attendance =
                await _attendanceRepository
                    .GetAttendanceByUserAsync(userId);

            return attendance.Select(a => new AttendanceDto
            {
                AttendanceId = a.AttendanceId,
                UserId = a.UserId,
                EmployeeName = a.User.Name,
                AttendanceDate = a.AttendanceDate,
                CheckInTime = a.CheckInTime,
                CheckOutTime = a.CheckOutTime,
                WorkingHours = a.WorkingHours
            });
        }
        public async Task<MonthlyAttendanceDto> GetMonthlyAttendanceAsync(
    int userId,
    int month,
    int year)
{
    var attendance =
        await _attendanceRepository.GetMonthlyAttendanceAsync(
            userId,
            month,
            year);

    var list = attendance.Select(a => new AttendanceDto
    {
        AttendanceId = a.AttendanceId,
        UserId = a.UserId,
        EmployeeName = a.User.Name,
        AttendanceDate = a.AttendanceDate,
        CheckInTime = a.CheckInTime,
        CheckOutTime = a.CheckOutTime,
        WorkingHours = a.WorkingHours
    }).ToList();

    var dto = new MonthlyAttendanceDto
    {
        Attendance = list,

        Present = list.Count(x => x.CheckInTime != null),

        Absent = 0,

        Leave = 0,

        HalfDay = 0,

        WeeklyOff = 0,

        TotalDays = DateTime.DaysInMonth(year, month)
    };

    return dto;
}

        public async Task<IEnumerable<AttendanceDto>>
            GetAllAttendanceAsync()
        {
            var attendance =
                await _attendanceRepository
                    .GetAllAttendanceAsync();

            return attendance.Select(a => new AttendanceDto
            {
                AttendanceId = a.AttendanceId,
                UserId = a.UserId,
                EmployeeName = a.User.Name,
                AttendanceDate = a.AttendanceDate,
                CheckInTime = a.CheckInTime,
                CheckOutTime = a.CheckOutTime,
                WorkingHours = a.WorkingHours
            });
        }
    }
}