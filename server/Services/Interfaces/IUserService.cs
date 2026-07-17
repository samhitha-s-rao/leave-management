using server.DTOs;
using server.DTOs.User;

namespace server.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllAsync();

        Task<UserDto?> GetByIdAsync(int id);

        Task<IEnumerable<ManagerDto>> GetManagersAsync();

        Task<IEnumerable<ManagerDto>> GetAdminsAsync();

        Task<UserDto> CreateAsync(CreateUserDto dto);

        Task<UserProfileDto?> GetProfile(int userId);
        Task<UserDto> UpdateAsync(int id, UpdateUserDto dto);
        Task UpdateProfile(int userId, UpdateProfileDto dto);
        Task DeactivateAsync(int id);
    }
}

