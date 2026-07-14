using BCrypt.Net;
using server.DTOs;
using server.Models;
using server.Repositories.Interfaces;
using server.Services.Interfaces;

namespace server.Services
{
    public class UserService : IUserService
    {
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
        }

        public async Task<UserDto?> GetByIdAsync(int id)
        {
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