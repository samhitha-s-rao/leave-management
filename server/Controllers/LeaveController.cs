using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using server.DTOs.Leave;
using server.Services.Interfaces;

namespace server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class LeaveController : ControllerBase
    {
        private readonly ILeaveService _leaveService;

        public LeaveController(ILeaveService leaveService)
        {
            _leaveService = leaveService;
        }

        // Employee applies for leave
        [HttpPost("apply")]
        public async Task<IActionResult> ApplyLeave(
            [FromBody] ApplyLeaveRequestDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdClaim =
                User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new
                {
                    message = "Invalid user token."
                });
            }

            var result =
                await _leaveService.ApplyLeaveAsync(userId, dto);

            return Ok(result);
        }

        // Employee views own leave requests
        [HttpGet("my-requests")]
        public async Task<IActionResult> GetMyLeaves()
        {
            var userIdClaim =
                User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new
                {
                    message = "Invalid user token."
                });
            }

            var leaves =
                await _leaveService.GetMyLeavesAsync(userId);

            return Ok(leaves);
        }

        // Manager/Admin views pending leave requests
        [Authorize(Roles = "Manager,Admin")]
        [HttpGet("pending")]
        public async Task<IActionResult> GetPendingLeaves()
        {
            var approverIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var approverRole = User.FindFirstValue(ClaimTypes.Role);

            if (!int.TryParse(approverIdClaim, out int approverId))
            {
                return Unauthorized(new
                {
                    message = "Invalid user token."
                });
            }

            var leaves = await _leaveService.GetPendingLeavesAsync(
                approverId,
                approverRole!);

            return Ok(leaves);
        }

        // Manager/Admin approves or rejects leave
        [Authorize(Roles = "Manager,Admin")]
        [HttpPut("{id}/decision")]
        public async Task<IActionResult> MakeDecision(
            int id,
            [FromBody] ApproveLeaveDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var approverClaim =
                User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!int.TryParse(approverClaim, out int approverId))
            {
                return Unauthorized(new
                {
                    message = "Invalid approver token."
                });
            }

            var success =
                await _leaveService.ApproveOrRejectLeaveAsync(
                    id,
                    approverId,
                    dto);

            if (!success)
            {
                return NotFound(new
                {
                    message = $"Leave request with Id {id} not found."
                });
            }

            return Ok(new
            {
                message = $"Leave request {dto.Status.ToLower()} successfully."
            });
        }
    }
}