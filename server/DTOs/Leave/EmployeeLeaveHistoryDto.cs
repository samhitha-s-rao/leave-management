public class EmployeeLeaveHistoryDto
{
    public int UserId { get; set; }

    public string UserName { get; set; } = string.Empty;

    public string DepartmentName { get; set; } = string.Empty;

    public string RoleName { get; set; } = string.Empty;

    public string LeaveTypeName { get; set; } = string.Empty;

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public double NumberOfDays { get; set; }

    public string Status { get; set; } = string.Empty;
}