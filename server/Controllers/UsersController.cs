using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.DTOs.User;
using server.Services.Interfaces;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: api/users
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userService.GetAllAsync();
            return Ok(users);
        }

        // GET: api/users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _userService.GetByIdAsync(id);

            if (user == null)
                return NotFound("User not found.");

            return Ok(user);
        }

        // GET: api/users/admins
        [HttpGet("admins")]
        public async Task<IActionResult> GetAdmins()
        {
            var admins = await _userService.GetAdminsAsync();
            return Ok(admins);
        }

        // GET: api/users/managers
        [HttpGet("managers")]
        public async Task<IActionResult> GetManagers()
        {
            var managers = await _userService.GetManagersAsync();
            return Ok(managers);
        }

        // POST: api/users
        [HttpPost]
        public async Task<IActionResult> Create(CreateUserDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userService.CreateAsync(dto);

            return CreatedAtAction(
                nameof(GetById),
                new { id = user.UserId },
                user);
        }

        // PUT: api/users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateUserDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userService.UpdateAsync(id, dto);

            return Ok(user);
        }

        // DELETE: api/users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deactivate(int id)
        {
            await _userService.DeactivateAsync(id);

            return Ok(new
            {
                Message = "User deactivated successfully."
            });
        }
    }
}