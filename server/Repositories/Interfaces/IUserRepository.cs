using server.Models;

namespace server.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllAsync();

        Task<User?> GetByIdAsync(int id);

<<<<<<< HEAD
        Task<User?> GetUserByEmailAsync(string email);

        Task AddAsync(User user);

        Task UpdateAsync(User user);

        Task DeleteAsync(User user);

        Task SaveChangesAsync();
=======
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
>>>>>>> d913bddf6e86c523d8d43a21c9b82bbf6a2440cc
    }
}