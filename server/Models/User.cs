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
        [MaxLength(10)]
        public string PhoneNumber { get; set; } = string.Empty;


        [Required]
        public string ProfilePictureUrl {get; set;} = string.Empty;

        [Required]
        public string Address {get; set;} = string.Empty;

        [Required]
        public string DateofJoining {get; set;} = string.Empty;


        public bool IsActive { get; set; } = true;

        // Foreign Keys
        public int RoleId { get; set; }

        public int DepartmentId { get; set; }

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
    }
}