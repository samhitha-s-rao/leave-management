using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Repositories.Interfaces;

namespace server.Repositories
{
    public class HolidayRepository : IHolidayRepository
    {
        private readonly ApplicationDbContext _context;

        public HolidayRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Holiday>> GetAllAsync()
        {
            return await _context.Holidays
                .OrderBy(h => h.HolidayDate)
                .ToListAsync();
        }

        public async Task<Holiday?> GetByIdAsync(int id)
        {
            return await _context.Holidays.FindAsync(id);
        }

        public async Task AddAsync(Holiday holiday)
        {
            await _context.Holidays.AddAsync(holiday);
        }

        public Task UpdateAsync(Holiday holiday)
        {
            _context.Holidays.Update(holiday);
            return Task.CompletedTask;
        }

        public Task DeleteAsync(Holiday holiday)
        {
            _context.Holidays.Remove(holiday);
            return Task.CompletedTask;
        }

        public async Task<bool> ExistsAsync(DateOnly date)
        {
            return await _context.Holidays
                .AnyAsync(h => h.HolidayDate == date);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}