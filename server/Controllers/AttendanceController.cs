using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using server.Services.Interfaces;

namespace server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AttendanceController : ControllerBase
    {
        private readonly IAttendanceService _attendanceService;

        public AttendanceController(IAttendanceService attendanceService)
        {
            _attendanceService = attendanceService;
        }

        // Employee - View Own Attendance
        [HttpGet]
        public async Task<IActionResult> GetMyAttendance()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                return Unauthorized("User ID not found in token.");
            }

            int userId = int.Parse(userIdClaim.Value);

            var attendance =
                await _attendanceService.GetAttendanceByUserAsync(userId);

            return Ok(attendance);
        }

        // Admin & Manager - View All Attendance
        [Authorize(Roles = "Admin,Manager")]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllAttendance()
        {
            var attendance =
                await _attendanceService.GetAllAttendanceAsync();

            return Ok(attendance);
        }

        // Check In
        [HttpPost("checkin")]
        public async Task<IActionResult> CheckIn()
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

                if (userIdClaim == null)
                {
                    return Unauthorized("User ID not found in token.");
                }

                int userId = int.Parse(userIdClaim.Value);

                var result =
                    await _attendanceService.CheckInAsync(userId);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Employee Monthly Attendance
        [HttpGet("monthly")]
        public async Task<IActionResult> GetMonthlyAttendance(
            int month,
            int year)
        {
            var userIdClaim =
                User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                return Unauthorized("User ID not found in token.");
            }

            int userId = int.Parse(userIdClaim.Value);

            var result =
                await _attendanceService.GetMonthlyAttendanceAsync(
                    userId,
                    month,
                    year);

            return Ok(result);
        }

        // Check Out
        [HttpPost("checkout")]
        public async Task<IActionResult> CheckOut()
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

                if (userIdClaim == null)
                {
                    return Unauthorized("User ID not found in token.");
                }

                int userId = int.Parse(userIdClaim.Value);

                var result =
                    await _attendanceService.CheckOutAsync(userId);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Admin & Manager - Monthly Attendance of Employee
        [Authorize(Roles = "Admin,Manager")]
        [HttpGet("monthly/{userId}")]
        public async Task<IActionResult> GetMonthlyAttendanceByUser(
            int userId,
            int month,
            int year)
        {
            var result =
                await _attendanceService.GetMonthlyAttendanceAsync(
                    userId,
                    month,
                    year);

            return Ok(result);
        }
    }
}