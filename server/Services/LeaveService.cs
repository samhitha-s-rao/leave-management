using server.DTOs.Leave;
using server.Models;
using server.Repositories.Interfaces;
using server.Services.Interfaces;

namespace server.Services
{
    public class LeaveService : ILeaveService
    {
        private readonly ILeaveRepository _leaveRepository;

        public LeaveService(ILeaveRepository leaveRepository)
        {
            _leaveRepository = leaveRepository;
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

            var leaveRequest = new LeaveRequest
            {
                UserId = userId,
                LeaveTypeId = dto.LeaveTypeId,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                NumberOfDays = days,
                LeaveDuration = dto.LeaveDuration,
                Reason = dto.Reason,
                Status = "Pending"
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

        public async Task<IEnumerable<LeaveResponseDto>> GetPendingLeavesAsync()
        {
            var leaves =
                await _leaveRepository.GetAllPendingLeavesAsync();

            return leaves.Select(MapToResponseDto);
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

            await _leaveRepository.UpdateLeaveAsync(leave);

            return true;
        }

        private LeaveResponseDto MapToResponseDto(
            LeaveRequest leave)
        {
            return new LeaveResponseDto
            {
                LeaveRequestId = leave.LeaveRequestId,
                UserId = leave.UserId,
                UserName = leave.User?.Name ?? string.Empty,
                LeaveTypeId = leave.LeaveTypeId,
                LeaveTypeName = leave.LeaveType?.LeaveTypeName ?? string.Empty,
                StartDate = leave.StartDate,
                EndDate = leave.EndDate,
                NumberOfDays = leave.NumberOfDays,
                LeaveDuration = leave.LeaveDuration,
                Reason = leave.Reason,
                Status = leave.Status,
                ManagerRemarks = leave.ManagerRemarks,
                ApprovedBy = leave.ApprovedBy,
                ActionDate = leave.ActionDate
            };
        }
    }
}