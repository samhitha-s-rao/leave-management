using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Repositories.Interfaces;

namespace server.Repositories
{
    public class LeaveRepository : ILeaveRepository
    {
        private readonly ApplicationDbContext _context;

        public LeaveRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<LeaveRequest> ApplyLeaveAsync(LeaveRequest leaveRequest)
        {
            await _context.LeaveRequests.AddAsync(leaveRequest);
            await _context.SaveChangesAsync();

            return leaveRequest;
        }

        public async Task<IEnumerable<LeaveRequest>> GetLeavesByUserIdAsync(int userId)
        {
            return await _context.LeaveRequests
                .Include(l => l.User)
                .ThenInclude(u => u.Department)
                .Include(l => l.LeaveType)
                .Where(l => l.UserId == userId)
                .OrderByDescending(l => l.LeaveRequestId)
                .ToListAsync();
        }

        public async Task<IEnumerable<LeaveRequest>> GetPendingLeavesAsync(
            int approverId,
            string approverRole)
        {
            IQueryable<LeaveRequest> query = _context.LeaveRequests
            .Include(l => l.User)
                .ThenInclude(u => u.Role)
            .Include(l => l.User)
                .ThenInclude(u => u.Department)
            .Include(l => l.LeaveType)
            .Where(l => l.Status == "Pending");

            if (approverRole == "Manager")
            {
                // Current requirement:
                query = query.Where(l => l.User.Role.RoleName == "Employee");

                // Future:
                // query = query.Where(l =>
                //     l.User.ManagerId == approverId);
            }
            else if (approverRole == "Admin")
            {
                query = query.Where(l => l.User.Role.RoleName == "Manager");
            }

            return await query
                .OrderByDescending(l => l.LeaveRequestId)
                .ToListAsync();
        }

        public async Task<LeaveRequest?> GetLeaveByIdAsync(int leaveRequestId)
        {
            return await _context.LeaveRequests
                .Include(l => l.User)
                .ThenInclude(u=>u.Department)
                .Include(l => l.LeaveType)
                .FirstOrDefaultAsync(l => l.LeaveRequestId == leaveRequestId);
        }

        public async Task UpdateLeaveAsync(LeaveRequest leaveRequest)
        {
            _context.LeaveRequests.Update(leaveRequest);

            await _context.SaveChangesAsync();
        }
    }
}