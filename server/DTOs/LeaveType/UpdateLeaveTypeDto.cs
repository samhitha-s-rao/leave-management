using System.ComponentModel.DataAnnotations;

namespace server.DTOs.LeaveType
{
    public class UpdateLeaveTypeDto
    {
        [Required]
        [MaxLength(50)]
        public string LeaveTypeName { get; set; } = string.Empty;

        [Required]
        public int AllocatedLeaves { get; set; }
    }
}