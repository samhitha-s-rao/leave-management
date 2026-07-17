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


        [MaxLength(300)]
        public string? Address { get; set; }

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        [Phone]
        [MaxLength(10)]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        public DateOnly DateOfJoining {get; set;}


        public bool IsActive { get; set; } = true;

[Required]
[MaxLength(100)]
public string Designation { get; set; } = string.Empty;



        // Foreign Keys
        public int RoleId { get; set; }

        public int DepartmentId { get; set; }

        // Only Employees will have a Manager
        public int? ManagerId { get; set; }

        // Navigation Properties
        [ForeignKey(nameof(RoleId))]
        public Role Role { get; set; } = null!;

        [ForeignKey(nameof(DepartmentId))]
        public Department Department { get; set; } = null!;

        [ForeignKey(nameof(ManagerId))]
        public User? Manager { get; set; }

        public ICollection<User> Employees { get; set; } = new List<User>();

        public ICollection<LeaveRequest> LeaveRequests { get; set; } = new List<LeaveRequest>();

        public ICollection<LeaveBalance> LeaveBalances { get; set; } = new List<LeaveBalance>();

        public ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();
        public ICollection<Notification> Notifications { get; set; }= new List<Notification>();
    }
}