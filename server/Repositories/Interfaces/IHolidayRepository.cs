using server.Models;

namespace server.Repositories.Interfaces
{
    public interface IHolidayRepository
    {
        Task<IEnumerable<Holiday>> GetAllAsync();

        Task<Holiday?> GetByIdAsync(int id);

        Task AddAsync(Holiday holiday);

        Task UpdateAsync(Holiday holiday);

        Task DeleteAsync(Holiday holiday);

        Task<bool> ExistsAsync(DateOnly date);

        Task SaveChangesAsync();
    }
}