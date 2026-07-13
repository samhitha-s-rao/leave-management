using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Repositories.Interfaces;

namespace server.Repositories
{
    public class LeaveTypeRepository : ILeaveTypeRepository
    {
        private readonly ApplicationDbContext _context;
        public LeaveTypeRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<LeaveType>> GetAllAsync()
        {
            return await _context.LeaveTypes
                .AsNoTracking()
                .ToListAsync();
        }
        public async Task<LeaveType?> GetByIdAsync(int id)
        {
            return await _context.LeaveTypes
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.LeaveTypeId == id);
        }
    }
}