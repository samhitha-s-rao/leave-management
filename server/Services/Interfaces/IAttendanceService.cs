using server.DTOs.Attendance;

namespace server.Services.Interfaces
{
    public interface IAttendanceService
    {
        Task<string> CheckInAsync(int userId);
Task<string> CheckOutAsync(int userId);

        Task<IEnumerable<AttendanceDto>> GetAttendanceByUserAsync(int userId);

        Task<IEnumerable<AttendanceDto>> GetAllAttendanceAsync();
        Task<MonthlyAttendanceDto> GetMonthlyAttendanceAsync(
    int userId,
    int month,
    int year);
    }
}