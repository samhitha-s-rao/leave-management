using System.ComponentModel.DataAnnotations;

<<<<<<< HEAD
namespace server.DTOs
=======
namespace server.DTOs.User
>>>>>>> d913bddf6e86c523d8d43a21c9b82bbf6a2440cc
{
    public class UpdateUserDto
    {
        [Required]
<<<<<<< HEAD
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        public string Address { get; set; } = string.Empty;

        [Required]
        public string DateofJoining { get; set; } = string.Empty;

        public string ProfilePictureUrl { get; set; } = string.Empty;

        public int RoleId { get; set; }

=======
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
>>>>>>> d913bddf6e86c523d8d43a21c9b82bbf6a2440cc
        public int DepartmentId { get; set; }

        public int? ManagerId { get; set; }

        public bool IsActive { get; set; }
    }
}