using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using server.Services.Interfaces;

namespace server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class LeaveBalanceController : ControllerBase
    {
        private readonly ILeaveBalanceService _leaveBalanceService;

        public LeaveBalanceController(
            ILeaveBalanceService leaveBalanceService)
        {
            _leaveBalanceService = leaveBalanceService;
        }

        [HttpGet("my-balance")]
        public async Task<IActionResult> GetMyBalance()
        {
            var userIdClaim =
                User.FindFirstValue(
                    ClaimTypes.NameIdentifier);

            if (!int.TryParse(
                userIdClaim,
                out int userId))
            {
                return Unauthorized();
            }

            var result =
                await _leaveBalanceService
                    .GetMyBalanceAsync(userId);

            return Ok(result);
        }
    }
}