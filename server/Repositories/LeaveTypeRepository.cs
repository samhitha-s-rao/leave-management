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
            return await _context.LeaveTypes.ToListAsync();
        }

        public async Task<LeaveType?> GetByIdAsync(int id)
        {
            return await _context.LeaveTypes
                .FirstOrDefaultAsync(x => x.LeaveTypeId == id);
        }

        public async Task UpdateAsync(LeaveType leaveType)
        {
            _context.LeaveTypes.Update(leaveType);

            await _context.SaveChangesAsync();
        }
        
        
    }
}