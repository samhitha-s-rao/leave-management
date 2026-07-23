using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.DTOs.User;
using server.Services.Interfaces;
using server.Helpers;
namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UsersController : ControllerBase
    {    private readonly IUserService _userService;
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: api/Users
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userService.GetAllAsync();
            return Ok(users);
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Manager,Employee")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _userService.GetByIdAsync(id);

            if (user == null)
                return NotFound("User not found.");

            return Ok(user);
        }

        // GET: api/Users/admins
        [HttpGet("admins")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAdmins()
        {
            var admins = await _userService.GetAdminsAsync();
            return Ok(admins);
        }

        // GET: api/Users/managers
        [HttpGet("managers")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetManagers()
        {
            var managers = await _userService.GetManagersAsync();
            return Ok(managers);
        }

        // POST: api/Users
        [HttpPost]
        [Authorize(Roles = "Admin")]
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

        // PUT: api/Users/5
        [HttpPut("{id}")]
[Authorize(Roles = "Admin")]
public async Task<IActionResult> Update(
    int id,
    [FromBody] UpdateEmployeeDto dto)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    try
    {
        await _userService.UpdateEmployeeAsync(id, dto);

        return Ok(new
        {
            message = "Employee updated successfully."
        });
    }
    catch (Exception ex)
    {
        return BadRequest(new
        {
            message = ex.Message
        });
    }
}
        [HttpPatch("{id}/status")]
public async Task<IActionResult> UpdateEmployeeStatus(
    int id,
    [FromBody] UpdateEmployeeStatusDto dto)
{
    try
    {
        await _userService.UpdateEmployeeStatusAsync(
            id,
            dto.IsActive);

        return Ok(new
        {
            message = dto.IsActive
                ? "Employee activated successfully."
                : "Employee deactivated successfully."
        });
    }
    catch (Exception ex)
    {
        return BadRequest(new
        {
            message = ex.Message
        });
    }
}

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Deactivate(int id)
        {
            await _userService.DeactivateAsync(id);

            return Ok(new
            {
                message = "User deactivated successfully."
            });
        }

        [HttpGet("reporting-managers/{roleId}")]
        public async Task<IActionResult> GetReportingManagers(int roleId)
        {
            if (roleId == RoleConstants.Manager)
                return Ok(await _userService.GetAdminsAsync());

            if (roleId == RoleConstants.Employee)
                return Ok(await _userService.GetManagersAsync());

            return Ok(new List<ManagerDto>());
        }
        
    }
}