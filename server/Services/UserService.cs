<<<<<<< HEAD
using BCrypt.Net;
using server.DTOs;
=======
using AutoMapper;
using BCrypt.Net;
using server.DTOs.User;
using server.Helpers;
>>>>>>> d913bddf6e86c523d8d43a21c9b82bbf6a2440cc
using server.Models;
using server.Repositories.Interfaces;
using server.Services.Interfaces;

namespace server.Services
{
    public class UserService : IUserService
    {
<<<<<<< HEAD
        private readonly IUserRepository _repository;

        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<UserDto>> GetAllAsync()
        {
            var users = await _repository.GetAllAsync();

            return users.Select(u => new UserDto
            {
                UserId = u.UserId,
                Name = u.Name,
                Email = u.Email,
                PhoneNumber = u.PhoneNumber,
                Address = u.Address,
                DateofJoining = u.DateofJoining,
                ProfilePictureUrl = u.ProfilePictureUrl,
                IsActive = u.IsActive,

                RoleId = u.RoleId,
                RoleName = u.Role?.RoleName ?? "",

                DepartmentId = u.DepartmentId,
                DepartmentName = u.Department?.DepartmentName ?? "",

                ManagerId = u.ManagerId,
                ManagerName = u.Manager?.Name
            });
=======
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IMapper _mapper;

        public UserService(
            IUserRepository userRepository,
            IRoleRepository roleRepository,
            IDepartmentRepository departmentRepository,
            IMapper mapper)
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
            _departmentRepository = departmentRepository;
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

        #region Private Validation Methods
        public async Task<IEnumerable<UserDto>> GetAllAsync()
        {
            var users = await _userRepository.GetActiveUsersAsync();

            return _mapper.Map<IEnumerable<UserDto>>(users);
>>>>>>> d913bddf6e86c523d8d43a21c9b82bbf6a2440cc
        }

        public async Task<UserDto?> GetByIdAsync(int id)
        {
<<<<<<< HEAD
            var u = await _repository.GetByIdAsync(id);

            if (u == null)
                return null;

            return new UserDto
            {
                UserId = u.UserId,
                Name = u.Name,
                Email = u.Email,
                PhoneNumber = u.PhoneNumber,
                Address = u.Address,
                DateofJoining = u.DateofJoining,
                ProfilePictureUrl = u.ProfilePictureUrl,
                IsActive = u.IsActive,

                RoleId = u.RoleId,
                RoleName = u.Role?.RoleName ?? "",

                DepartmentId = u.DepartmentId,
                DepartmentName = u.Department?.DepartmentName ?? "",

                ManagerId = u.ManagerId,
                ManagerName = u.Manager?.Name
            };
        }

        public async Task CreateAsync(CreateUserDto dto)
        {
           var existingUser = await _repository.GetUserByEmailAsync(dto.Email);

            if (existingUser != null)
                throw new Exception("Email already exists.");

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),

                PhoneNumber = dto.PhoneNumber,
                Address = dto.Address,
                DateofJoining = dto.DateofJoining,
                ProfilePictureUrl = dto.ProfilePictureUrl,

                RoleId = dto.RoleId,
                DepartmentId = dto.DepartmentId,
                ManagerId = dto.ManagerId,

                IsActive = dto.IsActive
            };

            await _repository.AddAsync(user);
            await _repository.SaveChangesAsync();
        }

        public async Task UpdateAsync(int id, UpdateUserDto dto)
{
    var user = await _repository.GetByIdAsync(id);

    if (user == null)
        throw new Exception("User not found.");

    user.Name = dto.Name;
    user.Email = dto.Email;
    user.PhoneNumber = dto.PhoneNumber;
    user.Address = dto.Address;
    user.DateofJoining = dto.DateofJoining;
    user.ProfilePictureUrl = dto.ProfilePictureUrl;

    user.RoleId = dto.RoleId;
    user.DepartmentId = dto.DepartmentId;
    user.ManagerId = dto.ManagerId;

    user.IsActive = dto.IsActive;

    await _repository.UpdateAsync(user);
    await _repository.SaveChangesAsync();
}

public async Task UpdateProfileAsync(int id, UpdateProfileDto dto)
{
    var user = await _repository.GetByIdAsync(id);

    if (user == null)
        throw new Exception("User not found.");

    user.PhoneNumber = dto.PhoneNumber;
    user.Address = dto.Address;
    user.ProfilePictureUrl = dto.ProfilePictureUrl;

    await _repository.UpdateAsync(user);
    await _repository.SaveChangesAsync();
}

        public async Task DeleteAsync(int id)
        {
            var user = await _repository.GetByIdAsync(id);

            if (user == null)
                throw new Exception("User not found.");

            await _repository.DeleteAsync(user);
            await _repository.SaveChangesAsync();
        }
    }
}
=======
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
#endregion

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
    }
}

>>>>>>> d913bddf6e86c523d8d43a21c9b82bbf6a2440cc
