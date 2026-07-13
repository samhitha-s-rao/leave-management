using server.Models;

namespace server.Services.Interfaces
{
    public interface ILeaveTypeService
    {
        Task<IEnumerable<LeaveType>> GetAllLeaveTypesAsync();
        Task<LeaveType?> GetLeaveTypeByIdAsync(int id);
    }
}