using server.Models;

namespace server.Repositories.Interfaces
{
    public interface IRoleRepository
    {
        Task<IEnumerable<Role>> GetAllAsync();

        Task<Role?> GetByIdAsync(int roleId);

        Task<Role> CreateAsync(Role role);

        Task<Role> UpdateAsync(Role role);

        Task DeleteAsync(Role role);

        Task<bool> ExistsAsync(int roleId);
    }
}