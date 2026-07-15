using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Repositories.Interfaces;

namespace server.Repositories
{
    public class LeaveBalanceRepository
        : ILeaveBalanceRepository
    {
        private readonly ApplicationDbContext _context;

        public LeaveBalanceRepository(
            ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<LeaveBalance?> GetLeaveBalanceAsync(
            int employeeId,
            int leaveTypeId)
        {
            return await _context.LeaveBalances
                .Include(lb => lb.LeaveType)
                .Include(lb => lb.User)
                .FirstOrDefaultAsync(lb =>
                    lb.EmployeeId == employeeId &&
                    lb.LeaveTypeId == leaveTypeId);
        }

        public async Task<IEnumerable<LeaveBalance>>
            GetEmployeeBalancesAsync(
                int employeeId)
        {
            return await _context.LeaveBalances
                .Include(lb => lb.LeaveType)
                .Where(lb =>
                    lb.EmployeeId == employeeId)
                .ToListAsync();
        }

        public async Task UpdateLeaveBalanceAsync(
            LeaveBalance leaveBalance)
        {
            _context.LeaveBalances.Update(
                leaveBalance);

            await _context.SaveChangesAsync();
        }

      public async Task InitializeLeaveBalancesAsync(int employeeId)
{
    Console.WriteLine(
        $"Initializing balances for user {employeeId}");

    var hasBalances = await _context.LeaveBalances
        .AnyAsync(lb => lb.EmployeeId == employeeId);

    Console.WriteLine(
        $"Has balances: {hasBalances}");

    if (hasBalances)
    {
        return;
    }

    var leaveTypes = await _context.LeaveTypes
        .ToListAsync();

    Console.WriteLine(
        $"Leave types found: {leaveTypes.Count}");

    var balances = leaveTypes.Select(lt =>
        new LeaveBalance
        {
            EmployeeId = employeeId,
            LeaveTypeId = lt.LeaveTypeId,
            RemainingLeaves = lt.AllocatedLeaves
        }).ToList();

    Console.WriteLine(
        $"Creating {balances.Count} balance records");

    await _context.LeaveBalances.AddRangeAsync(
        balances);

    await _context.SaveChangesAsync();

    Console.WriteLine(
        "Balances created successfully");
}
    }
}