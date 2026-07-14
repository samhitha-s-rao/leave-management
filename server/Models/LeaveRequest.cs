using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
   public class LeaveRequest
{
    public int LeaveRequestId { get; set; }

    public int UserId { get; set; }

    public int LeaveTypeId { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public double NumberOfDays { get; set; }

    public string LeaveDuration { get; set; } = string.Empty;

    // Employee's reason for requesting leave
    public string Reason { get; set; } = string.Empty;

    // Pending / Approved / Rejected
    public string Status { get; set; } = "Pending";

    // Manager's comments when approving/rejecting
    public string? ManagerRemarks { get; set; }

    // Optional: who approved/rejected the request
    public int? ApprovedBy { get; set; }

    // Optional: when the action was taken
    public DateTime? ActionDate { get; set; }
    public DateTime CreatedDate { get; set; }

    public User User { get; set; } = null!;

    public LeaveType LeaveType { get; set; } = null!;
}
}