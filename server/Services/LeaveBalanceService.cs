using server.DTOs.Leave;
using server.Repositories.Interfaces;
using server.Services.Interfaces;

namespace server.Services
{
    public class LeaveBalanceService
        : ILeaveBalanceService
    {
        private readonly
            ILeaveBalanceRepository
            _leaveBalanceRepository;

        public LeaveBalanceService(
            ILeaveBalanceRepository
            leaveBalanceRepository)
        {
            _leaveBalanceRepository =
                leaveBalanceRepository;
        }

        public async Task<IEnumerable<LeaveBalanceDto>>
            GetMyBalanceAsync(int userId)
        {
            var balances =
                await _leaveBalanceRepository
                    .GetEmployeeBalancesAsync(
                        userId);

            return balances.Select(b =>
                new LeaveBalanceDto
                {
                    LeaveTypeId =
                        b.LeaveTypeId,

                    LeaveTypeName =
                        b.LeaveType.LeaveTypeName,

                    RemainingLeaves =
                        b.RemainingLeaves
                });
        }

        public async Task DeductLeaveBalanceAsync(
            int userId,
            int leaveTypeId,
            int days)
        {
            var balance =
                await _leaveBalanceRepository
                    .GetLeaveBalanceAsync(
                        userId,
                        leaveTypeId);

            if (balance == null)
            {
                throw new Exception(
                    "Leave balance not configured.");
            }

            if (balance.RemainingLeaves < days)
            {
                throw new Exception(
                    $"Only {balance.RemainingLeaves} leave(s) available.");
            }

            balance.RemainingLeaves -= days;

            await _leaveBalanceRepository
                .UpdateLeaveBalanceAsync(
                    balance);
        }
    }
}