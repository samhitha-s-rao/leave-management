using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Repositories.Interfaces;

namespace server.Repositories
{
    public class AttendanceRepository : IAttendanceRepository
    {
        private readonly ApplicationDbContext _context;

        public AttendanceRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Attendance?> GetTodayAttendanceAsync(int userId)
        {
            var today = DateOnly.FromDateTime(DateTime.Today);

            return await _context.Attendances
                .Include(a => a.User)
                .FirstOrDefaultAsync(a =>
                    a.UserId == userId &&
                    a.AttendanceDate == today);
        }

        public async Task CheckInAsync(Attendance attendance)
        {
            await _context.Attendances.AddAsync(attendance);
        }

        public Task CheckOutAsync(Attendance attendance)
        {
            _context.Attendances.Update(attendance);
            return Task.CompletedTask;
        }

        public async Task<IEnumerable<Attendance>> GetAttendanceByUserAsync(int userId)
        {
            return await _context.Attendances
                .Include(a => a.User)
                .Where(a => a.UserId == userId)
                .OrderByDescending(a => a.AttendanceDate)
                .ToListAsync();
        }

        public async Task<IEnumerable<Attendance>> GetAllAttendanceAsync()
        {
            return await _context.Attendances
                .Include(a => a.User)
                .OrderByDescending(a => a.AttendanceDate)
                .ThenBy(a => a.User.Name)
                .ToListAsync();
        }
       public async Task<IEnumerable<Attendance>> GetMonthlyAttendanceAsync(
    int userId,
    int month,
    int year)
{
    return await _context.Attendances
        .Where(a =>
            a.UserId == userId &&
            a.AttendanceDate.Month == month &&
            a.AttendanceDate.Year == year)
        .Include(a => a.User)
        .OrderBy(a => a.AttendanceDate)
        .ToListAsync();
}
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}