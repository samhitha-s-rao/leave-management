namespace server.DTOs.Leave
{
    public class LeaveBalanceDto
    {
        public int LeaveTypeId { get; set; }

        public string LeaveTypeName { get; set; }
            = string.Empty;

        public int RemainingLeaves { get; set; }
    }
}