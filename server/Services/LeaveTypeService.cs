using server.DTOs.LeaveType;
using server.Repositories.Interfaces;
using server.Services.Interfaces;

namespace server.Services
{
    public class LeaveTypeService : ILeaveTypeService
    {
        private readonly ILeaveTypeRepository _repository;
        private readonly ILeaveBalanceRepository _leaveBalanceRepository;

        public LeaveTypeService(
            ILeaveTypeRepository repository,
            ILeaveBalanceRepository leaveBalanceRepository)
        {
            _repository = repository;
            _leaveBalanceRepository = leaveBalanceRepository;
        }

        public async Task<IEnumerable<LeaveTypeDto>>
            GetAllLeaveTypesAsync()
        {
            var leaveTypes =
                await _repository.GetAllAsync();

            return leaveTypes.Select(x =>
                new LeaveTypeDto
                {
                    LeaveTypeId = x.LeaveTypeId,
                    LeaveTypeName = x.LeaveTypeName,
                    AllocatedLeaves = x.AllocatedLeaves
                });
        }

        public async Task<LeaveTypeDto?>
            GetLeaveTypeByIdAsync(int id)
        {
            var leaveType =
                await _repository.GetByIdAsync(id);

            if (leaveType == null)
                return null;

            return new LeaveTypeDto
            {
                LeaveTypeId = leaveType.LeaveTypeId,
                LeaveTypeName = leaveType.LeaveTypeName,
                AllocatedLeaves = leaveType.AllocatedLeaves
            };
        }

        public async Task<bool>
    UpdateLeaveTypeAsync(
    int id,
    UpdateLeaveTypeDto dto)
{
    var leaveType =
        await _repository.GetByIdAsync(id);

    if (leaveType == null)
        return false;

    var oldAllocatedLeaves =
        leaveType.AllocatedLeaves;

    leaveType.LeaveTypeName =
        dto.LeaveTypeName;

    leaveType.AllocatedLeaves =
        dto.AllocatedLeaves;

    await _repository.UpdateAsync(
        leaveType);

    var difference =
        dto.AllocatedLeaves -
        oldAllocatedLeaves;

    if (difference != 0)
    {
        await _leaveBalanceRepository
            .UpdateBalancesForLeaveTypeAsync(
                leaveType.LeaveTypeId,
                difference);
    }

    return true;
}
    }
}