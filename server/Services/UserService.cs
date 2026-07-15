using AutoMapper;
using BCrypt.Net;
using server.DTOs.User;
using server.Helpers;
using server.Models;
using server.Repositories.Interfaces;
using server.Services.Interfaces;

namespace server.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IMapper _mapper;
        private readonly ILeaveBalanceRepository _leaveBalanceRepository;
        public UserService(
            IUserRepository userRepository,
            IRoleRepository roleRepository,
            IDepartmentRepository departmentRepository,
            ILeaveBalanceRepository leaveBalanceRepository,
            IMapper mapper)
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
            _departmentRepository = departmentRepository;
            _leaveBalanceRepository = leaveBalanceRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ManagerDto>> GetManagersAsync()
        {
            var managers = await _userRepository.GetManagersAsync();

            return _mapper.Map<IEnumerable<ManagerDto>>(managers);
        }

        public async Task<IEnumerable<ManagerDto>> GetAdminsAsync()
        {
            var admins = await _userRepository.GetAdminsAsync();

            return _mapper.Map<IEnumerable<ManagerDto>>(admins);
        }

        public async Task<IEnumerable<UserDto>> GetAllAsync()
        {
            var users = await _userRepository.GetActiveUsersAsync();

            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        public async Task<UserDto?> GetByIdAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);

            if (user == null)
                return null;

            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> CreateAsync(CreateUserDto dto)
        {
            await ValidateEmailAsync(dto.Email);
            await ValidateRoleAsync(dto.RoleId);
            await ValidateDepartmentAsync(dto.DepartmentId);
            await ValidateHierarchyAsync(dto.RoleId, dto.ManagerId);

            var user = _mapper.Map<User>(dto);
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            user.IsActive = true;

            user = await _userRepository.CreateAsync(user);
            await _leaveBalanceRepository.InitializeLeaveBalancesAsync(user.UserId);
            user = await _userRepository.GetByIdAsync(user.UserId)
                ?? throw new Exception("Failed to retrieve created user.");

            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> UpdateAsync(int id, UpdateUserDto dto)
        {
            if (dto.ManagerId == id)
                throw new Exception("A user cannot be their own manager.");

            var user = await _userRepository.GetByIdAsync(id)
                ?? throw new Exception("User not found.");

            await ValidateRoleAsync(dto.RoleId);
            await ValidateDepartmentAsync(dto.DepartmentId);
            await ValidateHierarchyAsync(dto.RoleId, dto.ManagerId);

            _mapper.Map(dto, user);

            user = await _userRepository.UpdateAsync(user);

            user = await _userRepository.GetByIdAsync(user.UserId)
                ?? throw new Exception("Failed to retrieve updated user.");

            return _mapper.Map<UserDto>(user);
        }

        public async Task DeactivateAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);

            if (user == null)
                throw new Exception("User not found.");

            await _userRepository.DeactivateAsync(user);
        }

        #region Private Validation Methods

        private async Task ValidateRoleAsync(int roleId)
        {
            if (!await _roleRepository.ExistsAsync(roleId))
                throw new Exception("Invalid role selected.");
        }

        private async Task ValidateDepartmentAsync(int departmentId)
        {
            if (!await _departmentRepository.ExistsAsync(departmentId))
                throw new Exception("Invalid department selected.");
        }

        private async Task ValidateEmailAsync(string email)
        {
            if (await _userRepository.EmailExistsAsync(email))
                throw new Exception("Email already exists.");
        }

        private async Task ValidateHierarchyAsync(int roleId, int? managerId)
        {
            switch (roleId)
            {
                case RoleConstants.Admin:

                    if (managerId != null)
                        throw new Exception("Admin cannot have a manager.");

                    break;

                case RoleConstants.Manager:

                    if (managerId == null)
                        throw new Exception("Manager must report to an Admin.");

                    var admin = await _userRepository.GetByIdAsync(managerId.Value);

                    if (admin == null || admin.RoleId != RoleConstants.Admin)
                        throw new Exception("Manager must report to an Admin.");

                    break;

                case RoleConstants.Employee:

                    if (managerId == null)
                        throw new Exception("Employee must report to a Manager.");

                    var manager = await _userRepository.GetByIdAsync(managerId.Value);

                    if (manager == null || manager.RoleId != RoleConstants.Manager)
                        throw new Exception("Employee must report to a Manager.");

                    break;

                default:

                    throw new Exception("Invalid role.");
            }
        }

        #endregion
    }
}
