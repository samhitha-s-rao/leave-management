using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.DTOs;
using server.Services.Interfaces;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class HolidayController : ControllerBase
    {
        private readonly IHolidayService _service;

        public HolidayController(IHolidayService service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Manager,Employee")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _service.GetAllAsync());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Manager,Employee")]
        public async Task<IActionResult> GetById(int id)
        {
            var holiday = await _service.GetByIdAsync(id);

            if (holiday == null)
                return NotFound();

            return Ok(holiday);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(HolidayDto dto)
        {
            await _service.AddAsync(dto);
            return Ok("Holiday Added Successfully");
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, HolidayDto dto)
        {
            await _service.UpdateAsync(id, dto);
            return Ok("Holiday Updated Successfully");
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return Ok("Holiday Deleted Successfully");
        }
    }
}