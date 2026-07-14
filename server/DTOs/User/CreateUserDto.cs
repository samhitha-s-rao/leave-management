using System.ComponentModel.DataAnnotations;

namespace server.DTOs
{
    public class CreateUserDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        [Required]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        public string Address { get; set; } = string.Empty;

        [Required]
        public string DateofJoining { get; set; } = string.Empty;

        public string ProfilePictureUrl { get; set; } = string.Empty;

        public int RoleId { get; set; }

        public int DepartmentId { get; set; }

        public int? ManagerId { get; set; }

        public bool IsActive { get; set; } = true;
    }
}