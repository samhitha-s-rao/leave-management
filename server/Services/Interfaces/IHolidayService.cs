using server.DTOs;

namespace server.Services.Interfaces
{
    public interface IHolidayService
    {
        Task<IEnumerable<HolidayDto>> GetAllAsync();

        Task<HolidayDto?> GetByIdAsync(int id);

        Task AddAsync(HolidayDto dto);

        Task UpdateAsync(int id, HolidayDto dto);

        Task DeleteAsync(int id);
    }
}