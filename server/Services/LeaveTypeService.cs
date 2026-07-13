using server.Models;
using server.Repositories.Interfaces;
using server.Services.Interfaces;

namespace server.Services
{
    public class LeaveTypeService : ILeaveTypeService
    {
        private readonly ILeaveTypeRepository _repository;
        public LeaveTypeService(
            ILeaveTypeRepository repository)
        {
            _repository = repository;
        }
        public async Task<IEnumerable<LeaveType>> GetAllLeaveTypesAsync()
        {
            return await _repository.GetAllAsync();
        }
        public async Task<LeaveType?> GetLeaveTypeByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }
    }
}