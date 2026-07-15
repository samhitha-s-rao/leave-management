using server.DTOs.Leave;
using server.Models;
using server.Repositories.Interfaces;
using server.Services.Interfaces;

namespace server.Services
{   public class LeaveService : ILeaveService
    {
        private readonly ILeaveRepository _leaveRepository;
        private readonly ILeaveBalanceService _leaveBalanceService;
        
        public LeaveService(ILeaveRepository leaveRepository,ILeaveBalanceService leaveBalanceService)
        {
            _leaveRepository = leaveRepository;
            _leaveBalanceService = leaveBalanceService;
        }

        public async Task<LeaveResponseDto> ApplyLeaveAsync(
            int userId,
            ApplyLeaveRequestDto dto)
        {
            if (dto.EndDate < dto.StartDate)
            {
                throw new ArgumentException(
                    "End date cannot be earlier than start date.");
            }

            var days =
                dto.EndDate.DayNumber -
                dto.StartDate.DayNumber + 1;
            var balances =
                await _leaveBalanceService
                    .GetMyBalanceAsync(userId);

            var balance = balances.FirstOrDefault(
                b => b.LeaveTypeId == dto.LeaveTypeId);

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
            var leaveRequest = new LeaveRequest
            {
                UserId = userId,
                LeaveTypeId = dto.LeaveTypeId,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                NumberOfDays = days,
                LeaveDuration = dto.LeaveDuration,
                Reason = dto.Reason,
                Status = "Pending",
                CreatedDate = DateTime.UtcNow
            };

            var createdLeave =
                await _leaveRepository.ApplyLeaveAsync(leaveRequest);

            return MapToResponseDto(createdLeave);
        }
        public async Task<IEnumerable<LeaveHistoryDto>> GetLeaveHistoryAsync(
            int userId)
        {
            var leaves =
                await _leaveRepository.GetLeavesByUserIdAsync(userId);

            return leaves.Select(l => new LeaveHistoryDto
            {
                LeaveRequestId = l.LeaveRequestId,
                LeaveTypeName = l.LeaveType.LeaveTypeName,
                StartDate = l.StartDate,
                EndDate = l.EndDate,
                NumberOfDays = l.NumberOfDays,
                Status = l.Status
            });
}

        public async Task<IEnumerable<LeaveResponseDto>> GetMyLeavesAsync(
            int userId)
        {
            var leaves =
                await _leaveRepository.GetLeavesByUserIdAsync(userId);

            return leaves.Select(MapToResponseDto);
        }
                public async Task<IEnumerable<LeaveResponseDto>> GetPendingLeavesAsync(
            int approverId,
            string approverRole)
        {
            var leaves = await _leaveRepository.GetPendingLeavesAsync(
                approverId,
                approverRole);

            return leaves.Select(MapToResponseDto);
        }

        public async Task<IEnumerable<EmployeeLeaveHistoryDto>>GetEmployeeLeaveHistoryAsync(
                int userId,
                string role)
            {
                var leaves =
                    await _leaveRepository
                        .GetEmployeeLeaveHistoryAsync(
                            userId,
                            role);

                return leaves.Select(l => new EmployeeLeaveHistoryDto
                {
                    UserId = l.UserId,
                    UserName = l.User.Name,
                    DepartmentName =l.User.Department.DepartmentName,
                    RoleName = l.User.Role.RoleName,
                    LeaveTypeName = l.LeaveType.LeaveTypeName,
                    StartDate = l.StartDate,
                    EndDate = l.EndDate,
                    NumberOfDays = l.NumberOfDays,
                    Status = l.Status
                });
            }
        public async Task<LeaveResponseDto> GetLeaveByIdAsync(int leaveId)
{
            var leave = await _leaveRepository.GetLeaveByIdAsync(leaveId);

            if (leave == null)
            {
                throw new KeyNotFoundException($"Leave request with Id {leaveId} not found.");
            }

            return MapToResponseDto(leave);
        }
        public async Task<bool> ApproveOrRejectLeaveAsync(
            int leaveRequestId,
            int approverId,
            ApproveLeaveDto dto)
        {
            var leave =
                await _leaveRepository.GetLeaveByIdAsync(leaveRequestId);

            if (leave == null)
            {          
                return false;
            }

            if (leave.Status != "Pending")
            {
                return false;
            }

            leave.Status = dto.Status;
            leave.ManagerRemarks = dto.ManagerRemarks;
            leave.ApprovedBy = approverId;
            leave.ActionDate = DateTime.UtcNow;

            if (dto.Status == "Approved")
            {
                await _leaveBalanceService
                    .DeductLeaveBalanceAsync(
                        leave.UserId,
                        leave.LeaveTypeId,
                        (int)leave.NumberOfDays);
            }

            await _leaveRepository.UpdateLeaveAsync(leave);

            return true;
        }

        private LeaveResponseDto MapToResponseDto(LeaveRequest leave)
{
    return new LeaveResponseDto
    {
        LeaveRequestId = leave.LeaveRequestId,
        UserId = leave.UserId,
        UserName = leave.User?.Name ?? string.Empty,

        DepartmentName =
            leave.User?.Department?.DepartmentName,
        LeaveTypeId = leave.LeaveTypeId,
        LeaveTypeName =
            leave.LeaveType?.LeaveTypeName ?? string.Empty,

        StartDate = leave.StartDate,
        EndDate = leave.EndDate,
        NumberOfDays = leave.NumberOfDays,
        LeaveDuration = leave.LeaveDuration,
        Reason = leave.Reason,
        Status = leave.Status,
        ManagerRemarks = leave.ManagerRemarks,
        ApprovedBy = leave.ApprovedBy,
        ActionDate = leave.ActionDate,
        AppliedDate = leave.CreatedDate
    };
}
    }
}