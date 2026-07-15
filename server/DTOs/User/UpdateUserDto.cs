using System.ComponentModel.DataAnnotations;

namespace server.DTOs.User
{
    public class UpdateUserDto
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Phone]
        [MaxLength(15)]
        public string PhoneNumber { get; set; } = string.Empty;

        [MaxLength(300)]
        public string? Address { get; set; }

        public int RoleId { get; set; }

        
[Required]
[MaxLength(100)]
public string Designation { get; set; } = string.Empty;

[Required]
public DateOnly DateOfJoining { get; set; }
        public int DepartmentId { get; set; }

        public int? ManagerId { get; set; }

        public bool IsActive { get; set; }
    }
}