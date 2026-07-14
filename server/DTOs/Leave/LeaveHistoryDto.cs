namespace server.DTOs.Leave
{
    public class LeaveHistoryDto
    {
        public int LeaveRequestId { get; set; }

        public string LeaveTypeName { get; set; } = string.Empty;

        public DateOnly StartDate { get; set; }

        public DateOnly EndDate { get; set; }

        public double NumberOfDays { get; set; }

        public string Status { get; set; } = string.Empty;
    }
}

