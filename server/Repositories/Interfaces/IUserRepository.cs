using server.Models;

namespace server.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllAsync();

        Task<User?> GetByIdAsync(int id);

        Task<User?> GetByEmailAsync(string email);

        Task<IEnumerable<User>> GetAdminsAsync();

        Task<IEnumerable<User>> GetManagersAsync();

        Task<IEnumerable<User>> GetEmployeesAsync();

        Task<User> CreateAsync(User user);

        Task<User> UpdateAsync(User user);

        Task DeactivateAsync(User user);

        Task<bool> EmailExistsAsync(string email);

        Task<bool> ExistsAsync(int id);
        Task<IEnumerable<User>> GetByManagerIdAsync(int managerId);
        Task<IEnumerable<User>> GetActiveUsersAsync();
        Task<bool> EmailExistsAsync(string email, int excludeUserId);
    }
}