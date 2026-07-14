using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
<<<<<<< HEAD
using server.DTOs;
=======
using server.DTOs.User;
>>>>>>> d913bddf6e86c523d8d43a21c9b82bbf6a2440cc
using server.Services.Interfaces;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
<<<<<<< HEAD
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _service;

        public UsersController(IUserService service)
        {
            _service = service;
        }

        // GET: api/Users
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var users = await _service.GetAllAsync();
            return Ok(users);
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Manager,Employee")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _service.GetByIdAsync(id);
=======
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
>>>>>>> d913bddf6e86c523d8d43a21c9b82bbf6a2440cc

            if (user == null)
                return NotFound("User not found.");

            return Ok(user);
        }

<<<<<<< HEAD
        // POST: api/Users
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(CreateUserDto dto)
        {
            await _service.CreateAsync(dto);

            return Ok(new
            {
                message = "User created successfully."
            });
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, UpdateUserDto dto)
        {
            await _service.UpdateAsync(id, dto);

            return Ok(new
            {
                message = "User updated successfully."
            });
        }
        [HttpPut("{id}/profile")]
[Authorize(Roles = "Admin,Manager,Employee")]
public async Task<IActionResult> UpdateProfile(int id, UpdateProfileDto dto)
{
    await _service.UpdateProfileAsync(id, dto);

    return Ok(new
    {
        message = "Profile updated successfully."
    });
}

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);

            return Ok(new
            {
                message = "User deleted successfully."
=======
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
>>>>>>> d913bddf6e86c523d8d43a21c9b82bbf6a2440cc
            });
        }
    }
}