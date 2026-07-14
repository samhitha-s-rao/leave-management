using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers;

 [Authorize(Roles = "Admin,Manager")]
[ApiController]
[Route("api/[controller]")]
public class AttendanceController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAttendance()
    {
        return Ok("Authenticated");
    }

    [HttpPost]
    public IActionResult SaveAttendance()
    {
        return Ok();
    }

    [Authorize]
[HttpPost("checkin")]
public IActionResult CheckIn()
{
    return Ok();
}

[Authorize]
[HttpPost("checkout")]
public IActionResult CheckOut()
{
    return Ok();
}
}