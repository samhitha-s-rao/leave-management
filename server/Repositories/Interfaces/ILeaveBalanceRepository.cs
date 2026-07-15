using server.Models;

namespace server.Repositories.Interfaces
{
    public interface ILeaveBalanceRepository
    {
        Task<LeaveBalance?> GetLeaveBalanceAsync(
            int employeeId,
            int leaveTypeId);

        Task<IEnumerable<LeaveBalance>>
            GetEmployeeBalancesAsync(
                int employeeId);

        Task UpdateLeaveBalanceAsync(
            LeaveBalance leaveBalance);

        Task InitializeLeaveBalancesAsync(int employeeId);    
    }
}