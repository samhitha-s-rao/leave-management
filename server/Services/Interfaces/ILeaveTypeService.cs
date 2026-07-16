using server.DTOs.LeaveType;

namespace server.Services.Interfaces
{
    public interface ILeaveTypeService
    {
        Task<IEnumerable<LeaveTypeDto>> GetAllLeaveTypesAsync();

        Task<LeaveTypeDto?> GetLeaveTypeByIdAsync(int id);

        Task<bool> UpdateLeaveTypeAsync(
            int id,
            UpdateLeaveTypeDto dto);
    }
}
