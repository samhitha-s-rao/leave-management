using AutoMapper;
using server.DTOs.Department;
using server.Repositories.Interfaces;
using server.Services.Interfaces;

namespace server.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IMapper _mapper;

        public DepartmentService(
            IDepartmentRepository departmentRepository,
            IMapper mapper)
        {
            _departmentRepository = departmentRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<DepartmentDto>> GetAllAsync()
        {
            var departments = await _departmentRepository.GetAllAsync();

            return _mapper.Map<IEnumerable<DepartmentDto>>(departments);
        }

        public async Task<DepartmentDto?> GetByIdAsync(int id)
        {
            var department = await _departmentRepository.GetByIdAsync(id);

            if (department == null)
                return null;

            return _mapper.Map<DepartmentDto>(department);
        }
    }
}