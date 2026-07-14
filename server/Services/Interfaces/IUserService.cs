using server.DTOs;

namespace server.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllAsync();

        Task<UserDto?> GetByIdAsync(int id);
        
        Task UpdateProfileAsync(int id, UpdateProfileDto dto);

        Task CreateAsync(CreateUserDto dto);

        Task UpdateAsync(int id, UpdateUserDto dto);

        Task DeleteAsync(int id);
    }
}