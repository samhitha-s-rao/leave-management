using server.Models;

namespace server.Repositories.Interfaces
{
    public interface IAttendanceRepository
    {
        Task<Attendance?> GetTodayAttendanceAsync(int userId);

        Task CheckInAsync(Attendance attendance);

        Task CheckOutAsync(Attendance attendance);

        Task<IEnumerable<Attendance>> GetAttendanceByUserAsync(int userId);

        Task<IEnumerable<Attendance>> GetAllAttendanceAsync();
        Task<IEnumerable<Attendance>> GetMonthlyAttendanceAsync(
    int userId,
    int month,
    int year);

        Task SaveChangesAsync();
    }
}