using server.DTOs.Leave;

namespace server.Services.Interfaces
{
    public interface ILeaveService
    {
        Task<LeaveResponseDto> ApplyLeaveAsync(
            int userId,
            ApplyLeaveRequestDto dto);

        Task<IEnumerable<LeaveResponseDto>> GetMyLeavesAsync(
            int userId);

        Task<IEnumerable<LeaveHistoryDto>> GetLeaveHistoryAsync(int userId);

        Task<IEnumerable<LeaveResponseDto>> GetPendingLeavesAsync();

        Task<bool> ApproveOrRejectLeaveAsync(
            int leaveRequestId,
            int approverId,
            ApproveLeaveDto dto);

        

    }
}
