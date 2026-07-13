using server.Models;

namespace server.Repositories.Interfaces
{
    public interface ILeaveTypeRepository
    {
        Task<IEnumerable<LeaveType>> GetAllAsync();

        Task<LeaveType?> GetByIdAsync(int id);
    }
}