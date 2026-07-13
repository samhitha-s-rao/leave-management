using BCrypt.Net;
using server.DTOs.User;
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

        public UserService(
            IUserRepository userRepository,
            IRoleRepository roleRepository,
            IDepartmentRepository departmentRepository)
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
            _departmentRepository = departmentRepository;
        }
        public async Task<UserDto> CreateAsync(CreateUserDto dto)
{
    // 1. Email validation
    if (await _userRepository.EmailExistsAsync(dto.Email))
        throw new Exception("Email already exists.");

    // 2. Validate Role
    var role = await _roleRepository.GetByIdAsync(dto.RoleId)
        ?? throw new Exception("Role not found.");

    // 3. Validate Department
    var department = await _departmentRepository.GetByIdAsync(dto.DepartmentId)
        ?? throw new Exception("Department not found.");

    // 4. Validate hierarchy
    await ValidateHierarchy(role.RoleName, dto.ManagerId);

    // 5. Create entity
    var user = new User
    {
        Name = dto.Name,
        Email = dto.Email,
        PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
        PhoneNumber = dto.PhoneNumber,
        Address = dto.Address,
        RoleId = dto.RoleId,
        DepartmentId = dto.DepartmentId,
        ManagerId = dto.ManagerId,
        IsActive = true
    };

    user = await _userRepository.CreateAsync(user);

    // Reload with navigation properties
    user = await _userRepository.GetByIdAsync(user.UserId)
           ?? throw new Exception("User creation failed.");

    return MapToDto(user);
}
private async Task ValidateHierarchy(string roleName, int? managerId)
{
    switch (roleName)
    {
        case "Admin":
            if (managerId != null)
                throw new Exception("Admin cannot have a manager.");
            break;

        case "Manager":
            if (managerId == null)
                throw new Exception("Manager must report to an Admin.");

            var admin = await _userRepository.GetByIdAsync(managerId.Value);

            if (admin == null)
                throw new Exception("Assigned Admin not found.");

            if (admin.Role.RoleName != "Admin")
                throw new Exception("Manager can report only to an Admin.");

            break;

        case "Employee":
            if (managerId == null)
                throw new Exception("Employee must report to a Manager.");

            var manager = await _userRepository.GetByIdAsync(managerId.Value);

            if (manager == null)
                throw new Exception("Assigned Manager not found.");

            if (manager.Role.RoleName != "Manager")
                throw new Exception("Employee can report only to a Manager.");

            break;

        default:
            throw new Exception("Invalid role.");
    }
}
public async Task<IEnumerable<UserDto>> GetAllAsync()
{
    var users = await _userRepository.GetAllAsync();

    return users.Select(MapToDto);
}
public async Task<UserDto?> GetByIdAsync(int id)
{
    var user = await _userRepository.GetByIdAsync(id);

    if (user == null)
        return null;

    return MapToDto(user);
}
public async Task<IEnumerable<ManagerDto>> GetManagersAsync()
{
    var managers = await _userRepository.GetManagersAsync();

    return managers.Select(x => new ManagerDto
    {
        UserId = x.UserId,
        Name = x.Name
    });
}
public async Task<IEnumerable<ManagerDto>> GetAdminsAsync()
{
    var admins = await _userRepository.GetAdminsAsync();

    return admins.Select(x => new ManagerDto
    {
        UserId = x.UserId,
        Name = x.Name
    });
}
public async Task<UserDto> UpdateAsync(int id, UpdateUserDto dto)
{
    var user = await _userRepository.GetByIdAsync(id)
        ?? throw new Exception("User not found.");

    var role = await _roleRepository.GetByIdAsync(dto.RoleId)
        ?? throw new Exception("Role not found.");

    var department = await _departmentRepository.GetByIdAsync(dto.DepartmentId)
        ?? throw new Exception("Department not found.");

    await ValidateHierarchy(role.RoleName, dto.ManagerId);

    user.Name = dto.Name;
    user.PhoneNumber = dto.PhoneNumber;
    user.Address = dto.Address;
    user.RoleId = dto.RoleId;
    user.DepartmentId = dto.DepartmentId;
    user.ManagerId = dto.ManagerId;
    user.IsActive = dto.IsActive;

    user = await _userRepository.UpdateAsync(user);

    user = await _userRepository.GetByIdAsync(user.UserId)
           ?? throw new Exception("User update failed.");

    return MapToDto(user);
}
public async Task DeactivateAsync(int id)
{
    var user = await _userRepository.GetByIdAsync(id)
        ?? throw new Exception("User not found.");

    await _userRepository.DeactivateAsync(user);
}
private static UserDto MapToDto(User user)
{
    return new UserDto
    {
        UserId = user.UserId,
        Name = user.Name,
        Email = user.Email,
        PhoneNumber = user.PhoneNumber,
        Address = user.Address,
        IsActive = user.IsActive,

        RoleId = user.RoleId,
        RoleName = user.Role?.RoleName ?? string.Empty,

        DepartmentId = user.DepartmentId,
        DepartmentName = user.Department?.DepartmentName ?? string.Empty,

        ManagerId = user.ManagerId,
        ManagerName = user.Manager?.Name
    };
}
    }
}