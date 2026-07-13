using server.DTOs;
using server.Models;
using server.Repositories.Interfaces;
using server.Services.Interfaces;

namespace server.Services
{
    public class HolidayService : IHolidayService
    {
        private readonly IHolidayRepository _repository;

        public HolidayService(IHolidayRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<HolidayDto>> GetAllAsync()
        {
            var holidays = await _repository.GetAllAsync();

            return holidays.Select(h => new HolidayDto
            {
                HolidayId = h.HolidayId,
                HolidayName = h.HolidayName,
                HolidayDate = h.HolidayDate
            });
        }

        public async Task<HolidayDto?> GetByIdAsync(int id)
        {
            var holiday = await _repository.GetByIdAsync(id);

            if (holiday == null)
                return null;

            return new HolidayDto
            {
                HolidayId = holiday.HolidayId,
                HolidayName = holiday.HolidayName,
                HolidayDate = holiday.HolidayDate
            };
        }

        public async Task AddAsync(HolidayDto dto)
        {
            if (await _repository.ExistsAsync(dto.HolidayDate))
                throw new Exception("Holiday already exists for this date.");

            var holiday = new Holiday
            {
                HolidayName = dto.HolidayName,
                HolidayDate = dto.HolidayDate
            };

            await _repository.AddAsync(holiday);
            await _repository.SaveChangesAsync();
        }

        public async Task UpdateAsync(int id, HolidayDto dto)
        {
            var holiday = await _repository.GetByIdAsync(id);

            if (holiday == null)
                throw new Exception("Holiday not found.");

            holiday.HolidayName = dto.HolidayName;
            holiday.HolidayDate = dto.HolidayDate;

            await _repository.UpdateAsync(holiday);
            await _repository.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var holiday = await _repository.GetByIdAsync(id);

            if (holiday == null)
                throw new Exception("Holiday not found.");

            await _repository.DeleteAsync(holiday);
            await _repository.SaveChangesAsync();
        }
    }
}