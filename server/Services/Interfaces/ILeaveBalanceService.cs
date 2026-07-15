using server.DTOs.Leave;

namespace server.Services.Interfaces
{
    public interface ILeaveBalanceService
    {
        Task<IEnumerable<LeaveBalanceDto>>
            GetMyBalanceAsync(int userId);

        Task DeductLeaveBalanceAsync(
            int userId,
            int leaveTypeId,
            int days);
    }
}