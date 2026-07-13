namespace server.DTOs.Leave
{
    public class LeaveResponseDto
    {
        public int LeaveRequestId { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty;

        public string? DepartmentName { get; set; }

        public string? EmployeeCode { get; set; }

        public DateTime? AppliedDate { get; set; }
        public int LeaveTypeId { get; set; }
        public string LeaveTypeName { get; set; } = string.Empty;
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public double NumberOfDays { get; set; }

        public string LeaveDuration { get; set; } = string.Empty;

        public string Reason { get; set; } = string.Empty;

        public string Status { get; set; } = string.Empty;

        public string? ManagerRemarks { get; set; }

        public int? ApprovedBy { get; set; }

        public string? ApprovedByName { get; set; }

        public DateTime? ActionDate { get; set; }
        
            }
}
