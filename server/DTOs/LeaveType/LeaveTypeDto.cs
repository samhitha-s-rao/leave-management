namespace server.DTOs.LeaveType
{
    public class LeaveTypeDto
    {
        public int LeaveTypeId { get; set; }

        public string LeaveTypeName { get; set; } = string.Empty;

        public int AllocatedLeaves { get; set; }
    }
}