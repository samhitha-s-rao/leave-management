using Microsoft.AspNetCore.Mvc;
using server.Services.Interfaces;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveTypeController : ControllerBase
    {

        private readonly ILeaveTypeService _service;


        public LeaveTypeController(
            ILeaveTypeService service)
        {
            _service = service;
        }



        // GET: api/LeaveType
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var leaveTypes =
                await _service.GetAllLeaveTypesAsync();

            return Ok(leaveTypes);
        }



        // GET: api/LeaveType/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {

            var leaveType =
                await _service.GetLeaveTypeByIdAsync(id);


            if (leaveType == null)
            {
                return NotFound(new
                {
                    message = "Leave type not found"
                });
            }


            return Ok(leaveType);
        }
    }
}