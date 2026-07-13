using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        [Phone]
        [MaxLength(15)]
        public string PhoneNumber { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Address { get; set; }

        [MaxLength(100)]
        public string? Designation { get; set; }

        public bool IsActive { get; set; } = true;

        // Foreign Keys
        public int RoleId { get; set; }

        public int DepartmentId { get; set; }

        // Only Employees will have a Manager
        public int? ManagerId { get; set; }

        // Navigation Properties
        [ForeignKey("RoleId")]
        public Role Role { get; set; } = null!;

        [ForeignKey("DepartmentId")]
        public Department Department { get; set; } = null!;

        [ForeignKey("ManagerId")]
        public User? Manager { get; set; }

        public ICollection<User> Employees { get; set; } = new List<User>();

        public ICollection<LeaveRequest> LeaveRequests { get; set; } = new List<LeaveRequest>();

        public ICollection<LeaveBalance> LeaveBalances { get; set; } = new List<LeaveBalance>();

        public ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();
    }
}